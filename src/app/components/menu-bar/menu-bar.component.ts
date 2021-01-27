import { ChangeDetectorRef, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router, RouterEvent } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { User } from 'src/app/models/User';
import { UserRoles } from 'src/app/models/UserRoles';
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
   * Admin user enum reference
   */
  adminUser: UserRoles = UserRoles.ADMIN;



  /**
   * Items to show in the menu bar
   */
  menubarItems = [
    {
      title: 'Startseite',
      link: ['dashboard'],
      category: 1,
      userRole: UserRoles.USER,
      icon: 'dashboard'
    },
    {
      title: 'Geräte',
      link: ['inventory'],
      category: 1,
      userRole: UserRoles.ADMIN,
      icon: 'smartphone'
    },
    {
      title: 'Reservierungen',
      link: ['reservations'],
      category: 1,
      userRole: UserRoles.ADMIN,
      icon: 'add_to_home_screen'
    },
    {
      title: 'Reservierungsanfragen',
      link: ['requests'],
      category: 1,
      userRole: UserRoles.ADMIN,
      icon: 'device_unknown'
    },
    {
      title: 'User',
      link: ['users'],
      category: 2,
      userRole: UserRoles.ADMIN,
      icon: 'person'
    },
    {
      title: 'Gruppen',
      link: ['groups'],
      category: 2,
      userRole: UserRoles.ADMIN,
      icon: 'group'
    },
    {
      title: 'Scanner',
      link: ['scanner'],
      category: 3,
      userRole: UserRoles.USER,
      icon: 'qr_code'
    },
    {
      title: 'Anfrage erstellen',
      link: ['requestion'],
      category: 3,
      userRole: UserRoles.USER,
      icon: 'mail'
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
   * Go to profile page
   */
  gotoProfile() {
    this.router.navigate(['profile']);
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

  /**
   * Validates user permissions - if user is admin user, user is allowed to see item. Also reloads user if it is not available right now
   * @returns boolean
   * @param role provided from the item
   */
  userHasPermissionToSeeItem(role: UserRoles): Boolean {
    return this.checkPermission(role);
  }

  /**
   * Checks permission
   * @param role of the user
   */
  checkPermission(role: UserRoles): Boolean {
    if (this.currentUser) {
      return (((this.currentUser?.role === role) || (this.currentUser?.groupRoles?.includes(role))) || this.currentUser.role === UserRoles.ADMIN);
    } else {
      return false;
    }
  }
}
