import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceModel } from 'src/app/models/DeviceModel';
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
  displayedColumns: string[] = ['select', 'itemId', 'name', 'type', 'description', 'available', 'reservationCount', 'qrcode'];

  /**
   * Datasource
   */
  dataSource: MatTableDataSource<Item> = [] as any;

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
  selection = new SelectionModel<Item>(true, []);

  @ViewChild('searchInput') searchInput: ElementRef;

  @ViewChild(MatSort) sort: MatSort;

  /**
   * All device models
   */
  allDeviceModels: DeviceModel[];

  /**
   * Gets called when table selection is being changed
   */
  @Output() selectionChanged = new EventEmitter<SelectionModel<Item>>();

  /**
   * Refresh data trigger
   */
  @Input() refreshTrigger: EventEmitter<any>;

  /**
   * Show QR Code Emitter - emits the qr code content string
   */
  @Output() showQRCodeEmitter = new EventEmitter<Item>();

  constructor(
    private apiService: ApiService,
  ) {
    this.loadDeviceModels();
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

    /**
     * Load all device models from the server
     */
  }

  /**
   * Gets all device models in the table
   */
  loadDeviceModels() {
    this.apiService.getAllModels$().subscribe(response => {
      this.allDeviceModels = response.deviceModels;
    })
  }


  /**
   * Get the device model name for the given item. If not available, return "-"
   * @param device to get the device model name from
   * @returns display name as string
   */
  getNameOfDeviceModel(device: Item): string {
    // Also load preselected item in model table if available
    if (device?.modelIdentifier && this.allDeviceModels) {
      const selectedDeviceModel: DeviceModel = this.allDeviceModels.find(x => x.deviceModelId === device.modelIdentifier);
      if (selectedDeviceModel) {
        return selectedDeviceModel?.displayName;
      }
    }
    return "-";
  }
  /**
   * Loads the table with data
   */
  loadData(): void {
    this.apiService.getInventory$().subscribe(items => {
      this.loadingCompleted = false;
      items.forEach(item => {
        item.deviceModelName = this.getNameOfDeviceModel(item);
      })
      this.dataSource = new MatTableDataSource<Item>([...items]);
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
