export const DEFAULT_LANG_CODE = 'bg';

export const LANGUAGE_CODES = ['bg', 'en'];

export const LANGUAGES: Language[] = [
	{ code: 'bg', label: 'Bulgarian' },
	{ code: 'en', label: 'English' }
];

export interface Language {
	code: string;
	label: string;
}

export const LANGUAGES_REGEX = /en/;