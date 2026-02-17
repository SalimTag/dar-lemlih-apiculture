# 🍯 Dar Lemlih Apiculture — Moroccan Terroir E-Commerce Platform

[![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](#license)

> A production-ready, multilingual e-commerce platform for Moroccan terroir products — honey, pollen, and more. Built with Spring Boot, React, JWT authentication, and full RTL/i18n support.

![Platform Demo](./docs/demo.gif)
*Dar Lemlih storefront — Multilingual with Arabic RTL support*

---

## 📸 Screenshots

| Storefront | Product Catalog | Admin Dashboard |
|-----------|----------------|-----------------|
| ![Storefront](./docs/screenshots/storefront.png) | ![Catalog](./docs/screenshots/catalog.png) | ![Admin](./docs/screenshots/admin.png) |

---

## ✨ Features

### 🛍️ Public Storefront
- **Multilingual UI** — French, English, Arabic with RTL support
- **Product Catalog** with advanced search and filtering
- **Shopping Cart** and seamless checkout flow
- **Secure Payments** — Provider-agnostic (Stripe, Checkout.com, mock)
- **Order Tracking** — Real-time order history and status
- **User Accounts** — Authentication, profile, and preferences

### 🔧 Admin Back-Office
- **Sales Dashboard** with analytics and KPIs
- **Product Management** — CRUD with media uploads via S3/LocalStack
- **Order Fulfillment** — Manage, update, and ship orders
- **User & Role Management** — RBAC with granular permissions
- **System Settings** — Language, payment provider, upload configuration

### 🔒 Security
- JWT access/refresh token authentication
- Role-Based Access Control (RBAC)
- BCrypt password hashing
- Rate limiting on auth endpoints
- CORS configuration
- Input validation and sanitization

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│               CLIENT LAYER                   │
│   React + Vite + TypeScript + Tailwind CSS   │
│        FR 🇫🇷  |  EN 🇬🇧  |  AR 🇸🇦           │
└─────────────────┬───────────────────────────┘
                  │ REST API (JSON)
                  ▼
┌─────────────────────────────────────────────┐
│               API LAYER                      │
│        Spring Boot 3 + Java 21               │
│  JWT Auth | RBAC | OpenAPI Docs | Validation │
└──────────┬──────────────────┬───────────────┘
           │                  │
           ▼                  ▼
┌──────────────────┐  ┌────────────────────────┐
│   MySQL 8        │  │   S3 / LocalStack       │
│   (Data Store)   │  │   (Media Storage)       │
└──────────────────┘  └────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Docker & Docker Compose | Latest | Run all services |
| Java | 21+ | Backend development |
| Node.js | 20+ | Frontend development |
| MySQL | 8.0 | Database (or via Docker) |

### 1. Clone the Repository

```bash
git clone https://github.com/SalimTag/dar-lemlih-apiculture.git
cd dar-lemlih-apiculture
```

### 2. Configure Environment Variables

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Edit both `.env` files with your configuration. See [Environment Variables](#-environment-variables) for full reference.

### 3. Start All Services

```bash
docker-compose -f infra/docker/docker-compose.yml up --build
```

> 🐝 **Tip:** LocalStack is bundled with Docker Compose. The `media` S3 bucket is created automatically at startup — no manual setup needed.

### 4. Seed Demo Data

```bash
# Wait for services to be healthy, then:
curl -X POST http://localhost:8080/api/admin/seed
```

### 5. Access the Platform

| Service | URL |
|---------|-----|
| 🖥️ Frontend | http://localhost:5173 |
| ⚙️ Backend API | http://localhost:8080 |
| 📚 Swagger UI | http://localhost:8080/swagger-ui.html |
| 📄 OpenAPI JSON | http://localhost:8080/v3/api-docs |

### 🔑 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@darlemlih.ma | Admin!234 |
| Customer | customer@darlemlih.ma | Customer!234 |

> ⚠️ **Important:** Change all default credentials before any public deployment.

---

## 📁 Project Structure

```
dar-lemlih-apiculture/
├── apps/
│   ├── api/                        # Spring Boot Backend
│   │   ├── src/
│   │   │   ├── main/java/
│   │   │   │   ├── auth/           # JWT authentication
│   │   │   │   ├── catalog/        # Product & category management
│   │   │   │   ├── orders/         # Order processing
│   │   │   │   ├── payments/       # Payment provider abstraction
│   │   │   │   ├── storage/        # S3/filesystem storage
│   │   │   │   └── users/          # User & role management
│   │   │   └── resources/
│   │   │       └── application.yml
│   │   ├── .env.example
│   │   └── pom.xml
│   │
│   └── web/                        # React Frontend
│       ├── src/
│       │   ├── components/         # Reusable UI components
│       │   ├── pages/              # Route pages
│       │   ├── features/           # Feature modules
│       │   ├── services/           # API client
│       │   ├── i18n/               # Translation files (FR/EN/AR)
│       │   └── store/              # State management
│       ├── .env.example
│       └── package.json
│
├── infra/
│   ├── docker/
│   │   ├── docker-compose.yml      # Full stack setup
│   │   ├── Dockerfile.api          # Backend image
│   │   └── Dockerfile.web          # Frontend image
│   └── ci/                         # CI/CD pipelines
│
├── docs/
│   ├── demo.gif
│   └── screenshots/
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`apps/api/.env`)

```env
# Database
DB_URL=jdbc:mysql://localhost:3306/darlemlih
DB_USERNAME=darlemlih
DB_PASSWORD=yourpassword

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_ACCESS_EXPIRY=3600         # 1 hour
JWT_REFRESH_EXPIRY=604800      # 7 days

# Payment Provider
PAYMENT_PROVIDER=mock          # mock | stripe | checkoutcom
STRIPE_SECRET_KEY=sk_test_...  # if using stripe

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your@email.com
SMTP_PASSWORD=your-app-password

# Media Storage - S3 / LocalStack
STORAGE_S3_ENABLED=true
AWS_ENDPOINT_URL=http://localhost:4566
AWS_PUBLIC_ENDPOINT=http://localhost:4566
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
S3_BUCKET=media

# Media Storage - Filesystem Fallback
UPLOAD_PATH=./uploads
UPLOAD_PUBLIC_BASE_URL=/uploads
UPLOAD_MAX_SIZE=10MB
UPLOAD_MAX_FILES=5
UPLOAD_ALLOWED_EXTENSIONS=jpg,jpeg,png,webp
UPLOAD_ALLOWED_CONTENT_TYPES=image/jpeg,image/png,image/webp
```

### Frontend (`apps/web/.env`)

```env
VITE_API_URL=http://localhost:8080
VITE_APP_DEFAULT_LANG=fr       # fr | en | ar
VITE_PAYMENT_PROVIDER=mock
```

---

## 🌐 Internationalization

The platform fully supports three languages with automatic RTL layout for Arabic:

| Language | Code | Direction | Status |
|----------|------|-----------|--------|
| 🇫🇷 French | `fr` | LTR | ✅ Default |
| 🇬🇧 English | `en` | LTR | ✅ Complete |
| 🇸🇦 Arabic | `ar` | RTL | ✅ Complete |

Set the default language via `VITE_APP_DEFAULT_LANG`. Users can switch languages in-app from the header menu.

---

## 🖼️ Media Storage

Product images go through a dedicated storage abstraction with LocalStack support for local development:

| Mode | Configuration | Files Location |
|------|--------------|---------------|
| S3 / LocalStack | `STORAGE_S3_ENABLED=true` | `media` bucket |
| Filesystem | `STORAGE_S3_ENABLED=false` | `./uploads` directory |

- The `media` bucket is **auto-created at startup** — no manual setup
- Validation limits (file size, extensions, count) are configurable via `UPLOAD_*` env vars
- Switch seamlessly from LocalStack (dev) to real AWS S3 (production) by updating credentials

---

## 🧪 Testing

### Backend Tests (Java / JUnit)

```bash
cd apps/api
./mvnw test

# With coverage report
./mvnw test jacoco:report
# Report at: target/site/jacoco/index.html
```

### Frontend Tests (React / Vitest)

```bash
cd apps/web
npm test

# With coverage
npm run test:coverage
```

### API Testing

Once running, use the interactive Swagger UI at:
```
http://localhost:8080/swagger-ui.html
```

Or import the OpenAPI spec into Postman:
```
http://localhost:8080/v3/api-docs
```

---

## 📦 Production Deployment

### 1. Build Production Images

```bash
docker build -f infra/docker/Dockerfile.api -t darlemlih-api:latest apps/api
docker build -f infra/docker/Dockerfile.web -t darlemlih-web:latest apps/web
```

### 2. Update Environment Variables

For production, ensure you update:
- [ ] `JWT_SECRET` — Use a strong, randomly generated secret
- [ ] `DB_PASSWORD` — Use a strong database password
- [ ] `PAYMENT_PROVIDER` — Set to `stripe` or `checkoutcom`
- [ ] `STORAGE_S3_ENABLED=true` — Use real AWS S3 credentials
- [ ] All default admin credentials

### 3. Deployment Options

**Docker Swarm:**
```bash
docker stack deploy -c infra/docker/docker-compose.prod.yml darlemlih
```

**Kubernetes:**
```bash
kubectl apply -f infra/k8s/
```

**Cloud Platforms:**
- Frontend: Vercel or Netlify (static hosting)
- Backend: Railway, Render, or AWS ECS
- Database: PlanetScale, AWS RDS, or managed MySQL

---

## 📚 API Documentation

The REST API is fully documented with OpenAPI 3.0.

### Key Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | Authenticate user | ❌ |
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/refresh` | Refresh access token | ✅ |
| GET | `/api/products` | List all products | ❌ |
| GET | `/api/products/{id}` | Get product details | ❌ |
| POST | `/api/cart` | Add item to cart | ✅ |
| POST | `/api/orders` | Create new order | ✅ |
| GET | `/api/orders/{id}` | Get order status | ✅ |
| POST | `/api/admin/products` | Create product | ✅ Admin |
| GET | `/api/admin/orders` | List all orders | ✅ Admin |
| GET | `/api/admin/users` | Manage users | ✅ Admin |

### Authentication Flow

```
1. POST /api/auth/login  →  { accessToken, refreshToken }
2. Include header:           Authorization: Bearer <accessToken>
3. On expiry: POST /api/auth/refresh  →  new { accessToken }
```

---

## 🔒 Security

This platform implements industry-standard security practices:

- **JWT Tokens** — Short-lived access tokens (1h) + refresh tokens (7d)
- **BCrypt** — Password hashing with configurable strength factor
- **RBAC** — Role-based access: `CUSTOMER`, `ADMIN`, `SUPER_ADMIN`
- **Rate Limiting** — Auth endpoints protected against brute force
- **CORS** — Configurable allowed origins
- **Input Validation** — All inputs validated and sanitized server-side
- **HTTPS Ready** — TLS termination supported via reverse proxy

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add: AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

Please ensure:
- Code follows existing style conventions
- Backend: Java code follows Google Java Style Guide
- Frontend: ESLint and Prettier pass (`npm run lint`)
- All tests pass before submitting PR

---

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Loyalty points system
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced analytics dashboard
- [ ] Abandoned cart recovery emails
- [ ] Discount codes and promotions
- [ ] Multi-vendor support
- [ ] WhatsApp order notifications

---

## 📄 License

© 2025 Dar Lemlih Apiculture. All rights reserved.

This project is proprietary software. Unauthorized copying, distribution, or use is strictly prohibited.

---

## 📧 Contact & Support

**Salim Tagemouati** — Developer

- 🌐 GitHub: [@SalimTag](https://github.com/SalimTag)
- 💼 LinkedIn: [Salim Tagemouati](#) <!-- Add your LinkedIn -->
- 📧 Support: support@darlemlih.ma

---

<p align="center">
  <b>⭐ Star this repository if you find it useful!</b>
</p>

<p align="center">
  Made with ❤️ in Morocco 🇲🇦 by <a href="https://github.com/SalimTag">Salim Tagemouati</a>
</p>

<p align="center">
  <sub>🍯 Bringing Moroccan terroir to the world, one jar at a time</sub>
</p>
