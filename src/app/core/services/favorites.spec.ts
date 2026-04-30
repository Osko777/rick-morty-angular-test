import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { FavoritesService } from './favorites';
import { Character } from '../models/character.interface';

describe('FavoritesService', () => {
  let service: FavoritesService;

  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  } as Character;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FavoritesService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(FavoritesService);
  });

  it('debería agregar y remover un personaje de favoritos', () => {
    // 1. Agregar
    service.toggleFavorite(mockCharacter);
    expect(service.isFavorite(mockCharacter.id)).toBe(true);
    expect(service.favorites().length).toBe(1);
    // 2. Remover
    service.toggleFavorite(mockCharacter);
    expect(service.isFavorite(mockCharacter.id)).toBe(false);
    expect(service.favorites().length).toBe(0);
  });
});