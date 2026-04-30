import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CharacterService } from './character'; // <-- Importamos el SERVICIO

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacterService, // Proveemos el servicio
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    // AQUÍ ESTABA EL ERROR: Debes inyectar CharacterService, no Character
    service = TestBed.inject(CharacterService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });
});