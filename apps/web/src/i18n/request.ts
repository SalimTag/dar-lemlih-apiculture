import { getRequestConfig } from 'next-intl/server';
import type { Locale } from './routing';

export default getRequestConfig(async ({ locale }) => {
  const messages = (await import(`./messages/${locale as Locale}.json`)).default;
  return {
    messages
  };
});

