import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', startIcon, endIcon, ...props }, ref) => {
    return (
      <div className={cn('relative flex items-center rounded-2xl bg-white/80 shadow-inner dark:bg-charcoal-900/60', className)}>
        {startIcon && <span className="pointer-events-none pl-4 text-charcoal-400 dark:text-charcoal-300">{startIcon}</span>}
        <input
          type={type}
          className={cn(
            'flex-1 rounded-2xl border border-transparent bg-transparent px-4 py-3 text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200 dark:text-amber-50 dark:placeholder:text-charcoal-400',
            startIcon ? 'pl-2' : 'pl-4',
            endIcon ? 'pr-2' : 'pr-4'
          )}
          ref={ref}
          {...props}
        />
        {endIcon && <span className="pr-4 text-charcoal-400 dark:text-charcoal-300">{endIcon}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
