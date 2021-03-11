import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss']
})
export class WarningModalComponent implements OnInit {

  /**
   * Warning message
   */
  warningMessage: string;

  constructor(
    public dialogRef: MatDialogRef<WarningModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }) {
    this.warningMessage = data?.message || 'Fehler.';
  }

  /**
   * Close modal
   */
  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
