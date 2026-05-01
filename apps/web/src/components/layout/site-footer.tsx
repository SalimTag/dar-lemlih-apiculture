import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';

const FOOTER_NAV = [
  { key: 'products' as const, href: '/products' },
  { key: 'about' as const, href: '/story' },
  { key: 'blog' as const, href: '/blog' },
  { key: 'contact' as const, href: '/contact' },
];

const FOOTER_LEGAL: Array<{ key: 'privacy' | 'terms' | 'cookies'; href: string }> = [
  { key: 'privacy', href: '/privacy' },
  { key: 'terms', href: '/terms' },
  { key: 'cookies', href: '/cookies' }
];

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-sand-200/60 bg-sand-25/90 backdrop-blur-md dark:border-charcoal-800/40 dark:bg-charcoal-950/80">
      {/* Decorative gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-amber-50/30 dark:to-amber-950/10" />

      <div className="container-bleed relative py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[2.5fr,1fr,1fr]">
          {/* Brand Column */}
          <div className="space-y-5">
            <div>
              <h3 className="font-display text-2xl font-semibold text-charcoal-900 dark:text-amber-100">
                Dar Lemlih
              </h3>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.35em] text-amber-600 dark:text-amber-500">
                Apiculture de terroir
              </p>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-charcoal-600 dark:text-charcoal-400">
              {t('tagline')}
            </p>
            {/* Social icons placeholder */}
            <div className="flex items-center gap-3 pt-2">
              {['Instagram', 'Facebook', 'WhatsApp'].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-200 bg-white/60 text-charcoal-600 transition-all duration-300 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 dark:border-charcoal-700 dark:bg-charcoal-800/60 dark:text-charcoal-400 dark:hover:border-amber-700 dark:hover:text-amber-300"
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-charcoal-500 dark:text-charcoal-400">
              {tNav('home')}
            </h4>
            <ul className="space-y-3">
              {FOOTER_NAV.map(link => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-charcoal-600 transition-colors hover:text-amber-600 dark:text-charcoal-400 dark:hover:text-amber-300"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-charcoal-500 dark:text-charcoal-400">
              {t('legal')}
            </h4>
            <ul className="space-y-3">
              {FOOTER_LEGAL.map(link => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-charcoal-600 transition-colors hover:text-amber-600 dark:text-charcoal-400 dark:hover:text-amber-300"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-sand-200/60 pt-8 sm:flex-row dark:border-charcoal-800/40">
          <p className="text-xs text-charcoal-500 dark:text-charcoal-500">
            © {year} Dar Lemlih. {t('rights')}
          </p>
          <p className="text-xs text-charcoal-400 dark:text-charcoal-600">
            {t('madeIn')}
          </p>
        </div>
      </div>
    </footer>
  );
}
