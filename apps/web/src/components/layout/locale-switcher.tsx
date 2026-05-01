'use client';

import { Globe2, Check } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, type Locale } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const LOCALE_LABELS: Record<Locale, { name: string; flag: string }> = {
  fr: { name: 'Français', flag: '🇫🇷' },
  en: { name: 'English', flag: '🇬🇧' },
  ar: { name: 'العربية', flag: '🇲🇦' },
};

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const tCommon = useTranslations('common');
  const [open, setOpen] = useState(false);

  const handleChange = (next: Locale) => {
    setOpen(false);
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.replace(newPath as any);
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
        <SheetContent side="right" className="w-full max-w-xs border-sand-200/60 bg-sand-25/95 backdrop-blur-xl sm:max-w-sm dark:border-charcoal-800/60 dark:bg-charcoal-950/95">
          <div className="space-y-6 pt-8">
            <div className="space-y-1">
              <h2 className="font-display text-xl font-semibold text-charcoal-900 dark:text-amber-50">
                {tCommon('languageSelector')}
              </h2>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                FR · EN · AR
              </p>
            </div>
            <ul className="space-y-2">
              {locales.map(current => (
                <li key={current}>
                  <button
                    type="button"
                    onClick={() => handleChange(current)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-sm font-medium transition-all duration-200',
                      current === locale
                        ? 'border-amber-300 bg-amber-50/80 text-amber-700 shadow-sm dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-300'
                        : 'border-transparent bg-white/60 text-charcoal-700 hover:border-amber-200/60 hover:bg-amber-50/50 dark:bg-charcoal-800/40 dark:text-charcoal-300 dark:hover:border-amber-800/40 dark:hover:bg-charcoal-800/60'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg">{LOCALE_LABELS[current].flag}</span>
                      <span>{LOCALE_LABELS[current].name}</span>
                    </span>
                    {current === locale && (
                      <Check className="h-4 w-4 text-amber-500" />
                    )}
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
