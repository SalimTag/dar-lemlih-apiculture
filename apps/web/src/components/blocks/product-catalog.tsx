'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { cn } from '@/lib/utils';

// Mock products — in production these come from the Spring Boot API
const PRODUCTS = [
  {
    id: 'thyme-atlas',
    category: 'honey',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    price: 38,
    weight: '250g',
    origin: 'High Atlas',
    rating: 4.9,
    nameKey: 'Wild Thyme',
    descKey: 'Altitude 2,400m',
    featured: true,
  },
  {
    id: 'euphorbia-souss',
    category: 'honey',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    price: 42,
    weight: '250g',
    origin: 'Souss Valley',
    rating: 4.8,
    nameKey: 'Euphorbia Daghmous',
    descKey: 'Souss-Massa',
    featured: true,
  },
  {
    id: 'orange-blossom',
    category: 'honey',
    image: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
    price: 32,
    weight: '250g',
    origin: 'Fès-Meknès',
    rating: 4.7,
    nameKey: 'Orange Blossom',
    descKey: 'Fès-Meknès region',
    featured: false,
  },
  {
    id: 'carob-rif',
    category: 'honey',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    price: 35,
    weight: '250g',
    origin: 'Rif Mountains',
    rating: 4.6,
    nameKey: 'Carob Honey',
    descKey: 'Chefchaouen region',
    featured: false,
  },
  {
    id: 'pollen-atlas',
    category: 'pollen',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
    price: 28,
    weight: '150g',
    origin: 'Middle Atlas',
    rating: 4.8,
    nameKey: 'Wildflower Pollen',
    descKey: 'Ifrane cedars',
    featured: false,
  },
  {
    id: 'propolis-tincture',
    category: 'propolis',
    image: 'https://images.unsplash.com/photo-1612540139150-4e678e0da5e2?auto=format&fit=crop&w=800&q=80',
    price: 25,
    weight: '30ml',
    origin: 'High Atlas',
    rating: 4.9,
    nameKey: 'Propolis Tincture',
    descKey: 'Pure extract',
    featured: false,
  },
];

const FILTERS = ['all', 'honey', 'pollen', 'propolis'] as const;

export function ProductCatalog({ locale }: { locale: string }) {
  const t = useTranslations('products');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filtered = activeFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <div className="space-y-8">
      {/* Filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              'rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300',
              activeFilter === filter
                ? 'bg-amber-500 text-white shadow-card'
                : 'bg-white/60 text-charcoal-600 hover:bg-amber-50 hover:text-amber-700 dark:bg-charcoal-800/60 dark:text-charcoal-300 dark:hover:bg-charcoal-700'
            )}
          >
            {t(`filter.${filter}`)}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product, index) => (
          <AnimateOnScroll key={product.id} animation="fade-up" delay={index * 80}>
            <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/60 shadow-glass backdrop-blur-sm transition-all duration-500 hover:shadow-elevated hover:-translate-y-1 dark:border-white/8 dark:bg-charcoal-900/50">
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.nameKey}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-900/30 via-transparent to-transparent" />

                {/* Featured badge */}
                {product.featured && (
                  <div className="absolute start-4 top-4">
                    <Badge variant="default" className="rounded-full shadow-lg">
                      ★ Featured
                    </Badge>
                  </div>
                )}

                {/* Quick add button */}
                <div className="absolute bottom-4 end-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <Button size="icon" className="h-12 w-12 rounded-full shadow-elevated">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="sr-only">{t('addToCart')}</span>
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-charcoal-900 dark:text-amber-50">
                      {product.nameKey}
                    </h3>
                    <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                      {product.descKey} · {product.weight}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                  <div>
                    <span className="text-2xl font-bold text-charcoal-900 dark:text-amber-50">
                      €{product.price}
                    </span>
                    <span className="ms-1 text-xs text-charcoal-500 dark:text-charcoal-400">
                      / {product.weight}
                    </span>
                  </div>
                  <Badge variant="glass" className="text-[10px]">
                    {product.origin}
                  </Badge>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}
