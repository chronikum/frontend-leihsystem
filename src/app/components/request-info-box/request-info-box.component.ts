import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Request } from 'src/app/models/Request';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-request-info-box',
  templateUrl: './request-info-box.component.html',
  styleUrls: ['./request-info-box.component.scss']
})
export class RequestInfoBoxComponent implements OnInit {

  @Input() request: Request;

  /**
   * User requesting reservation
   */
  requestingUser: User;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getRequestingUserInformation();
  }

  /**
   * Get information about user reqeusting and set it to the controller
   */
  getRequestingUserInformation() {
    this.apiService.getUserInformationForId$(this.request.userCreated).subscribe(generalResponse => {
      this.requestingUser = generalResponse?.user;
    })
  }

  /**
   * Will return Komplex string if the request has subrequests
   */
  getSimpleOrComplex() {
    return (this.request?.subRequest[0] || false) ? 'Komplex' : 'Einfach';
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
  timeUntilStart() {
    moment.locale('de')
    let relativeStartingTime = moment.unix((this.request.startDate / 1000)).fromNow();
    return relativeStartingTime;
  }

}
