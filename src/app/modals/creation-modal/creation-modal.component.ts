import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/models/Item';
import { ItemOwnership } from 'src/app/models/ItemOwnership';
import { UserRoles } from 'src/app/models/UserRoles';

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
   * Creates Creation Modal
   * @param formBuilder
   * @param dialogRef 
   */
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreationModalComponent>
  ) {
    this.simpleCreationForm = this.formBuilder.group({
      name: ['', Validators.required],
      internalName: ['', Validators.required],
      description: [''],
      allowedToReserve: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }


  /**
   * Collects the item data
   */
  collectItemData(): Item {
    let item = {
      name: this.simpleCreationForm.get('name').value || '',
      internalName: this.simpleCreationForm.get('internalName').value || '',
      description: this.simpleCreationForm.get('description').value || '',
      requiredRolesToReserve: [this.simpleCreationForm.get('allowedToReserve').value] || ['ADMIn'],
      ownership: this.simpleCreationForm.get('allowedToReserve').value || '',
    }

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
