import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { chartDataAPILink, userSessionDataAPILink } from '../../constants/chart.constant';

@Injectable()

export class ChartService {

  constructor(private http: HttpClient) { }

  getChartData() {
    return this.http.get(chartDataAPILink);
  }

  getUserSessionData() {
    return this.http.get(userSessionDataAPILink);
  }
}
