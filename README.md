# 🍯 Dar Lemlih — Moroccan Terroir E-Commerce

[![Next.js](https://img.shields.io/badge/Next.js-14-000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3-6DB33F?logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](#license)

> A premium, multilingual e-commerce platform for Moroccan terroir honey products. Built with Next.js 14, Tailwind CSS, Supabase Auth, and a Spring Boot REST API — with flawless Arabic RTL support.

---

## ✨ Features

### 🛍️ Storefront

- **Awwwards-level design** — Glassmorphism, gradient overlays, micro-animations, scroll-triggered reveals
- **Trilingual** — French 🇫🇷, English 🇬🇧, Arabic 🇲🇦 with full RTL layout
- **Product catalog** — Dynamic grid with category filters, hover effects, quick-add to cart
- **Premium aesthetic** — Moroccan terroir palette (honey gold, atlas green, terracotta), fluid typography
- **Responsive** — Mobile-first with 44px touch targets, slide-out navigation panel

### 📖 Content Pages

- **Story** — Immersive 3-chapter brand narrative with alternating image/text layout
- **Blog** — Seasonal recipes, terroir stories, wellness rituals
- **Contact** — Form with loading states, toast feedback, info cards

### 🔒 Security & Auth

- Supabase Auth (email/password, OAuth-ready)
- Protected routes via Next.js middleware
- Session management with server/client Supabase helpers

### ♿ Accessibility

- Semantic HTML5 with ARIA labels on all interactive elements
- Keyboard-navigable with visible focus rings
- 44px minimum touch targets on mobile devices
- Screen reader support (`aria-pressed`, `aria-expanded`, `sr-only`)

---

## 🏗️ Architecture

```
dar-lemlih-apiculture/
├── apps/
│   ├── api/                       # Spring Boot REST API
│   │   ├── src/main/java/
│   │   │   ├── auth/              # JWT authentication
│   │   │   ├── catalog/           # Product & category CRUD
│   │   │   ├── orders/            # Order processing
│   │   │   └── config/            # CORS, OpenAPI, Security
│   │   └── pom.xml
│   │
│   └── web/                       # Next.js 14 Frontend
│       ├── src/
│       │   ├── app/               # App Router pages
│       │   ├── components/
│       │   │   ├── blocks/        # Hero, FeatureGrid, Steps, ProductCatalog
│       │   │   ├── forms/         # AuthDialog, ContactForm
│       │   │   ├── layout/        # Header, Footer, LocaleSwitcher
│       │   │   └── ui/            # Button, Card, Badge, Skeleton, AnimateOnScroll
│       │   ├── i18n/              # next-intl routing + FR/EN/AR dictionaries
│       │   └── lib/               # Supabase helpers, hooks, utils
│       └── tailwind.config.ts     # Design tokens & RTL variants
│
├── docs/                          # Architecture guides
└── infra/scripts/                 # Setup & seed scripts
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20+ | Frontend |
| Java | 21+ | Backend API |
| MySQL | 8.0 | Database |

### 1. Clone & Install

```bash
git clone https://github.com/salimtagemouati/dar-lemlih-apiculture.git
cd dar-lemlih-apiculture
```

### 2. Configure Environment

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Edit both `.env` files with your own credentials. See `.env.example` files for the full list of variables.

> ⚠️ **Never commit `.env` files.** They are gitignored by default.

### 3. Start the Frontend

```bash
cd apps/web
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/fr` by default.

### 4. Start the API (optional)

```bash
cd apps/api
./mvnw spring-boot:run
```

API runs at [http://localhost:8080](http://localhost:8080) with Swagger UI at `/swagger-ui.html`.

---

## 🌐 Internationalization

| Language | Code | Direction | Status |
|----------|------|-----------|--------|
| 🇫🇷 French | `fr` | LTR | ✅ Default |
| 🇬🇧 English | `en` | LTR | ✅ Complete |
| 🇲🇦 Arabic | `ar` | RTL | ✅ Complete |

- RTL layout handled via `dir` attribute in root layout + Tailwind logical properties (`ps`, `pe`, `ms`, `me`, `start`, `end`)
- Noto Sans Arabic loaded via `next/font` for proper Arabic rendering
- 60+ translation keys per locale covering all pages and UI elements

---

## 🎨 Design System

The frontend implements a custom Moroccan terroir design language:

| Token | Value | Usage |
|-------|-------|-------|
| Honey Gold | `amber-400..600` | Primary CTAs, badges, accents |
| Atlas Green | `atlas-400..700` | Nature/sustainability indicators |
| Terracotta | `terracotta-400..700` | Warm accent highlights |
| Sand | `sand-25..950` | Backgrounds, surfaces |
| Charcoal | `charcoal-50..950` | Text, dark mode surfaces |

**Key patterns:** Glassmorphism panels, gradient blob decorations, `ease-out-expo` transitions, IntersectionObserver scroll reveals, skeleton shimmer loaders.

---

## 🧪 Testing

```bash
cd apps/web

# Type checking
npm run typecheck

# Linting
npm run lint

# Unit tests (Vitest)
npm run test

# E2E tests (Playwright)
npm run playwright:test
```

---

## 📦 Deployment

### Frontend → Vercel

1. Connect the repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy — Vercel runs `npm install` → `npm run build` automatically

### API → Railway / Render

1. Connect the `apps/api` directory
2. Configure env vars (DB, JWT, CORS)
3. Set build command: `./mvnw package -DskipTests`

---

## 🗺️ Roadmap

- [ ] Stripe checkout integration
- [ ] Cart persistence with Zustand
- [ ] Product detail pages with tasting notes
- [ ] Admin dashboard (order management, product CRUD)
- [ ] Blog CMS via Contentlayer MDX
- [ ] WhatsApp order notifications
- [ ] Mobile app (React Native)

---

## 📄 License

© 2025 Dar Lemlih Apiculture. All rights reserved.

This project is proprietary software. Unauthorized copying, distribution, or use is strictly prohibited.

---

<p align="center">
  Made with ❤️ in Morocco 🇲🇦 by <a href="https://github.com/salimtagemouati">Salim Tagemouati</a>
</p>

<p align="center">
  <sub>🍯 From Atlas peaks to your table — rare Moroccan terroir honey, crafted with reverence</sub>
</p>
