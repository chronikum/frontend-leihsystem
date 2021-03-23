import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceModel } from 'src/app/models/DeviceModel';
import { Item } from 'src/app/models/Item';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-review-request-selector-table',
  templateUrl: './review-request-selector-table.component.html',
  styleUrls: ['./review-request-selector-table.component.scss']
})
export class ReviewRequestSelectorTableComponent implements OnInit {

  /**
   * The columns which should be displayed
   */
  displayedColumns: string[] = ['select', 'itemId', 'name', 'type', 'description'];

  /**
   * The datasource (item[]) you want to show
   */
  @Input() dataEmitter: EventEmitter<Item[]>;

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

  /**
   * All device models available
   */
  allDeviceModels: DeviceModel[];

  /**
   * All the available items
   */
  data: Item[];

  constructor(
    private apiService: ApiService,
  ) {
  }

  /**
   * Load data in - if no selection is given from the outside, initialize the selection
   */
  ngOnInit(): void {
    this.loadDeviceModels();
    this.dataEmitter.subscribe(data => {
      this.data = data;
      console.log("SUG2")
      console.log(data)
      this.dataSource = new MatTableDataSource<any>([...this.data]);
      this.dataSource.paginator = this.paginator;
    })
    if (!this.selection) {
      this.selection = new SelectionModel<any>(true, []);
    }

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

  /**
   * Model handling
   */

  /**
   * Gets all device models in the table
   */
  loadDeviceModels() {
    this.apiService.getAllModels$().subscribe(response => {
      this.allDeviceModels = response.deviceModels;
    })
  }

  /**
   * Returns the model string for the model identifier
   * 
   * @param item
   * @returns model string
   */
  getNameOfDeviceModel(item: Item): string {
    return this.allDeviceModels.filter(model => model.deviceModelId === item.modelIdentifier)[0]?.displayName || '-';
  }

}
