'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/blocks/section';

export default function CartPage() {
  const t = useTranslations('cart');
  const locale = useLocale();
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <Section>
        <div className="flex flex-col items-center gap-6 py-24 text-center">
          <ShoppingBag className="h-16 w-16 text-charcoal-300 dark:text-charcoal-600" />
          <h1 className="font-display text-3xl text-charcoal-900 dark:text-amber-50">{t('empty')}</h1>
          <p className="text-charcoal-500 dark:text-charcoal-400">{t('emptyDescription')}</p>
          <Button asChild size="lg" className="rounded-full">
            <Link href={`/${locale}/products`}>{t('continueShopping')}</Link>
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="mb-10 text-center">
        <h1 className="font-display text-hero text-charcoal-900 dark:text-amber-50">{t('title')}</h1>
        <p className="mt-2 text-charcoal-600 dark:text-charcoal-300">
          {totalItems()} {totalItems() === 1 ? t('item') : t('items')}
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/60 p-4 shadow-glass backdrop-blur-sm dark:border-white/8 dark:bg-charcoal-900/50"
          >
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-charcoal-900 dark:text-amber-50">{item.name}</h3>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400">{item.origin} · {item.weight}</p>
              <p className="mt-1 font-bold text-charcoal-900 dark:text-amber-50">€{item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center text-sm font-medium text-charcoal-900 dark:text-amber-50">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-red-500 hover:text-red-600"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-white/15 bg-white/60 p-6 shadow-glass backdrop-blur-sm dark:border-white/8 dark:bg-charcoal-900/50">
          <div className="flex items-center justify-between text-sm text-charcoal-600 dark:text-charcoal-300">
            <span>{t('subtotal')}</span>
            <span>€{totalPrice().toFixed(2)}</span>
          </div>
          <div className="my-3 border-t border-sand-200/60 dark:border-charcoal-700/60" />
          <div className="flex items-center justify-between font-bold text-charcoal-900 dark:text-amber-50">
            <span>{t('total')}</span>
            <span className="text-xl">€{totalPrice().toFixed(2)}</span>
          </div>
          <Button asChild size="lg" className="mt-5 w-full rounded-full">
            <Link href={`/${locale}/checkout`}>{t('checkout')}</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="mt-2 w-full rounded-full">
            <Link href={`/${locale}/products`}>{t('continueShopping')}</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
