import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  background?: 'default' | 'contrast';
  children: ReactNode;
  className?: string;
}

export function Section({ id, background = 'default', className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'section-padding',
        background === 'contrast' && 'bg-white/60 backdrop-blur dark:bg-charcoal-900/60',
        className
      )}
    >
      <div className="container-bleed">{children}</div>
    </section>
  );
}
