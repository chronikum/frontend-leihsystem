import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-button-group',
  templateUrl: './table-button-group.component.html',
  styleUrls: ['./table-button-group.component.scss']
})
export class TableButtonGroupComponent implements OnInit {


  /**
   * If the delete button should be enabled
   */
  @Input() disableDeleteButton = true;

  /**
   * If the reserve button should be enabled
   */
  @Input() disableReserveButton = true;

  /**
   * If the create button should be shown
   */
  @Input() showCreateButton = false;

  /**
   * If the delete button should be shown
   */
  @Input() showDeleteButton = false;

  /**
   * If the reserve button should be shown
   */
  @Input() showReserveButton = false;

  /**
   * The create button action
   */
  @Output() createAction = new EventEmitter<any>();

  /**
   * The delete button action
   */
  @Output() deleteAction = new EventEmitter<any>();

  /**
   * The reserve button action
   */
  @Output() reserveAction = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
