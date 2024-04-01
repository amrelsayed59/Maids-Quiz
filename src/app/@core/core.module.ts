import { ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandler } from './helpers';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerErrorInterceptor } from './interceptors';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
 }
