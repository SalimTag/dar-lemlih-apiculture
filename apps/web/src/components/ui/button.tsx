import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        default:
          'bg-amber-500 text-white shadow-card hover:bg-amber-600 active:bg-amber-700 dark:bg-amber-400 dark:hover:bg-amber-300',
        subtle:
          'bg-amber-50 text-amber-700 shadow-inner hover:bg-amber-100 dark:bg-charcoal-800 dark:text-amber-200 dark:hover:bg-charcoal-700',
        outline:
          'border border-amber-200 bg-transparent text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-200 dark:hover:bg-charcoal-900',
        ghost:
          'text-charcoal-800 hover:bg-sand-50 hover:text-charcoal-900 dark:text-amber-100 dark:hover:bg-charcoal-800',
        link: 'text-amber-600 underline-offset-4 hover:underline dark:text-amber-300'
      },
      size: {
        sm: 'h-9 px-4 py-2 text-sm',
        md: 'h-11 px-5 py-2.5 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
