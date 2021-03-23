import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reservation } from 'src/app/models/Reservation';
@Component({
  selector: 'app-reservation-detail-modal',
  templateUrl: './reservation-detail-modal.component.html',
  styleUrls: ['./reservation-detail-modal.component.scss']
})
export class ReservationDetailModalComponent implements OnInit {

  /**
   * The current reservation
   */
  reservation: Reservation;

  constructor(
    public dialogRef: MatDialogRef<ReservationDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reservation: Reservation }
  ) {
    console.log(this.reservation)
    this.reservation = data.reservation;
  }

  ngOnInit(): void {
  }

}
