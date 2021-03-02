import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-request-button-group',
  templateUrl: './request-button-group.component.html',
  styleUrls: ['./request-button-group.component.scss']
})
export class RequestButtonGroupComponent implements OnInit {

  /**
   * The request accept and reservation create button action
   */
  @Output() reserveAction = new EventEmitter<any>();

  /**
   * The request decline button action
   */
  @Output() declineAction = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
