import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionHeaderComponent } from './condition-header.component';

describe('ConditionHeaderComponent', () => {
  let component: ConditionHeaderComponent;
  let fixture: ComponentFixture<ConditionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
