import { Injectable } from "@angular/core";
import { forkJoin, map, Observable, switchMap } from "rxjs";
import { Pokemon, PokemonDetails, PokemonCustomDetails, PokemonSummary } from "../../models/pokemon";
import { CrudService } from "./crud.service";

@Injectable({
   providedIn: 'root'
})
export class PokemonService extends CrudService<PokemonDetails> {

   constructor(){
      super("/pokemon")
   }

   getPokemonsDetails(): Observable<PokemonCustomDetails[]> {
      return this.http.get<PokemonSummary>(`${this.apiUrl}/?offset=0&limit=20`).pipe(
         switchMap(response => {
            const requests = response.results.map((pokemon: Pokemon) => this.getUniquePokemon(pokemon.url));
            return forkJoin(requests);
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