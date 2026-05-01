export const locales = ['ar', 'fr', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export const rtlLocales = new Set<Locale>(['ar']);

export function isRTL(locale: Locale) {
  return rtlLocales.has(locale);
}

