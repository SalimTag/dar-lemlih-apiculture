'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/hooks/use-cart';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';

export function CartSheet() {
  const t = useTranslations();
  const locale = useLocale();
  const cart = useCart();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? cart.getTotalItems() : 0;
  const totalPrice = mounted ? cart.getTotalPrice() : 0;

  if (!mounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full" aria-label={t('nav.cart')}>
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white shadow-sm">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            {t('cart.title')}
            {totalItems > 0 && (
              <span className="text-sm font-normal text-charcoal-500">
                ({totalItems} {totalItems === 1 ? t('cart.item') : t('cart.items')})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <Separator className="my-4" />

        {cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-sand-100 p-6 dark:bg-charcoal-800">
              <ShoppingBag className="h-10 w-10 text-sand-400" />
            </div>
            <p className="text-lg font-medium text-charcoal-900 dark:text-amber-50">
              {t('cart.empty')}
            </p>
            <p className="max-w-[200px] text-sm text-charcoal-500">
              {t('cart.emptySub')}
            </p>
            <SheetTrigger asChild>
              <Button variant="outline" className="mt-2 rounded-full">
                {t('cart.startShopping')}
              </Button>
            </SheetTrigger>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="flex flex-col gap-5 py-2">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative aspect-square h-20 w-20 overflow-hidden rounded-xl bg-sand-100 dark:bg-charcoal-800">
                      <Image
                        src={item.image}
                        alt={item.nameKey}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-semibold text-charcoal-900 dark:text-amber-50">
                            {item.nameKey}
                          </h4>
                          <p className="text-xs text-charcoal-500">{item.weight}</p>
                        </div>
                        <p className="text-sm font-bold text-charcoal-900 dark:text-amber-50">
                          €{item.price * item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-sand-200 p-1 dark:border-charcoal-800">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-4 text-center text-xs font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-charcoal-400 hover:text-red-500"
                          onClick={() => cart.removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-6">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal-600 dark:text-charcoal-400">{t('cart.subtotal')}</span>
                  <span className="font-semibold text-charcoal-900 dark:text-amber-50">€{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal-600 dark:text-charcoal-400">{t('cart.shipping')}</span>
                  <span className="text-charcoal-500">{t('cart.shippingNote')}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>{t('cart.total')}</span>
                <span className="text-amber-600">€{totalPrice}</span>
              </div>
              <SheetFooter className="mt-2 flex-col gap-2 sm:flex-col">
                <Button className="w-full rounded-full bg-amber-600 hover:bg-amber-700" size="lg" asChild>
                  <Link href={`/${locale}/checkout` as any}>{t('cart.checkout')}</Link>
                </Button>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="w-full rounded-full">
                    {t('cart.continue')}
                  </Button>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
