import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestButtonGroupComponent } from './request-button-group.component';

describe('RequestButtonGroupComponent', () => {
  let component: RequestButtonGroupComponent;
  let fixture: ComponentFixture<RequestButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestButtonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
