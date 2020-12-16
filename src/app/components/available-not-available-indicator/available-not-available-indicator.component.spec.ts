import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableNotAvailableIndicatorComponent } from './available-not-available-indicator.component';

describe('AvailableNotAvailableIndicatorComponent', () => {
  let component: AvailableNotAvailableIndicatorComponent;
  let fixture: ComponentFixture<AvailableNotAvailableIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableNotAvailableIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableNotAvailableIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
