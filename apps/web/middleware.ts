import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n/routing';

export default createMiddleware({
  locales,
  defaultLocale
});

export const config = {
  matcher: ['/', '/(fr|en|ar)/:path*']
};
