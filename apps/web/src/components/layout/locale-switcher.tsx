'use client';

import { Globe2 } from '@lucide/react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';
import { locales, type Locale } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [open, setOpen] = useState(false);

  const handleChange = (next: Locale) => {
    setOpen(false);
    router.replace(pathname, { locale: next });
  };

  return (
    <div className={cn('flex items-center', className)}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={tCommon('languageSelector')}
            className="h-10 w-10 rounded-full"
          >
            <Globe2 className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm">
          <div className="space-y-4 pt-10">
            <h2 className="font-display text-xl font-semibold">{tCommon('languageSelector')}</h2>
            <ul className="space-y-2">
              {locales.map(current => (
                <li key={current}>
                  <button
                    type="button"
                    onClick={() => handleChange(current)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition',
                      current === locale
                        ? 'border-amber-400 bg-amber-50 text-amber-700'
                        : 'border-transparent bg-white/70 text-charcoal-700 hover:border-amber-200 hover:bg-amber-50'
                    )}
                  >
                    <span className="uppercase tracking-wide">{current}</span>
                    {current === locale && <span className="text-xs font-semibold uppercase">{tNav('home')}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
