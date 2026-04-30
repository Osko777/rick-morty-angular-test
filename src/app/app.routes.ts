import { Routes } from '@angular/router';
import { CharacterList } from './features/character-list/character-list';
import { Favorites } from './features/favorites/favorites';

export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: 'characters', component: CharacterList },
  { path: 'favorites', component: Favorites },
  { path: '**', redirectTo: 'characters' }
];