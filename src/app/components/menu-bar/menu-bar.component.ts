import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { User } from 'src/app/models/User';
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
   * Current logged in user
   */
  currentUser: User;

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
    {
      title: 'Reservations',
      link: ['reservations']
    },
    {
      title: 'Users',
      link: ['users']
    },
    {
      title: 'Scanner',
      link: ['scanner']
    },
  ]

  activeItem?: string;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private changeDet: ChangeDetectorRef,
  ) { }


  ngOnInit(): void {
    this.router.events.subscribe(_ => {
      this.isAuthenticated = this.apiService.isAuthenticated;
      this.activeItem = (this.router.url?.split('/')[this.router.url?.split('/').length - 1] || '').toLowerCase();
      this.currentUser = this.apiService.currentUser;
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
