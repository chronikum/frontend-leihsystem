import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishReservationModalComponent } from './finish-reservation-modal.component';

describe('FinishReservationModalComponent', () => {
  let component: FinishReservationModalComponent;
  let fixture: ComponentFixture<FinishReservationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishReservationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
