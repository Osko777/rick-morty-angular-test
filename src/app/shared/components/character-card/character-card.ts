import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../../core/models/character.interface';
import { FavoritesService } from '../../../core/services/favorites';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-card.html',
  styleUrls: ['./character-card.css']
})
export class CharacterCard {
  @Input({ required: true }) character!: Character;
  @Output() cardClick = new EventEmitter<Character>();
  
  private favoritesService = inject(FavoritesService);

  get isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.character.id);
  }

  onCardClick() {
    this.cardClick.emit(this.character);
  }

  onFavoriteClick(event: Event) {
    event.stopPropagation(); 
    this.favoritesService.toggleFavorite(this.character);
  }
}