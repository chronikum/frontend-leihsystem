import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCountChipComponent } from './model-count-chip.component';

describe('ModelCountChipComponent', () => {
  let component: ModelCountChipComponent;
  let fixture: ComponentFixture<ModelCountChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelCountChipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelCountChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
