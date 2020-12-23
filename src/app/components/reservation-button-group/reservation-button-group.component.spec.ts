import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationButtonGroupComponent } from './reservation-button-group.component';

describe('ReservationButtonGroupComponent', () => {
  let component: ReservationButtonGroupComponent;
  let fixture: ComponentFixture<ReservationButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationButtonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
