import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LicenseInformationService {

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
  ) {
  }

  /**
   * Get all available license information for the frontend
   */
  getLicenseInformationFrontend$(): Observable<any> {
    return this.httpClient.get<any>('assets/licenses.json');
  }

  /**
   * Get all available license information for the backend
   */
  getLicenseInformationBackend$(): Observable<any> {
    return this.httpClient.get<any>(this.apiService.endpoint + 'licenses');
  }
}
