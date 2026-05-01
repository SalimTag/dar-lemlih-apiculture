'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NextTopLoader from 'nextjs-toploader';
import { useTranslations } from 'next-intl';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { LocaleSwitcher } from './locale-switcher';
import { ThemeToggle } from './theme-toggle';
import type { Locale } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { AuthDialog } from '@/components/forms/auth-dialog';
import { cn } from '@/lib/utils';

const NAV_ITEMS: Array<{ key: string; href: string }> = [
  { key: 'home', href: '/' },
  { key: 'products', href: '/products' },
  { key: 'about', href: '/story' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' }
];

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change (body scroll)
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <NextTopLoader color="#f59420" showSpinner={false} shadow={false} height={2} />

      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-500',
          scrolled
            ? 'border-b border-sand-200/60 bg-sand-25/85 shadow-sm backdrop-blur-xl dark:border-charcoal-800/60 dark:bg-charcoal-950/85'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <div className="container-bleed flex h-20 items-center justify-between gap-4 lg:h-22">
          {/* Logo */}
          <Link href={`/${locale}`} className="group flex items-center gap-3 focus-ring rounded-xl">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 shadow-sm transition-transform duration-300 group-hover:scale-105 dark:from-amber-800/30 dark:to-amber-900/30">
              <Image src="/honey-icon.svg" alt="Dar Lemlih" fill className="object-contain p-2" sizes="44px" priority />
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-lg font-semibold tracking-tight text-charcoal-900 transition-colors group-hover:text-amber-600 dark:text-amber-100 dark:group-hover:text-amber-300">
                Dar Lemlih
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-charcoal-500 dark:text-charcoal-400">
                Apiculture de terroir
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden flex-1 items-center justify-center lg:flex" aria-label="Main navigation">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}${item.href === '/' ? '' : item.href}`}
                    className="relative rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal-700 transition-colors hover:text-charcoal-900 dark:text-charcoal-300 dark:hover:text-amber-100 focus-ring"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <LocaleSwitcher />
            <ThemeToggle />

            {/* Cart button */}
            <Button variant="ghost" size="icon" className="rounded-full" aria-label={t('cart')}>
              <ShoppingBag className="h-5 w-5" />
            </Button>

            {/* Auth (desktop) */}
            <div className="hidden sm:block">
              <AuthDialog />
            </div>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-charcoal-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Panel */}
      <div
        className={cn(
          'fixed end-0 top-0 z-50 flex h-full w-full max-w-xs flex-col bg-sand-25/95 shadow-elevated backdrop-blur-xl transition-transform duration-500 ease-out-expo lg:hidden dark:bg-charcoal-950/95',
          mobileOpen ? 'translate-x-0 rtl:-translate-x-0' : 'translate-x-full rtl:-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-sand-200/60 px-6 py-5 dark:border-charcoal-800/60">
          <span className="font-display text-lg font-semibold text-charcoal-900 dark:text-amber-100">
            Menu
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {NAV_ITEMS.map(item => (
              <li key={item.key}>
                <Link
                  href={`/${locale}${item.href === '/' ? '' : item.href}`}
                  className="flex items-center rounded-2xl px-4 py-3.5 text-base font-medium text-charcoal-700 transition-colors hover:bg-amber-50 hover:text-amber-700 dark:text-charcoal-300 dark:hover:bg-charcoal-800 dark:hover:text-amber-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-sand-200/60 p-4 dark:border-charcoal-800/60">
          <Button asChild className="w-full rounded-full">
            <Link href={`/${locale}/login`} onClick={() => setMobileOpen(false)}>
              {t('login')}
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
