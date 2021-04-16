import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-available-devices',
  templateUrl: './chart-available-devices.component.html',
  styleUrls: ['./chart-available-devices.component.scss']
})
export class ChartAvailableDevicesComponent implements OnInit {

  /**
   * EventEmitter with the stats
   */
  @Input() availableStats: EventEmitter<any>;

  pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = ['Verfügbar', 'Belegt'];
  public pieChartData: SingleDataSet = [100, 10];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.availableStats?.subscribe(data => {
      this.pieChartData[0] = data.available || 0
      this.pieChartData[1] = data.reserved || 0
    })
  }

}
