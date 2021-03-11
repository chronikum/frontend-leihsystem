import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewReservationRequestModalComponent } from './review-reservation-request-modal.component';

describe('ReviewReservationRequestModalComponent', () => {
  let component: ReviewReservationRequestModalComponent;
  let fixture: ComponentFixture<ReviewReservationRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewReservationRequestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewReservationRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
