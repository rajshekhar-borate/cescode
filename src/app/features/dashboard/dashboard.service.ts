import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { chartDataAPILink, userSessionDataAPILink } from 'src/app/shared/constants/chart.constant';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getChartData() {
    return this.http.get(chartDataAPILink)
      .pipe(
        catchError(this.handleError)
      );;
  }

  getUserSessionData() {
    return this.http.get(userSessionDataAPILink);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
     return throwError(
        'Something bad happened at client side; please try again later.');
    } else {
     return throwError(
        'Something bad happened at server side; please try again later.');
    }
  };
}
