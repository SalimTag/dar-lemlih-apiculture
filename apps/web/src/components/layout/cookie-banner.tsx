'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

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
    <div className="fixed inset-x-0 bottom-4 z-50 px-4 sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-3xl border border-white/30 bg-white/90 p-6 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-charcoal-900/90">
        <div className="space-y-2">
          <h3 className="font-display text-lg font-semibold text-charcoal-900 dark:text-amber-50">
            {t('title')}
          </h3>
          <p className="text-sm text-charcoal-600 dark:text-charcoal-300">{t('description')}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button variant="ghost" className="rounded-full border border-transparent sm:w-auto" onClick={accept}>
            {t('preferences')}
          </Button>
          <Button className="rounded-full sm:w-auto" onClick={accept}>
            {t('accept')}
          </Button>
        </div>
      </div>
    </div>
  );
}
