import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonCustomDetails } from '../../../models/pokemon';

@Component({
  selector: 'app-pokemon-card',
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent {
  @Input() pokemon!: PokemonCustomDetails;
  @Output() toggleFavorite = new EventEmitter<number>();

  onToggleFavorite() {
    this.toggleFavorite.emit(this.pokemon.id);
  }
}
