import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reservation-button-group',
  templateUrl: './reservation-button-group.component.html',
  styleUrls: ['./reservation-button-group.component.scss']
})
export class ReservationButtonGroupComponent implements OnInit {

  /**
   * Allocate reservation
   */
  @Output() showReservationDetail = new EventEmitter<any>();

  /**
   * Deny reservation
   */
  @Output() endReservation = new EventEmitter<any>();

  /**
   * Add comment to reservation
   */
  @Output() addCommentToReservation = new EventEmitter<any>();

  /**
   * Show reservation basic actions
   * - allocate Reservation
   * - deny Reservation
   * - add Comment to reservation
   */
  @Input() showBasicActions: boolean;

  /**
   * Enable basic action buttons
   */
  @Input() enableReservation: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
