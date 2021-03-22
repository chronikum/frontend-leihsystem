import { Component, Input, OnInit } from '@angular/core';
import { Request } from 'src/app/models/Request';

@Component({
  selector: 'app-reqest-review-status-box',
  templateUrl: './reqest-review-status-box.component.html',
  styleUrls: ['./reqest-review-status-box.component.scss']
})
export class ReqestReviewStatusBoxComponent implements OnInit {

  /**
   * The request to fulfill
   */
  @Input() request: Request;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Will return Komplex string if the request has subrequests
   */
  getSimpleOrComplex() {
    return (this.request?.subRequest[0] || false) ? 'Komplex' : 'Einfach';
  }

}
