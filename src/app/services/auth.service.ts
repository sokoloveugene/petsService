import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { loginResponseInterface } from '../../interfaces';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) {}

  login(user: {
    email: string;
    password: string;
    returnSecureToken?: boolean;
  }) {
    user.returnSecureToken = true;

    const next = (res: loginResponseInterface): void => {
      const expiresAt = Date.now() + Number(res.expiresIn) * 1000;
      const isDoctor = user.email.includes('@doc');
      const isAdmin = user.email.includes('@admin');

      try {
        localStorage.setItem('token', JSON.stringify(res.idToken));
        localStorage.setItem('isDoctor', JSON.stringify(isDoctor));
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
        localStorage.setItem('expiresAt', JSON.stringify(expiresAt));
        localStorage.setItem('userId', JSON.stringify(res.localId));

        this.router.navigate(['']);
        if (isAdmin) {
          this.alertService.success('Hello, Admin');
        } else {
          this.alertService.success(
            `Dear, ${
              isDoctor ? 'Doctor' : 'Customer'
            }, congratulations your account was successfully created`
          );
        }
      } catch (err) {
        console.warn;
      }
    };

    const error = (err) => {
      this.alertService.error(
        'We couldn’t find an account matching this email and password, please check again'
      );
      console.warn(err.error.error.message);
    };

    this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        JSON.stringify(user)
      )
      .subscribe(next, error);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.alertService.error('You were logged out');
  }

  isAuth() {
    try {
      const expiresAt = Number(localStorage.getItem('expiresAt'));
      if (Date.now() - expiresAt < 0) {
        return !!localStorage.getItem('token');
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      localStorage.clear();
      return false;
    }
  }

  isDoctor() {
    try {
      return JSON.parse(localStorage.getItem('isDoctor'));
    } catch (err) {
      console.warn(err);
      this.logout();
      return false;
    }
  }

  isAdmin() {
    try {
      return JSON.parse(localStorage.getItem('isAdmin'));
    } catch (err) {
      console.warn(err);
      this.logout();
      return false;
    }
  }

  userId() {
    try {
      return JSON.parse(localStorage.getItem('userId'));
    } catch (err) {
      console.warn(err);
      this.logout();
    }
  }
}
