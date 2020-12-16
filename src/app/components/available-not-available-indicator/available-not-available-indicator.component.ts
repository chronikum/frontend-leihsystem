import { Component, Input, OnInit } from '@angular/core';


/**
 * Component to describe the availability of the item
 */
@Component({
  selector: 'app-available-not-available-indicator',
  templateUrl: './available-not-available-indicator.component.html',
  styleUrls: ['./available-not-available-indicator.component.scss']
})
export class AvailableNotAvailableIndicatorComponent implements OnInit {

  /**
   * Determines if the item is shown as available
   */
  @Input() available = false;

  constructor() { }

  ngOnInit(): void {
  }

}
