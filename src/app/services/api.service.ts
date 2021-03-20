import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GeneralServerResponse } from '../models/GeneralServerResponse';
import { tap } from 'rxjs/internal/operators/tap';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Item } from '../models/Item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reservation } from '../models/Reservation';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { Request } from '../models/Request';
import { GroupCreationModalComponent } from '../modals/group-creation-modal/group-creation-modal.component';
import { Group } from '../models/Group';
import { UserRoles } from '../models/UserRoles';
import { DeviceModel } from '../models/DeviceModel';

@Injectable({
  providedIn: 'root'
})
/**
 * API Client for Ausleihsystem
 */
export class ApiService {

  /**
   * Endpoint
   */
  endpoint = environment.backend;

  /**
   * Refers to the authentication state
   */
  isAuthenticated: boolean = false;

  /**
   * Current user
   */
  currentUser: User;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        const page = (this.router.url?.split('/')[this.router.url?.split('/').length - 1] || '').toLowerCase();
        if (page !== 'error') {
          this.backendAvailable$();
        }
      }
    });
  }


  /**
   * User login
   * 
   * @param username 
   * @param password 
   */
  login$(username: string, password: string): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'login', {
      username, password,
    }).pipe(
      tap(x => {
        if (x?.success) {
          this.isAuthenticated = true
        } else {
          this.isAuthenticated = false
        }

        if (x?.user) {
          this.currentUser = x.user;
        }
      },
      ),
    );
  }

  /**
   * Check Availability of backend
   */
  backendAvailable$() {
    this.httpClient.post<any>(this.endpoint + 'available', {}).subscribe();
  }


  /**
   * Check authentication
   * - only works when user was logged in before
   */
  checkAuth$(): Observable<GeneralServerResponse> {
    this.isAuthenticated = false;
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'checkAuth', {}).pipe(
      tap(x => {
        if (x?.success) {
          this.isAuthenticated = true
        } else {
          this.isAuthenticated = false
        }

        if (x?.user) {
          this.currentUser = x.user;
        }
      },
      ),
    )
  }

  /**
   * Reloads the current user in the service, as example after a reload
   * 
   */
  reloadCurrentUser(): Observable<GeneralServerResponse> {
    return this.checkAuth$();
  }

  /**
   * Log the user out
   */
  logout$() {
    this.httpClient.post<any>(this.endpoint + 'logout', {}).subscribe(x => {
      this.isAuthenticated = false;
      this.router.navigate(['login']);
    });
  }

  /**
   * Get inventory list
   * @returns Item[] available
   */
  getInventory$(): Observable<Item[]> {
    return this.httpClient.post<Item[]>(this.endpoint + 'getAvailableItems', {});
  }

  /**
   * Delete items
   */
  deleteItems$(items: Item[]): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'deleteItems', {
      items: items
    });
  }

  /**
   * Create reservation with items
   * 
   * @param reservation Reservation
   * @param items Items
   */
  createReservation$(reservation: Reservation, items: Item[]): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'reserveItems', {
      items: items,
      reservation: reservation,
    });
  }

  /**
   * Get all reservations from the system
   * 
   * @returns reservations
   */
  getAllReservations$(): Observable<Reservation[]> {
    return this.httpClient.post<Reservation[]>(this.endpoint + 'allReservations', {});
  }

  /**
   * Returns the item with the given unique identifier
   * 
   * @param uniqueIdentifier string
   * 
   * @returns Item
   */
  getItembyUniqueIdentifier$(uniqueIdentifier: string): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'getItemByUnique', {
      uniqueGeneratedString: uniqueIdentifier
    })
  }

  /**
   * Get user count
   * 
   * @returns user count : number
   */
  getUserCount$(): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'getUserCount', {});
  }

  /**
   * Requests Management
   */

  /**
   * Create new request
   * @param request to create
   */
  createNewRequest$(request: Request): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'createRequest', {
      request: request
    });
  }

  /**
   * Updates a single request
   * @param request to update
   */
  updateRequests$(request: Request): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'updateRequest', {
      request: request
    });
  }

  /**
   * Gets a reservation suggestion for a reservation request
   * @param request to update
   */
  getReservationSuggestion$(request: Request): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'suggestReservationForRequest', {
      request: request
    });
  }

  /**
   * Gets a reservation suggestion for a reservation request
   * @param request to update
   */
  getDevicesForTimespan$(request: Request): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'getItemsForTimespan', {
      request: request
    });
  }

  /**
   * Get all requests
   * @returns all {@link Requests} available 
   */
  getAllRequests$(): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'getAllRequests', {});
  }

  /**
   * Get all users
   * 
   * @returns users[]
   */
  getAllUsers$(): Observable<User[]> {
    return this.httpClient.post<User[]>(this.endpoint + 'getAllUsers', {});
  }

  /**
   * Create a single item
   * @param item to create
   */
  createItem$(item: Item): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'createItem', item);
  }

  /**
   * Update a single item
   * @param item to create
   */
  updateItem$(item: Item): Observable<Item> {
    return this.httpClient.post<Item>(this.endpoint + 'updateItem', item);
  }

  /**
   * Create a single user
   * @param user to create
   */
  createUser$(user: User): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'createUser', user);
  }

  /**
   * Suggest users
   */
  suggestUsers$(query: string): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'suggestUserNames', {
      query
    });
  }

  /**
   * Updates a user
   * @param user to create
   */
  updateUser$(user: User): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'updateUser', { user: user });
  }

  /**
   * Deletes the users provided with
   * 
   * @param users to delete
   */
  deleteUsers$(users: User[]): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'deleteUsers', users);
  }

  /**
   * Group Management
   */

  /**
   * Get all groups
   */
  getAllGroups$(): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'getAllGroups', {});
  }

  /**
   * Get all group members
   * @param group
   */
  getGroupMembers$(group: Group): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'getGroupMembers', {
      group
    });
  }

  /**
   * Create a new group with given permission
   * @param group 
   */
  createGroup$(group: Group): Observable<Group> {
    return this.httpClient.post<Group>(this.endpoint + 'createGroup', group);
  }

  /**
   * Create a new group with given permission
   * @param group 
   */
  addUserToGroup$(user: User, group: Group): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'addUserToGroup', {
      group, user
    });
  }

  /**
   * Device Models
   */

  /**
   * Create new device model
   */
  createModel$(model: DeviceModel): Observable<DeviceModel> {
    return this.httpClient.post<DeviceModel>(this.endpoint + 'createModel', {
      deviceModel: model
    });
  }

  /**
   * Edit existing device model
   */
  editModel$(model: DeviceModel): Observable<DeviceModel> {
    return this.httpClient.post<DeviceModel>(this.endpoint + 'editModel', {
      deviceModel: model
    });
  }

  /**
   * Get all available models
   */
  getAllModels$(): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'getAllModels', {});
  }

  /**
   * Permission Management
   */

  /**
  * Create a new group with given permission
  * @param group 
  */
  getAllRoles$(): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'rolesAvailable', {});
  }

  /**
   * Changes the users password
   * 
   * @param user 
   * @param newPassword 
   * 
   * @returns GeneralServerResponse
   */
  changePassword$(user: User, newPassword: string): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'changePasswordForUser', {
      user: user,
      newPassword: newPassword,
    });
  }

  /**
   * Debugging with snackbar
   * @param message 
   */
  debugSnackBar(message: string) {
    this.snackBar.open(message, 'DEBUG', {
      duration: 3000
    });
  }
}
