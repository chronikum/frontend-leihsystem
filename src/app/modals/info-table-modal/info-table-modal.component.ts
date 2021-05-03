import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-table-modal',
  templateUrl: './info-table-modal.component.html',
  styleUrls: ['./info-table-modal.component.scss']
})
export class InfoTableModalComponent implements OnInit {

  /**
   * Title of the modal
   */
  title: string = "";

  /**
   * Message to be shown
   */
  message: string = ""

  /**
   * Table population data
   */

  /**
   * Columns to be shown
   */
  displayColumns: string[]

  /**
   * Data to be loaded in the info table
   */
  tableData: any[]

  /**
   * Pseudo loading of data for the generic info table to fire into when ready
   */
  dataEmitter = new EventEmitter<any[]>();

  /**
   * Determines if table is shown
   */
  tableEnabled = false;

  /**
   * Show continue button
   */
  continueButtonDisplayed: boolean = false;

  /**
   * Constructs a new instance of info table modal and loads the data provided via injection the the instance
   * @param dialogRef 
   * @param data 
   */
  constructor(
    public dialogRef: MatDialogRef<InfoTableModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:
      {
        data: any[],
        columns: string[],
        title: string,
        message: string,
        continue: boolean
      }
  ) {
    this.message = data?.message
    this.title = data?.title
    this.displayColumns = data?.columns;
    this.tableData = data?.data;
    this.continueButtonDisplayed = data?.continue;
  }

  ngOnInit(): void {
    console.log(this.displayColumns)
    this.tableEnabled = true
    this.dataEmitter.next(this.tableData);
  }

  /**
   * Close modal with false return value
   */
  closeModal() {
    this.dialogRef.close(false)
  }

  /**
   * Closes modal with true boolean return value
   */
  continue() {
    this.dialogRef.close(true);
  }

}
