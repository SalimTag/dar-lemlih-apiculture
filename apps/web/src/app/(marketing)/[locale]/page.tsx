import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Hero } from '@/components/blocks/hero';
import { FeatureGrid } from '@/components/blocks/feature-grid';
import { SocialProof } from '@/components/blocks/social-proof';
import { Steps } from '@/components/blocks/steps';
import { Section } from '@/components/blocks/section';
import { Button } from '@/components/ui/button';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'hero' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `https://www.dar-lemlih.com/${params.locale}`
    }
  };
}

export default async function LocaleHomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const tCta = await getTranslations({ locale, namespace: 'cta' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  return (
    <div className="space-y-24">
      <Section>
        <Hero locale={locale} />
      </Section>

      <Section id="usp">
        <FeatureGrid locale={locale} />
      </Section>

      <Section background="contrast">
        <SocialProof locale={locale} />
      </Section>

      <Section id="journey">
        <div className="flex flex-col gap-6 text-center">
          <h2 className="font-display text-3xl font-semibold text-charcoal-900 dark:text-amber-50">
            {tCta('story')}
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-charcoal-600 dark:text-charcoal-300">
            {tCommon('journeyDescription')}
          </p>
        </div>
        <div className="mt-12">
          <Steps locale={locale} />
        </div>
      </Section>

      <Section background="contrast">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-3xl font-semibold text-charcoal-900 dark:text-amber-50">
            {tCta('wholesale')}
          </h2>
          <p className="max-w-2xl text-sm text-charcoal-600 dark:text-charcoal-300">
            {tCommon('wholesaleDescription')}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full px-8 py-3 text-base">
              <Link href={`/${locale}/contact`}>{tCta('wholesale')}</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8 py-3 text-base">
              <Link href={`/${locale}/story`}>{tCta('story')}</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
