import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signUpInterface } from '../../interfaces';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { loginResponseInterface } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {}

  signUp(user: signUpInterface) {
    const next = (res: loginResponseInterface): void => {
      const expiresAt = Date.now() + Number(res.expiresIn) * 1000;
      const isAdmin = user.email.includes('@test');
      try {
        localStorage.setItem('token', JSON.stringify(res.idToken));
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
        localStorage.setItem('expiresAt', JSON.stringify(expiresAt));
        localStorage.setItem('userId', JSON.stringify(res.localId));

        this.router.navigate(['']);
        this.alertService.success(
          `Dear,${
            isAdmin ? 'Doctor' : 'Customer'
          }, congratulations your account was successfully created`
        );
      } catch (err) {
        console.warn;
      }
    };

    const error = (err) => {
      this.alertService.error('Something went wrong, please try again later');
      console.warn(err.error.error.message);
    };

    this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
        JSON.stringify(user)
      )
      .subscribe(next, error);
  }
}
