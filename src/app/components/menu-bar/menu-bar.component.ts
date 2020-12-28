import { ChangeDetectorRef, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
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
   * Menu Sections
   */
  @ViewChild('menuSections', { static: true })
  menuSections: MatAccordion;



  /**
   * Items to show in the menu bar
   */
  menubarItems = [
    {
      title: 'Startseite',
      link: ['dashboard'],
      category: 1,
    },
    {
      title: 'Geräte',
      link: ['inventory'],
      category: 1,
    },
    {
      title: 'Reservierungen',
      link: ['reservations'],
      category: 1,
    },
    {
      title: 'Reservierungsanfragen',
      link: ['requests'],
      category: 1,
    },
    {
      title: 'User',
      link: ['users'],
      category: 2,
    },
    {
      title: 'Gruppen',
      link: ['groups'],
      category: 2,
    },
    {
      title: 'Scanner',
      link: ['scanner'],
      category: 3,
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

  /**
   * Get menu items by category
   * @param number category identifier
   * 
   * @returns menu items
   */
  getMenuItemsByCategory(category: number): any[] {
    return this.menubarItems.filter(item => item.category === category);
  }
}
