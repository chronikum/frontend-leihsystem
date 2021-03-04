import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSelectionTableComponent } from './general-selection-table.component';

describe('GeneralSelectionTableComponent', () => {
  let component: GeneralSelectionTableComponent;
  let fixture: ComponentFixture<GeneralSelectionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralSelectionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSelectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
