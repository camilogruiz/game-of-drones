import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { RoundService } from './round.service';

describe('RoundService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [RoundService]
    });
  });

  it('should be created', inject([RoundService], (service: RoundService) => {
    expect(service).toBeTruthy();
  }));
});
