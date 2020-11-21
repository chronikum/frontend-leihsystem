import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.scss']
})
export class InventoryPageComponent implements OnInit {

  /**
   * Holds the current selection information
   */
  selection = new SelectionModel<Item>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * Selection of the table is being changed
   * 
   * @param SelectionModel<Item> the current selection of the table
   */
  selectionChange(selection: SelectionModel<Item>) {
    this.selection = selection;
  }

  /**
   * Create new item
   * - Button action
   */
  createNewItem() {

  }

  /**
   * Deletes the currently selected items
   * - takes the selection of the table
   * - deletes the selected items after confirmation
   */
  deleteItems() {
    console.log("Open dialog")
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '250px',
      data: { message: "The selected items will be deleted. Please confirm this action", critical: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
