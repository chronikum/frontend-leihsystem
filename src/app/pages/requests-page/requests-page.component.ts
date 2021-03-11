import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReviewReservationRequestModalComponent } from 'src/app/modals/review-reservation-request-modal/review-reservation-request-modal.component';
import { Item } from 'src/app/models/Item';
import { Reservation } from 'src/app/models/Reservation';

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
  ) { }

  ngOnInit(): void {
  }

  /**
   * Review the reservation request selected
   */
  reviewReservationRequest() {
    const selectedReservationRequest = this.selection.selected[0];
    if (selectedReservationRequest) {
      const dialogRef = this.dialog.open(ReviewReservationRequestModalComponent, {
        width: '80%',
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
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
