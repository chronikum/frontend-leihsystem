import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceModelCreationModalComponent } from './device-model-creation-modal.component';

describe('DeviceModelCreationModalComponent', () => {
  let component: DeviceModelCreationModalComponent;
  let fixture: ComponentFixture<DeviceModelCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceModelCreationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceModelCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
