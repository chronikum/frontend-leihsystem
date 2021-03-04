import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceModelCreationModalComponent } from 'src/app/modals/device-model-creation-modal/device-model-creation-modal.component';
import { DeviceModel } from 'src/app/models/DeviceModel';

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

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Create a new model
   */
  createModel() {
    console.log("Open")
    const dialogRef = this.dialog.open(DeviceModelCreationModalComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe(async (result: DeviceModel) => {
      console.log(result);
      // if (result.name) {
      //   this.apiService.createItem$(result).subscribe(itemCreated => {
      //     if (itemCreated.success) {
      //       this.refreshActionStream.next(true)
      //     }
      //   })
      // }
    });
  }

  /**
   * Edit an model
   */
  editAction() {
    console.log("edit")
    const deviceModel = this.selection.selected[0];
  }

  /**
   * Selection of the table is being changed
   * 
   */
  selectionChange(selection: SelectionModel<DeviceModel>) {
    this.selection = selection;
  }

}
