import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('skeleton', className)}
      role="status"
      aria-label="Loading..."
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/20 bg-white/70 p-4 dark:border-white/8 dark:bg-charcoal-900/60">
      <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
      <div className="space-y-3 p-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="flex flex-col gap-8 rounded-[44px] border border-white/20 bg-white/70 p-8 lg:flex-row lg:items-center">
      <div className="flex-1 space-y-6">
        <Skeleton className="h-5 w-28 rounded-full" />
        <Skeleton className="h-16 w-full max-w-lg" />
        <Skeleton className="h-12 w-full max-w-md" />
        <Skeleton className="h-5 w-full max-w-xl" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
      </div>
      <Skeleton className="aspect-[4/5] w-full max-w-md rounded-[36px]" />
    </div>
  );
}
