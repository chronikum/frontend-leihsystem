import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { UserRoles } from 'src/app/models/UserRoles';

@Component({
  selector: 'app-user-creation-modal',
  templateUrl: './user-creation-modal.component.html',
  styleUrls: ['./user-creation-modal.component.scss']
})
export class UserCreationModalComponent implements OnInit {

  /**
   * simple creation form
   */
  userCreationForm: FormGroup;

  /**
   * Allowed to reserve
   */
  rolesAvailable: UserRoles[] = [
    UserRoles.ADMIN,
    UserRoles.USER
  ];

  /**
   * Creates User Creation Modal
   * @param formBuilder
   * @param dialogRef 
   */
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserCreationModalComponent>
  ) {
    this.userCreationForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['',],
      surname: ['',],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }


  /**
   * Collects the user data
   */
  collectUserData(): User {
    let user: User = {
      username: this.userCreationForm.get('username').value || '',
      firstname: this.userCreationForm.get('firstname').value || '',
      surname: this.userCreationForm.get('surname').value || '',
      email: this.userCreationForm.get('email').value || '',
      password: this.userCreationForm.get('password').value,
      role: this.userCreationForm.get('role').value as any || UserRoles.USER,
    }

    return user;
  }

  /**
   * Create the user and submit the form
   * 
   * @pipes true and the user data
   */
  createAction() {
    this.dialogRef.close(this.collectUserData());
  }

  /**
   * Close the modal, abort user creation
   */
  cancelAction() {
    this.dialogRef.close(false);
  }

}
