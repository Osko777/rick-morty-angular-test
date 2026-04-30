import { Component, inject, signal, computed } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FavoritesService } from '../../core/services/favorites';
import { Character } from '../../core/models/character.interface';
import { CharacterCard } from '../../shared/components/character-card/character-card';
import { CharacterModal } from '../../shared/components/character-modal/character-modal';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CharacterCard],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css']
})
export class Favorites {
  private favoritesService = inject(FavoritesService);

  searchTerm = signal<string>('');

  filteredFavorites = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const allFavs = this.favoritesService.favorites();
    
    if (!term) return allFavs;
    
    return allFavs.filter(char => 
      char.name.toLowerCase().includes(term)
    );
  });

  selectedCharacter = signal<Character | null>(null);
  isModalOpen = signal<boolean>(false);

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  openModal(character: Character) {
    this.selectedCharacter.set(character);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedCharacter.set(null);
  }
}