import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Badge } from '@/components/ui/badge';

const CERTIFICATIONS = ['ifos', 'iso', 'halal'];

export async function SocialProof({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'socialProof' });

  return (
    <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/20 bg-white/80 p-8 text-center shadow-card backdrop-blur dark:border-white/10 dark:bg-charcoal-900/70">
      <p className="text-sm uppercase tracking-[0.4em] text-amber-600">{t('title')}</p>
      <h2 className="max-w-2xl font-display text-3xl font-semibold text-charcoal-900 dark:text-amber-50">
        {t('subtitle')}
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {CERTIFICATIONS.map(item => (
          <Badge key={item} variant="glass" className="rounded-2xl px-5 py-2 text-base uppercase">
            {t(`certifications.${item}`)}
          </Badge>
        ))}
      </div>
    </div>
  );
}
