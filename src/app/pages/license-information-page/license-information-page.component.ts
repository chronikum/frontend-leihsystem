import { Component, EventEmitter, OnInit } from '@angular/core';
import { LicenseInformationService } from 'src/app/services/license-information.service';

@Component({
  selector: 'app-license-information-page',
  templateUrl: './license-information-page.component.html',
  styleUrls: ['./license-information-page.component.scss']
})
export class LicenseInformationPageComponent implements OnInit {

  /**
   * The license event emitter
   */
  licenseEventEmitter = new EventEmitter<any>();

  constructor(
    private licenseInformation: LicenseInformationService,
  ) { }

  ngOnInit(): void {
    this.loadLicenseInformation()
  }

  /**
   * Load license information
   */
  loadLicenseInformation() {
    const licenseArray = [];

    /**
     * Get license information for frontend
     */
    this.licenseInformation.getLicenseInformationFrontend$().subscribe(json => {
      for (const key in json) {
        json[key].version = key;
        json[key].used = 'Frontend';
        licenseArray.push(json[key]);
      }
      this.licenseEventEmitter.next(licenseArray);
    })

    /** 
     * Get license information for the backend
     */
    this.licenseInformation.getLicenseInformationBackend$().subscribe(json => {
      for (const key in json) {
        json[key].version = key;
        json[key].used = 'Backend';
        licenseArray.push(json[key]);
      }
      this.licenseEventEmitter.next(licenseArray);
    })

  }

}
