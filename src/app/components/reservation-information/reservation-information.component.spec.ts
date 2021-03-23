import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationInformationComponent } from './reservation-information.component';

describe('ReservationInformationComponent', () => {
  let component: ReservationInformationComponent;
  let fixture: ComponentFixture<ReservationInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
