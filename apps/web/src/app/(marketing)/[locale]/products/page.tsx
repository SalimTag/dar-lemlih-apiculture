import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Section } from '@/components/blocks/section';
import { ProductCatalog } from '@/components/blocks/product-catalog';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ProductsPage({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'products' });

  return (
    <>
      <Section>
        <div className="mb-14 space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-amber-600 dark:text-amber-400">
            Dar Lemlih
          </p>
          <h1 className="font-display text-hero text-charcoal-900 dark:text-amber-50">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-charcoal-600 dark:text-charcoal-300">
            {t('subtitle')}
          </p>
        </div>
      </Section>

      <Section background="warm">
        <ProductCatalog locale={params.locale} />
      </Section>
    </>
  );
}
