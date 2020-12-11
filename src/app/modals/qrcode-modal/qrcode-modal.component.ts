import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import QRCode from 'qrcode'
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-qrcode-modal',
  templateUrl: './qrcode-modal.component.html',
  styleUrls: ['./qrcode-modal.component.scss']
})
export class QrcodeModalComponent implements OnInit {
  /**
   * The items generatedUniqueIdentifier
   */
  qrcodeData: string

  /**
   * The Download Link offered
   */
  downloadUrl = '';

  /**
   * Current selected item
   */
  item: Item;

  /**
   * Creates the dialog and loads the data
   * @param dialogRef 
   * @param data holds the item and qr code data
   */
  constructor(
    public dialogRef: MatDialogRef<QrcodeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item }) {
    this.qrcodeData = data.item.generatedUniqueIdentifier;
    this.item = data.item;
  }

  ngOnInit(): void {
    this.buildDownloadLink();
    QRCode.toCanvas(this.qrcodeData, { errorCorrectionLevel: 'H' }, function (err, canvas) {
      if (err) throw err

      var container = document.getElementById('qrcode')
      container.appendChild(canvas)
    })

  }


  /**
   * Download QR Image
   */
  buildDownloadLink() {
    QRCode.toDataURL(this.qrcodeData, { errorCorrectionLevel: 'H' })
      .then(url => {
        console.log(url)
        this.downloadUrl = url;
      })
      .catch(err => {
        console.error(err)
      })
  }


  /**
   * Close dialog
   */
  closeAction() {
    this.dialogRef.close();
  }
}
