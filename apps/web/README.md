# Dar Lemlih Web – Next.js App Router

Luxury Moroccan apiculture storefront built with Next.js 14 App Router, shadcn/ui, Supabase Auth, Stripe Checkout, and next-intl. The marketing experience is available in Arabic, French, and English with RTL/LTR awareness and a design system tuned for Dar Lemlih’s brand codes.

## Prerequisites

- **Node.js** 18.20+ or 20.11+
- **npm** 9+ (or pnpm/yarn if you prefer)
- Supabase project with Auth enabled
- Stripe account with test API keys

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. You’ll be redirected to `/fr` by default; language can be switched from the globe icon.

### Type safety, linting, and tests

```bash
npm run typecheck
npm run lint
npm run test      # vitest unit tests
npm run playwright:test  # smoke tests (expects app running on :3000)
```

## Environment variables

Create `.env.local` in this directory:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> `SUPABASE_SERVICE_ROLE_KEY` is only consumed on the server (route handlers / actions). Never expose it to the browser.

### Supabase configuration checklist

1. **Auth URL** – In Supabase → Authentication → URL Configuration set:
   - Site URL: your production domain (e.g. `https://dar-lemlih.com`)
   - Additional Redirect URLs: `http://localhost:3000`, `https://*.vercel.app`
2. **Cookie domain** – Leave empty (Supabase manages). Our clients write cookies via `sb-darlemlih-auth`.
3. **Email templates** – customise from Authentication → Templates.
4. **OAuth providers** – add credentials if you plan to enable Google/Facebook. Ensure callback: `https://YOUR_DOMAIN/auth/callback`.
5. **Edge session helpers** – Both `lib/supabase/client.ts` and `lib/supabase/server.ts` read URLs/keys exclusively from env vars.

### Stripe test setup

1. Copy your test **publishable** & **secret** keys into `.env.local`.
2. Install the Stripe CLI and forward webhooks to the app if you work on checkout server actions:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
3. Update **Success URL** / **Cancel URL** inside `lib/stripe.ts` (to be created during checkout integration).

## Project structure

```
src/
  app/
    (marketing)/[locale]/         # Locale-aware marketing routes
    (auth)/[locale]/login/        # Auth pages
    globals.css                   # Tailwind entrypoint
  components/
    blocks/                       # Hero, FeatureGrid, Steps, etc.
    forms/                        # Auth dialog & forms
    layout/                       # Header, Footer, Locale switcher
    ui/                           # shadcn/ui primitives
  content/                        # MDX sources (blog, recipes, story)
  i18n/                           # locale routing + JSON dictionaries
  lib/                            # Supabase helpers, utils
  stores/                         # Zustand slices (cart, currency)
  tests/                          # Vitest & Playwright suites
```

- `contentlayer.config.ts` prepares typed MDX sources for recipes/blog posts.
- `middleware.ts` protects `/[locale]/account`, `/[locale]/orders`, `/[locale]/checkout` by checking the Supabase auth cookie.
- `tailwind.config.ts` encodes the desert/amber/charcoal palette and RTL variants.

## Deploying to Vercel

1. Connect the GitHub repo to Vercel.
2. Configure the environment variables in Vercel → Settings → Environment Variables for **Production**, **Preview**, and **Development**.
3. Add Supabase project URL + keys and Stripe keys for each environment.
4. Enable the `@vercel/analytics` integration (already imported in `app/layout.tsx`).
5. Trigger a deploy; Vercel will run `npm install`, `npm run build`.
6. Once live, copy the production URL back into Supabase → Authentication → URL Configuration (Site URL & Redirect URLs).

## Known issues & decisions

- **Commerce flows pending**: Cart state, checkout, Stripe integration, and Supabase product syncing are scaffolded but not yet implemented. Product + order pages currently render placeholders.
- **Localization coverage**: New components are wired to next-intl but only core marketing strings are translated. Product data, forms, and transactional copy need end-to-end localisation.
- **Testing**: Only baseline Playwright smoke test is enabled. Additional coverage for auth flows, cart persistence, and checkout must be added once those features land.
- **Contentlayer data**: The MDX directories are empty placeholders; hook up CMS pipelines or add `.mdx` files before publishing.
- **Legacy artefacts removed**: Vite SPA assets were deleted in favour of Next.js App Router. Regenerate lockfiles (`npm install`) to reconcile dependencies.

For implementation details see `docs/architecture.md`.
