import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationItemInformationComponent } from './reservation-item-information.component';

describe('ReservationItemInformationComponent', () => {
  let component: ReservationItemInformationComponent;
  let fixture: ComponentFixture<ReservationItemInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationItemInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationItemInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
