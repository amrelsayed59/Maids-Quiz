import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoaderService } from '@core/loader/loader.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.loaderService.hide();
        return throwError(error);
      })
    );
  }
}
