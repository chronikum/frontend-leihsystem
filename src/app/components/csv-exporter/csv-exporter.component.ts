import { Component, Input, OnInit } from '@angular/core';
import { CsvExporterService } from 'src/app/services/csv-exporter.service';

@Component({
  selector: 'app-csv-exporter',
  templateUrl: './csv-exporter.component.html',
  styleUrls: ['./csv-exporter.component.scss']
})
export class CsvExporterComponent implements OnInit {

  /**
   * data to export
   */
  @Input() data: any[];

  /**
   * Column names
   */
  @Input() columns: string[] = [];

  /**
   * constructs a new instance of csv exporter
   * @param exporterService csv exporter
   */
  constructor(
    private exporterService: CsvExporterService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Parse and download data
   */
  exportData() {
    this.exporterService.downloadCSV(this.columns, this.data);
  }


}
