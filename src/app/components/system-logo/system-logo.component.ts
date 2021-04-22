import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-system-logo',
  templateUrl: './system-logo.component.html',
  styleUrls: ['./system-logo.component.scss']
})
export class SystemLogoComponent implements OnInit {

  /**
   * Path to system logo
   */
  systemLogoPath: string = "";

  /**
   * Show system logo
   */
  showSystemLogo: boolean = true

  /**
   * Width and height
   */
  @Input() width: string = '200';
  @Input() height: string = 'auto';

  constructor(
    private apiService: ApiService
  ) { }

  /**
   * Refresh system logo path and add subscriber to system logo change listener on api service
   */
  ngOnInit(): void {
    this.setSystemLogo();

    this.apiService.refreshSystemLogo.subscribe(refresh => {
      this.setSystemLogo();
    })
  }

  /**
   * Set system logo path with random value at the end for refreshing hack
   */
  setSystemLogo() {
    this.systemLogoPath = this.apiService.endpoint + 'configuration/logo?' + Math.random();
    this.showSystemLogo = true;
  }

  /**
   * Error occured, hide system logo
   */
  onError() {
    this.showSystemLogo = false;
  }

}
