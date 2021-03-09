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
   * Constructs a new instance of ModelCountRequestModalComponent and builts the form used later on
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

  /**
   * Load device models
   */
  ngOnInit(): void {
    this.loadDeviceModels();
  }

  /**
   * This text sums up the device selection and count
   */
  getSubmissionText(): string {
    if (this.deviceCountForm?.get('deviceCount').value && this.currentSelection.selected[0]?.displayName) {
      return `Diese Anfrage fügt Ihrer Reservierungsanfrage ${this.deviceCountForm.get('deviceCount').value || '-'} Geräte der Geräteart ${this.currentSelection.selected[0].displayName} hinzu. Wollen Sie dies bestätigen?`;
    } else {
      return 'Bitte geben Sie alle notwendigen Daten an.';
    }
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

  /**
   * Cancels the modal
   */
  cancelAction() {
    this.dialogRef.close();
  }

  /**
   * Creates the requests and closes the modal with it as argument
   */
  addRequest() {

  }

  /**
   * Stepper
   */

  /**
   * Go back
   */
  goBack(stepper: MatStepper) {
    this.stepperCompleted = false;
    stepper.previous();
  }

  /**
   * Go forward
   */
  goForward(stepper: MatStepper) {
    this.stepperCompleted = false;
    stepper.next();
  }
}
