import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailConfiguration } from '../models/configurations/EmailConfiguration';
import { GeneralServerResponse } from '../models/GeneralServerResponse';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  /**
   * The endpoint
   */
  endpoint = environment.backend + 'configuration/';

  /**
   * Returns new instance of configuration service
   * @param httpClient 
   */
  constructor(
    private httpClient: HttpClient,
  ) {
  }

  /**
   * Update mail configuration
   * @param configuration new email configuration 
   */
  mailConfiguration$(configuration: EmailConfiguration): Observable<GeneralServerResponse> {
    return this.httpClient.post<GeneralServerResponse>(this.endpoint + 'mailConfiguration', {
      configuration
    });
  }
}
