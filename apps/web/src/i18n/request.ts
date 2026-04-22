import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from './routing';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as any)) {
    locale = 'fr'; // default locale
  }

  const messages = (await import(`./messages/${locale as Locale}.json`)).default;
  return {
    locale,
    messages
  };
});
