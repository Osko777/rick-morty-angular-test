import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterResponse } from '../models/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private http = inject(HttpClient);
  // Endpoint principal
  private apiUrl = 'https://rickandmortyapi.com/api/character'; 

  // Método para obtener personajes
  getCharacters(page: number = 1): Observable<CharacterResponse> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<CharacterResponse>(this.apiUrl, { params });
  }

  // Metodo para buscar
  searchCharacters(name: string, page: number = 1): Observable<CharacterResponse> {
    const params = new HttpParams()
      .set('name', name)
      .set('page', page.toString()); 
    return this.http.get<CharacterResponse>(this.apiUrl, { params });
  }
}