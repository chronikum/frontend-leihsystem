import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAvailableDevicesComponent } from './chart-available-devices.component';

describe('ChartAvailableDevicesComponent', () => {
  let component: ChartAvailableDevicesComponent;
  let fixture: ComponentFixture<ChartAvailableDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartAvailableDevicesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAvailableDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
