import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

import { ApiService } from 'src/app/services/api.service';

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
   * Construct new ProfilePageComponent
   */
  constructor(
    private apiService: ApiService,
  ) { }

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
