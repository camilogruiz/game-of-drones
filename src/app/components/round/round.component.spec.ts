import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoundComponent } from './round.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayService } from '../../services/play.service';
import { GameService } from '../../services/game.service';
import { ErrorHandlersService } from '../../handlers/error-handlers.service';

describe('RoundComponent', () => {
  let component: RoundComponent;
  let fixture: ComponentFixture<RoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpModule],
      declarations: [RoundComponent],
      providers: [PlayService, GameService, ErrorHandlersService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
