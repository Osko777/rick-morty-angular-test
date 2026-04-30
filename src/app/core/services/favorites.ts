import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Character } from '../models/character.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private platformId = inject(PLATFORM_ID);

  private favoritesSignal = signal<Character[]>([]);
  public favorites = computed(() => this.favoritesSignal());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.favoritesSignal.set(this.loadFavorites());
    }
  }

  toggleFavorite(character: Character) {
    const currentFavs = this.favoritesSignal();
    const isAlreadyFav = currentFavs.some(fav => fav.id === character.id);

    if (isAlreadyFav) {
      this.favoritesSignal.set(currentFavs.filter(fav => fav.id !== character.id));
    } else {
      this.favoritesSignal.set([...currentFavs, character]);
    }
    
    if (isPlatformBrowser(this.platformId)) {
      this.saveFavorites(this.favoritesSignal());
    }
  }

  isFavorite(characterId: number): boolean {
    return this.favoritesSignal().some(fav => fav.id === characterId);
  }

  private loadFavorites(): Character[] {
    const stored = localStorage.getItem('rick_morty_favs');
    return stored ? JSON.parse(stored) : [];
  }

  private saveFavorites(favs: Character[]) {
    localStorage.setItem('rick_morty_favs', JSON.stringify(favs));
  }
}