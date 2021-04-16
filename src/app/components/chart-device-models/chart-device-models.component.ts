import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeviceModel } from 'src/app/models/DeviceModel';

@Component({
  selector: 'app-chart-device-models',
  templateUrl: './chart-device-models.component.html',
  styleUrls: ['./chart-device-models.component.scss']
})
export class ChartDeviceModelsComponent implements OnInit {

  /**
   * Model stats emitter
   */
  @Input() modelStats: EventEmitter<any>;

  pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
  }

  ngOnInit(): void {
    this.modelStats.subscribe((data) => {
      const modelAndAmount: any = data.modelAndAmount
      console.log("Loading")
      if (modelAndAmount) {
        let names = modelAndAmount.map((model) => model.modelName);
        let amount = modelAndAmount.map((model) => model.amount);

        this.pieChartData = amount;
        this.pieChartLabels = names;
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
        console.log("Build!")
      }
    })
  }
}