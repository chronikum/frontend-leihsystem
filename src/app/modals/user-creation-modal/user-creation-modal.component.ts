import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
   * Enable password field
   */
  enablePassword = true;

  /**
   * Determines if an user is currently being edited
   * @TODO Implement endpoint on API and editing mode on frontend
   */
  @Input() editMode: boolean = false;

  /**
   * Creates User Creation Modal
   * @param formBuilder
   * @param dialogRef 
   */
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserCreationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    if (data?.user) {
      this.enablePassword = false;
      this.userCreationForm = this.formBuilder.group({
        username: [data.user.username, Validators.required],
        firstname: [data.user.firstname,],
        surname: [data.user.surname,],
        email: [data.user.email, Validators.required],
        role: [data.user.role, Validators.required],
      });
    } else {
      this.userCreationForm = this.formBuilder.group({
        username: ['', Validators.required],
        firstname: ['',],
        surname: ['',],
        email: ['', Validators.required],
        password: ['', Validators.required],
        role: ['', Validators.required],
      });
    }
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
      password: this.userCreationForm.get('password')?.value || undefined,
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
    let user = this.collectUserData();
    if (this.data?.user) { // Inject userId if necessary (editing mode)
      user.userId = this.data.user.userId;
    }
    this.dialogRef.close(user);
  }

  /**
   * Close the modal, abort user creation
   */
  cancelAction() {
    this.dialogRef.close(false);
  }

}
