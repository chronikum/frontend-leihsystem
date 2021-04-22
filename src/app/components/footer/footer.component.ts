import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {

  }

  /**
   * Navigate to license page
   */
  gotoLicensePage() {
    this.router.navigate(['licenseInformation']);
  }
}
