import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GeneralServerResponse } from 'src/app/models/GeneralServerResponse';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  /**
   * Login Form Group
   */
  loginForm: FormGroup;


  /**
   * Input is hidden
   */
  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Collects form values and performs login, if successful, navigate to dashboard
   * - checks if form is valid
   */
  performLogin(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.apiService.login$(username, password).subscribe((result: GeneralServerResponse) => {
        if (result.success) {
          this.router.navigate(['dashboard'])
        }
      }, (error) => {
        console.log('ERROR!');
      });
    }
  }

  ngOnInit(): void {
  }

}
