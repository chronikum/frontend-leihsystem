import { TestBed } from '@angular/core/testing';

import { LicenseInformationService } from './license-information.service';

describe('LicenseInformationService', () => {
  let service: LicenseInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenseInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
