import type { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
  {
    variants: {
      variant: {
        brand: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-charcoal-900 dark:text-amber-200',
        outline: 'border-charcoal-200 text-charcoal-600 dark:border-charcoal-700 dark:text-charcoal-200',
        glass:
          'border-white/40 bg-white/30 text-charcoal-800 backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-amber-100'
      }
    },
    defaultVariants: {
      variant: 'brand'
    }
  }
);

export type BadgeProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
