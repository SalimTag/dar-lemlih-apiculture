"use client";

import type { ComponentProps } from "react";
import { Toaster as SonnerToaster } from "sonner";

export type ToasterProps = ComponentProps<typeof SonnerToaster>;

export function Toaster({ ...props }: ToasterProps) {
  return (
    <SonnerToaster
      toastOptions={{
        classNames: {
          toast:
            "group pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-2xl border border-amber-200 bg-white/80 px-4 py-3 text-sm text-charcoal-900 shadow-glass backdrop-blur-md transition-all duration-200 dark:border-amber-800/40 dark:bg-charcoal-900/80 dark:text-amber-50",
          title: "text-base font-semibold tracking-tight",
          description: "text-sm opacity-80",
          actionButton:
            "rounded-xl bg-amber-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:bg-amber-500 dark:hover:bg-amber-400",
          cancelButton:
            "rounded-xl border border-charcoal-200 px-3 py-1.5 text-sm font-medium text-charcoal-900 transition hover:bg-charcoal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:border-charcoal-700 dark:text-amber-50 dark:hover:bg-charcoal-800"
        }
      }}
      {...props}
    />
  );
}
