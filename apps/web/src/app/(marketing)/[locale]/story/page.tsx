import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Section } from '@/components/blocks/section';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: t('about')
  };
}

export default async function StoryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  return (
    <Section>
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <h1 className="font-display text-4xl font-semibold text-charcoal-900 dark:text-amber-50">
          {tNav('about')}
        </h1>
        <p className="text-lg leading-relaxed text-charcoal-600 dark:text-charcoal-200">
          {tCommon('storyPlaceholder')}
        </p>
      </div>
    </Section>
  );
}
