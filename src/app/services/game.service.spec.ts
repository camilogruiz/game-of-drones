import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { GameService } from './game.service';

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [GameService]
    });
  });

  it('should be created', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));
});
