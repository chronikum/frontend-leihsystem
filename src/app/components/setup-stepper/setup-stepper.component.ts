import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { SetupService } from 'src/app/services/setup.service';

@Component({
  selector: 'app-setup-stepper',
  templateUrl: './setup-stepper.component.html',
  styleUrls: ['./setup-stepper.component.scss']
})
export class SetupStepperComponent implements OnInit {

  /**
   * The initial user provided by the form
   */
  userEmitter = new EventEmitter<User>();

  /**
   * The admin user selected
   */
  private adminUser: User;

  constructor(
    private router: Router,
    private setupService: SetupService,
  ) { }

  ngOnInit(): void {
    this.userEmitter.subscribe(user => {
      console.log(user);
      if (user.username && user.password) {
        this.setAdminUser(user);
      }
    })
  }

  /**
   * Go back
   */
  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  /**
   * Go forward
   */
  goForward(stepper: MatStepper) {
    stepper.next();
    console.log(stepper.selectedIndex)
    if (stepper.selectedIndex === 2) {
      this.navigateToLogin();
    }
  }

  /**
   * Set the private property with the provided admin user for validation
   */
  setAdminUser(user: User) {
    console.log("SETTING ADMIN USER")
    this.adminUser = user;
    this.setupService.createAdminUser$(user).subscribe(done => {
      console.log("Admin user created!")
    });
  }

  /**
   * Navigates to login page
   */
  navigateToLogin() {
    this.router.navigate(['login']);
  }

  /**
   * Get the private admin user
   * @returns User
   */
  getAdminUser(): User {
    return this.adminUser;
  }

}
