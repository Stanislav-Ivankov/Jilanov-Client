import { DEFAULT_LANG_CODE } from '../models/language';

export class TranslateUtil {
	private static readonly LANG_KEY = 'lang';

	static setLanguage(lang: string): void {
        try {
            localStorage.setItem(this.LANG_KEY, lang)
        } catch(e) {};
		location.reload(false);
	}

	static getLanguage(): string {
        let result = 'bg'
        try {
            result = localStorage.getItem(this.LANG_KEY);
        } catch(e) {};
		return result;
	}

	static getLanguageOrDefault(): string {
        let result = 'bg'
        try {
            result = localStorage.getItem(this.LANG_KEY) || DEFAULT_LANG_CODE;
        } catch(e) {};
		return result;
	}
}