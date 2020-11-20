import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  /**
   * Flag if the current user has an authentication
   */
  isAuthenticated: boolean = false;

  /**
   * Items to show in the menu bar
   */
  menubarItems = [
    {
      title: 'Dashboard',
      link: ['dashboard']
    },
    {
      title: 'Inventory',
      link: ['inventory']
    },
  ]

  constructor(
    private router: Router,
    private apiService: ApiService,
    private changeDet: ChangeDetectorRef,
  ) { }


  ngOnInit(): void {
    this.router.events.subscribe(_ => {
      this.isAuthenticated = this.apiService.isAuthenticated;
    });
  }

  /**
   * Log the user out
   */
  logout() {
    this.apiService.logout$();
  }

  /**
   * Navigates to the link clicked in the menu
   * @param targetLink string
   */
  navigateToTargetLink(targetLink: string[]): void {
    this.router.navigate(targetLink);
  }
}
