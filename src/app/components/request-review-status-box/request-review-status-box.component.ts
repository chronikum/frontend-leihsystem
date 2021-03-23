import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
   * Matches the index of the subrequests, if it is true, matching index is true too
   */
  @Input() subrequestPrefilledUpdater: EventEmitter<boolean[]>

  /**
   * Conditional updater. Mirror of subrequestPrefilledUpdater
   */
  conditionUpdater = new EventEmitter<boolean[]>();
  /**
   * Device models
   */
  allDeviceModels: DeviceModel[];

  /**
   * Conditions prefilled local property holder
   */
  conditionsPrefilled: boolean = false;

  /**
   * Will be true if all conditions are prefilled - will fire it to the parent modal
   */
  @Input() conditionsPrefilledUpdater: EventEmitter<boolean>;

  constructor(
    private apiService: ApiService,
  ) { }

  /**
   * ngOnInit 
   * - Loads all device models
   * - Also subscribes to condition updater (which determines if a certain condition is being displayed as true or not)
   */
  ngOnInit(): void {
    this.conditionUpdater.next([])
    this.loadDeviceModels();
    this.subrequestPrefilledUpdater.subscribe(updatedConditions => {
      this.subRequestPrefilled = updatedConditions
      this.conditionsPrefilled = true;
      this.subRequestPrefilled.forEach(condition => {
        // Is all conditions are prefilled conditionsPrefilled will never be changed to be false
        if (!condition) {
          this.conditionsPrefilled = condition;
        }
        this.conditionsPrefilledUpdater.next(this.conditionsPrefilled)
      })
      this.conditionUpdater.next(updatedConditions);
    });
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
      this.allDeviceModels = response.deviceModels;
    })
  }

}
