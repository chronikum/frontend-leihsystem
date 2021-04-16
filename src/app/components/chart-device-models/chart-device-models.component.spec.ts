import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDeviceModelsComponent } from './chart-device-models.component';

describe('ChartDeviceModelsComponent', () => {
  let component: ChartDeviceModelsComponent;
  let fixture: ComponentFixture<ChartDeviceModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartDeviceModelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDeviceModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
