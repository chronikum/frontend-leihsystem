import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  /**
   * Mat Side Nav
   */
  @ViewChild('drawer', { static: true })
  sideNav: MatSidenav;

  /**
   * Determines the user authentication state
   */
  isAuthenticated: boolean = false;

  /**
   * Inject router
   */
  constructor(
    private router: Router,
    private apiService: ApiService,
  ) {

  }

  /**
   * Make sidebar disappear on navigation
   */
  ngOnInit() {
    this.router.events.subscribe(_ => {
      this.isAuthenticated = this.apiService.isAuthenticated;
      this.sideNav.close();
    });
  }

}
