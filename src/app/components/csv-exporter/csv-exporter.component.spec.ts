import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvExporterComponent } from './csv-exporter.component';

describe('CsvExporterComponent', () => {
  let component: CsvExporterComponent;
  let fixture: ComponentFixture<CsvExporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvExporterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvExporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
