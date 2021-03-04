import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceModel } from 'src/app/models/DeviceModel';

@Component({
  selector: 'app-device-model-creation-modal',
  templateUrl: './device-model-creation-modal.component.html',
  styleUrls: ['./device-model-creation-modal.component.scss']
})
export class DeviceModelCreationModalComponent implements OnInit {

  /**
   * Device Modal Form
   */
  deviceModalForm: FormGroup;

  /**
   * Current deviceModel
   * 
   * - If editing mode is enabled we need to keep track of hidden properties of the DeviceModel.
   */
  deviceModelBeingEdited?: DeviceModel;


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DeviceModelCreationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { deviceModel: DeviceModel }
  ) {
    if (data?.deviceModel) {
      this.deviceModelBeingEdited = data.deviceModel;
    }

    this.deviceModalForm = this.formBuilder.group({
      displayName: [this.deviceModelBeingEdited?.displayName || '', Validators.required],
      description: [this.deviceModelBeingEdited?.description || '', Validators.required],
      capabilities: [this.deviceModelBeingEdited?.capabilities || '', Validators.required],
      defaultDeviceValue: [this.deviceModelBeingEdited?.defaultDeviceValue || ''],
    });
  }

  ngOnInit(): void {
  }

  cancelAction() {

  }

  createAction() {

  }

}
