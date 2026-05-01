# 🤖 Agent Development Guide — Dar Lemlih

This guide is designed for AI coding agents to quickly understand the project structure, development patterns, and testing protocols of the Dar Lemlih Apiculture platform.

## 🏗️ Technical Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, `next-intl`.
- **Backend**: Spring Boot 3, Java 21, MySQL 8, JWT Auth.
- **Infrastructure**: Docker Compose, LocalStack (S3 emulation).
- **Testing**: Playwright (E2E), Vitest (Frontend Unit), JUnit (Backend).

## 🌍 Internationalization (i18n)
The project uses `next-intl` for full multi-language support (FR, EN, AR).
- **Middleware**: Located at `apps/web/src/middleware.ts`. It handles locale detection and authentication redirects.
- **Routing**: Localized routes are under `apps/web/src/app/[locale]`.
- **Messages**: JSON files in `apps/web/src/i18n/messages/`.

> [!IMPORTANT]
> The `middleware.ts` MUST remain in `apps/web/src/` for Next.js to apply it correctly when using the `src` directory structure.

## 🚀 Development Workflow
The entire stack is containerized for consistency.
- **Command**: `make dev` from the root directory.
- **Frontend Port**: The dev container binds to **port 5173** (using `next dev -p 5173`).
- **Base URL**: http://localhost:5173

## 🧪 Testing Protocols
### End-to-End (E2E)
We use Playwright for critical path verification.
- **Location**: `apps/web/src/tests/e2e/`.
- **Run command**: `npm run playwright:test` (inside `apps/web`).
- **Config**: `apps/web/playwright.config.ts`.
- **Note**: The config sets the default locale to `fr-FR` to ensure consistent redirects to `/fr`.

### Unit Tests
- **Frontend**: `npm test` inside `apps/web`.
- **Backend**: `./mvnw test` inside `apps/api`.

## 📁 Key Directories
- `apps/web/src/components/blocks`: Reusable page sections (Hero, Section, etc.).
- `apps/web/src/components/ui`: Primitive UI components (Shadcn UI).
- `apps/web/src/i18n/routing.ts`: Centralized locale and routing configuration.

## 🛠️ Common Tasks
- **Adding a new route**: Create a folder in `apps/web/src/app/(marketing)/[locale]/` or `apps/web/src/app/(auth)/[locale]/`.
- **Updating translations**: Edit the JSON files in `apps/web/src/i18n/messages/`.
- **Modifying the dev environment**: Edit `infra/docker/docker-compose.dev.yml`.
