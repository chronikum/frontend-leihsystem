import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
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
   * Determines if completed should be shown
   */
  @Input() showCompleted: boolean = false;

  /**
   * Determines if completed reservations should be shown
   */
  @Input() showCompletedReservationsEmitter = new EventEmitter<boolean>();

  /**
   * Show completed reservations model
   */
  showCompletedReservations: boolean = false;

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
      this.refreshActionStream.next(true);
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
      this.refreshActionStream.next(true);
    });
  }


  /**
   * Triggered if value of checkbox changes
   * 
   * - Determines if completed reservations should be shown
   */
  valueChange() {
    this.showCompletedReservationsEmitter.next(this.showCompleted)
  }

}
