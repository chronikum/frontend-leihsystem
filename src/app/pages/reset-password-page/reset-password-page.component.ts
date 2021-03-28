import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * First input ngModel
   */
  firstPassword: string = '';

  /**
   * Second input ngModel
   */
  secondPassword: string = '';

  ngOnInit(): void {
  }

  /**
   * Reset password via token reset
   */
  resetPassword() {
    const token = this.activatedRoute.snapshot.paramMap.get('token');
    const email = this.activatedRoute.snapshot.paramMap.get('email');
    const password = this.firstPassword;
    this.apiService.changePasswordViaToken(token, password, email).subscribe(ok => {
      this.router.navigate(['login']);
    })
  }

}
