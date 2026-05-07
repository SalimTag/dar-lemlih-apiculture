'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingBag, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCart, Product } from '@/lib/hooks/use-cart';

export function AddToCartButton({ product }: { product: Product }) {
  const t = useTranslations('products');
  const tCart = useTranslations('cart');
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      cart.addItem(product);
    }
    toast.success(tCart('added', { name: product.nameKey }));
    setQuantity(1);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4 rounded-full border border-sand-200 p-1.5 dark:border-charcoal-800">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center text-lg font-semibold">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={() => setQuantity(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button
        className="h-14 flex-1 rounded-full bg-amber-600 px-8 text-lg hover:bg-amber-700"
        onClick={handleAddToCart}
      >
        <ShoppingBag className="me-2 h-5 w-5" />
        {t('addToCart')}
      </Button>
    </div>
  );
}
