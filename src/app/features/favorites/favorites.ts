import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../core/services/favorites';
import { Character } from '../../core/models/character.interface';
import { CharacterCard } from '../../shared/components/character-card/character-card';
import { CharacterModal } from '../../shared/components/character-modal/character-modal';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CharacterCard, CharacterModal],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css']
})
export class Favorites {
  private favoritesService = inject(FavoritesService);

  favoriteCharacters = this.favoritesService.favorites;

  selectedCharacter = signal<Character | null>(null);
  isModalOpen = signal<boolean>(false);

  openModal(character: Character) {
    this.selectedCharacter.set(character);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedCharacter.set(null);
  }
}