import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { SetupService } from './services/setup.service';

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
   * Current active site
   */
  activeSite: string = "";

  /**
   * Inject router
   */
  constructor(
    private router: Router,
    private apiService: ApiService,
    private setupService: SetupService
  ) {

  }

  /**
   * Make sidebar disappear on navigation
   */
  ngOnInit() {
    this.router.events.subscribe(_ => {
      this.isAuthenticated = this.apiService.isAuthenticated;
      this.activeSite = (this.router.url?.split('/')[this.router.url?.split('/').length - 1] || '').toLowerCase();
      this.sideNav.close();
    });

    this.setupService.setupStatus$().subscribe(status => {
      console.log("APP MENU")
      console.log(status)
      if (!(status?.setup)) {
        this.router.navigate(['setup'])
      }
    });
  }

}
