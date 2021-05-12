import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InfoModalComponent } from 'src/app/modals/info-modal/info-modal.component';
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
   * If account is ldap account, certain information is not editable
   */
  isLDAP: boolean = false

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
    private router: Router,
    private dialog: MatDialog,
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

    // Profil picture was changed, refresh!
    this.profileImageUploadTriggerer.subscribe(update => {
      // Reload size
      this.getProfilePicture()

      // Tell apiservice profil picture was changed and fire global listener
      this.apiService.refreshProfilePicture.next(true);

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
      const dialogRef = this.dialog.open(InfoModalComponent, {
        width: '650px',
        data: { message: "Die Profilinformationen wurden gespeichert" }
      });
    });
  }

  /**
   * Returns the profile picture
   * - changes an ignored part of the uri to trigger angulars engine and refresh the image
   */
  getProfilePicture() {
    this.showProfilePicture = true;
    this.profileImageUri = this.apiService.basicEndpoint + 'profilePicture' + '?' + Math.random(); // <- This is genius
  }


  noProfilePictureFound() {
    this.showProfilePicture = false;
  }

  /**
   * Change password for the user
   */
  changePasswordForUser() {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      width: '650px',
      data: { message: "Eine E-Mail zum Password-Reset wurde soeben verschickt." }
    });
    this.apiService.resetPasswordChallenge(this.apiService.currentUser.email).subscribe();
  }

}
