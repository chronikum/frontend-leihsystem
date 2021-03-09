import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceModel } from 'src/app/models/DeviceModel';
import { SubRequest } from 'src/app/models/SubRequest';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-model-count-selector',
  templateUrl: './model-count-selector.component.html',
  styleUrls: ['./model-count-selector.component.scss']
})
export class ModelCountSelectorComponent implements OnInit {

  /**
   * The total count of devices which will be requested
   */
  @Input() totalCount: number;

  /**
   * The current subrequests
   */
  @Output() subRequestsEmitter = new EventEmitter<SubRequest[]>();

  /**
   * All device models
   */
  allDeviceModels: DeviceModel[] = [];

  /**
   * SubRequests Collection
   */
  subRequests: SubRequest[] = [];

  /**
   * Total devices selected with model select count
   */
  totalDevicesSelected: number = 0;

  /**
   * Constructs a new instance of ModelCountSelector and loads deviceModels
   */
  constructor(
    private apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.loadDeviceModels();
  }

  /**
   * Adds a subrequest to the subRequests collection
   * Will updated total devices selected afterwards
   */
  addSubRequest(deviceModel: DeviceModel, count: number) {
    const subRequest: SubRequest = {
      deviceModelIdentifier: deviceModel.deviceModelId,
      count, deviceModel,
    };

    this.subRequests.push(subRequest);
    this.updateTotalDevicesSelected();
  }

  /**
   * Deletes the subrequest with the given device model identifier
   * Will updated total devices selected afterwards
   * TODO: Check if this actually works
   */
  deleteSubRequest(deviceModel: DeviceModel) {
    this.subRequests = this.subRequests.filter((subRequest: SubRequest) => {
      return deviceModel.deviceModelId !== subRequest.deviceModelIdentifier
    })
    this.updateTotalDevicesSelected();
  }

  /**
   * Updates the total devices selected property
   */
  updateTotalDevicesSelected() {
    let total = 0;
    this.subRequests.forEach(request => total += request.count);
    this.totalDevicesSelected = total;
  }


  /**
   * Gets all device models in the table
   */
  loadDeviceModels() {
    this.apiService.getAllModels$().subscribe(response => {
      console.log(response);
      this.allDeviceModels = response.deviceModels;
      this.subRequests = [{
        count: 7,
        deviceModelIdentifier: 2,
        deviceModel: this.allDeviceModels[0],
      },
      {
        count: 8,
        deviceModelIdentifier: 5,
        deviceModel: this.allDeviceModels[1],
      },
      {
        count: 8,
        deviceModelIdentifier: 5,
        deviceModel: this.allDeviceModels[1],
      },
      {
        count: 9,
        deviceModelIdentifier: 3,
        deviceModel: this.allDeviceModels[2],
      }]
    })
  }

}
