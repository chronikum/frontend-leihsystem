import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceModelPageComponent } from './device-model-page.component';

describe('DeviceModelPageComponent', () => {
  let component: DeviceModelPageComponent;
  let fixture: ComponentFixture<DeviceModelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceModelPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceModelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
