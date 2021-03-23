import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-condition-view',
  templateUrl: './condition-view.component.html',
  styleUrls: ['./condition-view.component.scss']
})
export class ConditionViewComponent implements OnInit {

  /**
   * Determines if the condition is prefilled
   */
  @Input() fulfilledUpdater: EventEmitter<boolean[]>;

  /**
   * Determines if the condition is prefilled
   */
  fulFilled: boolean = false;

  /**
   * Indexer
   */
  @Input() indexer: number = -1;

  /**
   * The text to display in the condition view
   */
  @Input() text: string = '';

  constructor() { }

  ngOnInit(): void {
    // Set updater to get a special index from the boolean condition array
    this.fulfilledUpdater.subscribe(fulFilled => {
      console.log("Update!");
      this.fulFilled = (fulFilled[this.indexer] || false)
    })
  }

}
