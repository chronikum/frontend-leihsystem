import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { SetupStatus } from '../models/SetupStatus';
import { SetupStatusWrapper } from '../models/wrapper/SetupStatusWrapper';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SetupService {


  endpoint: string;

  /**
   * Constructs an setup service
   * - sets the setup service endpoint
   * 
   * @param httpClient 
   * @param router 
   */
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private apiService: ApiService,
  ) {
    this.endpoint = this.apiService.endpoint + 'setup/';

  }

  /**
   * Checks if the system was setup
   * - returns the SetupStatus interface wrapped in a response
   */
  setupStatus$(): Observable<any> {
    return this.httpClient.post<any>(this.endpoint + 'status', {});
  }

}
