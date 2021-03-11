import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { ModelCountRequestModalComponent } from 'src/app/modals/model-count-request-modal/model-count-request-modal.component';
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
   * The current subrequests
   */
  @Input() subRequestsEmitter: EventEmitter<SubRequest[]>;

  /**
   * All device models
   */
  allDeviceModels: DeviceModel[] = [];

  /**
   * SubRequests Collection
   */
  subRequests: SubRequest[] = [];

  /**
   * Subrequest deletion requested listener
   */
  deleteSubRequestListener = new EventEmitter<SubRequest>();

  /**
   * Total devices selected with model select count
   */
  totalDevicesSelected: number = 0;

  /**
   * Constructs a new instance of ModelCountSelector and loads deviceModels
   */
  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
  ) {
  }

  /**
   * Loads device models and sets up deleteSubRequestListener.
   * We will apply the listener to the items added on the interface, 
   * if the delete button is triggered, we will be notified
   * and can take care of it.
   */
  ngOnInit(): void {
    this.loadDeviceModels();
    this.deleteSubRequestListener.subscribe(requestToDelete => this.deleteSubRequest(requestToDelete));
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
  deleteSubRequest(request: SubRequest) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '650px',
      data: { message: `Wollen Sie die Anfrage für ${request.count} ${request.deviceModel.displayName}(s) wirklich entfernen?`, critical: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subRequests = this.subRequests.filter((subRequest: SubRequest) => {
          return subRequest !== request;
        })
        this.updateTotalDevicesSelected();
      }
    });
  }

  /**
   * Updates the total devices selected property and notifies to parent components about the change
   */
  updateTotalDevicesSelected() {
    let total = 0;
    this.subRequests.forEach(request => total += request.count);
    this.totalDevicesSelected = total;
    this.subRequestsEmitter.next(this.subRequests);
  }

  /**
   * Create new model count request
   * - Opens modal where user can select device model and give amount wanted
   * - If model closes successful, returned request will be added to the SubRequest Collection
   */
  createNewModelCountRequest() {
    const dialogRef = this.dialog.open(ModelCountRequestModalComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe(async (result: SubRequest) => {
      if (result) {
        this.addSubRequest(result.deviceModel, result.count);
      }
    });
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
