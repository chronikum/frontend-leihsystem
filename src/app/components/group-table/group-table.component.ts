import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/models/Group';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.scss']
})
export class GroupTableComponent implements OnInit {

  /**
  * Columns displayed
  */
  displayedColumns: string[] = ['select', 'groupId', 'displayName', 'description', 'role'];

  /**
   * Datasource
   */
  dataSource: MatTableDataSource<Group> = [] as any;

  /**
   * Paginator
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Flag to reference loading state
   */
  loadingCompleted = false;

  /**
   * Selection Model
   */
  selection = new SelectionModel<Group>(true, []);

  @ViewChild('searchInput') searchInput: ElementRef;

  @ViewChild(MatSort) sort: MatSort;

  /**
   * Gets called when table selection is being changed
   */
  @Output() selectionChanged = new EventEmitter<SelectionModel<Group>>();

  /**
   * Refresh data trigger
   */
  @Input() refreshTrigger: EventEmitter<any>;

  /**
   * Toggle permission array
   */
  togglePermissionArray: boolean[];

  constructor(
    private apiService: ApiService,
  ) {
    this.loadData();
  }

  ngOnInit(): void {
    /**
     * Will be fired if events change to stream the output to the parent component
     */
    this.selection.changed.subscribe(change => {
      this.selectionChanged.next(this.selection);
    })

    /**
     * Will be fired if a refresh event should be triggered
     */
    this.refreshTrigger.subscribe(trigger => this.loadData())
  }

  /**
   * Loads the table with data
   */
  loadData(): void {
    // TODO: Load groups instead
    this.togglePermissionArray = [];
    this.apiService.getAllGroups$().subscribe(response => {
      if (response?.success && response.groups) {
        this.loadingCompleted = false;
        response.groups.forEach(group => {
          this.togglePermissionArray.push(false);
        })
        this.dataSource = new MatTableDataSource<Group>([...response.groups || []]);
        this.dataSource.paginator = this.paginator;
        this.loadingCompleted = true;
        this.deselectAll();
      }
    });
  }

  /**
   * Toggles if permissions should be shown or not
   */
  togglePermissions(row: number) {
    console.log(row)
    this.togglePermissionArray[row] = !this.togglePermissionArray[row];
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

  /**
   * Filter string value
   * @param filterValue String
   */
  applyFilter(filterValue?: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}