'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { useCart } from '@/lib/hooks/use-cart';
import { PRODUCTS } from '@/lib/products';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const FILTERS = ['all', 'honey', 'pollen', 'propolis'] as const;

export function ProductCatalog({ locale }: { locale: string }) {
  const t = useTranslations('products');
  const tCart = useTranslations('cart');
  const cart = useCart();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    cart.addItem({
      id: product.id,
      nameKey: product.nameKey,
      price: product.price,
      image: product.image,
      weight: product.weight,
    });
    toast.success(tCart('added', { name: product.nameKey }));
  };

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
              <Link href={`/${locale}/products/${product.id}`} className="flex flex-col">
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
              </Link>

              {/* Quick add button - Moved outside the link to avoid nested links/actions */}
              <div className="absolute bottom-16 end-4 z-10 opacity-0 transition-all duration-300 group-hover:opacity-100">
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-elevated"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span className="sr-only">{t('addToCart')}</span>
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}
