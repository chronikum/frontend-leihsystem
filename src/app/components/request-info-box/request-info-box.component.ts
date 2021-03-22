import { Component, Input, OnInit } from '@angular/core';
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
      console.log(this.requestingUser)
    })
  }

  /**
   * Will return Komplex string if the request has subrequests
   */
  getSimpleOrComplex() {
    return (this.request?.subRequest[0] || false) ? 'Komplex' : 'Einfach';
  }

}
