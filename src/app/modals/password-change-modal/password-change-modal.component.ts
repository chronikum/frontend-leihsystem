import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password-change-modal',
  templateUrl: './password-change-modal.component.html',
  styleUrls: ['./password-change-modal.component.scss']
})
export class PasswordChangeModalComponent implements OnInit {

  /**
   * Password Change Form
   */
  passwordChangeForm: FormGroup;

  /**
   * Creates Password Change Modal
   * @param formBuilder
   * @param dialogRef 
   */
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PasswordChangeModalComponent>
  ) {
    this.passwordChangeForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      newPasswordConfirmation: ['', Validators.required],
    }, { validator: this.checkPasswords });
  }

  ngOnInit(): void {

  }


  /**
   * Collects the password data
   */
  collectPasswordChange(): any {
    let passwordChange = {
      newPassword: this.passwordChangeForm.get('newPassword').value,
      newPasswordConfirmation: this.passwordChangeForm.get('newPasswordConfirmation').value,
    }

    return passwordChange;
  }

  /**
   * Validates password form
   * @param group 
   */
  checkPasswords(group: FormGroup) {
    let pass = group.get('newPassword').value;
    let confirmPass = group.get('newPasswordConfirmation').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  /**
   * Create the user and submit the form
   * 
   * @pipes true and the user data
   */
  changeAction() {
    this.dialogRef.close(this.collectPasswordChange());
  }

  /**
   * Close the modal, abort user creation
   */
  cancelAction() {
    this.dialogRef.close(false);
  }

}
