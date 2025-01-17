import type { I18nOptions } from '@payloadcms/translations'
import { en } from '@payloadcms/translations/languages/en'
import { de } from '@payloadcms/translations/languages/de'

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
