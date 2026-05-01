import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Manrope } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getLocale } from 'next-intl/server';
import Providers from './providers';
import './globals.css';
import { isRTL, type Locale } from '@/i18n/routing';

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display'
});

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dar-lemlih.com'),
  title: {
    default: 'Dar Lemlih Apiculture',
    template: '%s · Dar Lemlih Apiculture'
  },
  description:
    'Dar Lemlih crée des miels marocains d’exception depuis l’Atlas. Découvrez nos crus rares, nos rituels, et notre savoir-faire apicole ancestral.',
  keywords: [
    'miel marocain',
    'apiculture de luxe',
    'honey morocco',
    'atlas honey',
    'dar lemlih'
  ],
  openGraph: {
    title: 'Dar Lemlih Apiculture',
    description:
      'Une apiculture marocaine de prestige : crus rares, analyses, et histoires de rucher.',
    url: 'https://www.dar-lemlih.com',
    siteName: 'Dar Lemlih',
    type: 'website',
    locale: 'fr_FR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dar Lemlih Apiculture',
    description: 'Miels marocains de prestige, sourcés avec rigueur et passion.',
    creator: '@darlemlih'
  },
  icons: {
    icon: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico'
  },
  manifest: '/site.webmanifest'
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }, { color: '#f8f5f0' }]
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = (await getLocale()) as Locale;
  const direction = isRTL(locale) ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable}`}
    >
      <body className="min-h-screen bg-sand-25 font-sans text-charcoal-900 antialiased">
        <Providers>
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
