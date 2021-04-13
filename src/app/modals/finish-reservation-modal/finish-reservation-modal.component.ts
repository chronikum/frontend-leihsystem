import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reservation } from 'src/app/models/Reservation';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-finish-reservation-modal',
  templateUrl: './finish-reservation-modal.component.html',
  styleUrls: ['./finish-reservation-modal.component.scss']
})
export class FinishReservationModalComponent implements OnInit {

  /**
   * Reservation which is being controlled
   */
  reservation: Reservation;

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<FinishReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reservation: Reservation }
  ) {
    this.reservation = data.reservation;
  }

  ngOnInit(): void {
  }

  /**
   * Will set reservation as finished by setting completed to true
   */
  finishReservation() {
    let dateNow = Date.now();
    let updatedReservation = this.reservation;
    updatedReservation.completed = true;
    this.apiService.finishReservation$(updatedReservation).subscribe(result => {
      console.log(result);
      this.dialogRef.close();
    })
  }

  /**
   * Cancel
   */
  cancel() {
    this.dialogRef.close();
  }

}
