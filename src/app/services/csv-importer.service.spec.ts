import { TestBed } from '@angular/core/testing';

import { CsvImporterService } from './csv-importer.service';

describe('CsvImporterService', () => {
  let service: CsvImporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvImporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
