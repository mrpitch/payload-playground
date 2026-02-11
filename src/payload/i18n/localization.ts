import type { I18nOptions } from '@payloadcms/translations'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'

export const i18n: I18nOptions = {
	fallbackLanguage: 'en', // default
	supportedLanguages: { en, de },
}

export const localization = {
	locales: [
		{
			label: 'English',
			code: 'en',
		},
		{
			label: 'Deutsch',
			code: 'de',
		},
	],
	defaultLocale: 'en', // required
	fallback: true, // defaults to true
}
