import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FinishReservationModalComponent } from 'src/app/modals/finish-reservation-modal/finish-reservation-modal.component';
import { ReservationDetailModalComponent } from 'src/app/modals/reservation-detail-modal/reservation-detail-modal.component';
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

  constructor(
    private dialog: MatDialog,
  ) { }

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
    const dialogRef = this.dialog.open(ReservationDetailModalComponent, {
      width: '950px',
      data: { reservation: this.selection.selected[0] }
    });

    dialogRef.afterClosed().subscribe(async result => {

    });
  }

  /**
   * End the reservation and mark it as finished
   */
  endReservation() {
    const dialogRef = this.dialog.open(FinishReservationModalComponent, {
      width: '650px',
      data: { reservation: this.selection.selected[0] }
    });

    dialogRef.afterClosed().subscribe(async result => {

    });
  }

}
