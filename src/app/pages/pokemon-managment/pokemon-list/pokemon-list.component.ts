import { Component, inject, OnInit } from '@angular/core';
import { PokemonService } from '../../../core/services/pokemon.service';
import { PokemonCustomDetails } from '../../../models/pokemon';
import { ToastService } from '../../../shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {
  private pokemonService = inject(PokemonService)
  private toastService = inject(ToastService)
  pokemons$: Observable<PokemonCustomDetails[]> = of([])

  constructor(){}

  ngOnInit(): void {
    this.loadPokemons();
  }

  private loadPokemons(){
    this.pokemons$ = this.pokemonService.getPokemonsDetails().pipe(
      catchError((err) => {
          this.toastService.error("Erro ao buscar pokemons");
          console.log(err)
          return of([])
        })
    )
  }
}
