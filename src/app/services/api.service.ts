import { HttpClient, HttpErrorResponse, HttpEventType, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
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
import { UploadService } from './upload.service';
import { catchError, map } from 'rxjs/operators';

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
   * Group role updater
   */
  groupRoleUpdater = new EventEmitter<UserRoles[]>();

  /**
   * user updater
   */
  userUpdater = new EventEmitter<User>();

  /**
   * Refers to the authentication state
   */
  isAuthenticated: boolean = false;

  /**
   * Current user
   */
  currentUser: User;

  /**
   * "Profile picture was updated and should be refreshed" - trigger
   */
  refreshProfilePicture = new EventEmitter<boolean>();

  /**
   * System logo was updated. Refresh information
   */
  refreshSystemLogo = new EventEmitter<boolean>();


  /**
   * Returns new instance of api service
   * @param httpClient 
   * @param router 
   * @param snackBar 
   */
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private uploadService: UploadService,
  ) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        const page = (this.router.url?.split('/')[this.router.url?.split('/').length - 1] || '').toLowerCase();
        if (page !== 'error') {
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
          this.getCurrentUserRoles$().subscribe(userRoles => {
            this.groupRoleUpdater.next(userRoles.userRoles);
          })
          this.userUpdater.next(x.user);
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
          this.getCurrentUserRoles$().subscribe(userRoles => {
            this.groupRoleUpdater.next(userRoles.userRoles);
          })
          this.userUpdater.next(x.user);
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
   * Reset password validator
   */
  systemlogs(): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'systemlogs', {});
  }

  /**
   * Reset password validator
   */
  resetPasswordValidator(token: string, email: string): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'validateResetToken', {
      token, email
    });
  }

  /**
   * Send reset password with email
   */
  resetPasswordChallenge(email: string): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'resetPassword', {
      email
    });
  }

  /**
   * Change password via token reset
   */
  changePasswordViaToken(token: string, password: string, email: string): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'changePasswordViaToken', {
      token, password, email
    });
  }

  /**
   * returns the user roles of the logged in user
   * @returns User roles
   */
  getCurrentUserRoles$(): Observable<any> {
    return this.httpClient.post<any>(this.endpoint + 'currentUserRoles', {});
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
   * get user information for user id
   * @param userId userId
   * @returns GeneralServerResponse
   */
  getUserInformationForId$(userId: number): Observable<GeneralServerResponse> {
    console.log("Looking up User: " + userId)
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'getUserInformationForId', {
      userId
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
   * Delete items
   */
  getItemsforIds$(itemIds: number[]): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'getItemsforIds', {
      itemIds: itemIds
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
   * Set reservation as finished
   * @param reservation Reservation
   * @param items Items
   */
  finishReservation$(reservation: Reservation): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'finishReservation', {
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
   * Accept a request
   * @param request to accept
   * @returns 
   */
  acceptRequest$(request: Request): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'acceptRequest', {
      request: request
    });
  }

  /**
   * Cancel a request
   */
  cancelRequest$(request: Request): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'cancelRequest', {
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
   * Updates a user information (only certain values)
   * @param user to create
   */
  updateUserInformation$(user: User): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'updateUserInformation', { user: user });
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
   * Delete group given
   * 
   * @param group to delete
   * @returns 
   */
  deleteGroup$(group: Group): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'deleteGroup', group);
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
   * Upload
   */

  /**
   * Upload profile picture
   */
  uploadProfilePicture$(file: any, user: User): Observable<any> {
    const formData = new FormData();
    const endpoint = this.endpoint + 'uploadProfilePicture'
    console.log(file)
    formData.append('file', file);
    return this.uploadService.upload(formData, endpoint).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      }))
  }

  /**
   * Configuration calls
   */

  /**
   * Uploads logo
   */
  uploadLogo$(file: any): Observable<any> {
    const formData = new FormData();
    const endpoint = this.endpoint + 'configuration/uploadLogo'
    console.log(file)
    formData.append('file', file);
    return this.uploadService.upload(formData, endpoint).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      }))
  }

  /**
   * Get logo
   */
  systemLogo(file: any): Observable<any> {
    return this.httpClient.get<any>(this.endpoint + 'configuration/logo');
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

  /**
   * Chart dataendpoints
   */

  /**
   * Available/Reserved devices - charts
   */
  chartsAvailable$() {
    return this.httpClient.post<any>(this.endpoint + 'charts/available', {});
  }

  /**
   * Models devices - charts
   */
  chartsModels$() {
    return this.httpClient.post<any>(this.endpoint + 'charts/models', {});
  }

  /**
   * Models devices - charts
   */
  reservationsCompleted$() {
    return this.httpClient.post<any>(this.endpoint + 'charts/completedReservation', {});
  }

  /**
   * Group data - charts
   */
  userAndGroups$() {
    return this.httpClient.post<any>(this.endpoint + 'charts/userGroup', {});
  }

  /**
   * Group data - charts
   */
  reservationsProUser$() {
    return this.httpClient.post<any>(this.endpoint + 'charts/reservationsProUser', {});
  }
}
