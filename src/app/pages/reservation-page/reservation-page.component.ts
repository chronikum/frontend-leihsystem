import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/Reservation';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss']
})
export class ReservationPageComponent implements OnInit {

  /**
   * Holds the current selection information
   */
  selection = new SelectionModel<Reservation>();

  /**
   * Refresh action stream
   */
  refreshActionStream = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
  * Selection of the table is being changed
  * 
  * @param SelectionModel<Item> the current selection of the table
  */
  selectionChange(selection: SelectionModel<Reservation>) {
    this.selection = selection;
  }

  /**
   * Show reservation details
   */
  showReservationsDetail() {

  }

  /**
   * End the reservation and mark it as finished
   */
  endReservation() {

  }

}
