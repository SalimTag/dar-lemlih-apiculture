import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Manrope, Noto_Sans_Arabic } from 'next/font/google';
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

const arabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dar-lemlih.com'),
  title: {
    default: 'Atlas Nectar · Dar Lemlih',
    template: '%s · Atlas Nectar'
  },
  description:
    `Dar Lemlih crée des miels marocains d'exception depuis l'Atlas. Découvrez nos crus rares, nos rituels, et notre savoir-faire apicole ancestral.`,
  keywords: [
    'miel marocain',
    'apiculture de luxe',
    'honey morocco',
    'atlas honey',
    'dar lemlih',
    'عسل مغربي',
    'miel de terroir'
  ],
  openGraph: {
    title: 'Atlas Nectar · Dar Lemlih',
    description:
      'Une apiculture marocaine de prestige : crus rares, analyses, et histoires de rucher.',
    url: 'https://www.dar-lemlih.com',
    siteName: 'Atlas Nectar',
    type: 'website',
    locale: 'fr_FR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atlas Nectar · Dar Lemlih',
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
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b0e11' },
    { color: '#f9f6f1' }
  ],
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = (await getLocale()) as Locale;
  const direction = isRTL(locale) ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${arabic.variable}`}
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
