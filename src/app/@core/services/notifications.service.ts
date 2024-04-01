import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: "root"
})
export class NotificationsService {

  constructor(private toastr: ToastrService) {
  }

  private config = {
    timeOut: 10000,
    tapToDismiss: true,
  };

  info(title: string, message: string, duration?: number, config?: object): void {
    if (duration) this.config.timeOut = duration;
    this.toastr.info(message, title, {
      ...this.config, ...config,
    });
  }
  success(title: string, message: string, duration?: number, config?: object): void {
    if (duration) this.config.timeOut = duration;
    this.toastr.success(message, title, {
      ...this.config, ...config,
    });
  }
  warn(title: string, message: string, duration?: number, config?: object): void {
    if (duration) this.config.timeOut = duration;
    this.toastr.warning(message, title, {
      ...this.config, ...config,
    });
  }
  error(title: string, message: string, duration?: number, config?: object): void {
    if (duration) this.config.timeOut = duration;
    this.toastr.error(message, title, {
      ...this.config, ...config,
    });
  }

}
