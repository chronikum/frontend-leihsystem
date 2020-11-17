import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Collects form values and performs login, if successful, transmits authentication results to authenticationService
   */
  performLogin(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.apiService.login$(username, password).subscribe((result: GeneralServerResponse) => {
      console.log(result);
      if (result.success) {
        this.snackBar.open('Login successful!');
      } else {
        this.snackBar.open('Login unsuccessful');
      }
    }, (error) => {
      console.log('ERROR!');
      this.snackBar.open('Login unsuccessful');
    });

  }

  ngOnInit(): void {
  }

}
