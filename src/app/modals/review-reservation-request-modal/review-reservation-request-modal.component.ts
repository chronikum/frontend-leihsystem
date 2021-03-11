import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-review-reservation-request-modal',
  templateUrl: './review-reservation-request-modal.component.html',
  styleUrls: ['./review-reservation-request-modal.component.scss']
})
export class ReviewReservationRequestModalComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<ReviewReservationRequestModalComponent>
  ) { }

  ngOnInit(): void {
  }

  /**
   * Closes the modal
   */
  closeAction() {
    this.dialog.close();
  }

}
