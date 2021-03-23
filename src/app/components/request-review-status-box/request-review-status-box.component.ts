import { Component, Input, OnInit } from '@angular/core';
import { DeviceModel } from 'src/app/models/DeviceModel';
import { Request } from 'src/app/models/Request';
import { SubRequest } from 'src/app/models/SubRequest';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-request-review-status-box',
  templateUrl: './request-review-status-box.component.html',
  styleUrls: ['./request-review-status-box.component.scss']
})
export class RequestReviewStatusBoxComponent implements OnInit {

  /**
   * The request to fulfill
   */
  @Input() request: Request;

  /**
   * Determines which of the subrequests is prefilled
   */
  subRequestPrefilled: boolean[] = [];

  /**
   * Device models
   */
  allDeviceModels: DeviceModel[];

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.loadDeviceModels();
  }

  /**
   * Will return Komplex string if the request has subrequests
   */
  getSimpleOrComplex() {
    return (this.request?.subRequest[0] || false) ? 'Komplex' : 'Einfach';
  }

  /**
   * Simple request
   */
  isSimple() {
    return (this.getSimpleOrComplex() === 'Einfach')
  }

  /**
   * Complex request
   */
  isComplex() {
    return (this.getSimpleOrComplex() === 'Komplex')
  }

  /**
   * Total devices needed
   */
  devicesNeeded() {
    return `Es werden ${this.request.deviceCount} Gerät(e) benötigt.`;
  }

  /**
   * Total devices needed
   */
  singleDeviceCategoryNeeded(subRequest: SubRequest) {
    return `Es werden ${subRequest.count} ${this.getDeviceModelDisplayName(subRequest.deviceModelIdentifier)} benötigt.`;
  }

  /**
   * Takes devices model identifier
   * and returns the display name
   */
  getDeviceModelDisplayName(deviceModelIdentifier: number): string {
    return this.allDeviceModels.filter(model => model.deviceModelId === deviceModelIdentifier)[0]?.displayName || '-';
  }

  /**
   * Gets all device models in the table
   */
  loadDeviceModels() {
    this.apiService.getAllModels$().subscribe(response => {
      console.log(response);
      this.allDeviceModels = response.deviceModels;
    })
  }

}
