import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvFileSelectorComponent } from './csv-file-selector.component';

describe('CsvFileSelectorComponent', () => {
  let component: CsvFileSelectorComponent;
  let fixture: ComponentFixture<CsvFileSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvFileSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvFileSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
