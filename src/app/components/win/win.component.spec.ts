import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayService } from '../../services/play.service';
import { WinComponent } from './win.component';

describe('WinComponent', () => {
  let component: WinComponent;
  let fixture: ComponentFixture<WinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinComponent ],
      providers: [ PlayService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
