import Link from 'next/link';
import Image from 'next/image';
import NextTopLoader from 'nextjs-toploader';
import { getTranslations } from 'next-intl/server';
import { LocaleSwitcher } from './locale-switcher';
import { ThemeToggle } from './theme-toggle';
import type { Locale } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { AuthDialog } from '@/components/forms/auth-dialog';

const NAV_ITEMS: Array<{ key: string; href: string }> = [
  { key: 'home', href: '/' },
  { key: 'products', href: '/products' },
  { key: 'about', href: '/story' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' }
];

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'nav' });
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-sand-25/80 backdrop-blur-xl dark:border-white/10 dark:bg-charcoal-950/80">
      <NextTopLoader color="#f58d1c" showSpinner={false} shadow={false} />
      <div className="container-bleed flex h-20 items-center justify-between gap-6">
        <Link href={`/${locale}`} className="group flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-amber-100">
            <Image src="/honey-icon.svg" alt="Dar Lemlih" fill className="object-contain p-2" sizes="48px" priority />
          </div>
          <div>
            <p className="font-display text-xl font-semibold tracking-tight text-charcoal-900 transition group-hover:text-amber-600 dark:text-amber-100">
              Dar Lemlih
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-charcoal-500 dark:text-charcoal-300">Apiculture</p>
          </div>
        </Link>
        <nav className="hidden flex-1 items-center justify-center lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {NAV_ITEMS.map(item => (
                <NavigationMenuItem key={item.key}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/${locale}${item.href === '/' ? '' : item.href}`}
                      className={navigationMenuTriggerStyle}
                    >
                      {t(item.key)}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="flex items-center gap-1">
          <LocaleSwitcher />
          <ThemeToggle />
          <div className="hidden sm:block">
            <AuthDialog />
          </div>
          <Button asChild variant="ghost" className="sm:hidden">
            <Link href={`/${locale}/login`}>{t('login')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
