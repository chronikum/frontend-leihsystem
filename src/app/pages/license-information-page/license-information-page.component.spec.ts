import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseInformationPageComponent } from './license-information-page.component';

describe('LicenseInformationPageComponent', () => {
  let component: LicenseInformationPageComponent;
  let fixture: ComponentFixture<LicenseInformationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseInformationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseInformationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
