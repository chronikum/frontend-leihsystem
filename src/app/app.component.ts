import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

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
   * Inject router
   */
  constructor(
    private router: Router,
  ) {

  }

  /**
   * Make sidebar disappear on navigation
   */
  ngOnInit() {
    this.router.events.subscribe(_ => {
      this.sideNav.close();
    });
  }

}
