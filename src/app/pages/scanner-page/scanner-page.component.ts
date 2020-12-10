import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
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

  /**
   * Get scanner view
   */
  @ViewChild('scanner', { static: true })
  scanner: ZXingScannerComponent;

  /**
   * All the cameras available to select from
   */
  camerasAvailable = []

  /**
   * Camera Selector Formgroup
   */
  cameraSelectorGroup: FormGroup;




  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.cameraSelectorGroup = this.formBuilder.group({
      'cameraselector': ['Loading...', Validators.required]
    })
  }

  /**
   * NgOnInit
   * 
   * - also listen for camera device changes
   */
  ngOnInit(): void {
    this.scanner.deviceChange.subscribe(device => {
      this.cameraSelectorGroup.get('cameraselector').setValue(device.label);
    })
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
    this.scanner.enable = false;
    const dialogRef = this.dialog.open(ItemDisplayModalComponent, {
      width: '650px',
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.scanner.enable = true;
    });
  }

  /**
   * Makes found cameras selectable
   * 
   * @param Cameras
   */
  camerasFound(cameras: any[]) {
    this.camerasAvailable = cameras;
    console.log(JSON.stringify(cameras))
  }


  /**
   * Change camera which should be active
   * @param $event camera to activate
   */
  changeCamera(changeEvent: any) {
    console.log(changeEvent)
    let cameraToSet = this.camerasAvailable.filter(singleCamera => changeEvent.source.value === singleCamera.label)
    console.log(cameraToSet)
    if (cameraToSet[0]) {
      this.scanner.device = cameraToSet[0];
    }
  }

}
