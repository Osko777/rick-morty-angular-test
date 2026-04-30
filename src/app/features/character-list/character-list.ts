import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../core/services/character';
import { Character } from '../../core/models/character.interface';
import { CharacterCard } from '../../shared/components/character-card/character-card';
import { CharacterModal} from '../../shared/components/character-modal/character-modal';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, CharacterCard, CharacterModal],
  templateUrl: './character-list.html',
  styleUrls: ['./character-list.css']
})
export class CharacterList implements OnInit {
  private characterService = inject(CharacterService);

  characters = signal<Character[]>([]);
  selectedCharacter = signal<Character | null>(null);
  isModalOpen = signal<boolean>(false);
  hasError = signal<boolean>(false); 

  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  currentSearchTerm = signal<string>('');
  isLoading = signal<boolean>(false); 
  errorMessage = signal<string>(''); 

  ngOnInit() {
    this.loadPage(1);
  }

  loadPage(page: number) {
    const term = this.currentSearchTerm();
    this.errorMessage.set(''); 
    this.isLoading.set(true); 

    if (term.length === 0) {
      this.characterService.getCharacters(page).subscribe({
        next: (response) => {
          this.characters.set(response.results);
          this.currentPage.set(page);
          this.totalPages.set(response.info.pages);
          this.isLoading.set(false); 
        },
        error: (err) => {
          this.isLoading.set(false);
          this.characters.set([]);
          
          if (err.status === 429) {
            this.errorMessage.set('¡Vas muy rápido! La API nos ha puesto en pausa. Espera unos 30 segundos.');
          } else {
            this.errorMessage.set('Hubo un error al cargar los personajes.');
          }
        }
      });
    } else {
      this.characterService.searchCharacters(term, page).subscribe({
        next: (response) => { 
          this.characters.set(response.results);
          this.currentPage.set(page);
          this.totalPages.set(response.info.pages);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.characters.set([]); 
          this.isLoading.set(false);
          
          if (err.status === 429) {
            this.errorMessage.set('¡Vas muy rápido! La API nos ha puesto en pausa. Espera unos 30 segundos.');
          } else if (err.status === 404) {
            this.errorMessage.set('No se encontraron personajes en este universo con ese nombre.');
          } else {
            this.errorMessage.set('Hubo un problema de conexión.');
          }
        }
      });
    }
  }

  loadCharacters() {
    this.hasError.set(false);
    this.characterService.getCharacters(1).subscribe({
      next: (response) => this.characters.set(response.results),
      error: (err) => console.error('Error:', err)
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.trim();
    
    this.currentSearchTerm.set(searchTerm);
    this.loadPage(1); 
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.loadPage(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.loadPage(this.currentPage() - 1);
    }
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