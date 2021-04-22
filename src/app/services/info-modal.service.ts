import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../modals/info-modal/info-modal.component';

/**
 * Info modal service - info modals on demand!
 */
@Injectable({
  providedIn: 'root'
})
export class InfoModalService {

  constructor(
    private dialog: MatDialog,
  ) { }

  /**
   * Show information modal with message
   * @param message to display
   */
  showInformation(message: string) {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      width: '650px',
      data: { message: message }
    });
  }
}
