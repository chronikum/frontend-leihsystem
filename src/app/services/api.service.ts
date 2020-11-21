import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GeneralServerResponse } from '../models/GeneralServerResponse';
import { tap } from 'rxjs/internal/operators/tap';
import { Router } from '@angular/router';
import { Item } from '../models/Item';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  endpoint = 'http://localhost:8080/';

  /**
   * Refers to the authentication state
   */
  isAuthenticated: boolean = false;

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
    });
  }


  /**
   * Check authentication
   * - only works when user was logged in before
   */
  checkAuth$(): Observable<GeneralServerResponse> {
    this.debugSnackBar("Validating auth");
    this.isAuthenticated = false;
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'checkAuth', {}).pipe(
      tap(x => this.isAuthenticated = x.success),
    )
  }

  /**
   * Log the user out
   */
  logout$() {

    this.debugSnackBar("Logging out");
    this.httpClient.post<any>(this.endpoint + 'logout', {}).subscribe(x => {
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
   * Debugging with snackbar
   * @param message 
   */
  debugSnackBar(message: string) {
    this.snackBar.open(message, 'DEBUG', {
      duration: 3000
    });
  }
}
