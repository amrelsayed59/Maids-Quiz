import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from '@core/services';
import { LoggingService } from '@core/services/logging.service';
import { ErrorService } from '@core/services/error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationsService);
    let message;
    let errorType: string;
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerErrorMessage(error);
      errorType = 'Server Side Error';
      notifier.error('Error', message);
    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
      errorType = 'Client Side Error';
      notifier.error('Error', message);
    }
    // Always log errors
    logger.logError(message);
  }
}
