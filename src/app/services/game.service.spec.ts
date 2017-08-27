import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { GameService } from './game.service';
import { ErrorHandlersService } from '../handlers/error-handlers.service';
import { PlayService } from './play.service';

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [GameService, ErrorHandlersService, PlayService]
    });
  });

  it('should be created', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));
});
