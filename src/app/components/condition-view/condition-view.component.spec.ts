import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionViewComponent } from './condition-view.component';

describe('ConditionViewComponent', () => {
  let component: ConditionViewComponent;
  let fixture: ComponentFixture<ConditionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
