import { Component, OnInit } from '@angular/core';
import { concat, Observable } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { ApiService } from 'src/app/services/api.service';
import { CsvImporterService } from 'src/app/services/csv-importer.service';
import { InfoTableService } from 'src/app/services/info-table.service';

@Component({
  selector: 'app-csv-file-selector',
  templateUrl: './csv-file-selector.component.html',
  styleUrls: ['./csv-file-selector.component.scss']
})
export class CsvFileSelectorComponent implements OnInit {

  constructor(
    private csvImporterService: CsvImporterService,
    private infoTableService: InfoTableService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void { }

  /**
   * Handles file input
   */
  handleFileInput(files: any) {
    if (files) {
      let file = files[0]

      // Read file content
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.parseAndValidateCsvFile(fileReader.result)
      }
      // Read the content
      fileReader.readAsText(file);
    }
  }

  /**
   * Parse csv data and show information about the items which would be added
   */
  private parseAndValidateCsvFile(string: any) {
    this.csvImporterService.importDevices(string).then((items: Item[]) => {
      // Show info table with the continue action displayed
      this.infoTableService.showInfoTableWithContinueAction("Importiert", "Diese Items werden importiert", ['name', 'internalName', 'caIdentifier', 'modelIdentifier', 'notes'], items).subscribe(result => {
        if (result) {
          this.createItems(items); // Sequential creation
        }
      });
    })
  }

  /**
   * This will call the api and create the items needed
   * - runs sequential
   * - hacky
   */
  createItems(items: Item[]) {
    let subs = []
    items.forEach(item => {
      subs.push(this.apiService.createItem$(item))
    })
    concat(...subs).subscribe(function (observableItems) { })
  }

}
