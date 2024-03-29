import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/Item';
import { Reservation } from 'src/app/models/Reservation';

@Component({
  selector: 'app-reserve-modal',
  templateUrl: './reserve-modal.component.html',
  styleUrls: ['./reserve-modal.component.scss'],
})
export class ReserveModalComponent implements OnInit {

  /**
   * simple reservation form
   */
  simpleReservationForm: FormGroup;

  /**
   * Items which will be reserved
   */
  items: Item[];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ReserveModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { items: Item[] }) {

    this.items = data.items;
    this.simpleReservationForm = this.simpleReservationForm = this.formBuilder.group({
      reservationName: ['', Validators.required],
      start: [null, Validators.required],
      end: [null, Validators.required],
      startDateTime: ['', [Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/), Validators.required]],
      endDateTime: ['', [Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/), Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  /**
   * Get Reservation
   */
  getReservation(): Reservation {

    // Item Ids to fill in
    const itemIds = this.items.map((item) => item.itemId);
    if (itemIds &&
      (this.simpleReservationForm.get('reservationName').value.length > 4) &&
      this.simpleReservationForm.get('startDateTime').valid &&
      this.simpleReservationForm.get('endDateTime').valid
    ) {
      let reservation: Reservation = {
        itemIds: itemIds,
        reservationName: this.simpleReservationForm.get('reservationName').value,
        startDate: this.createDatetimeOfDayTime((Date.parse((this.simpleReservationForm.get('start').value))), this.simpleReservationForm.get('startDateTime').value),
        plannedEndDate: this.createDatetimeOfDayTime((Date.parse((this.simpleReservationForm.get('end').value))), this.simpleReservationForm.get('endDateTime').value),
      } as any
      return reservation
    } else {
      return false as any;
    }
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

  /**
   * Create date
   * 
   * @returns number unix date
   * @param day day in seconds (unix)
   * @param date_time time of day in seconds (unix)
   */
  createDate(day: number, date_time: number): number {
    let generatedDate = day + date_time;
    return generatedDate;
  }

  /**
   * Create reservation and close dialog
   */
  createReservation() {
    let reservation: Reservation = this.getReservation();
    this.dialogRef.close(reservation);
  }

  /**
   * Validates reservation
   */
  reservationValid(): boolean {
    return ((this.simpleReservationForm.get('reservationName').value.length > 4) &&
      this.simpleReservationForm.get('startDateTime').valid &&
      this.simpleReservationForm.get('endDateTime').valid);
  }

  /**
   * Cancels modal
   */
  cancelModal() {
    this.dialogRef.close(null);
  }

}
