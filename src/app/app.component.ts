import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { TranslationKeys } from '@core/enums/translation-keys.enum';
import { TranslationService } from '@core/services/translate.service';
import {
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@Component({
  selector: 'app-root',
  template: `
  <section appRtl>
    <router-outlet></router-outlet>
    <app-loader></app-loader>
  </section>

  `,
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'ar', multi: true },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    //format: MAT_MOMENT_DATE_FORMATS
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AppComponent {
  /** variable the stroe value after get ir from
   *  default language from local storage on app start up */
  defaultLang =
    localStorage.getItem(TranslationKeys.TRANSLATION_KEY) !== null
      ? localStorage.getItem(TranslationKeys.TRANSLATION_KEY)?.toString()
      : 'en';

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    @Inject('window') private _window: Window,
    private translationService: TranslationService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang(String(this.defaultLang));
    this.changeLanguage(this.defaultLang);
  }

  /** @description this method is used to toggle between languages
   *
   */
  changeLanguage(lang?: any) {
    // Add the selected language to the Local Storage
    this._window.localStorage.setItem(TranslationKeys.TRANSLATION_KEY, lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    ////////////////////////////////////

    if (lang === 'ar') {
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      this.translationService.setAppDefaultLang(lang);
      this.dateAdapter.setLocale('ar');
      // this line to change the dire of the index page
      this.document.getElementById('htmlParent')?.setAttribute('dir', 'rtl');
      // this line to change the language
      this.document.getElementById('htmlParent')?.setAttribute('lang', 'ar');
    } else {
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      this.translationService.setAppDefaultLang(lang);
      this.dateAdapter.setLocale('en');
      this.document.getElementById('htmlParent')?.setAttribute('dir', 'ltr');
      // this line to change the language
      this.document.getElementById('htmlParent')?.setAttribute('lang', 'en-US');
    }
  }
}
