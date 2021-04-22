import { Component, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-administration-page',
  templateUrl: './administration-page.component.html',
  styleUrls: ['./administration-page.component.scss']
})
export class AdministrationPageComponent implements OnInit {

  /**
   * Emitter to observe when a new system logo is available.
   * This will be passed to the apiservice and to the system logo component
   */
  refreshSystemLogoTrigger = new EventEmitter<any>();

  /**
   * Returns new instance of AdministrationPage
   */
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.refreshSystemLogoTrigger.subscribe(refreshAction => {
      this.apiService.refreshSystemLogo.next(true);
    })
  }



}
