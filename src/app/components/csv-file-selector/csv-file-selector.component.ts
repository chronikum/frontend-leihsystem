import { Component, OnInit } from '@angular/core';
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
    this.csvImporterService.importDevices(string).then(items => {
      this.infoTableService.showInfoTableWithContinueAction("Importiert", "Diese Items werden importiert", ['name', 'internalName', 'caIdentifier', 'modelIdentifier', 'notes'], items).subscribe(result => {
        console.log(result)
      });
    })
  }

}
