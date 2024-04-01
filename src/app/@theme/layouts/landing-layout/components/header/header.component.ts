import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { CampaignTeamService } from '@app/main/pages/team/team.service';
import { Languages } from '@core/data/Languages.interface';
import { TranslationKeys } from '@core/enums/translation-keys.enum';
import { UserData } from '@core/interceptors/user.model';
import { NotificationsService } from '@core/services';
import { TranslationService } from '@core/services/translate.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  translationPrefix: string = `PAGES.NAVBAR.INPUTS.`;

  searchTerm: string;
  searchTermChanged: Subject<string> = new Subject<string>();
  dataList: UserData[];

  appLanguages: Languages[] = [
    {
      langName: 'arabic',
      langFilePrifix: 'ar',
      langIcon: '/assets/ar-lang.svg',
    },
    {
      langName: 'english',
      langFilePrifix: 'en',
      langIcon: '/assets/en-lang.svg',
    },
  ];

  /** get default language from local storage on app start up */
  defaultLang =
    localStorage.getItem(TranslationKeys.TRANSLATION_KEY) !== null
      ? localStorage.getItem(TranslationKeys.TRANSLATION_KEY)?.toString()
      : 'en';

  selectedLanguageName: any;

  $subs: Subscription[] = [];

  constructor(
    private translate: TranslateService,
    private translationService: TranslationService,
    private router: Router,
    private notifications: NotificationsService,
    private campaignTeamService: CampaignTeamService,
    private dateAdapter: DateAdapter<Date>,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.searchTermChanged
      .pipe(
        debounceTime(500), // Adjust debounce time as needed (in milliseconds)
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (this.searchTerm.trim() !== '') {
          this.onSearchTermChange();
        }
      });
  }

  ngOnInit() {
    this.selectedLanguageName = this.appLanguages.find(
      (ele) => ele.langFilePrifix === this.defaultLang
    );

    const sub = this.campaignTeamService.dataList$
      .asObservable()
      .subscribe((result: any) => {
        this.dataList = result.data;
      });
    this.$subs.push(sub);
  }

  /** @description this method is used to toggle between languages
   *
   */
  changeLang(lang?: any) {
    // Add the selected language to the Local Storage
    localStorage.setItem(TranslationKeys.TRANSLATION_KEY, lang);

    if (lang === 'ar') {
      this.translationService.setAppDefaultLang(lang);
      this.dateAdapter.setLocale(lang);
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);

      this.document.getElementById('htmlParent')?.setAttribute('dir', 'rtl');
      // // this line to change the language
      this.document.getElementById('htmlParent')?.setAttribute('lang', 'ar');
      ////
      this.selectedLanguageName = this.appLanguages.find(
        (ele) => ele.langFilePrifix === lang
      );
      // window.location.reload();
    } else {
      this.translationService.setAppDefaultLang(lang);
      this.dateAdapter.setLocale(lang);
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);

      this.document.getElementById('htmlParent')?.setAttribute('dir', 'ltr');

      this.document.getElementById('htmlParent')?.setAttribute('lang', 'en-US');

      this.selectedLanguageName = this.appLanguages.find(
        (ele) => ele.langFilePrifix === lang
      );
      // window.location.reload();
    }
  }

  checkUserIdExists(id: number): boolean {
    return this.dataList.some((user: UserData) => user.id === id);
  }

  onSearchTermChange() {
    const searchTerm = this.searchTerm.trim();
    if (searchTerm && this.checkUserIdExists(+searchTerm)) {
      this.router.navigate(['campaign/teams/user-details', searchTerm]);
    } else {
      this.notifications.warn('Warning', 'User ID does not exist');
    }

    this.searchTerm = '';
  }

  ngOnDestroy(): void {
    this.$subs.forEach((sub) => sub.unsubscribe());
  }
}
