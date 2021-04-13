import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
   * Will be called if a new profile image is available
   */
  profileImageUploadTriggerer = new EventEmitter<boolean>();

  /**
   * User Form group
   */
  userForm: FormGroup;

  /**
   * Profile image uri
   */
  profileImageUri: string

  /**
   * Show profile picture
   */
  showProfilePicture: boolean = true;

  /**
   * Construct new ProfilePageComponent
   */
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      phone: ['', [Validators.required, phoneNumber()]],
      email: ['', [Validators.required, Validators.email]],
      matrikelnumber: ['',],
    });

  }

  /**
   * Load user information and setup listener to determine if the profile picture has been updated
   */
  ngOnInit(): void {
    this.getUserInformation();
    this.getProfilePicture()
    this.profileImageUploadTriggerer.subscribe(update => {
      this.router.navigate(['profile']);
      this.getProfilePicture()
      // this.router.navigateByUrl('/not-found', { skipLocationChange: true }).then(() => {
      // });
    })
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

  /**
   * Returns the profile picture
   * - changes an ignored part of the uri to trigger angulars engine and refresh the image
   */
  getProfilePicture() {
    this.profileImageUri = this.apiService.endpoint + 'profilePicture' + '?' + Math.random(); // <- This is genius
  }

}
