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
   * Gets called when table selection is being changed and provides the values to be used outside
   */
  @Output() selectionChanged = new EventEmitter<SelectionModel<any>>();

  /**
   * Current table selection
   */
  @Input() selection: SelectionModel<any>;
  constructor() {
  }

  /**
   * Load data in - if no selection is given from the outside, initialize the selection
   */
  ngOnInit(): void {
    if (!this.selection) {
      this.selection = new SelectionModel<any>(true, []);
    }
    this.dataSource = new MatTableDataSource<any>([...this.data]);
    this.dataSource.paginator = this.paginator;
    this.columns = this.columns.concat(this.displayedColumns);

    this.selection.changed.subscribe(change => {
      this.selectionChanged.next(this.selection);
    })
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
