import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/Item';
import { Reservation } from 'src/app/models/Reservation';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  /**
   * All items
   */
  items: Item[]


  /**
   * User count
   */
  userCount: number;

  /**
   * All reservations
   */
  reservations: Reservation[]

  constructor(
    private apiService: ApiService,
  ) {

  }

  ngOnInit(): void {
    this.getDetails();
  }

  /**
   * Get reservations and items
   */
  getDetails() {
    // Get all items
    this.apiService.getInventory$().subscribe(items => {
      this.items = items;
    });

    this.apiService.getAllReservations$().subscribe(allReservations => {
      this.reservations = allReservations;
    })

    this.apiService.getUserCount$().subscribe(userCount => {
      this.userCount = userCount.userCount;
    })
  }

}
