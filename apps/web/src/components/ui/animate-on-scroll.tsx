'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/hooks/use-in-view';

type AnimationVariant = 'fade-up' | 'fade-in' | 'scale-in' | 'slide-left' | 'slide-right';

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationVariant;
  delay?: number;
}

const animationClasses: Record<AnimationVariant, string> = {
  'fade-up': 'animate-fade-up',
  'fade-in': 'animate-fade-in',
  'scale-in': 'animate-scale-in',
  'slide-left': 'animate-slide-left',
  'slide-right': 'animate-slide-right',
};

export function AnimateOnScroll({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
}: AnimateOnScrollProps) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0',
        isInView && animationClasses[animation],
        className
      )}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
