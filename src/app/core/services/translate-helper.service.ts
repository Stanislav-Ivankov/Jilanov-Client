import { Injectable, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { TranslateUtil } from '../helpers/translate.util';
import * as en from '../../../assets/i18n/en.json';
import * as bg from '../../../assets/i18n/bg.json';
import { LANGUAGES_REGEX, DEFAULT_LANG_CODE, Language, LANGUAGES } from '../../models/language';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateHelperService {

  translations = {
    en: en['default'],
    bg: bg['default']
  };

  langs = [];
  language = 'bg';
  langChange = new EventEmitter();

  constructor(private translate: TranslateService) {
		translate.onLangChange.subscribe((lang) => {
			TranslateUtil.setLanguage(lang.lang);
    });
    translate.setTranslation('bg', bg['default']);
    translate.setTranslation('en', en['default']);
  }

  addLangs(langs: string[]) {
    this.translate.addLangs(langs);
    // this.langs = langs;
  }

  use(lang: string) {
    this.translate.use(lang);
    // this.language = lang;
    // this.langChange.emit(lang);
  }

  setDefaultLang(lang: string) {
    this.translate.setDefaultLang(lang);
    // this.language = lang;
  }

  onLangChange(): EventEmitter<any> {
    return this.langChange;
  }

  getLanguageCode(): string {
    const lang = this.savedOrBrowserLanguage();
    return lang.match(LANGUAGES_REGEX) ? lang : DEFAULT_LANG_CODE;
  }

  getLanguage(): Language {
    const code: string = this.getLanguageCode();
    const maybeLanguage = LANGUAGES.find(lang => lang.code === code);
    if (maybeLanguage) {
      return maybeLanguage;
    } else {
      return LANGUAGES.find(lang => lang.code === DEFAULT_LANG_CODE);
    }
  }

  async getTranslation(text) {
    if(!this.translations) {
      // this.translations['en'] = await this.translate.getTranslation('en').toPromise();
      // this.translations['bg'] = await this.translate.getTranslation('bg').toPromise();
    }
    let code = this.getLanguage().code;
    return this.translations[code] ? this.translations[code][text] : '';
  }

  private savedOrBrowserLanguage(): string {
    const prevLang = TranslateUtil.getLanguage();
    if (prevLang) {
      return prevLang;
    } else {
      return 'bg';
    }
  }
}
