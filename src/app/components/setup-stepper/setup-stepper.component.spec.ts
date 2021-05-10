import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupStepperComponent } from './setup-stepper.component';

describe('SetupStepperComponent', () => {
  let component: SetupStepperComponent;
  let fixture: ComponentFixture<SetupStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
