'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingBag, ArrowLeft, Star } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/blocks/section';
import { toast } from 'sonner';

// Mock products data — same source as catalog until API is wired up
const PRODUCTS = [
  {
    id: 'thyme-atlas',
    category: 'honey',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    price: 38,
    weight: '250g',
    origin: 'High Atlas',
    rating: 4.9,
    name: 'Wild Thyme Honey',
    description: 'Harvested at 2,400m altitude in the High Atlas Mountains, this wild thyme honey offers an extraordinary mineral complexity and rare floral depth. The bees forage exclusively on wild Thymus atlanticus, producing a honey with antiseptic properties and a bold, aromatic profile.',
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
    name: 'Euphorbia Daghmous',
    description: 'From the sun-drenched Souss-Massa region, this rare euphorbia honey is prized for its dark amber hue and powerful, resinous flavour. Limited batches are harvested once a year from wild euphorbia plants endemic to southern Morocco.',
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
    name: 'Orange Blossom Honey',
    description: 'Delicate and fragrant, this honey is collected during the brief spring bloom of orange groves in the Fès-Meknès region. Its light colour, floral aroma, and gentle sweetness make it ideal for pastries and morning rituals.',
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
    name: 'Carob Honey',
    description: 'Sourced from the cedar and carob forests around Chefchaouen, this honey has a distinctive smoky richness and long, complex finish. It pairs beautifully with aged cheeses and dark chocolate.',
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
    name: 'Wildflower Pollen',
    description: 'Hand-collected from the Ifrane cedar plateau, this multifloral pollen granule blend captures the biodiversity of the Middle Atlas. Rich in flavonoids, proteins, and natural enzymes — a daily superfood.',
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
    name: 'Propolis Tincture',
    description: 'A pure, alcohol-free propolis extract from High Atlas hives. Known for its powerful antimicrobial properties, this traditional Berber remedy supports immune function and wound healing.',
    featured: false,
  },
];

type Props = { params: { slug: string; locale: string } };

export default function ProductDetailPage({ params }: Props) {
  const t = useTranslations('products');
  const locale = useLocale();
  const addItem = useCartStore((s) => s.addItem);

  const product = PRODUCTS.find((p) => p.id === params.slug);

  if (!product) {
    return (
      <Section>
        <div className="flex flex-col items-center gap-6 py-24 text-center">
          <h1 className="font-display text-3xl text-charcoal-900 dark:text-amber-50">Product not found</h1>
          <Button asChild className="rounded-full">
            <Link href={`/${locale}/products`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to collection
            </Link>
          </Button>
        </div>
      </Section>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight,
      origin: product.origin,
    });
    toast.success(t('addedToCart'));
  };

  return (
    <Section>
      {/* Back link */}
      <Link
        href={`/${locale}/products`}
        className="mb-8 inline-flex items-center gap-2 text-sm text-charcoal-500 transition-colors hover:text-charcoal-900 dark:text-charcoal-400 dark:hover:text-amber-100"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('backToCollection')}
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Product image */}
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/15 shadow-glass">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {product.featured && (
            <div className="absolute start-4 top-4">
              <Badge variant="default" className="rounded-full shadow-lg">
                ★ Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.5em] text-amber-600 dark:text-amber-400">
              {product.category}
            </p>
            <h1 className="font-display text-4xl font-semibold text-charcoal-900 dark:text-amber-50">
              {product.name}
            </h1>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-charcoal-300 dark:text-charcoal-600">·</span>
              <Badge variant="glass">{product.origin}</Badge>
              <Badge variant="glass">{product.weight}</Badge>
            </div>
          </div>

          <p className="text-base leading-relaxed text-charcoal-600 dark:text-charcoal-300">
            {product.description}
          </p>

          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold text-charcoal-900 dark:text-amber-50">
              €{product.price}
            </span>
            <span className="text-sm text-charcoal-500 dark:text-charcoal-400">/ {product.weight}</span>
          </div>

          <Button size="xl" className="rounded-full" onClick={handleAddToCart}>
            <ShoppingBag className="mr-2 h-5 w-5" />
            {t('addToCart')}
          </Button>

          <div className="rounded-2xl border border-amber-200/40 bg-amber-50/60 px-5 py-4 dark:border-amber-800/30 dark:bg-amber-950/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {t('origin')}: <strong>{product.origin}</strong> · {t('weight')}: <strong>{product.weight}</strong>
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
