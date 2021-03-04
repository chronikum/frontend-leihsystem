import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Create a new model
   */
  createModel() {

  }

  /**
   * Edit an model
   */
  editAction() {
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
