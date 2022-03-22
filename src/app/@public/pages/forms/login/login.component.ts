import { IMeData } from '@core/interfaces/session.interface';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { AuthService } from '@core/services/auth.service';
import { Component } from '@angular/core';
import { ILoginForm, IResultLogin } from '@core/interfaces/login.interface';
import { basicAlert } from '@shared/alerts/toasts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: ILoginForm = {
    email: '',
    password: '',
  };
  constructor(private auth: AuthService, private router: Router) {}

  init() {
    console.log(this.login);
    this.auth
      .login(this.login.email, this.login.password)
      .subscribe((result: IResultLogin) => {
        console.log(result);
        if (result.status) {
          if (result.token !== null) {
            this.auth.setSession(result.token);
            this.auth.updateSession(result);
            if (localStorage.getItem('router_after_login')) {
              this.router.navigate([localStorage.getItem('router_after_login')]);
              localStorage.removeItem('router_after_login');
              return;
            }
            this.router.navigate(['/home']);
            return;
          }
          basicAlert(TYPE_ALERT.WARNING, result.message);
          return;
        }
        basicAlert(TYPE_ALERT.INFO, result.message);
      });
  }
}
