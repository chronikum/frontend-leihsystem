import { Component, EventEmitter, OnInit } from '@angular/core';
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
   * Available/Reserved stats emitter for pie graph
   */
  availableStatsEmitter = new EventEmitter<any>();

  /**
   * Modle stats emitter for pie graph
   */
  modelStatsEmitter = new EventEmitter<any>();

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

    this.loadChartInformation();

  }

  /**
   * Load the chart datasets
   */
  loadChartInformation() {
    /**
     * Get chart information for available/reserved
     */
    this.apiService.chartsAvailable$().subscribe(chartData => {
      this.availableStatsEmitter.next(chartData)
    })

    this.apiService.chartsModels$().subscribe(chartData => {
      console.log("Data received")
      this.modelStatsEmitter.next(chartData)
    })
  }

}
