import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ICredentials } from 'src/app/shared/DTOs/ICredentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  invalidLogin: boolean;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  signIn(credentials: ICredentials) {
    this.authService.login(credentials)
      .subscribe(result => {
        if (result)
          this.router.navigate(['dashboard']);
        else
          this.invalidLogin = true;
      });
  }


}
