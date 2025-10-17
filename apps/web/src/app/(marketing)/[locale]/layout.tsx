import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import { locales, type Locale } from '@/i18n/routing';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { CookieBanner } from '@/components/layout/cookie-banner';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

type LayoutProps = {
  children: ReactNode;
  params: { locale: Locale };
};

export default async function MarketingLayout({ children, params }: LayoutProps) {
  const { locale } = params;

  if (!locales.includes(locale)) {
    notFound();
  }

  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader locale={locale} />
        <main className="flex-1 space-y-24 bg-none py-16 sm:py-20">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </div>
      <CookieBanner />
    </NextIntlClientProvider>
  );
}
