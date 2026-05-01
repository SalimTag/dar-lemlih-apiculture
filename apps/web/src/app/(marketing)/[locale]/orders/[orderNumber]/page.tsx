import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/blocks/section';

type Props = { params: { orderNumber: string; locale: Locale } };

export default async function OrderConfirmationPage({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: 'orders' });

  return (
    <Section>
      <div className="mx-auto max-w-lg py-16 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
            <CheckCircle2 className="h-10 w-10 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        <h1 className="font-display text-4xl font-semibold text-charcoal-900 dark:text-amber-50">
          {t('confirmationTitle')}
        </h1>
        <p className="mt-4 text-charcoal-600 dark:text-charcoal-300">
          {t('confirmationSubtitle')}
        </p>
        <div className="mt-6 rounded-2xl border border-amber-200/40 bg-amber-50/60 px-6 py-4 dark:border-amber-800/30 dark:bg-amber-950/20">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            {t('orderNumber')}: <strong className="font-mono">{params.orderNumber}</strong>
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="rounded-full">
            <Link href={`/${params.locale}/products`}>{t('continueShopping')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href={`/${params.locale}/account`}>{t('viewOrders')}</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
