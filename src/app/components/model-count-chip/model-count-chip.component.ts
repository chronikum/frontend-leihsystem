import { Component, Input, OnInit } from '@angular/core';
import { DeviceModel } from 'src/app/models/DeviceModel';

/**
 * Displays the count and the device name. Offers the option to delete a SubRequest from the mat chip list
 */
@Component({
  selector: 'app-model-count-chip',
  templateUrl: './model-count-chip.component.html',
  styleUrls: ['./model-count-chip.component.scss']
})
export class ModelCountChipComponent implements OnInit {

  constructor() { }

  /**
   * The device model selected
   */
  @Input() deviceModel: DeviceModel;

  /**
   * Count of devices
   */
  @Input() deviceCount: number;

  ngOnInit(): void {
  }

}
