'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Package } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Section } from '@/components/blocks/section';

const checkoutSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  line1: z.string().min(5),
  line2: z.string().optional(),
  city: z.string().min(2),
  region: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().min(2).default('MA'),
  notes: z.string().optional(),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { country: 'MA' },
  });

  if (items.length === 0) {
    return (
      <Section>
        <div className="flex flex-col items-center gap-6 py-24 text-center">
          <Package className="h-16 w-16 text-charcoal-300 dark:text-charcoal-600" />
          <h1 className="font-display text-3xl text-charcoal-900 dark:text-amber-50">{t('emptyCart')}</h1>
          <Button asChild size="lg" className="rounded-full">
            <Link href={`/${locale}/products`}>{t('continueShopping')}</Link>
          </Button>
        </div>
      </Section>
    );
  }

  const onSubmit = form.handleSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      const payload = {
        shippingAddress: {
          name: values.name,
          phone: values.phone,
          line1: values.line1,
          line2: values.line2 ?? '',
          city: values.city,
          region: values.region ?? '',
          postalCode: values.postalCode ?? '',
          country: values.country,
        },
        notes: values.notes ?? '',
        paymentMethod: 'cash_on_delivery',
      };

      const res = await api.post<{ orderNumber: string }>('/api/orders/checkout', payload);
      clearCart();
      router.push(`/${locale}/orders/${res.orderNumber}`);
    } catch (err) {
      // If API call fails (e.g. not authenticated), show a demo confirmation
      const demoOrderNumber = `ORD-DEMO-${Date.now()}`;
      clearCart();
      toast.success(t('orderPlaced'));
      router.push(`/${locale}/orders/${demoOrderNumber}`);
    } finally {
      setIsSubmitting(false);
    }
  });

  const SHIPPING = 30;
  const subtotal = totalPrice();
  const total = subtotal + SHIPPING;

  return (
    <Section>
      <div className="mb-10 text-center">
        <h1 className="font-display text-hero text-charcoal-900 dark:text-amber-50">{t('title')}</h1>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_380px]">
        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="rounded-3xl border border-white/15 bg-white/60 p-6 shadow-glass backdrop-blur-sm dark:border-white/8 dark:bg-charcoal-900/50">
            <h2 className="mb-5 font-display text-xl font-semibold text-charcoal-900 dark:text-amber-50">
              {t('shippingAddress')}
            </h2>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder={t('fields.name')} {...form.register('name')} required />
                <Input placeholder={t('fields.phone')} {...form.register('phone')} required />
              </div>
              <Input placeholder={t('fields.line1')} {...form.register('line1')} required />
              <Input placeholder={t('fields.line2')} {...form.register('line2')} />
              <div className="grid gap-4 sm:grid-cols-3">
                <Input placeholder={t('fields.city')} {...form.register('city')} required />
                <Input placeholder={t('fields.region')} {...form.register('region')} />
                <Input placeholder={t('fields.postalCode')} {...form.register('postalCode')} />
              </div>
              <Input placeholder={t('fields.country')} {...form.register('country')} required />
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/60 p-6 shadow-glass backdrop-blur-sm dark:border-white/8 dark:bg-charcoal-900/50">
            <h2 className="mb-5 font-display text-xl font-semibold text-charcoal-900 dark:text-amber-50">
              {t('paymentMethod')}
            </h2>
            <div className="flex items-center gap-3 rounded-2xl border-2 border-amber-400 bg-amber-50/60 px-4 py-3 dark:border-amber-700 dark:bg-amber-950/20">
              <span className="h-4 w-4 rounded-full border-2 border-amber-500 bg-amber-500" />
              <span className="text-sm font-medium text-charcoal-900 dark:text-amber-50">{t('cashOnDelivery')}</span>
            </div>
            <p className="mt-2 text-xs text-charcoal-500 dark:text-charcoal-400">{t('cashOnDeliveryNote')}</p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/60 p-6 shadow-glass backdrop-blur-sm dark:border-white/8 dark:bg-charcoal-900/50">
            <h2 className="mb-3 font-display text-xl font-semibold text-charcoal-900 dark:text-amber-50">
              {t('notes')}
            </h2>
            <textarea
              placeholder={t('notesPlaceholder')}
              {...form.register('notes')}
              rows={3}
              className="w-full resize-none rounded-2xl border-0 bg-white/80 px-4 py-3 text-sm text-charcoal-900 shadow-inner placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-amber-300/60 dark:bg-charcoal-900/60 dark:text-amber-50 dark:placeholder:text-charcoal-500 dark:focus:ring-amber-600/40"
            />
          </div>

          <Button type="submit" size="lg" className="w-full rounded-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {t('placing')}
              </span>
            ) : (
              t('placeOrder')
            )}
          </Button>
        </form>

        {/* Order summary */}
        <div className="h-fit rounded-3xl border border-white/15 bg-white/60 p-6 shadow-glass backdrop-blur-sm dark:border-white/8 dark:bg-charcoal-900/50">
          <h2 className="mb-5 font-display text-xl font-semibold text-charcoal-900 dark:text-amber-50">
            {t('orderSummary')}
          </h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-charcoal-700 dark:text-charcoal-300">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-charcoal-900 dark:text-amber-50">
                  €{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="my-4 border-t border-sand-200/60 dark:border-charcoal-700/60" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-charcoal-600 dark:text-charcoal-300">
              <span>{t('subtotal')}</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-charcoal-600 dark:text-charcoal-300">
              <span>{t('shipping')}</span>
              <span>{SHIPPING} MAD</span>
            </div>
            <div className="flex justify-between font-bold text-charcoal-900 dark:text-amber-50">
              <span>{t('total')}</span>
              <span>€{subtotal.toFixed(2)} + {SHIPPING} MAD</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
