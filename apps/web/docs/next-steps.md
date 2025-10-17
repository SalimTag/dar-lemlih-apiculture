# Next phases for Dar Lemlih web

The Next.js foundation, localisation, shadcn/ui primitives, and Supabase auth scaffolding are in place. The following tracks will help reach feature parity and unlock ecommerce flows.

1. **Product data + catalog**
   - Connect Supabase tables for products, categories, variants, nutrition info, lab certificates.
   - Build `/[locale]/products` filters (floral source, region, weight, price) with server components + client refinements.
   - Implement `/[locale]/products/[slug]` PDP with media gallery, variant switcher, nutrition accordions, reviews, structured data.
2. **Cart & Checkout**
   - Create zustand cart slice with storage sync, add server routes to persist carts for authenticated users.
   - Integrate Stripe Checkout (test mode) with success/cancel pages and order confirmation.
   - Add rate limiting for cart + checkout actions (Supabase Edge functions or middleware).
3. **Account experiences**
   - Implement `/[locale]/account`, `/[locale]/orders` with Supabase row level security, order history, address book.
   - Expand middleware + server actions for profile updates and secure file downloads (lab certificates PDFs).
4. **Content and CMS**
   - Populate `src/content` with MDX (story, recipes, blog) and wire `contentlayer` generated types into routes.
   - Add simple admin interface (protected route) to create/edit MDX entries or connect to a headless CMS if preferred.
5. **Design polish**
   - Extend shadcn tokens (forms, accordions, toast) to match brand art direction.
   - Add testimonial carousel, FAQ accordion, CTA sections per design brief.
   - Introduce tasteful framer-motion transitions for hero, cards, and section reveals.
6. **Testing & QA**
   - Expand Vitest coverage for UI components and stores.
  - Add Playwright journeys for auth, add-to-cart, checkout, locale switching, hero load with blur transition.
   - Track Lighthouse metrics; target ≥95 on mobile for all categories.
7. **Deployment & observability**
   - Configure Vercel preview/production env vars (Supabase + Stripe) and verify Supabase Auth redirect URIs.
   - Add logging/monitoring for Supabase auth errors and Stripe webhook events.

These tasks should be prioritised after confirming Supabase credentials resolve the previous “Failed to fetch” login issue in each environment.
