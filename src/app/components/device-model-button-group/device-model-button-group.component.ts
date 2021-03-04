import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-device-model-button-group',
  templateUrl: './device-model-button-group.component.html',
  styleUrls: ['./device-model-button-group.component.scss']
})
export class DeviceModelButtonGroupComponent implements OnInit {

  /**
   * Edit existing device model action emitter
   */
  @Output() editAction = new EventEmitter<any>();

  /**
   * Create new device model action emitter
   */
  @Output() createAction = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
