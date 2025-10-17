import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1509731987499-ef6601bb7674?auto=format&fit=crop&w=1600&q=80';
const HERO_BLUR =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhUSEhIVFRUVFhUQFRUVFRUYFhUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGisdHh0rKy0rLSstLS0tLS0tLS0rKy0rLS0tKystLS0tLS0tLSstLS0tLS0rLS0tKystK//AABEIAJ8BPgMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABv/EABcQAQEBAQAAAAAAAAAAAAAAAAECEQD/2gAMAwEAAhADEAAAAcUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z';

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'hero' });

  return (
    <div className="relative overflow-hidden rounded-[44px] border border-white/30 bg-white/70 p-8 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-charcoal-900/70">
      <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <div className="space-y-6 lg:space-y-8">
          <span className="inline-flex rounded-full border border-amber-200/70 bg-amber-50/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-amber-700 dark:border-amber-800 dark:bg-charcoal-800/80 dark:text-amber-300">
            Dar Lemlih
          </span>
          <h1 className="font-display text-4xl leading-tight text-charcoal-900 sm:text-5xl lg:text-6xl dark:text-amber-50">
            {t('title')}
          </h1>
          <p className="max-w-xl text-base text-charcoal-600 sm:text-lg dark:text-charcoal-200">
            {t('subtitle')}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full px-8 py-3 text-base">
              <Link href={`/${locale}/products`}>{t('primaryCta')}</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8 py-3 text-base">
              <Link href={`/${locale}/story`}>{t('secondaryCta')}</Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] shadow-card">
          <Image
            src={HERO_IMAGE}
            alt={t('alt')}
            fill
            className="h-full w-full object-cover"
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-gradient-to-t from-charcoal-900/10 to-transparent" />
        </div>
      </div>
    </div>
  );
}
