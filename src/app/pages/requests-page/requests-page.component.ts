import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReviewReservationRequestModalComponent } from 'src/app/modals/review-reservation-request-modal/review-reservation-request-modal.component';
import { Request } from 'src/app/models/Request';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.scss']
})
export class RequestsPageComponent implements OnInit {

  /**
   * Holds the current selection information
   */
  selection = new SelectionModel<Request>();

  /**
   * Refresh action stream
   */
  refreshActionStream = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Review the reservation request selected
   * 
   * - opens the dialog with the reservation
   */
  reviewReservationRequest() {
    const selectedReservationRequest = this.selection.selected[0];
    if (selectedReservationRequest) {
      const dialogRef = this.dialog.open(ReviewReservationRequestModalComponent, {
        width: '80%',
        data: {
          request: selectedReservationRequest,
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result?.reservation && result.items) { // User accepted reservation, submit it now
          this.apiService.createReservation$(result.reservation, result.items).subscribe(reservationCreated => {
            console.log("Created reservation! Accpet request now.")
            this.apiService.acceptRequest$(selectedReservationRequest).subscribe(ok => {
              console.log("Accepted request. It will not be displayed afterwards");
              this.refreshActionStream.next(true);
            })
          })
        }
      });
    }
  }

  /**
   * Selection of the table is being changed
   * 
   * @param SelectionModel<Item> the current selection of the table
   */
  selectionChange(selection: SelectionModel<Request>) {
    this.selection = selection;
  }


}
