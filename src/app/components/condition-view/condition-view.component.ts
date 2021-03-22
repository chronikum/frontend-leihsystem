import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-condition-view',
  templateUrl: './condition-view.component.html',
  styleUrls: ['./condition-view.component.scss']
})
export class ConditionViewComponent implements OnInit {

  /**
   * Determines if the condition is prefilled
   */
  @Input() fulfilled: boolean = false;

  /**
   * The text to display in the condition view
   */
  @Input() text: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
