import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CES';

  constructor(private authService: AuthService) {

  }

  get isPageNotFound(): boolean {
    return localStorage.getItem('page-not-found') == null;
  }

}
