import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ErrorHandlersService } from '../handlers/error-handlers.service';
import { RoundService } from './round.service';

describe('RoundService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [RoundService, ErrorHandlersService]
    });
  });

  it('should be created', inject([RoundService], (service: RoundService) => {
    expect(service).toBeTruthy();
  }));
});
