import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as Highcharts from 'highcharts';
import { IUserSession } from 'src/app/shared/DTOs/IUserSession';
import { DashboardService } from './dashboard.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';
import * as $ from 'jquery';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  chartCount: number = 0;
  version: number = 0;
  userSessionData = {};
  form: FormGroup;
  jwtHelperService: JwtHelperService;
  isErrorOccurred: boolean = false;
  errorMessage: string;

  range: Range = { fromDate: new Date(), toDate: new Date() };
  ngxDrpOptions: NgxDrpOptions;
  presets: Array<PresetItem> = [];

  public options: any = {
    chart: {
      type: 'column',
      width: 500,
      height: 500
    },
    title: {
      text: ''
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

  constructor(private authService: AuthService, private dashboardService: DashboardService) {
    this.jwtHelperService = new JwtHelperService();
  }

  ngOnInit() {
    this.sidebarCollapseJquery();
    this.dateRangePickerConfig();
    this.createInitSessionDataObject();
    this.createReactiveForm();
    this.createInitChartStructure();

    setTimeout(() => {
      this.getInitChartData();
    }, 500);
  }

  sidebarCollapseJquery() {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
      });
    });
  }

  createInitSessionDataObject() {
    this.userSessionData = {
      users: [
        {
          email: this.jwtHelperService.decodeToken(localStorage.getItem('token')).email,
          version: this.version,
          data: {}
        }
      ]
    }
  }

  createReactiveForm() {
    this.form = new FormGroup({
      charts: new FormArray([])
    });
  }

  get charts(): FormArray { return this.form.get('charts') as FormArray; }

  createChart() {
    this.charts.push(new FormControl());
  }

  createInitChartStructure() {
    if (localStorage.getItem('userSessionData')) {
      let result = JSON.parse(localStorage.getItem('userSessionData'));
      let user: IUserSession = result['users'].find((user) => { return user.email == this.jwtHelperService.decodeToken(localStorage.getItem('token')).email });
      if (user) {
        for (let prop in user.data) {
          if (user.data[prop].length > 0) {
            this.createChart();
          }
        }
      }
    }
  }

  getInitChartData() {
    //Reading data from localStorage
    if (localStorage.getItem('userSessionData')) {
      let result = JSON.parse(localStorage.getItem('userSessionData'));
      let user: IUserSession = result['users'].find((user) => { return user.email == this.jwtHelperService.decodeToken(localStorage.getItem('token')).email });
      if (user) {
        this.version = user.version;

        for (let prop in user.data) {
          if (user.data[prop].length > 0) {
            this.options.series[0]['data'] = user.data[prop];
            Highcharts.chart(`chart${this.chartCount}`, this.options);
            this.updateSessionData(user.data[prop]);
            this.chartCount++;
          }
        }
      }
    }
  }

  addWidget() {
    this.createChart();

    this.dashboardService.getChartData()
      .subscribe(
        data => {
          this.isErrorOccurred = false;
          this.options.series[0]['data'] = data;
          Highcharts.chart(`chart${this.chartCount}`, this.options);
          this.updateSessionData(data);
          this.chartCount++;
        },
        error => {
          this.delete(this.chartCount);
          this.errorMessage = error;
          this.isErrorOccurred = true;
        }
      );
  }

  save() {
    this.userSessionData["users"][0]["version"] = ++this.version;
    localStorage.setItem('userSessionData', JSON.stringify(this.userSessionData));
  }

  clear() {
    localStorage.removeItem('userSessionData');
  }

  delete(i) {
    this.charts.removeAt(i);
    this.deleteSessionData(i);
    this.chartCount--;
  }

  updateSessionData(data) {
    this.userSessionData["users"][0].data[this.chartCount] = data;
  }

  deleteSessionData(i) {
    this.userSessionData["users"][0].data[i] = [];
  }

  setupPresets() {

    const backDate = (numOfDays) => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() - numOfDays));
    }

    const today = new Date();
    const yesterday = backDate(1);
    const minus7 = backDate(7)
    const minus30 = backDate(30);
    const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    this.presets = [
      { presetLabel: "Yesterday", range: { fromDate: yesterday, toDate: today } },
      { presetLabel: "Last 7 Days", range: { fromDate: minus7, toDate: today } },
      { presetLabel: "Last 30 Days", range: { fromDate: minus30, toDate: today } },
      { presetLabel: "This Month", range: { fromDate: currMonthStart, toDate: currMonthEnd } },
      { presetLabel: "Last Month", range: { fromDate: lastMonthStart, toDate: lastMonthEnd } }
    ]
  }

  dateRangePickerConfig() {

    const today = new Date();
    const fromMin = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const fromMax = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const toMin = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const toMax = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    this.setupPresets();
    this.ngxDrpOptions = {
      presets: this.presets,
      format: 'mediumDate',
      range: { fromDate: today, toDate: today },
      applyLabel: "Submit",
      calendarOverlayConfig: {
        shouldCloseOnBackdropClick: false
      }
      // cancelLabel: "Cancel",
      // excludeWeekends:true,
      // fromMinMax: {fromDate:fromMin, toDate:fromMax},
      // toMinMax: {fromDate:toMin, toDate:toMax}
    };
  }

  updateRange(range: Range) {
    this.range = range;
  }

}
