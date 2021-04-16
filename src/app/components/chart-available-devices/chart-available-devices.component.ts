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

  public pieChartLabels: Label[];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.availableStats.subscribe(chartData => {
      let data = chartData.availableItemsStat;
      this.pieChartData.push(data.available)
      this.pieChartData.push(data.reserved)
      this.pieChartLabels = ['Verfügbar', 'Belegt'];
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
    })
  }

}
