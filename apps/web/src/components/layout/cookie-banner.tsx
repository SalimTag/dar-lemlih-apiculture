'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'dar-lemlih-cookies';

type CookiePreferences = {
  accepted: boolean;
  timestamp: number;
};

export function CookieBanner() {
  const t = useTranslations('cookieBanner');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
      return;
    }
    try {
      const parsed = JSON.parse(stored) as CookiePreferences;
      if (!parsed.accepted) {
        setVisible(true);
      }
    } catch (error) {
      console.warn('Invalid cookie preference payload', error);
      setVisible(true);
    }
  }, []);

  const accept = () => {
    const payload: CookiePreferences = { accepted: true, timestamp: Date.now() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-4 z-50 px-4 sm:px-6 animate-slide-up"
      role="dialog"
      aria-label={t('title')}
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-4 rounded-3xl border border-white/25 bg-white/92 p-6 shadow-elevated backdrop-blur-xl sm:flex-row sm:items-center dark:border-white/10 dark:bg-charcoal-900/92">
        <div className="flex items-start gap-3 sm:flex-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100/80 dark:bg-amber-900/20">
            <Cookie className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-sm font-semibold text-charcoal-900 dark:text-amber-50">
              {t('title')}
            </h3>
            <p className="text-xs leading-relaxed text-charcoal-600 dark:text-charcoal-400">
              {t('description')}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full text-xs"
            onClick={accept}
          >
            {t('preferences')}
          </Button>
          <Button
            size="sm"
            className="rounded-full text-xs"
            onClick={accept}
          >
            {t('accept')}
          </Button>
        </div>
      </div>
    </div>
  );
}
