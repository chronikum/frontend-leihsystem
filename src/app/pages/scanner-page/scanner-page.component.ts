import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanner-page',
  templateUrl: './scanner-page.component.html',
  styleUrls: ['./scanner-page.component.scss']
})
export class ScannerPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Scan received handler
   */
  scanSuccessHandler($event) {
    console.log($event);
  }

}
