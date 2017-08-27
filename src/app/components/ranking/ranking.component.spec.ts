import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RoundService } from '../../services/round.service';
import { ErrorHandlersService } from '../../handlers/error-handlers.service';

import { RankingComponent } from './ranking.component';

describe('RankingComponent', () => {
  let component: RankingComponent;
  let fixture: ComponentFixture<RankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [RankingComponent],
      providers: [RoundService, ErrorHandlersService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
