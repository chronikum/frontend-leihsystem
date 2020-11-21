import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.scss']
})
export class InventoryPageComponent implements OnInit {

  private selection: SelectionModel<Item>;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * Selection of the table is being changed
   * 
   * @param SelectionModel<Item> the current selection of the table
   */
  selectionChange(selection: SelectionModel<Item>) {
    console.log(selection)
    this.selection = selection;
  }
}
