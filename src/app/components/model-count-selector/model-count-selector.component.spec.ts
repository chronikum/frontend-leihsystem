import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCountSelectorComponent } from './model-count-selector.component';

describe('ModelCountSelectorComponent', () => {
  let component: ModelCountSelectorComponent;
  let fixture: ComponentFixture<ModelCountSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelCountSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelCountSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
