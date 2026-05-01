import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  background?: 'default' | 'contrast' | 'warm';
  children: ReactNode;
  className?: string;
  fullBleed?: boolean;
}

const bgClasses = {
  default: '',
  contrast: 'bg-white/50 backdrop-blur-sm dark:bg-charcoal-900/40',
  warm: 'bg-gradient-to-b from-amber-50/40 to-transparent dark:from-amber-950/10 dark:to-transparent',
};

export function Section({
  id,
  background = 'default',
  className,
  children,
  fullBleed = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'section-padding',
        bgClasses[background],
        className
      )}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className={cn(!fullBleed && 'container-bleed')}>
        {children}
      </div>
    </section>
  );
}
