import { Component, inject, OnInit } from '@angular/core';
import { PokemonService } from '../../../core/services/pokemon.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, map, Observable, of, startWith, switchMap } from 'rxjs';
import { PokemonCustomDetails } from '../../../models/pokemon';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, PokemonCardComponent, ReactiveFormsModule, InputTextModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {
  private pokemonService = inject(PokemonService)
  private toastService = inject(ToastService)
  private formBuilder = inject(FormBuilder)
  localStorageService = inject(LocalStorageService)
  pokemons$ = this.pokemonService.pokemons$;
  filterPokemons$!: Observable<PokemonCustomDetails[]>;
  form!: FormGroup

  constructor(){}

  ngOnInit(): void {
    if(navigator.onLine) {
      this.listenPokemons();
    } else {
      this.pokemons$ = of(this.localStorageService.getItem("pokemons") || []);
    }

    this.createForm();
    this.initFilter();
  }

  private listenPokemons(){
    this.pokemonService.getPokemonsDetails().subscribe({
      error: (err) => {
        console.log(err)
        this.toastService.error("Erro ao buscar pokemon")
      }
    })
  }

  onToggleFavorite(pokemonId: number) {
    this.pokemonService.favorite(pokemonId)
  }

  createForm(){
    this.form = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]]
    })
  }

  initFilter() {
    this.filterPokemons$ = this.form.get('name')!.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(search =>
        this.pokemons$.pipe(
          map(pokemons =>
            pokemons.filter(p =>
              p.name.toLowerCase().startsWith(search.toLowerCase())
            )
          )
        )
      )
    );
  }
}
