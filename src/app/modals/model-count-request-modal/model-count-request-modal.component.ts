import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { DeviceModel } from 'src/app/models/DeviceModel';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-model-count-request-modal',
  templateUrl: './model-count-request-modal.component.html',
  styleUrls: ['./model-count-request-modal.component.scss']
})
export class ModelCountRequestModalComponent implements OnInit {

  /**
   * All device models
   */
  allDeviceModels: DeviceModel[];

  /**
   * The model currently selected in the device model table
   */
  currentSelection = new SelectionModel<DeviceModel>();

  /**
   * Stepper completed
   */
  stepperCompleted: boolean = false;

  /**
   * Device Form Group
   */
  deviceCountForm: FormGroup;

  /**
   * Constructs a new instance of ModelCountRequestModalComponent and loads all device models
   */
  constructor(
    private dialogRef: MatDialogRef<ModelCountRequestModalComponent>,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) {
    this.deviceCountForm = this.formBuilder.group({
      deviceCount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadDeviceModels();
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


  cancelAction() {
    this.dialogRef.close();
  }

  addRequest() {

  }

  /**
   * Stepper
   */

  /**
   * Go back
   */
  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  /**
   * Go forward
   */
  goForward(stepper: MatStepper) {
    stepper.next();
  }
}
