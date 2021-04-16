import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartReservationUserComponent } from './chart-reservation-user.component';

describe('ChartReservationUserComponent', () => {
  let component: ChartReservationUserComponent;
  let fixture: ComponentFixture<ChartReservationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartReservationUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartReservationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
