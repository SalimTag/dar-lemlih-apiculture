import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';

const FOOTER_LINKS: Array<{ key: 'privacy' | 'terms' | 'cookies'; href: string }> = [
  { key: 'privacy', href: '/privacy' },
  { key: 'terms', href: '/terms' },
  { key: 'cookies', href: '/cookies' }
];

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/20 bg-sand-25/90 py-12 backdrop-blur-md dark:border-white/10 dark:bg-charcoal-950/70">
      <div className="container-bleed grid gap-12 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <h3 className="font-display text-2xl font-semibold text-charcoal-900 dark:text-amber-100">
            Dar Lemlih
          </h3>
          <p className="max-w-xl text-sm text-charcoal-600 dark:text-charcoal-300">
            {t('rights')} {year}
          </p>
        </div>
        <nav className="flex items-center gap-4 text-sm text-charcoal-500 dark:text-charcoal-300">
          {FOOTER_LINKS.map(link => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              className="transition hover:text-amber-600 dark:hover:text-amber-300"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
