# Dar Lemlih Apiculture - Project Context

This file serves as the foundational context for Gemini CLI interactions in this repository. It defines the project architecture, development standards, and operational workflows.

## 🚀 Project Overview

Dar Lemlih is a premium, multilingual e-commerce platform for Moroccan terroir honey. It is built as a monorepo containing a modern Next.js frontend and a robust Spring Boot REST API.

- **Frontend (`apps/web`):** Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase Auth, Zustand (Cart), next-intl (i18n).
- **Backend (`apps/api`):** Spring Boot 3.2, Java 21, MySQL, Flyway (migrations), JWT Security, Stripe (payments), AWS S3/LocalStack (storage).
- **Database:** MySQL 8.0 for core data; Supabase for authentication.

## 🏗️ Architecture & Structure

### Monorepo Layout
- `apps/api/`: Spring Boot REST API. Follows standard Maven structure.
- `apps/web/`: Next.js frontend. Uses App Router and localized marketing routes.
- `infra/scripts/`: Database migrations, seed scripts, and utility tools.
- `.github/workflows/`: CI/CD pipelines.

### Key Backend Components
- `com.darlemlih.apiculture.controllers`: REST endpoints for Catalog, Cart, Orders, and Auth.
- `com.darlemlih.apiculture.security`: JWT-based stateless authentication.
- `com.darlemlih.apiculture.config`: CORS, OpenAPI (Swagger), and AWS/Storage configuration.

### Key Frontend Components
- `src/app/(marketing)/[locale]`: Localized routes (fr, en, ar) with RTL support for Arabic.
- `src/components/blocks`: Reusable high-level UI sections (Hero, Catalog, FeatureGrid).
- `src/lib/supabase`: Server and Client Supabase helpers for session management.
- `src/i18n`: next-intl configuration and dictionary files.

## 🛠️ Development Workflows

### Prerequisites
- Node.js 20+
- Java 21+
- MySQL 8.0+
- Supabase Account / API Keys

### Running the Project
| Component | Directory | Command |
| :--- | :--- | :--- |
| **Frontend** | `apps/web` | `npm install && npm run dev` |
| **Backend** | `apps/api` | `./mvnw spring-boot:run` |

### Testing & Validation
- **Web:** `npm run typecheck`, `npm run lint`, `npm run test` (Vitest), `npm run playwright:test`.
- **API:** `./mvnw test`.

## 📏 Engineering Standards

### Frontend Conventions
- **RTL Support:** Use Tailwind logical properties (`ps`, `pe`, `ms`, `me`, `start`, `end`) instead of left/right fixed properties to support Arabic.
- **Authentication:** Use `sb-darlemlih-auth` cookie for session persistence. Prefer Supabase SSR helpers.
- **State Management:** Use Zustand for the cart and other lightweight client-side state.
- **Styling:** Adhere to the Moroccan terroir palette (Honey Gold, Atlas Green, Terracotta). Use glassmorphism patterns and Framer Motion for animations.

### Backend Conventions
- **Java 21 Features:** Utilize modern Java features where appropriate (e.g., Records, Pattern Matching).
- **Security:** Stateless JWT authentication. Passwords must be BCrypt hashed.
- **Database:** All schema changes must be applied via Flyway migrations in `src/main/resources/db/migration`.
- **API Documentation:** Ensure all new endpoints are documented via SpringDoc (Swagger) annotations.

### Git & Collaboration
- **Secrets:** Never commit `.env` files. Use `apps/api/.env.example` and `apps/web/.env.example` as templates.
- **Architecture Integrity:** Maintain strict separation between `apps/api` and `apps/web`. Do not share logic between them unless moved to a shared library.

---
*Last Updated: May 6, 2026*
