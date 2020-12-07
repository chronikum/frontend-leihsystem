import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import QRCode from 'qrcode'

@Component({
  selector: 'app-qrcode-modal',
  templateUrl: './qrcode-modal.component.html',
  styleUrls: ['./qrcode-modal.component.scss']
})
export class QrcodeModalComponent implements OnInit {
  // the data in the qr code to be displayed
  qrcodeData: string

  /**
   * Creates the dialog and loads the data
   * @param dialogRef 
   * @param data holds the qr code data
   */
  constructor(
    public dialogRef: MatDialogRef<QrcodeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { qrcodeData: string }) {
    this.qrcodeData = data.qrcodeData;
  }

  ngOnInit(): void {
    QRCode.toCanvas(this.qrcodeData, { errorCorrectionLevel: 'H' }, function (err, canvas) {
      if (err) throw err

      var container = document.getElementById('qrcode')
      container.appendChild(canvas)
    })

  }



  /**
   * Close dialog
   */
  closeAction() {
    this.dialogRef.close();
  }
}
