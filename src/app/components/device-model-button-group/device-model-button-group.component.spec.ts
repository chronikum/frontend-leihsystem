import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceModelButtonGroupComponent } from './device-model-button-group.component';

describe('DeviceModelButtonGroupComponent', () => {
  let component: DeviceModelButtonGroupComponent;
  let fixture: ComponentFixture<DeviceModelButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceModelButtonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceModelButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
