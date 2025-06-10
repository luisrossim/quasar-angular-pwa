import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, map, Observable, switchMap, tap } from "rxjs";
import { Pokemon, PokemonDetails, PokemonCustomDetails, PokemonSummary } from "../../models/pokemon";
import { CrudService } from "./crud.service";

@Injectable({
   providedIn: 'root'
})
export class PokemonService extends CrudService<PokemonDetails> {

   constructor(){
      super("/pokemon")
   }
   

   private pokemonsSubject = new BehaviorSubject<PokemonCustomDetails[]>([])
   public pokemons$ = this.pokemonsSubject.asObservable();

   setPokemons(values: PokemonCustomDetails[]): void {
      this.pokemonsSubject.next(values);
   }


   favorite(pokemonId: number) {
      const currentValue = this.pokemonsSubject.value;
      const updatedValue = currentValue.map(p =>
         p.id === pokemonId ? { ...p, favorite: !p.favorite } : p
      );
      this.setPokemons(updatedValue);
   }

   getPokemonsDetails(): Observable<PokemonCustomDetails[]> {
      return this.http.get<PokemonSummary>(`${this.apiUrl}/?offset=0&limit=20`).pipe(
         switchMap(response => {
            const requests = response.results.map((pokemon: Pokemon) => this.getUniquePokemon(pokemon.url));
            return forkJoin(requests);
         }),
         tap((pokemons) => {
            this.setPokemons(pokemons)
         })
      )
   }

   getUniquePokemon(url: string): Observable<PokemonCustomDetails> {
      return this.http.get<PokemonDetails>(url).pipe(
         map((details): PokemonCustomDetails => ({
            id: details.id,
            name: details.name,
            height: details.height,
            weight: details.weight,
            favorite: false
         }))
      )
   }
}