import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CharacterService } from './character'; 

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacterService, 
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CharacterService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });
});