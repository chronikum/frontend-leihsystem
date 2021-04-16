import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-reservation-user',
  templateUrl: './chart-reservation-user.component.html',
  styleUrls: ['./chart-reservation-user.component.scss']
})
export class ChartReservationUserComponent implements OnInit {

  /**
   * Model stats emitter
   */
  @Input() userReservationStats: EventEmitter<any>;

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
    this.userReservationStats.subscribe((data) => {
      const userReservations: any = data.userReservations
      if (userReservations) {
        console.log(userReservations)
        let names = userReservations.map((group) => group.displayName);
        let amount = userReservations.map((group) => group.amount);

        this.pieChartData = amount;
        this.pieChartLabels = names;
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
      }
    })
  }

}
