import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { TranslationKeys } from '../enums/translation-keys.enum';

@Injectable()
export class TranslationService {
  constructor(private translateService: TranslateService) {
    
  }
  
  defaultLang:any =
    localStorage.getItem(TranslationKeys.TRANSLATION_KEY) !== null
      ? localStorage.getItem(TranslationKeys.TRANSLATION_KEY)?.toString() : 'en';
  myLang: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.defaultLang
  );


  /** @description this method used to change the language and notify the subscriber be the new one
   * and used to get the default language from local storage
   */
  setAppDefaultLang(lang: string) {
    this.myLang.next(lang);
  }

  /**@description get default language used in the application
   * @returns Observable<string>
   */
  getDefaultLang() {
    return this.myLang.asObservable();
  }

  /**
   * @description return translation for word or array of words
   */
  getTranslation(word: string | string[]) {
    // return this.translateService.instant(word);
    return this.translateService.get(word).toPromise();
  }
}
