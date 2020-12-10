import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemDisplayModalComponent } from 'src/app/modals/item-display-modal/item-display-modal.component';
import { GeneralServerResponse } from 'src/app/models/GeneralServerResponse';
import { Item } from 'src/app/models/Item';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-scanner-page',
  templateUrl: './scanner-page.component.html',
  styleUrls: ['./scanner-page.component.scss']
})
export class ScannerPageComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Scan received handler
   */
  scanSuccessHandler($event) {
    console.log("QR scanned: " + $event);
    this.displayScannedItem($event);

  }


  /**
   * Load and display scanned item
   * - opens the item display information modal
   * 
   * @param uniqueItemIdentifier string
   */
  async displayScannedItem(itemIdentifier: string) {
    this.apiService.getItembyUniqueIdentifier$(itemIdentifier).subscribe((generalServerResponse: GeneralServerResponse) => {
      let item = generalServerResponse.items[0];
      this.openItemDisplayInformation(item);
    })
  }

  /**
   * Open item display information
   * 
   * @param Item
   */
  openItemDisplayInformation(item: Item) {
    const dialogRef = this.dialog.open(ItemDisplayModalComponent, {
      width: '650px',
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe();
  }

}
