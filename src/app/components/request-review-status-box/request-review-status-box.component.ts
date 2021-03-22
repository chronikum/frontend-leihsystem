import { Component, Input, OnInit } from '@angular/core';
import { Request } from 'src/app/models/Request';

@Component({
  selector: 'app-request-review-status-box',
  templateUrl: './request-review-status-box.component.html',
  styleUrls: ['./request-review-status-box.component.scss']
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

  /**
   * Simple request
   */
  isSimple() {
    return (this.getSimpleOrComplex() === 'Einfach')
  }

  /**
   * Complex request
   */
  isComplex() {
    return (this.getSimpleOrComplex() === 'Komplex')
  }

}
