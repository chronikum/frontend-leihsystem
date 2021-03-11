import { Component, Input, OnInit } from '@angular/core';
import { EventEmitter } from 'events';
import { DeviceModel } from 'src/app/models/DeviceModel';
import { SubRequest } from 'src/app/models/SubRequest';

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
  @Input() subRequest: SubRequest;

  /**
   * Delete listener
   */
  @Input() deleteListener: EventEmitter;

  ngOnInit(): void {
  }

  /**
   * Delete the request
   */
  deleteRequest() {
    this.deleteListener.emit(this.subRequest as any);
  }

}
