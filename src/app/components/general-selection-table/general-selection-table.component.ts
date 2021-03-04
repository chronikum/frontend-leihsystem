import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-general-selection-table',
  templateUrl: './general-selection-table.component.html',
  styleUrls: ['./general-selection-table.component.scss']
})
export class GeneralSelectionTableComponent implements OnInit {

  /**
   * The columns which should be displayed
   * IMPORTANT: MUST NOT HOLD 'select' as first index.
   */
  @Input() displayedColumns: string[];

  columns: string[] = ['select'];

  /**
   * The datasource (item[]) you want to show
   */
  @Input() data: any[];

  /**
   * Determines if multiselection is possible
   */
  @Input() multiSelection: boolean = false;

  /**
   * Datasource
   */
  dataSource: MatTableDataSource<any> = [] as any;

  /**
   * Paginator
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Gets called when table selection is being changed
   */
  @Output() selectionChanged = new EventEmitter<SelectionModel<any>>();

  /**
   * Current table selection
   */
  selection = new SelectionModel<any>(true, []);

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>([...this.data]);
    this.dataSource.paginator = this.paginator;
    this.columns = this.columns.concat(this.displayedColumns);
  }

  /**
  * Filter string value
  * @param filterValue String
  */
  applyFilter(filterValue?: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Deselect all entries
   */
  deselectAll() {
    this.selection.clear()
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

}
