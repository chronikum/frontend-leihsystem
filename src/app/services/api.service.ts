import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralServerResponse } from '../models/GeneralServerResponse';
import { tap } from 'rxjs/internal/operators/tap';
import { Router } from '@angular/router';
import { Item } from '../models/Item';

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
  ) { }


  /**
   * User login
   * 
   * @param username 
   * @param password 
   */
  login$(username: string, password: string): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'login', {
      username, password,
    });
  }


  /**
   * Check authentication
   * - only works when user was logged in before
   */
  checkAuth$(): Observable<GeneralServerResponse> {
    this.isAuthenticated = false;
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'checkAuth', {}).pipe(
      tap(x => this.isAuthenticated = x.success),
    )
  }

  /**
   * Log the user out
   */
  logout$() {
    console.log("Log user out")
    this.httpClient.post<any>(this.endpoint + 'logout', {}).subscribe(x => {
      this.router.navigate(['login']);
    });
  }

  /**
   * Get inventory list
   * @returns Item[] available
   */
  getInventory$(): Observable<Item[]> {
    return this.httpClient.post<Item[]>(this.endpoint + 'getInventory', {});
  }
}
