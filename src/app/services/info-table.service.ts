import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InfoTableModalComponent } from '../modals/info-table-modal/info-table-modal.component';

@Injectable({
  providedIn: 'root'
})
export class InfoTableService {

  /**
   * Constructs an new instance of Infotable service
   */
  constructor(
    private dialog: MatDialog,
  ) { }

  /**
   * Present a modal with a generic info table
   * 
   * @param title of the modal
   * @param message of the modal
   * @param columns of the table data
   * @param data for the table
   * 
   * @observable will be called when modal gets closed with the according user input
   */
  showInfoTable(title: string, message: string, columns: string[], data: any[]): Observable<any> {
    const dialogRef = this.dialog.open(InfoTableModalComponent, {
      width: '650px',
      data: { title: title, message: message, columns: columns, data: data }
    });
    return dialogRef.afterClosed();
  }

  /**
   * Present a modal with a generic info table with continue and cancel button
   * 
   * @param title of the modal
   * @param message of the modal
   * @param columns of the table data
   * @param data for the table
   * 
   * @observable will be called when modal gets closed with the according user input
   */
  showInfoTableWithContinueAction(title: string, message: string, columns: string[], data: any[]): Observable<any> {
    const dialogRef = this.dialog.open(InfoTableModalComponent, {
      width: '650px',
      data: { title: title, message: message, columns: columns, data: data, continue: true }
    });
    return dialogRef.afterClosed();
  }
}
