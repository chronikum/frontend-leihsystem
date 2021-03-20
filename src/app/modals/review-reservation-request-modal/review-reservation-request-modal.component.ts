import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Request } from 'src/app/models/Request';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-review-reservation-request-modal',
  templateUrl: './review-reservation-request-modal.component.html',
  styleUrls: ['./review-reservation-request-modal.component.scss']
})
export class ReviewReservationRequestModalComponent implements OnInit {


  /**
   * The reservation request
   */
  reservationRequest: Request;

  constructor(
    private dialog: MatDialogRef<ReviewReservationRequestModalComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { request: Request }) {
    this.reservationRequest = data?.request;
  }

  ngOnInit(): void {
  }

  /**
   * Gets a suggestion from the server
   */
  getSuggestion() {
    this.apiService.getReservationSuggestion$(this.reservationRequest).subscribe(result => {
      // let reservation = result.reservation;
      console.log(result)
    });
    this.apiService.getDevicesForTimespan$(this.reservationRequest).subscribe(response => {
      let items = response.items;
    })
  }

  /**
   * Closes the modal
   */
  closeAction() {
    this.dialog.close();
  }

}
