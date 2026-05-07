import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ShoppingBag, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { Section } from '@/components/blocks/section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AddToCartButton } from './add-to-cart-button';

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.slug);
  if (!product) return {};

  return {
    title: `${product.nameKey} | Dar Lemlih`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { locale: string; slug: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.slug);
  if (!product) notFound();

  const t = await getTranslations({ locale: params.locale, namespace: 'products' });

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/20 bg-white/50 shadow-glass backdrop-blur dark:border-white/10 dark:bg-charcoal-900/50">
          <Image
            src={product.image}
            alt={product.nameKey}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {product.featured && (
            <div className="absolute start-6 top-6">
              <Badge variant="default" className="px-4 py-1.5 text-xs shadow-lg">
                ★ Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <Badge variant="glass" className="mb-2 uppercase tracking-widest">
              {product.origin}
            </Badge>
            <h1 className="font-display text-4xl font-bold text-charcoal-900 dark:text-amber-50 lg:text-5xl">
              {product.nameKey}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-bold">{product.rating}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-charcoal-500">Certified Pure</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-charcoal-900 dark:text-amber-50">€{product.price}</span>
            <span className="text-charcoal-500">/ {product.weight}</span>
          </div>

          <p className="text-lg leading-relaxed text-charcoal-600 dark:text-charcoal-300">
            {product.description}
          </p>

          <Separator className="my-2" />

          {/* Add to Cart - Client Component */}
          <AddToCartButton product={product} />

          {/* Benefits */}
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-sand-50 p-4 text-center dark:bg-charcoal-800/50">
              <Truck className="h-5 w-5 text-amber-600" />
              <span className="text-xs font-medium">Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-sand-50 p-4 text-center dark:bg-charcoal-800/50">
              <ShieldCheck className="h-5 w-5 text-amber-600" />
              <span className="text-xs font-medium">Lab Tested</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-sand-50 p-4 text-center dark:bg-charcoal-800/50">
              <RotateCcw className="h-5 w-5 text-amber-600" />
              <span className="text-xs font-medium">Authenticity</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
