import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/Item';
import { Reservation } from 'src/app/models/Reservation';
import { ApiService } from 'src/app/services/api.service';

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

  items: Item[];

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.loadItemsForItemIds();
  }

  /**
   * Load items for itemIds
   */
  loadItemsForItemIds() {
    this.apiService.getItemsforIds$(this.reservation.itemIds).subscribe(response => {
      let items = response.items || [];
      this.items = items;
    })
  }

}
