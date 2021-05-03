import { TestBed } from '@angular/core/testing';

import { InfoTableService } from './info-table.service';

describe('InfoTableService', () => {
  let service: InfoTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
