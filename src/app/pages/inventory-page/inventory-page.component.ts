import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { CreationModalComponent } from 'src/app/modals/creation-modal/creation-modal.component';
import { QrcodeModalComponent } from 'src/app/modals/qrcode-modal/qrcode-modal.component';
import { ReserveModalComponent } from 'src/app/modals/reserve-modal/reserve-modal.component';
import { Item } from 'src/app/models/Item';
import { Reservation } from 'src/app/models/Reservation';
import { ApiService } from 'src/app/services/api.service';

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

  /**
   * Refresh action stream
   */
  refreshActionStream = new EventEmitter<any>();

  /**
   * Items which should 
   */
  displayItems?: string[];

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
  ) { }

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
    const dialogRef = this.dialog.open(CreationModalComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe(async (result: Item) => {
      console.log(result);
      if (result.name) {
        this.apiService.createItem$(result).subscribe(itemCreated => {
          if (itemCreated.success) {
            this.refreshActionStream.next(true)
          }
        })
      }
    });
  }

  /**
   * Edit an existing item
   * - Button action
   */
  editExistingItem() {
    let reservationItem = Array.from(this.selection.selected || []) as Item[];

    const dialogRef = this.dialog.open(CreationModalComponent, {
      width: '650px',
      data: { item: reservationItem[0], editingMode: true }
    });

    dialogRef.afterClosed().subscribe(async (result: Item) => {
      console.log(result);
      if (result.name) {
        this.apiService.updateItem$(result).subscribe(itemCreated => {
          this.refreshActionStream.next(true)
        })
      }
    });
  }

  /**
   * Show the qr code modal
   * 
   * @param Item the item selected
   */
  showQRCodeModal(item: Item) {
    let reservationItems = Array.from(this.selection.selected || []) as Item[];
    const dialogRef = this.dialog.open(QrcodeModalComponent, {
      width: '300px',
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe();
  }

  /**
   * Opens the reservation modal for the items
   */
  reserveItems() {
    let reservationItems = Array.from(this.selection.selected || []) as Item[];
    const dialogRef = this.dialog.open(ReserveModalComponent, {
      width: '650px',
      data: { items: reservationItems }
    });

    dialogRef.afterClosed().subscribe(async (reservation: Reservation) => {
      if (reservation?.reservationName) {
        this.apiService.createReservation$(reservation, reservationItems).subscribe(x => {
          console.log(x);
        });
      }
    });
  }

  /**
   * Deletes the currently selected items
   * - takes the selection of the table
   * - deletes the selected items after confirmation
   */
  deleteItems() {
    console.log("Open dialog")
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '650px',
      data: { message: "Die ausgewählten Geräte werden unwiderruflich gelöscht.", critical: true }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        let itemsToDelete = Array.from(this.selection.selected || []) as Item[];
        this.apiService.deleteItems$(itemsToDelete).subscribe(response => {
          if (response.success) {
            console.log("Deleted items");
            this.apiService.debugSnackBar("ITEMS DELETED");
            this.refreshActionStream.next(true)
          } else {
            // TODO: You do not have permission popup
            console.log("Failed to delete items")
          }
        });
      }
    });
  }
}
