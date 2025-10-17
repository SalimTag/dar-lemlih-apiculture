import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Section } from '@/components/blocks/section';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'nav' });
  return {
    title: t('products')
  };
}

export default async function ProductsPage({ params }: { params: { locale: Locale } }) {
  const tNav = await getTranslations({ locale: params.locale, namespace: 'nav' });
  const tCommon = await getTranslations({ locale: params.locale, namespace: 'common' });

  return (
    <Section>
      <div className="space-y-4 text-center">
        <h1 className="font-display text-4xl font-semibold text-charcoal-900 dark:text-amber-50">
          {tNav('products')}
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-charcoal-600 dark:text-charcoal-300">
          {tCommon('productsPlaceholder')}
        </p>
      </div>
    </Section>
  );
}
