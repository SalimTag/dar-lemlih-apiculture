import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Locale } from '@/i18n/routing';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/blocks/section';

type Props = { params: { locale: Locale } };

export default async function OrdersPage({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: 'orders' });

  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h1 className="font-display text-hero text-charcoal-900 dark:text-amber-50">{t('title')}</h1>
          <p className="mt-2 text-charcoal-600 dark:text-charcoal-300">{t('subtitle')}</p>
        </div>

        {/* Placeholder — in production, orders are loaded from /api/orders */}
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/15 bg-white/60 py-16 text-center shadow-glass backdrop-blur-sm dark:border-white/8 dark:bg-charcoal-900/50">
          <Package className="h-14 w-14 text-charcoal-300 dark:text-charcoal-600" />
          <p className="text-charcoal-600 dark:text-charcoal-300">{t('noOrders')}</p>
          <Button asChild size="lg" className="rounded-full">
            <Link href={`/${params.locale}/products`}>{t('continueShopping')}</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
