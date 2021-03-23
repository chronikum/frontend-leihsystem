import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/Reservation';

@Component({
  selector: 'app-reservation-item-information',
  templateUrl: './reservation-item-information.component.html',
  styleUrls: ['./reservation-item-information.component.scss']
})
export class ReservationItemInformationComponent implements OnInit {

  /**
   * Reservation
   */
  @Input() reservation: Reservation;

  constructor() { }

  ngOnInit(): void {
  }

}
