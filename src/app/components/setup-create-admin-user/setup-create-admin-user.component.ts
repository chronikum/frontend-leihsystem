import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@sentry/types';

@Component({
  selector: 'app-setup-create-admin-user',
  templateUrl: './setup-create-admin-user.component.html',
  styleUrls: ['./setup-create-admin-user.component.scss']
})
export class SetupCreateAdminUserComponent implements OnInit {
  /**
   * Emitter - fires the user if it is valid. 
   */
  @Input() userEmitter: EventEmitter<User>;

  /**
   * Formgroup of admin user form
   */
  userForm: FormGroup;

  /**
   * Determines if the user was created
   */
  userCreated: boolean = false;

  /**
   * Constructs a new instance of SetupCreateAdminUserComponent
   */
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.userForm = this.formBuilder.group({
      username: 'Administrator',
      firstname: ['',],
      surname: ['',],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordValidation: ['', Validators.required],
    });
  }

  /**
   * Create user and send event to eventemitter
   */
  createUser() {
    const user: User = this.collectsAdminUserData();
    if (user) {
      this.userEmitter.next(user);
      this.userCreated = true
    }
  }

  /**
   * Collects the user data
   * 
   * @returns user
   */
  collectsAdminUserData(): User {
    let user: User = {
      username: this.userForm.get('username').value || '',
      firstname: this.userForm.get('firstname').value || '',
      surname: this.userForm.get('surname').value || '',
      email: this.userForm.get('email').value || '',
      password: this.userForm.get('password')?.value || undefined,
    }
    return user;
  }

  /**
   * Checks if the given passwords are equal
   */
  passwordsAreEqual(): boolean {
    const password = this.userForm?.get('password')?.value || false;
    const passwordValidation = this.userForm?.get('passwordValidation')?.value || false;
    return ((password === passwordValidation) && password.length >= 5);
  }
  ngOnInit(): void {
    this.userCreated = false;
  }

}
