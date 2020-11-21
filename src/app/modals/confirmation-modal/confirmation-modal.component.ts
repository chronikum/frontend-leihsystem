import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
/**
 * Modal to used to get confirmation button to a message you provide
 */
export class ConfirmationModalComponent implements OnInit {

  /**
   * The message to be shown
   */
  dialogData: { message: string, critical: boolean };

  /**
   * 
   * @param dialogRef ConfirmationModalComponent
   * @param data message
   */
  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, critical: boolean }) {
    this.dialogData = data;
  }

  ngOnInit(): void {
  }

  /**
   * User confirm the action
   */
  confirmAction(): void {
    this.dialogRef.close(true);
  }

  /**
   * User cancels the action
   */
  cancelAction(): void {
    this.dialogRef.close(false);
  }

}
