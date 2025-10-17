import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, ShieldCheck, Recycle } from '@lucide/react';

const ICONS = {
  atlas: Leaf,
  lab: ShieldCheck,
  sustainable: Recycle
};

type FeatureKey = keyof typeof ICONS;

export async function FeatureGrid({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'usp' });
  const items = Object.keys(ICONS) as FeatureKey[];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {items.map(key => {
        const Icon = ICONS[key];
        return (
          <Card key={key} className="bg-white/80 dark:bg-charcoal-900/60">
            <CardHeader>
              <Badge variant="glass" className="w-fit rounded-2xl px-4 py-1">
                {t(`${key}.title`)}
              </Badge>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Icon className="h-6 w-6 text-amber-500" />
                {t(`${key}.title`)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t(`${key}.description`)}</CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
