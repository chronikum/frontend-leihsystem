import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  /**
  * Columns displayed
  */
  displayedColumns: string[] = ['select', 'userId', 'username', 'firstname', 'surname', 'email', 'lastLogin', 'role'];

  /**
   * Datasource
   */
  dataSource: MatTableDataSource<User> = [] as any;

  /**
   * Paginator
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Users which were preloaded -> table is in display mode
   */
  @Input() preloadedUsers: User[] = [];

  /**
   * Determines if table is presenting data or is a primary element. If displaymode is true, data won't be reloaded and preloadUsers will be used.
   */
  @Input() displayMode: boolean = false;

  /**
   * Flag to reference loading state
   */
  loadingCompleted = false;

  /**
   * Selection Model
   */
  selection = new SelectionModel<User>(true, []);

  @ViewChild('searchInput') searchInput: ElementRef;

  @ViewChild(MatSort) sort: MatSort;

  /**
   * Gets called when table selection is being changed
   */
  @Output() selectionChanged = new EventEmitter<SelectionModel<User>>();

  /**
   * Refresh data trigger
   */
  @Input() refreshTrigger: EventEmitter<any>;

  constructor(
    private apiService: ApiService,
  ) {
    if (this.displayMode) {
      this.displayedColumns = ['userId', 'username', 'firstname', 'surname', 'email', 'lastLogin', 'role'];
    }
    this.loadData();
  }

  ngOnInit(): void {
    if (!this.displayMode) {
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
  }

  /**
   * Loads the table with data from server or input
   */
  loadData(): void {
    if (!this.displayMode) {
      this.apiService.getAllUsers$().subscribe(users => {
        this.loadingCompleted = false;
        this.dataSource = new MatTableDataSource<User>([...users]);
        this.dataSource.paginator = this.paginator;
        this.loadingCompleted = true;
        this.deselectAll();
      });
    } else { // Display mode is active
      this.loadingCompleted = false;
      this.dataSource = new MatTableDataSource<User>([...this.preloadedUsers]);
      this.dataSource.paginator = this.paginator;
      this.loadingCompleted = true;
      this.deselectAll();
    }
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

  /**
   * Parses date
   */
  parseDate(number: number): string {
    if (number) {
      return new Date(number).toLocaleDateString();
    }
    return '-'
  }

}
