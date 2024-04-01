
import { ServerErrorInterceptor } from './server-error.interceptor';

export const interceptors: any[] = [
    ServerErrorInterceptor,
  ];

export * from './server-error.interceptor';