import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceModel } from 'src/app/models/DeviceModel';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-device-model-table',
  templateUrl: './device-model-table.component.html',
  styleUrls: ['./device-model-table.component.scss']
})
export class DeviceModelTableComponent implements OnInit {

  /**
  * Columns displayed
  */
  displayedColumns: string[] = ['select', 'deviceModelId', 'displayName', 'description', 'capabilities', 'defaultDeviceValue'];

  /**
   * Datasource
   */
  dataSource: MatTableDataSource<DeviceModel> = [] as any;

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
  selection = new SelectionModel<DeviceModel>(true, []);

  @ViewChild('searchInput') searchInput: ElementRef;

  @ViewChild(MatSort) sort: MatSort;

  /**
   * Gets called when table selection is being changed
   */
  @Output() selectionChanged = new EventEmitter<SelectionModel<DeviceModel>>();

  /**
   * Refresh data trigger
   */
  @Input() refreshTrigger: EventEmitter<any>;

  /**
   * Show QR Code Emitter - emits the qr code content string
   */
  @Output() showQRCodeEmitter = new EventEmitter<DeviceModel>();

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
    this.apiService.getAllModels$().subscribe(response => {
      const models = response.deviceModels;
      console.log(models)
      this.loadingCompleted = false;
      this.dataSource = new MatTableDataSource<DeviceModel>([...models]);
      this.dataSource.paginator = this.paginator;
      this.loadingCompleted = true;
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

}
