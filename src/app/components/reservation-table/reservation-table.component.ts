import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from 'src/app/models/Reservation';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.scss']
})
export class ReservationTableComponent implements OnInit {


  /**
   * Columns displayed
   */
  displayedColumns: string[] = ['select', 'reservationId', 'reservationName', 'description', 'startDate', 'plannedEndDate', 'completed'];

  /**
   * Datasource
   */
  dataSource: MatTableDataSource<Reservation> = [] as any;

  /**
   * Determines if completed reservations should be shown
   */
  @Input() showCompletedReservations: EventEmitter<boolean>;

  /**
   * Paginator
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Flag to reference loading state
   */
  loadingCompleted = false;

  /**
   * Show completed reservations toggle
   */
  showCompleted: boolean = false;

  /**
   * Selection Model
   */
  selection = new SelectionModel<Reservation>(true, []);

  @ViewChild('searchInput') searchInput: ElementRef;

  @ViewChild(MatSort) sort: MatSort;

  /**
   * Gets called when table selection is being changed
   */
  @Output() selectionChanged = new EventEmitter<SelectionModel<Reservation>>();

  /**
   * Refresh data trigger
   */
  @Input() refreshTrigger: EventEmitter<any>;

  /**
   * reservations
   */
  reservations: Reservation[];

  constructor(
    private apiService: ApiService,
  ) {
    this.loadData();
  }

  /**
   * ngOninit
   * 
   * - subscribe to selection change
   * - subscribe to refresh trigger
   * - subscribe to show completed reservations emitter
   */
  ngOnInit(): void {
    /**
     * Will be fired if events change to stream the output to the parent component
     */
    this.selection.changed.subscribe(change => {
      this.selectionChanged.next(this.selection);
    })

    this.showCompletedReservations.subscribe(showCompletedReservationsValue => {
      this.showCompleted = showCompletedReservationsValue;
      this.loadData();
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
    this.apiService.getAllReservations$().subscribe(reservations => {
      if (!this.showCompleted) {
        reservations = reservations.filter(reservation => (!reservation.completed));
      }

      this.loadingCompleted = false;
      console.log(reservations)
      this.dataSource = new MatTableDataSource<Reservation>([...reservations]);
      this.dataSource.paginator = this.paginator;
      this.loadingCompleted = true;
      this.reservations = reservations;
      this.deselectAll();
    });
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
      return new Date(number).toLocaleDateString() + ' um ' + new Date(number).toLocaleTimeString();
    }
    return '-'
  }

}
