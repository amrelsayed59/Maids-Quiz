import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { NotificationsService, RequestService } from '@core/services';
import { HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import 'rxjs';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public logoutSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private _translateService: TranslateService,
    private titleService: Title,
    private requestService: RequestService,
    private notificationsService: NotificationsService
  ) {}

  handleErrors(res: any) {
    if (res.status === 441 || res.status === 403) {
    }
    const errors = res.error.errors;
    Object.keys(errors).forEach((key) => {
      if (typeof errors[key] === 'string')
        this.showTranslatedToast(
          'danger',
          errors[key],
          'something-went-wrong',
          10000
        );
      else
        errors[key].forEach((err: any) =>
          this.showTranslatedToast('danger', err, 'something-went-wrong', 10000)
        );
    });
  }

  post(url: string, body?: any) {
    return this.requestService.post(url, body).pipe(
      map((res: any) => res),
      catchError((res: any) => {
        this.handleErrors(res);
        return throwError(res);
      })
    );
  }
  get(url: string, params?: HttpParams) {
    const request = params
      ? this.requestService.get(url, params)
      : this.requestService.get(url);
    return request.pipe(
      map((res: any) => res),
      catchError((res: any) => {
        this.handleErrors(res);
        return throwError(res);
      })
    );
  }
  put(url: string, body?: any) {
    return this.requestService.put(url, body).pipe(
      map((res: any) => res),
      catchError((res: any) => {
        this.handleErrors(res);
        return throwError(res);
      })
    );
  }
  patch(url: string, body?: any) {
    return this.requestService.patch(url, body).pipe(
      map((res: any) => res),
      catchError((res: any) => {
        this.handleErrors(res);
        return throwError(res);
      })
    );
  }
  delete(url: string) {
    return this.requestService.delete(url).pipe(
      map((res: any) => res),
      catchError((res: any) => {
        this.handleErrors(res);
        return throwError(res);
      })
    );
  }
  postFileService(url: string, data: any) {
    return this.requestService.postFileService(url, data).pipe(
      map((res: any) => res),
      catchError((res: any) => {
        this.handleErrors(res);
        return throwError(res);
      })
    );
  }

  showNgxToast(
    message: string,
    title: string,
    type: string,
    duration: number,
    config = {}
  ) {
    if (type === 'danger') {
      this.notificationsService.error(title, message, duration);
    }
    if (type === 'success') {
      this.notificationsService.success(title, message, duration);
    }
    if (type === 'info') {
      this.notificationsService.info(title, message, duration);
    }
    if (type === 'warning') {
      this.notificationsService.warn(title, message, duration);
    }
  }
  showTranslatedToast(
    status: string,
    msg: string,
    title: string,
    duration = 5000
  ) {
    let translated_title = '';
    let translated_msg = '';
    const sub = this._translateService
      .get(title || ' ')
      .pipe(
        mergeMap((x) => {
          translated_title = x;
          return this._translateService.get(msg || ' ');
        })
      )
      .subscribe((y: string) => {
        translated_msg = y;
        this.showNgxToast(translated_msg, translated_title, status, duration);
      });
    setTimeout(() => {
      sub.unsubscribe();
    }, 1000);
  }

  setTitle(title: any): void {
    const sub = this._translateService.get(title).subscribe((translation) => {
      this.titleService.setTitle(translation);
    });
    sub.unsubscribe();
  }

  logout() {
    this.logoutSubject.next(true);
  }
}
