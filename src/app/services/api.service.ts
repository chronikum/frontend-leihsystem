import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralServerResponse } from '../models/GeneralServerResponse';

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

  constructor(
    private httpClient: HttpClient,
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
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'checkAuth', {});
  }

  /**
   * Returns authentication status
   * @returns Promise<boolean>
   */
  async isAuthenticated(): Promise<any> {
    let authenticationStatus = this.checkAuth$();
    console.log(authenticationStatus)
    return this.isAuthenticated();
  }
}
