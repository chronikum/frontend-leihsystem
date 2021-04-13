import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

  /**
   * Message which should be displayed
   */
  message: string = ""

  /**
   * Get injected data from data.message and set it
   */
  constructor(
    public dialogRef: MatDialogRef<InfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
    this.message = data?.message || '';
  }

  /**
   * Close modal
   */
  closeModal() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
