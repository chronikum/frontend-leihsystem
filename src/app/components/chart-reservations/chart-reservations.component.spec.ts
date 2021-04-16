import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartReservationsComponent } from './chart-reservations.component';

describe('ChartReservationsComponent', () => {
  let component: ChartReservationsComponent;
  let fixture: ComponentFixture<ChartReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
