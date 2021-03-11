import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { WarningModalComponent } from 'src/app/modals/warning-modal/warning-modal.component';
import { Request } from 'src/app/models/Request';
import { SubRequest } from 'src/app/models/SubRequest';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-requestion-page',
  templateUrl: './requestion-page.component.html',
  styleUrls: ['./requestion-page.component.scss']
})
export class RequestionPageComponent implements OnInit {

  /**
   * Request form
   */
  requestForm: FormGroup;

  /**
   * Count of devices requested
   */
  countOfDevices: number;

  /**
   * Subrequests
   */
  subRequests: SubRequest[] = [];

  /**
   * Subrequest Updater
   */
  subRequestUpdateEmitter = new EventEmitter<SubRequest[]>();


  /**
   * Constructs a new instance of RequestionPage and builts the form requestForm
   */
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.requestForm = formBuilder.group({
      advancedSelection: ['', ''],
      deviceAmount: [''],
      start: [null, Validators.required],
      end: [null, Validators.required],
      startDateTime: ['', Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)],
      endDateTime: ['', Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)],
      notes: [''],
    })
  }

  /**
   * Subscribes to the subRequestUpdateEmitter
   */
  ngOnInit(): void {
    this.subRequestUpdateEmitter.subscribe(updated => this.updateSubrequests(updated));
  }

  /**
   * Will update the components property with the given
   * @param subrequest[] array
   */
  updateSubrequests(updatedSubRequests: SubRequest[]) {
    console.log(updatedSubRequests);
    this.subRequests = updatedSubRequests;
  }

  /**
   * Submits the final request to the system.
   * Checks if the request is valid and if it is
   * user will be asked to confirm their order.
   */
  submitRequest() {
    if (!this.reservationRequestIsValid()) {
      this.showRequestIsEmptyWarning();
    } else {
      this.confirmReservationRequestAndSubmit();
    }
  }

  /**
   * The summary of the reservation request
   * @returns string which sums the reservation request up
   */
  reservationRequestSummary() {
    return "Ich bestätige, dass ich die ausgewählten Geräte zu der ausgewählten Zeit anfragen will.";
  }

  /**
   * User needs to confirm their reservation request
   */
  confirmReservationRequestAndSubmit() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '650px',
      data: { message: this.reservationRequestSummary() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const request = this.buildReservationRequest();
        this.submitRequestToBackend(request);
      }
    });
  }

  /**
   * Buid reservation request
   */
  buildReservationRequest(): Request {
    let reservationRequest: Request = {
      startDate: this.createDatetimeOfDayTime((Date.parse((this.requestForm.get('start').value))), this.requestForm.get('startDateTime').value),
      plannedEndDate: this.createDatetimeOfDayTime((Date.parse((this.requestForm.get('end').value))), this.requestForm.get('endDateTime').value),
    }
    const mode = this.requestForm.get('advancedSelection').value;
    switch (mode) {
      case 'simple':
        reservationRequest.deviceCount = this.requestForm.get('deviceAmount').value;
        break;
      case 'advanced':
        reservationRequest.subRequest = this.subRequests;
        break;
    }

    console.log(reservationRequest);
    return reservationRequest;
  }

  /**
   * Sending the request to the backend
   */
  submitRequestToBackend(reservationRequest: Request) {
    this.apiService.createNewRequest$(reservationRequest).subscribe(result => {
      this.snackBar.open("Ihre Reservierungsanfrage wurde erstellt.", 'Erfolg', {
        duration: 6000
      });
      this.router.navigate(['dashboard']);
    });
  }




  /**
   * Check if the current reservation request is valid
   * (means, there are either subrequests or an deviceAmount is given)
   */
  reservationRequestIsValid(): boolean {
    const mode = this.requestForm.get('advancedSelection').value;
    switch (mode) {
      case 'simple':
        return (this.requestForm.get('deviceAmount').value != 0);
      case 'advanced':
        return (this.subRequests.length !== 0);
    }
    return false;
  }
  /**
   * Request is empty - warning
   */
  showRequestIsEmptyWarning() {
    const dialogRef = this.dialog.open(WarningModalComponent, {
      width: '650px',
      data: { message: "Die Reservierungsanfrage enthält keine Geräte." }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  /**
   * Converts a HH:MM in a second format (unix)
   * 
   * @returns day time
   */
  createDatetimeOfDayTime(date_time: number, day_time: string): number {
    let separate = day_time.split(":");
    let day_seconds = (parseInt(separate[0]) * 3600000);
    let minute_seconds = (parseInt(separate[1]) * 60000);
    console.log("Calculated time:" + (day_seconds + minute_seconds));
    console.log("Calculated date time:" + date_time);

    // Add the calculated time parts together and subtract a hour, if we have winter time.
    return (((day_seconds + minute_seconds) + date_time));
  }

}
