import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translate.service';
// import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[appRtl]',
})
/**
 * this directive is used to add class `rtl-item` to hosted element when language change to arabic
 * this allow developer to change hosted item direction in `RTL Language like Arabic , Hebrow, Farsi`
 */
export class RtlDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private render: Renderer2,
    // private translateService: TranslateService,
    private appTranslation: TranslationService
  ) {}

  ngOnInit(): void {
    this.appTranslation.getDefaultLang().subscribe((lang: string) => {
      if (lang === 'ar') {
        this.render.addClass(this.el.nativeElement, 'rtl-item');
      } else {
        this.render.removeClass(this.el.nativeElement, 'rtl-item');
      }
    });
  }

  /**
   * @description change font when app start up or language change
   */
  changeFontOnLanguageChange(lang: string) {
    if (lang === 'ar') {
      // << change font when language arabic to be 'Cairo' >> //
      this.render.setStyle(
        this.el.nativeElement,
        'font-family',
        'Cairo, sans-serif'
      );
    } else {
      // << change font when language arabic to be 'Roboto' >> //
      this.render.setStyle(
        this.el.nativeElement,
        'font-family',
        'Roboto, sans-serif'
      );
    }
  }
}
