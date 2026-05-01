import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-amber-500 text-white hover:bg-amber-600",
        secondary:
          "border-transparent bg-sand-100 text-charcoal-700 hover:bg-sand-200 dark:bg-charcoal-800 dark:text-charcoal-200",
        destructive:
          "border-transparent bg-red-500/10 text-red-700 hover:bg-red-500/20 dark:text-red-300",
        outline:
          "border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-300",
        glass:
          "border-white/20 bg-white/60 text-charcoal-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-charcoal-800/60 dark:text-charcoal-200",
        success:
          "border-transparent bg-atlas-100 text-atlas-800 dark:bg-atlas-900/30 dark:text-atlas-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
