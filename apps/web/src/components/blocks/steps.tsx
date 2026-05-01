import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Card, CardContent } from '@/components/ui/card';

const STEP_KEYS = ['foraging', 'harvest', 'analysis', 'craft'] as const;

type StepKey = (typeof STEP_KEYS)[number];

export async function Steps({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'steps' });

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {STEP_KEYS.map((key, index) => (
        <Card key={key} className="bg-white/70 dark:bg-charcoal-900/60">
          <CardContent className="space-y-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-lg font-semibold text-amber-600 dark:text-amber-300">
              {index + 1}
            </span>
            <h3 className="font-display text-xl font-semibold text-charcoal-900 dark:text-amber-50">
              {t(`${key}.title`)}
            </h3>
            <p className="text-sm leading-relaxed text-charcoal-600 dark:text-charcoal-300">
              {t(`${key}.description`)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
