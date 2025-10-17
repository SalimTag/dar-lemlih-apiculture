# Dar Lemlih Web – Next.js App Router Architecture

## High-level goals
- Deliver a luxury Moroccan apiculture storefront with AR/FR/EN locales, RTL/LTR support, and first-class accessibility.
- Build on Next.js App Router with server components, ISR, and robust SEO metadata out of the box.
- Centralize design tokens via shadcn/ui while keeping brand-specific styling consistent across devices.
- Provide secure authentication powered by Supabase with client/server helpers and protected routes.
- Maintain resilient commerce primitives: product catalog, variant-aware PDP, persisted cart, and Stripe-powered checkout.

## Directory layout (target)
```
apps/web/
 ├── app/
 │   ├── (marketing)/                # localized marketing routes with shared layout
 │   │   ├── [locale]/
 │   │   │   ├── (routes)/
 │   │   │   │   ├── page.tsx       # localized homepage
 │   │   │   │   ├── products/
 │   │   │   │   │   ├── page.tsx   # product listing w/ filters
 │   │   │   │   ├── products/[slug]/page.tsx
 │   │   │   │   ├── story/page.tsx
 │   │   │   │   ├── blog/page.tsx  # MDX contentlayer feed
 │   │   │   │   ├── blog/[slug]/page.tsx
 │   │   │   │   ├── recipes/page.tsx
 │   │   │   │   └── recipes/[slug]/page.tsx
 │   ├── (account)/[locale]/         # gated routes (account, orders, checkout)
 │   ├── api/                        # route handlers (Supabase auth hooks, cart persistence, Stripe webhooks)
 │   ├── layout.tsx                  # root metadata, font loading, Providers
 │   └── middleware.ts               # auth guard + locale router
 ├── components/
 │   ├── ui/                         # shadcn generated primitives (button, dialog, badge…)
 │   ├── blocks/                     # Brand-specific sections (Hero, FeatureGrid, Steps, Testimonials)
 │   ├── commerce/                   # ProductCard, ProductGallery, AddToCartButton, CartDrawer
 │   ├── layout/                     # Navbar, Footer, LocaleSwitcher, CookieBanner
 │   └── forms/                      # AuthDialog forms, newsletter sign-up
 ├── lib/
 │   ├── supabase/
 │   │   ├── client.ts               # browser Supabase client (anon key only)
 │   │   └── server.ts               # server Supabase client wired to cookies
 │   ├── stripe.ts                   # Stripe server helper
 │   ├── intl/
 │   │   ├── routing.ts              # next-intl locale routing helpers
 │   │   └── messages.ts             # message catalog loader
 │   ├── filters.ts                  # product filtering logic (shared)
 │   ├── analytics.ts                # @vercel/analytics + speed insights
 │   └── constants.ts                # brand colors, typography tokens
 ├── content/
 │   ├── blog/                       # MDX posts (contentlayer)
 │   ├── recipes/
 │   └── story/
 ├── data/
 │   ├── products.json               # seed fixtures until CMS is connected
 │   └── locales/                    # AR/FR/EN message JSON
 ├── stores/                         # zustand slices (cart, currency) w/ persistence
 ├── tests/
 │   ├── unit/                       # Vitest + Testing Library
 │   └── e2e/                        # Playwright smoke tests
 ├── public/                         # static assets (hero, badges, blur placeholders)
 ├── styles/                         # tailwind config, typography utilities, prose theme
 ├── next.config.mjs
 ├── tailwind.config.ts
 ├── tsconfig.json
 └── README.md
```

## Key architectural decisions
- **Localization**: `next-intl` provides per-locale routing (`/ar`, `/fr`, `/en`) with automatic `dir` handling. Middleware reads the locale from the path, sets `lang` and `dir`, and falls back to browser language.
- **Auth**: Supabase SSR helpers manage cookie-based sessions. Middleware guards `/account`, `/orders`, and `/checkout`, redirecting anonymous users to a locale-aware login route handled by the AuthDialog.
- **Design system**: Use shadcn/ui generator to bootstrap primitives, then extend via Tailwind tokens (`rounded-3xl`, `bg-desert-50`, `text-amber-700`). All custom components consume these primitives for consistency.
- **Commerce**: Products originate from Supabase (preferred) or JSON fixtures. Product pages render structured data (Product, BreadcrumbList) with incremental static regeneration (`revalidate` per product).
- **Cart flow**: Zustand maintains client cart state; authenticated users sync to Supabase via route handlers. Checkout delegates to Stripe Checkout Sessions with success/cancel URLs.
- **Content**: contentlayer compiles MDX files into typed data. Admin interface (future) lives under `/[locale]/admin` behind RBAC guards.
- **Performance**: Use `next/image` with `blurDataURL`, prefetch hero assets, apply `backdrop-blur` only to glass cards, and register `@vercel/analytics` + `@vercel/speed-insights`.
- **Testing**: Strict TypeScript mode and ESLint guard regressions; Vitest covers components; Playwright ensures auth, cart, checkout, and locale flows run without “Failed to fetch” errors.

This document will guide the migration from the existing Vite SPA to the Next.js App Router implementation while ensuring parity and unlocking the requested enhancements.

