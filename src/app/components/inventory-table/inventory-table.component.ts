import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/models/Item';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})
export class InventoryTableComponent implements OnInit {

  /**
  * Columns displayed
  */
  displayedColumns: string[] = ['select', 'itemId', 'name', 'description', 'available', 'reservationCount', 'ownership'];

  /**
   * Datasource
   */
  dataSource: MatTableDataSource<Item> = [] as any;

  /**
   * Flag to reference loading state
   */
  loadingCompleted = false;

  /**
   * Selection Model
   */
  selection = new SelectionModel<Item>(true, []);

  @ViewChild('searchInput') searchInput: ElementRef;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiService: ApiService,
  ) {
    this.loadData();
  }

  ngOnInit(): void {
  }

  /**
   * Loads the table with data
   */
  loadData(): void {
    this.apiService.getInventory$().subscribe(items => {
      console.log(items)
      this.dataSource = new MatTableDataSource<Item>([...items]);
      this.loadingCompleted = true;
    });
  }


  /**
   * Selection Methods
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.rowPosition + 1}`;
  }

}
