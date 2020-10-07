import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SpinerService } from './services/spiner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router,
    private spiner: SpinerService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.isAuth()) {
      req = req.clone({
        setParams: {
          auth: this.auth.getToken(),
        },
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.auth.logout();
          this.router.navigate(['login']);
          this.spiner.loadingEnd();
        }
        return throwError(error);
      })
    );
  }
}
