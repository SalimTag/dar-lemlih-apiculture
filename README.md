# 🍯 Dar Lemlih — Moroccan Terroir E-Commerce

[![Next.js](https://img.shields.io/badge/Next.js-14-000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-6DB33F?logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](#license)

> A premium, multilingual e-commerce platform for Moroccan terroir honey products. Built with Next.js 14, Tailwind CSS, Supabase Auth, and a Spring Boot REST API — with flawless Arabic RTL support and a glassmorphism-inspired aesthetic.

---

## ✨ Features

### 🛍️ Storefront
- **Awwwards-level design** — Glassmorphism, gradient overlays, micro-animations (Framer Motion), and scroll-triggered reveals.
- **Trilingual support** — French 🇫🇷, English 🇬🇧, and Arabic 🇲🇦 with full RTL layout integration.
- **Product catalog** — Dynamic grid with category filters, hover effects, and instant PDP navigation.
- **Premium aesthetic** — Moroccan terroir palette (Honey Gold, Atlas Green, Terracotta) with fluid typography.
- **Persistent Cart** — Client-side cart management powered by Zustand with local storage persistence.

### 📖 Content & Marketing
- **Story** — Immersive brand narrative with alternating layouts and high-quality terroir imagery.
- **Blog (CMS)** — MDX-powered blog for seasonal recipes, honey stories, and wellness rituals (via Contentlayer).
- **Contact** — Fully functional form with loading states, toast feedback (Sonner), and info cards.

### 🔒 Security & Auth
- **Supabase Auth** — Secure email/password authentication and session management.
- **Protected routes** — Middleware-based access control for user accounts and checkout flows.
- **Backend Security** — Stateless JWT authentication and Spring Security integration.

---

## 🏗️ Architecture

```
dar-lemlih-apiculture/
├── apps/
│   ├── api/                       # Spring Boot 3.2 REST API (Java 21)
│   │   ├── src/main/java/com/darlemlih/apiculture/
│   │   │   ├── controllers/       # REST Endpoints (Catalog, Orders, Auth)
│   │   │   ├── services/          # Business Logic
│   │   │   ├── entities/          # JPA Domain Models
│   │   │   ├── security/          # JWT & Spring Security
│   │   │   └── config/            # CORS, OpenAPI (Swagger), AWS/Storage
│   │   └── pom.xml                # Maven configuration
│   │
│   └── web/                       # Next.js 14 Frontend (App Router)
│       ├── src/
│       │   ├── app/               # Localized marketing & auth routes
│       │   ├── components/
│       │   │   ├── blocks/        # Hero, FeatureGrid, ProductCatalog
│       │   │   ├── layout/        # SiteHeader, LocaleSwitcher, CartSheet
│       │   │   └── ui/            # Shadcn UI primitives (radix-ui)
│       │   ├── i18n/              # next-intl configuration & dictionaries
│       │   └── lib/               # Zustand hooks, Supabase helpers, utils
│       └── tailwind.config.ts     # Design tokens & RTL logical properties
│
├── docs/                          # Architecture & agent guides
└── infra/scripts/                 # Database migrations & utilities
```

---

## 🚀 Getting Started

### Prerequisites
| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20+ | Frontend development |
| Java | 21+ | Backend API development |
| MySQL | 8.0 | Primary data store |
| Supabase | - | Authentication & User management |

### 1. Clone & Setup
```bash
git clone https://github.com/salimtagemouati/dar-lemlih-apiculture.git
cd dar-lemlih-apiculture
```

### 2. Configure Environment
```bash
# Backend config
cp apps/api/.env.example apps/api/.env

# Frontend config
cp apps/web/.env.example apps/web/.env
```
*Note: Ensure you configure your Supabase keys and Database credentials in these files.*

### 3. Start Development Servers
**Frontend:**
```bash
cd apps/web
npm install
npm run dev
```

**Backend:**
```bash
cd apps/api
./mvnw spring-boot:run
```

---

## 🌐 Internationalization
Full i18n support powered by `next-intl`.

| Locale | Direction | Status |
|--------|-----------|--------|
| `fr` (French) | LTR | ✅ Primary |
| `en` (English) | LTR | ✅ Complete |
| `ar` (Arabic) | **RTL** | ✅ Complete |

RTL layouts are handled using **Tailwind logical properties** (`ps-`, `me-`, `start-`, `end-`) ensuring a perfect mirrored experience for Arabic users without duplicating CSS.

---

## 🧪 Testing & Quality
- **Type Safety**: Full TypeScript coverage across the frontend.
- **Linting**: ESLint + Prettier for consistent code style.
- **Unit Testing**: Vitest for frontend logic; JUnit 5 for backend services.
- **E2E Testing**: Playwright for critical user journeys.

---

## 🗺️ Roadmap
- [x] Persistent Shopping Cart (Zustand)
- [x] Blog CMS integration (Contentlayer + MDX)
- [x] Localized SEO & Metadata
- [ ] Stripe Checkout integration (Web + API)
- [ ] User Account Dashboard (Order history)
- [ ] Admin Dashboard (Product & Inventory management)
- [ ] WhatsApp Order Integration
- [ ] Mobile Application (React Native / Expo)

---

## 📄 License
© 2026 Dar Lemlih Apiculture. All rights reserved. Proprietary software.

---
<p align="center">
  Made with ❤️ in Morocco 🇲🇦 by <a href="https://github.com/salimtagemouati">Salim Tagemouati</a>
</p>
