import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesssoireButtonGroupComponent } from './accesssoire-button-group.component';

describe('AccesssoireButtonGroupComponent', () => {
  let component: AccesssoireButtonGroupComponent;
  let fixture: ComponentFixture<AccesssoireButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesssoireButtonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesssoireButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
