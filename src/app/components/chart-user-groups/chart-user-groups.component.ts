import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-user-groups',
  templateUrl: './chart-user-groups.component.html',
  styleUrls: ['./chart-user-groups.component.scss']
})
export class ChartUserGroupsComponent implements OnInit {

  /**
   * Model stats emitter
   */
  @Input() groupStats: EventEmitter<any>;

  pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
  }

  /**
   * Read data and build graph
   */
  ngOnInit(): void {
    this.groupStats.subscribe((data) => {
      const userAndGroups: any = data.userAndGroups
      if (userAndGroups) {
        console.log(userAndGroups)
        let names = userAndGroups.map((group) => group.displayName);
        let amount = userAndGroups.map((group) => group.amount);

        this.pieChartData = amount;
        this.pieChartLabels = names;
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
      }
    })
  }

}
