import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/Item';
import { Reservation } from 'src/app/models/Reservation';
import { UserRoles } from 'src/app/models/UserRoles';
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
   * Determines if charts should be shown
   */
  showCharts: boolean = false;

  /**
   * Determines if site is loaded
   */
  pageReady: boolean = false;

  /**
   * Emitters for the charts in the dashboard
   */
  availableStatsEmitter = new EventEmitter<any>();
  modelStatsEmitter = new EventEmitter<any>();
  reservationStatsEmitter = new EventEmitter<any>();
  groupStatsEmitter = new EventEmitter<any>();
  userReservationStats = new EventEmitter<any>();

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
    private router: Router
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

    // Wait until dom is build before loading data
    setTimeout(() => {
      this.apiService.chartsAvailable$().subscribe(chartData => {
        this.availableStatsEmitter.next(chartData)
      })

      this.apiService.chartsModels$().subscribe(chartData => {
        this.modelStatsEmitter.next(chartData)
      })

      this.apiService.reservationsCompleted$().subscribe(chartData => {
        this.reservationStatsEmitter.next(chartData)
      })

      this.apiService.userAndGroups$().subscribe(chartData => {
        this.groupStatsEmitter.next(chartData)
      })

      this.apiService.reservationsProUser$().subscribe(chartData => {
        this.userReservationStats.next(chartData)
      })

      this.userShouldSeeDashboard();
    }, 100)
  }


  /**
   * Button routes
   */

  /**
   * Inventory route
   */
  gotoInventory() {
    this.router.navigate(['inventory'])
  }

  /**
   * Models route
   */
  gotoModels() {
    this.router.navigate(['deviceModels'])
  }

  /**
   * Reservations route
   */
  gotoReservations() {
    this.router.navigate(['reservations'])
  }

  /**
   * Groups route
   */
  gotoGroups() {
    this.router.navigate(['groups'])
  }

  /**
   * Groups route
   */
  gotoReservationsRequest() {
    this.router.navigate(['requests'])
  }

  /**
   * Determins if user can see dashboard
   */
  userShouldSeeDashboard() {
    this.apiService.getCurrentUserRoles$().subscribe(roles => {
      if (roles?.userRoles.includes(UserRoles.ADMIN)) {
        this.showCharts = true;
      }
      this.pageReady = true;
    });
  }

  /**
   * This opens the menu
   */
  openMenu() {
    this.apiService.controlSideBar.next(true);
  }

}
