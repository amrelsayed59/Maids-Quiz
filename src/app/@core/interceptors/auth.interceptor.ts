import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private pendingHTTPRequests$ = new Subject<void>();

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userData = localStorage.AuthorizationData;
    const helper = new JwtHelperService();

    if (userData) {
      const token = localStorage.getItem('token');
      if (token) {
        const isExpired = helper.isTokenExpired(token);
        if (isExpired) {
          localStorage.clear();
          location.reload();
          this.pendingHTTPRequests$.next();
        }
      }

      if (!token) {
        return next.handle(req);
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const req1 = req.clone({ headers });

      return next.handle(req1);
    } else {
      return next.handle(req);
    }
  }
}
