import { Injectable } from '@angular/core';
import { DeviceModel } from '../models/DeviceModel';
import { Item } from '../models/Item';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CsvImporterService {

  /**
   * All device models
   */
  private allModels: DeviceModel[] = [];

  /**
   * Returns a instance of csv import service
   */
  constructor(
    private apiService: ApiService
  ) {
    this.reloadModelList();
  }


  /**
   * Load all models available
   */
  reloadModelList() {
    this.apiService.getAllModels$().subscribe(response => {
      if (response.success) {
        this.allModels = response.deviceModels;
      }
    })
    return true
  }

  /**
   * Import devices from csv
   * 
   * @param csvString
   * @return a list of Item[]
   */
  async importDevices(csvString: string): Promise<Item[]> {
    await this.reloadModelList();
    let columns = this.getColumns(csvString);
    let data = this.csvDataWithoutColumns(csvString);
    if (columns && data) {
      let arrayData = this.parseCSV(data, columns); // Get objects with specified field name from the csv file
      let items = this.createItemsFromDataset(arrayData)
      return Promise.resolve(items);
    }
    return null;
  }

  /**
   * Create Item objects with given dataset
   * 
   * @param array with values
   * @returns Item[]
   */
  private createItemsFromDataset(array: any[]): Item[] {
    let items: Item[] = [];
    array.forEach(itemCandidate => {
      let deviceModelName = itemCandidate?.deviceModelName;
      let deviceModel = this.loadModelForDeviceModelDisplayName(deviceModelName);
      if (deviceModel) {
        if (itemCandidate.name) {
          const createdItem: Item = {
            name: itemCandidate?.name,
            internalName: itemCandidate?.name,
            caIdentifier: itemCandidate?.caIdentifier,
            modelIdentifier: deviceModel?.deviceModelId ? deviceModel.deviceModelId : null,
            notes: itemCandidate?.notes
          } as Item
          items.push(createdItem);
        }
      }
    })
    return items;
  }

  /**
   * The csv data without column headers
   */
  csvDataWithoutColumns(data: string): string {
    let splitted: string[] = data.split("\n");
    splitted.shift();
    return splitted.join("\n");
  }

  /**
   * Get the column names
   */
  getColumns(dataset: string): string[] {
    let columns = [];
    let splitted: string[] = dataset.split("\n");
    if (splitted[0]) {
      let columns = splitted[0].split(",");
      return columns;
    }
  }

  /**
   * Parse csv in a any json object holding all values
   */
  parseCSV(csvString: string, columns: string[]): any[] {
    let dataset = []; // JSON representation of all data
    let rows = csvString.split("\n"); // Get rows by splitting by \n
    for (let rowRef in rows) { // For every row in rows (which is made of the csvString)
      let row = rows[rowRef];
      let splittedRow = row.split(",") // as we are using csv we are using a comma delimiter to seperate values from each other in rows
      let rowToAdd = {};
      for (const columnNameRef in columns) { // For every column index we apply the value to the created field in a new object
        let columnName = columns[columnNameRef]; // read in column name
        rowToAdd[columnName] = splittedRow[columnNameRef]; // Apply the value which corrolates to the field ref
      }
      dataset.push(rowToAdd);
    }
    return dataset;
  }

  /**
   * Loads the model id for the given device model display name
   */
  loadModelForDeviceModelDisplayName(displayName: string): DeviceModel {
    let model = this.allModels.find(model => model.displayName === displayName);
    if (!model) {
      return null;
    }
    return model;
  }

}
