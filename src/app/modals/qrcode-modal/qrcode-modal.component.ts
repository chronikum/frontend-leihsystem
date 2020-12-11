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
    var opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      quality: 0.3,
      margin: 1,
      color: {
        dark: "#010599FF",
        light: "#FFBF60FF"
      }
    }

    QRCode.toCanvas(this.qrcodeData, {
      errorCorrectionLevel: 'H',
      quality: 1.0,
    }).then(canvas => {
      let itemName = this.item.name;
      var container = document.getElementById('qrcode')

      // Also write the item name in the qr code to improve user accessibility
      let canvas2dContext = canvas.getContext('2d');
      let rect = canvas.getBoundingClientRect();
      canvas2dContext.textAlign = 'center'
      canvas2dContext.fillText(itemName, 65, 128);

      // Set the canvas id

      container.id = 'generated_qr'
      container.appendChild(canvas)
      this.buildDownloadLink();
    }).catch(err => {
      console.log('ERROR')
    })
  }


  /**
   * Download QR Image
   */
  buildDownloadLink() {
    var canvas = document.querySelector('#generated_qr > canvas') as HTMLCanvasElement
    let dataUrl = canvas.toDataURL()
    this.downloadUrl = dataUrl;
  }


  /**
   * Close dialog
   */
  closeAction() {
    this.dialogRef.close();
  }
}
