import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Upload an file to a specified endpoint
   * 
   * @param formData to be sent
   * @param destination where we will attempt an upload
   * @returns 
   */
  public upload(formData, destination: string) {

    return this.httpClient.post<any>(destination, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
