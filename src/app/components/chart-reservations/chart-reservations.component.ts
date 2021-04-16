import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-reservations',
  templateUrl: './chart-reservations.component.html',
  styleUrls: ['./chart-reservations.component.scss']
})
export class ChartReservationsComponent implements OnInit {

  /**
   * Model stats emitter
   */
  @Input() reservationStats: EventEmitter<any>;

  pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = ['Nicht abgeschlossen', 'Abgeschlossen'];
  public pieChartData: SingleDataSet = [1, 1];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
  }

  ngOnInit(): void {
    this.reservationStats.subscribe((data) => {
      const reservationsStats: any = data?.reservationsStats
      if (reservationsStats) {
        this.pieChartData = [reservationsStats.total, reservationsStats.completed]
      }
    })
  }

}
