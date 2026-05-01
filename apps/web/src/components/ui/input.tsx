import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', startIcon, endIcon, error, ...props }, ref) => {
    return (
      <div
        className={cn(
          'relative flex items-center rounded-2xl border border-transparent bg-white/80 shadow-inner transition-all duration-200 dark:bg-charcoal-900/60',
          error && 'border-red-400 ring-2 ring-red-200 dark:border-red-600 dark:ring-red-900/30',
          className
        )}
      >
        {startIcon && (
          <span className="pointer-events-none ps-4 text-charcoal-400 dark:text-charcoal-500">
            {startIcon}
          </span>
        )}
        <input
          type={type}
          className={cn(
            'flex-1 rounded-2xl border-0 bg-transparent px-4 py-3.5 text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-amber-300/60 dark:text-amber-50 dark:placeholder:text-charcoal-500 dark:focus:ring-amber-600/40',
            startIcon ? 'ps-2' : 'ps-4',
            endIcon ? 'pe-2' : 'pe-4'
          )}
          ref={ref}
          aria-invalid={error || undefined}
          {...props}
        />
        {endIcon && (
          <span className="pe-4 text-charcoal-400 dark:text-charcoal-500">
            {endIcon}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
