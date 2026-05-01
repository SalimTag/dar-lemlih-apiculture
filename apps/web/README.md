# Atlas Nectar Web — Next.js 14 App Router

Premium Moroccan apiculture storefront built with **Next.js 14**, **Tailwind CSS**, **Supabase Auth**, and **next-intl**. Supports French, English, and Arabic with full RTL/LTR awareness and a custom Moroccan terroir design system.

## Quick Start

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). Redirects to `/fr` by default; switch language via the globe icon.

## Environment Variables

Copy the example and fill in your own values:

```bash
cp .env.example .env
```

Required variables (see `.env.example` for the full list):

```env
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> ⚠️ Never commit `.env` files. They are gitignored.

## Project Structure

```
src/
  app/
    (marketing)/[locale]/         # Locale-aware marketing routes
      page.tsx                    # Homepage
      products/page.tsx           # Product catalog
      story/page.tsx              # Brand narrative
      blog/page.tsx               # Journal & recipes
      contact/page.tsx            # Contact form
    layout.tsx                    # Root layout with fonts, SEO, providers
    globals.css                   # Design tokens, animations, utilities
  components/
    blocks/                       # Hero, FeatureGrid, Steps, ProductCatalog, SocialProof
    forms/                        # AuthDialog, ContactForm
    layout/                       # SiteHeader, SiteFooter, LocaleSwitcher, CookieBanner
    ui/                           # Button, Card, Badge, Input, AnimateOnScroll, Skeleton
  i18n/
    messages/                     # FR, EN, AR translation dictionaries
    routing.ts                    # Locale config, RTL detection
  lib/
    hooks/use-in-view.ts          # IntersectionObserver scroll hook
    supabase/                     # Server/client Supabase helpers
    utils.ts                      # cn() utility
```

## Design System

Custom Moroccan terroir palette defined in `tailwind.config.ts`:

- **honey** — Primary gold accents
- **atlas** — Green for sustainability/nature
- **terracotta** — Warm accent highlights
- **sand** — Light backgrounds & surfaces
- **charcoal** — Text & dark mode

Key features: glassmorphism panels, fluid `clamp()` typography, `ease-out-expo` transitions, scroll-triggered CSS animations, skeleton shimmer loaders, RTL logical properties.

## Scripts

```bash
npm run dev            # Start dev server
npm run build          # Production build
npm run typecheck      # TypeScript type checking
npm run lint           # ESLint
npm run test           # Vitest unit tests
npm run playwright:test # E2E smoke tests
```

## Deployment

Connect to **Vercel**, configure env vars in the dashboard, and deploy. The build runs `npm install` → `npm run build` automatically.
