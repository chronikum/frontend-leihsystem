import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/models/Item';

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
   * enable item edit button
   */
  @Input() enableEditButton = false;

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

  /**
   * Edit Item Button Action
   */
  @Output() editItemButtonAction = new EventEmitter<any>();


  /**
   * USER PAGE
   */

  /**
   * Determinates if user page buttons should be shown
   */
  @Input() showUserPageButtons: boolean = false;

  /**
   * Determinates if user page buttons should be disabled
   */
  @Input() disableUserPageButtons: boolean = true;

  /**
   * The change password action button action
   */
  @Output() changePasswordAction = new EventEmitter<any>();

  /**
   * The edit user profile button action
   */
  @Output() editUserProfile = new EventEmitter<any>();

  /**
   * Items as reference for reserve button
   */
  @Input() selectedItems: Item[]

  constructor() { }

  ngOnInit(): void {
  }

}
