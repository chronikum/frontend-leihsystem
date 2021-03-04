import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceModel } from 'src/app/models/DeviceModel';
import { GeneralServerResponse } from 'src/app/models/GeneralServerResponse';
import { Item } from 'src/app/models/Item';
import { ItemOwnership } from 'src/app/models/ItemOwnership';
import { UserRoles } from 'src/app/models/UserRoles';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-creation-modal',
  templateUrl: './creation-modal.component.html',
  styleUrls: ['./creation-modal.component.scss']
})
export class CreationModalComponent implements OnInit {

  /**
   * simple creation form
   */
  simpleCreationForm: FormGroup;
  /**
   * If the extended form should be displayed
   */
  showAdvancedForm: boolean = false;

  /**
   * Determines if editing mode is active
   */
  editingMode: boolean = false;

  /**
   * Injected item data of the item which is being edited
   * holds the item id - very important
   */
  itemBeingEdited: Item;

  /**
   * Submit button text
   */
  submitButtonText = '';

  /**
   * Available ownerships
   */
  ownerships: ItemOwnership[] = [
    ItemOwnership.GROUP,
    ItemOwnership.USER,
    ItemOwnership.UNKNOWN
  ];

  /**
   * Allowed to reserve
   */
  allowedToReserve: UserRoles[] = [
    UserRoles.ADMIN,
    UserRoles.USER
  ];

  /**
   * All device models
   */
  allDeviceModels: DeviceModel[];

  /**
   * Creates Creation Modal
   * @param formBuilder
   * @param dialogRef 
   * 
   * @param {item: Item, editingMode: boolean}
   * - the editingmode determines the mode of the modal
   */
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreationModalComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item, editingMode: boolean }
  ) {
    // Load all device models
    this.loadDeviceModels();

    this.editingMode = data?.editingMode || false;
    if (this.editingMode) {
      this.itemBeingEdited = data?.item;
      console.log(this.itemBeingEdited)
      this.simpleCreationForm = this.formBuilder.group({
        name: [data.item.name, Validators.required],
        internalName: [data.item.internalName, Validators.required],
        description: [data.item.description || ''],
        caIdentifier: [data.item.caIdentifier || '', Validators.required],
        allowedToReserve: [data.item.requiredRolesToReserve[0], Validators.required], // TODO: Multiple roles can be allowed thanks to technical implementation
        managed: [data.item.managed || false]
      });

      this.submitButtonText = "Update"
    } else {
      this.simpleCreationForm = this.formBuilder.group({
        name: ['', Validators.required],
        internalName: ['', Validators.required],
        description: [''],
        caIdentifier: ['', Validators.required],
        allowedToReserve: ['', Validators.required],
        managed: [false],
      });

      this.submitButtonText = "Erstellen"
    }
  }

  /**
   * Gets all device models in the table
   * TODO: check if needs to be awaited or in ngoninit
   */
  loadDeviceModels() {
    this.apiService.getAllModels$().subscribe(response => {
      console.log(response);
      this.allDeviceModels = response.deviceModels;
    })
  }

  ngOnInit(): void {

  }


  /**
   * Collects the item data
   * 
   * - adds the itemid if in editing mode
   */
  collectItemData(): Item {
    let item: Item = {
      name: this.simpleCreationForm.get('name').value || '',
      internalName: this.simpleCreationForm.get('internalName').value || '',
      description: this.simpleCreationForm.get('description').value || '',
      requiredRolesToReserve: [this.simpleCreationForm.get('allowedToReserve').value] || ['ADMIN'],
      ownership: this.simpleCreationForm.get('allowedToReserve').value || '',
      caIdentifier: this.simpleCreationForm.get('caIdentifier').value || '',
      managed: this.simpleCreationForm.get('managed').value || false,
    } as any

    if (this.editingMode) {
      item.itemId = this.itemBeingEdited.itemId;
    }

    console.log('item' + item)
    return item as any;
  }

  /**
   * Create the item - submit the form
   * 
   * @pipes true and the item data
   */
  createAction() {
    this.dialogRef.close(this.collectItemData());
  }

  /**
   * Close the modal, abort item creation
   */
  cancelAction() {
    this.dialogRef.close(false);
  }
}
