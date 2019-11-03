import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { ICredentials } from '../DTOs/ICredentials';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) {

  }

  login(credentials: ICredentials) {
    return this.http.post('/user/authenticate', JSON.stringify(credentials))
      .map(response => {
        let result = response;

        if (result && result['token']) {
          localStorage.setItem('token', result['token']);
          return true;
        }
        else return false;
      });
  }

  logout() {
    this.router.navigate(['login']);
    localStorage.removeItem('token');
    localStorage.removeItem('page-not-found');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

}
