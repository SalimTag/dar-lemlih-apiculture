import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1600&q=80';
const HERO_BLUR =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhUSEhIVFRUVFhUQFRUVFRUYFhUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGisdHh0rKy0rLSstLS0tLS0tLS0rKy0rLS0tKystLS0tLS0tLSstLS0tLS0rLS0tKystK//AABEIAJ8BPgMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABv/EABcQAQEBAQAAAAAAAAAAAAAAAAECEQD/2gAMAwEAAhADEAAAAcUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z';

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'hero' });

  return (
    <div className="relative overflow-hidden rounded-4xl border border-white/20 bg-white/60 p-6 shadow-elevated backdrop-blur-xl sm:p-10 lg:p-14 dark:border-white/8 dark:bg-charcoal-900/60">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -start-32 -top-32 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-600/10" />
      <div className="pointer-events-none absolute -bottom-32 -end-32 h-80 w-80 rounded-full bg-atlas-300/15 blur-3xl dark:bg-atlas-600/10" />

      <div className="relative grid gap-10 lg:grid-cols-[1.15fr,0.85fr] lg:items-center lg:gap-16">
        {/* Content */}
        <div className="space-y-7 lg:space-y-9">
          <Badge
            variant="glass"
            className="w-fit rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em]"
          >
            <span className="me-2 inline-block h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse-glow" />
            Dar Lemlih · Apiculture
          </Badge>

          <h1 className="font-display text-hero text-charcoal-900 dark:text-amber-50">
            {t('title')}
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-charcoal-600 sm:text-lg dark:text-charcoal-300">
            {t('subtitle')}
          </p>

          <div className="flex flex-col gap-3.5 sm:flex-row">
            <Button asChild size="xl" className="rounded-full">
              <Link href={`/${locale}/products`}>
                {t('primaryCta')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href={`/${locale}/story`}>
                {t('secondaryCta')}
              </Link>
            </Button>
          </div>

          {/* Trust micro-badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {['IFOS Pure', 'ISO 22000', 'Halal'].map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-1.5 rounded-full border border-sand-200 bg-sand-50/80 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-charcoal-600 dark:border-charcoal-700 dark:bg-charcoal-800/50 dark:text-charcoal-400"
              >
                <svg className="h-3 w-3 text-atlas-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elevated lg:rounded-[36px]">
          <Image
            src={HERO_IMAGE}
            alt={t('alt')}
            fill
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
          {/* Gradient overlay for depth */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-900/20 via-transparent to-transparent" />
          {/* Floating accent tag */}
          <div className="absolute bottom-5 start-5 rounded-2xl border border-white/20 bg-white/80 px-4 py-2.5 backdrop-blur-lg dark:border-white/10 dark:bg-charcoal-900/80">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              Atlas Mountains
            </p>
            <p className="text-[10px] text-charcoal-500 dark:text-charcoal-400">
              2,400m altitude · Wild thyme bloom
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
