import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/models/Item';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.scss']
})
export class InventoryPageComponent implements OnInit {

  /**
   * Columns displayed
   */
  displayedColumns: string[] = ['itemId', 'name', 'description', 'available', 'reservationCount', 'ownership'];

  /**
   * Datasource
   */
  dataSource: MatTableDataSource<Item> = [] as any;

  /**
   * Flag to reference loading state
   */
  loadingCompleted = false;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Loads the table with data
   */
  loadData(): void {
    this.apiService.getInventory$().subscribe(items => {
      console.log(items)
      this.dataSource = new MatTableDataSource<Item>(JSON.parse(JSON.stringify(items)) || []);
      this.loadingCompleted = true;
    });
  }


}
