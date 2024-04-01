import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  public logError(message: string) {
    // Send errors to server here
    console.error('Logging Error: ' + message);
  }

  public logWarning(message: string) {
    console.warn('Logging Warning: ' + message);
  }

  public logInfo(message: string) {
    console.info('Logging Info: ' + message);
  }

  public logVerbose(message: string) {
    console.debug('Logging Verbose: ' + message);
  }
}
