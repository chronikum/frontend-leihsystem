import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Reservation } from 'src/app/models/Reservation';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reservation-information',
  templateUrl: './reservation-information.component.html',
  styleUrls: ['./reservation-information.component.scss']
})
export class ReservationInformationComponent implements OnInit {

  /**
   * Reservation
   */
  @Input() reservation: Reservation;

  /**
   * The reservation user
   */
  reservationUser: User;

  constructor(
    private apiService: ApiService,
  ) {
  }

  /**
   * Get information about user reqeusting and set it to the controller
   */
  getRequestingUserInformation() {
    this.apiService.getUserInformationForId$(parseInt(this.reservation.responsible)).subscribe(generalResponse => {
      this.reservationUser = generalResponse?.user;
    })
  }

  /**
   * ngOnInit
   * 
   * Get user responsible for the reservation
   */
  ngOnInit(): void {
    this.getRequestingUserInformation();
  }

  /**
   * Parses date
   */
  parseDate(number: number): string {
    if (number) {
      return new Date(number).toLocaleDateString() + ' um ' + new Date(number).toLocaleTimeString();
    }
    return '-'
  }

  /**
   * Relative time until reservation will start
   */
  timeUntilEnd() {
    moment.locale('de')
    let relativeStartingTime = moment.unix((this.reservation.plannedEndDate / 1000)).fromNow();
    return relativeStartingTime;
  }

}
