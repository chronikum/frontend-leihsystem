import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-logged-in-card',
  templateUrl: './logged-in-card.component.html',
  styleUrls: ['./logged-in-card.component.scss']
})
export class LoggedInCardComponent implements OnInit {

  /**
   * Logged in user
   */
  @Input() user: User;

  /**
   * The uri to the profile picture
   */
  profilePictureUri: string = '';

  /**
   * Determines if profile picture is being shown
   */
  showProfilePicture: boolean = true;

  /**
   * Create a new instance of LoggedInCardComponent
   * - add the refreshProfilePicture Listener
   * @param router 
   * @param apiService 
   */
  constructor(
    private router: Router,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.setProfilePicture();
    this.apiService.refreshProfilePicture.subscribe(refresh => {
      this.showProfilePicture = true
      this.setProfilePicture();
    })
  }

  /**
  * Log the user out
  */
  logout() {
    this.apiService.logout$();
  }

  /**
   * Go to profile page
   */
  gotoProfile() {
    this.router.navigate(['profile']);
  }

  /**
   * set profilepicture link - small hack to refresh the img tag
   */
  setProfilePicture() {
    this.profilePictureUri = this.apiService.basicEndpoint + 'profilePicture?' + Math.random();
  }

  /**
   * Determines the appropiate greeting based on time
   */
  greeting(): string {
    let greeting = 'Hallo';
    var split_afternoon = 12 //24hr time to split the afternoon
    var split_evening = 17 //24hr time to split the evening
    var currentHour = parseFloat(moment().format("HH"));

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      greeting = "Guten Nachmittag";
    } else if (currentHour >= split_evening) {
      greeting = "Guten Abend";
    } else {
      greeting = "Guten Morgen";
    }
    return greeting
  }

  /**
   * This will be called when the profile picture could not be loaded to hide it.
   */
  hideProfilePicture() {
    this.showProfilePicture = false
  }

}
