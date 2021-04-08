import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInCardComponent } from './logged-in-card.component';

describe('LoggedInCardComponent', () => {
  let component: LoggedInCardComponent;
  let fixture: ComponentFixture<LoggedInCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedInCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
