import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/Item';
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

  /**
   * Suggested items
   */
  suggestedItems = new EventEmitter<Item[]>();

  constructor(
    private dialog: MatDialogRef<ReviewReservationRequestModalComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { request: Request }) {
    this.reservationRequest = data?.request;
    this.getSuggestion();
  }

  ngOnInit(): void {
  }

  /**
   * Gets a suggestion from the server and fire a subscriber pointing to the table
   */
  getSuggestion() {
    this.apiService.getDevicesForTimespan$(this.reservationRequest).subscribe(response => {
      let items = response.items;
      this.suggestedItems.next(items);
    })
  }

  /**
   * Closes the modal
   */
  closeAction() {
    this.dialog.close();
  }

}
