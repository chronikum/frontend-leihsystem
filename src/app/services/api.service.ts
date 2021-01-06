import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GeneralServerResponse } from '../models/GeneralServerResponse';
import { tap } from 'rxjs/internal/operators/tap';
import { Router } from '@angular/router';
import { Item } from '../models/Item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reservation } from '../models/Reservation';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { Request } from '../models/Request';

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
  ) { }


  /**
   * User login
   * 
   * @param username 
   * @param password 
   */
  login$(username: string, password: string): Observable<GeneralServerResponse> {
    this.debugSnackBar("Logging in");
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
   * Check authentication
   * - only works when user was logged in before
   */
  checkAuth$(): Observable<GeneralServerResponse> {
    this.debugSnackBar("validated auth");
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
   * Log the user out
   */
  logout$() {
    this.debugSnackBar("Logging out");
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
    this.debugSnackBar("Get inventory");
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
