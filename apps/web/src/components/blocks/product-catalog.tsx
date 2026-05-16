'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { useCart } from '@/lib/hooks/use-cart';
import { cn } from '@/lib/utils';
import type { CategoryDto, ProductDto } from '@/lib/api/types';
import type { Locale } from '@/i18n/routing';
import { formatPriceMAD, localizedProductName, resolveImageUrl } from '@/lib/format';

interface ProductCatalogProps {
  locale: Locale;
  initialProducts: ProductDto[];
  categories: CategoryDto[];
}

export function ProductCatalog({ locale, initialProducts, categories }: ProductCatalogProps) {
  const t = useTranslations('products');
  const addItem = useCart(state => state.addItem);
  const loading = useCart(state => state.loading);
  const [activeCategoryId, setActiveCategoryId] = useState<number | 'all'>('all');

  const filtered = useMemo(() => {
    if (activeCategoryId === 'all') return initialProducts;
    return initialProducts.filter(p => p.categoryId === activeCategoryId);
  }, [initialProducts, activeCategoryId]);

  const handleAddToCart = (product: ProductDto, e: React.MouseEvent) => {
    // The card itself is wrapped in a Link; stop the click from navigating.
    e.preventDefault();
    e.stopPropagation();
    void addItem(product.id, 1, localizedProductName(product, locale));
  };

  const localizedCategoryLabel = (c: CategoryDto): string => {
    if (locale === 'ar' && c.nameAr) return c.nameAr;
    if (locale === 'en' && c.nameEn) return c.nameEn;
    return c.nameFr;
  };

  return (
    <div className="space-y-8">
      {/* Filter chips — driven by real categories */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setActiveCategoryId('all')}
          className={cn(
            'rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300',
            activeCategoryId === 'all'
              ? 'bg-amber-500 text-white shadow-card'
              : 'bg-white/60 text-charcoal-600 hover:bg-amber-50 hover:text-amber-700 dark:bg-charcoal-800/60 dark:text-charcoal-300 dark:hover:bg-charcoal-700'
          )}
        >
          {t('filter.all')}
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategoryId(category.id)}
            className={cn(
              'rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300',
              activeCategoryId === category.id
                ? 'bg-amber-500 text-white shadow-card'
                : 'bg-white/60 text-charcoal-600 hover:bg-amber-50 hover:text-amber-700 dark:bg-charcoal-800/60 dark:text-charcoal-300 dark:hover:bg-charcoal-700'
            )}
          >
            {localizedCategoryLabel(category)}
            <span className="ms-1.5 text-[10px] opacity-60">({category.productCount})</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mx-auto max-w-md rounded-2xl border border-white/15 bg-white/60 p-10 text-center text-sm text-charcoal-500 dark:border-white/8 dark:bg-charcoal-900/50 dark:text-charcoal-400">
          {t('outOfStock')}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, index) => {
            const name = localizedProductName(product, locale);
            const image = resolveImageUrl(product.images?.[0]);
            const outOfStock = product.stockQuantity <= 0;
            return (
              <AnimateOnScroll key={product.id} animation="fade-up" delay={index * 80}>
                <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/60 shadow-glass backdrop-blur-sm transition-all duration-500 hover:shadow-elevated hover:-translate-y-1 dark:border-white/8 dark:bg-charcoal-900/50">
                  {/* Card body is the link */}
                  <Link href={`/${locale}/products/${product.slug}` as `/${string}`} className="flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-900/30 via-transparent to-transparent" />

                      <div className="absolute start-4 top-4 flex flex-col gap-1.5">
                        {product.isFeatured && (
                          <Badge variant="default" className="rounded-full shadow-lg">
                            ★ Featured
                          </Badge>
                        )}
                        {outOfStock && (
                          <Badge variant="destructive" className="rounded-full shadow-lg">
                            {t('outOfStock')}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-display text-lg font-semibold text-charcoal-900 dark:text-amber-50">
                            {name}
                          </h3>
                          {product.weightGrams ? (
                            <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                              {product.weightGrams}g · {product.origin ?? ''}
                            </p>
                          ) : (
                            <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                              {product.origin ?? product.categoryName ?? ''}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <span className="font-display text-2xl font-bold text-charcoal-900 dark:text-amber-50">
                          {formatPriceMAD(product.price, locale)}
                        </span>
                        {product.categoryName && (
                          <Badge variant="glass" className="text-[10px]">
                            {product.categoryName}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Quick add button — outside the link to avoid nested-link semantics */}
                  <div className="absolute bottom-16 end-4 z-10 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <Button
                      size="icon"
                      className="h-12 w-12 rounded-full shadow-elevated"
                      disabled={outOfStock || loading}
                      onClick={e => handleAddToCart(product, e)}
                      aria-label={t('addToCart')}
                    >
                      <ShoppingBag className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      )}
    </div>
  );
}
