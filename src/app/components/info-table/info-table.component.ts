import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-info-table',
  templateUrl: './info-table.component.html',
  styleUrls: ['./info-table.component.scss']
})
export class InfoTableComponent implements OnInit {

  /**
   * The columns which should be displayed
   */
  @Input() displayedColumns: string[];

  /**
   * Height
   */
  @Input() height: string = '300px';

  /**
   * Elements in the first selected paginator
   */
  @Input() previewElements: number[] = [5, 10, 15];

  /**
   * The datasource (item[]) you want to show
   */
  @Input() data: any[] = [];

  /**
   * Refresh data via event emitter
   */
  @Input() dataEmitter?: EventEmitter<any[]>;

  /**
   * Datasource
   */
  dataSource: MatTableDataSource<any> = [] as any;


  /**
   * Paginator
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>([...this.data]);
    this.dataSource.paginator = this.paginator;
    if (this.dataEmitter) {
      this.dataEmitter.subscribe(data => {
        this.data = data;
        this.dataSource = new MatTableDataSource<any>([...this.data]);
        this.dataSource.paginator = this.paginator;
      })
    }
  }

  /**
   * Filter for given string
   */
  filter(filterValue?: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
