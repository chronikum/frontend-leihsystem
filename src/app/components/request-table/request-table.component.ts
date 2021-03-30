import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Request } from 'src/app/models/Request';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';


/**
 * All requests which are pending and need to be approved
 */
@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.scss']
})
export class RequestTableComponent implements OnInit {

  displayedColumns: string[] = ['select', 'requestIdId', 'username', 'description', 'startDate', 'plannedEndDate'];

  /**
   * Datasource
   */
  dataSource: MatTableDataSource<Request> = [] as any;

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
  selection = new SelectionModel<Request>(true, []);

  @ViewChild('searchInput') searchInput: ElementRef;

  @ViewChild(MatSort) sort: MatSort;

  /**
   * Gets called when table selection is being changed
   */
  @Output() selectionChanged = new EventEmitter<SelectionModel<Request>>();

  /**
   * Refresh data trigger
   */
  @Input() refreshTrigger: EventEmitter<any>;

  /**
   * Show QR Code Emitter - emits the qr code content string
   */
  @Output() showQRCodeEmitter = new EventEmitter<Request>();

  /**
   * User information table
   */
  userInformation: User[] = [];

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
    this.apiService.getAllRequests$().subscribe(response => {
      const requests: Request[] = response.requests;
      this.loadingCompleted = false;
      this.dataSource = new MatTableDataSource<Request>([...requests]);
      this.dataSource.paginator = this.paginator;
      this.loadingCompleted = true;
      this.deselectAll();
      // Preload user profiles
      this.userInformation = [];
      requests.forEach(async request => {
        if (request?.userCreated) {
          this.apiService.getUserInformationForId$(request.userCreated).subscribe(userResponse => {
            if (userResponse?.user) {
              this.userInformation.push(userResponse.user);
            }
          });
        }
      })
    });
  }

  /**
   * Returns user information about the requesting user when the request is given
   * 
   * @param Request
   * @return user
   */
  getUserInformation(request: Request): User {
    const user = this.userInformation.find(user => (user.userId === request.userCreated.toString()));
    if (user) {
      return user;
    }
    return null;
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
      return new Date(number).toLocaleDateString() + new Date(number).toLocaleTimeString();
    }
    return '-'
  }

}
