import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { phoneNumber } from 'src/app/validators/PhoneValidator';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  /**
   * User information of logged in user
   */
  currentUser: User;

  /**
   * User Form group
   */
  userForm: FormGroup;

  /**
   * Construct new ProfilePageComponent
   */
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) {
    this.userForm = this.formBuilder.group({
      phone: ['', [Validators.required, phoneNumber()]],
      email: ['', [Validators.required, Validators.email]],
      matrikelnumber: ['',],
    });

  }

  ngOnInit(): void {
    this.getUserInformation();
  }

  /**
   * Get user information
   */
  getUserInformation() {
    this.currentUser = this.apiService.currentUser;
  }

  /**
   * Update the user information
   */
  updateUserInformation() {
    console.log(this.currentUser)
    this.apiService.updateUserInformation$(this.currentUser).subscribe(updatedUser => {
      console.log(updatedUser)
    });
  }

}
