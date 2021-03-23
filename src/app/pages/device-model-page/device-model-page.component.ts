import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceModelCreationModalComponent } from 'src/app/modals/device-model-creation-modal/device-model-creation-modal.component';
import { DeviceModel } from 'src/app/models/DeviceModel';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-device-model-page',
  templateUrl: './device-model-page.component.html',
  styleUrls: ['./device-model-page.component.scss']
})
export class DeviceModelPageComponent implements OnInit {

  /**
   * Holds the current selection information
   */
  selection = new SelectionModel<DeviceModel>();

  /**
   * Refresh action stream
   */
  refreshActionStream = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Create a new model
   */
  createModel() {
    const dialogRef = this.dialog.open(DeviceModelCreationModalComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe(async (result: DeviceModel) => {
      console.log(result);
      if (result?.displayName) {
        this.apiService.createModel$(result).subscribe(itemCreated => {
          if (itemCreated) {
            this.refreshActionStream.next(true)
          }
        })
      }
    });
  }

  /**
   * Edit an model
   */
  editAction() {
    console.log("edit")
    const deviceModel = this.selection.selected[0];

    const dialogRef = this.dialog.open(DeviceModelCreationModalComponent, {
      width: '650px',
      data: { deviceModel }
    });

    dialogRef.afterClosed().subscribe(async (result: DeviceModel) => {
      console.log(result);
      if (result?.displayName) {
        this.apiService.editModel$(result).subscribe(itemCreated => {
          if (itemCreated) {
            this.refreshActionStream.next(true)
          }
        })
      }
    });
  }

  /**
   * Selection of the table is being changed
   * 
   */
  selectionChange(selection: SelectionModel<DeviceModel>) {
    this.selection = selection;
  }

}
