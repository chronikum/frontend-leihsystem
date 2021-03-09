import { TestBed } from '@angular/core/testing';

import { CsvExporterService } from './csv-exporter.service';

describe('CsvExporterService', () => {
  let service: CsvExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvExporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
