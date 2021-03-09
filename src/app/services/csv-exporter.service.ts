import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvExporterService {

  /**
   * Constructs new csv exporter service
   */
  constructor() { }

  generateCsvData(columns: string[], datasets: any[]): string {
    let data = columns.join("\",\"")
    data = "\"" + data + '"\n';
    datasets.forEach(dataset => {
      data += this.getSingleRowOfDataset(columns, dataset);
      data += '\n';
    })

    return data
  }

  /**
   * Get a single row out of a dataset
   * 
   * @param columns 
   */
  getSingleRowOfDataset(columns: string[], dataset: any): string {
    let data = "";
    columns.forEach(column => {
      // add column

      // special column, add +49 as prefix
      if (column === 'phoneNumber') {
        data += dataset[column] ? `"${'+49' + dataset[column]}"` : '';
      } else {
        data += dataset[column] ? `"${dataset[column]}"` : '';
      }

      // Do not add seperator to the last index
      if (!(column === columns[columns.length - 1])) {
        data += (',')
      }
    })
    return data;
  }

  /**
   * Download CSV File
   */
  downloadCSV(columns: string[], datasets: any[]) {
    let csvFile = this.generateCsvData(columns, datasets);
    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement("a");
    let datenow = Date.now()
    let formatted = new Date(datenow).toLocaleDateString() + '_' + new Date(datenow).toLocaleTimeString();

    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", 'Export_' + formatted);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
