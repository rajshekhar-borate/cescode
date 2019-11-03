import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from './chart.service';
import { IUserSession } from '../../DTOs/IUserSession';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: [ChartService]
})
export class ChartComponent implements OnInit {

  public options: any = {
    chart: {
      type: 'column',
      width: 500,
      height: 500
    },
    title: {
      text: 'Stock Price'
    },
    navigator: {
      enabled: false
    },
    series: [
      {
        name: 'Stock Price',
        tooltip: {
          valueDecimals: 2
        },
        data: []
      }
    ]
  }

  constructor(private chartService: ChartService) { }

  ngOnInit() {
    this.getInitChartData();
  }

  getInitChartData() {
    this.chartService.getUserSessionData()
      .subscribe((result) => {
        let user: IUserSession = result['users'].find((user) => { return user.email == "rajshekharborate@gmail.com" });
        this.options.series[0]['data'] = user.data[0];
        Highcharts.chart('container', this.options);
      });
  }


}
