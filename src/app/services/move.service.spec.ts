import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ErrorHandlersService } from '../handlers/error-handlers.service';
import { MoveService } from './move.service';

describe('MoveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [MoveService, ErrorHandlersService]
    });
  });

  it('should be created', inject([MoveService], (service: MoveService) => {
    expect(service).toBeTruthy();
  }));
});
