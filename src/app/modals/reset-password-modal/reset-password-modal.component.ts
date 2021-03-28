import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss']
})
export class ResetPasswordModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ResetPasswordModalComponent>,
    private apiService: ApiService,
  ) { }

  /**
   * E-mail user associated with their accoutn
   */
  email: string;

  ngOnInit(): void {
  }

  /**
   * Cancel modal
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Submit password reset request challenge
   */
  sendPasswortReset() {
    if (this.email?.includes('@')) {
      this.apiService.resetPasswordChallenge(this.email).subscribe();
    }
  }

}
