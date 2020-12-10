import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-item-display-modal',
  templateUrl: './item-display-modal.component.html',
  styleUrls: ['./item-display-modal.component.scss']
})
export class ItemDisplayModalComponent implements OnInit {

  /**
   * The item which we want to display
   */
  item: Item;

  constructor(
    public dialogRef: MatDialogRef<ItemDisplayModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item }
  ) {
    this.item = data?.item;
  }

  ngOnInit(): void {

  }


  /**
   * Close the modal
   */
  closeAction() {
    this.dialogRef.close();
  }

}
