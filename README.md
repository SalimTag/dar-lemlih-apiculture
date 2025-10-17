# 🍯 Dar Lemlih Apiculture - E-Commerce Platform

A production-ready multilingual e-commerce platform for terroir products (honey, pollen, etc.) with secure authentication, payment processing, and admin back-office.

## 🚀 Tech Stack

- **Frontend**: React.js with Vite, TypeScript, Tailwind CSS
- **Backend**: Spring Boot 3, Java 21
- **Database**: MySQL 8
- **Authentication**: JWT (access/refresh tokens)
- **Payments**: Provider-agnostic with Stripe-like abstractions
- **I18n**: French, Arabic, English with RTL support
- **Containerization**: Docker & Docker Compose

## 📦 Features

### Public Storefront
- 🏠 Multilingual UI (FR/AR/EN) with RTL support
- 🛍️ Product catalog with search and filtering
- 🛒 Shopping cart and checkout flow
- 💳 Secure payment processing
- 📦 Order tracking and history
- 👤 User authentication and profile management

### Admin Back-Office
- 📊 Sales dashboard with analytics
- 📝 Product and category management
- 📋 Order management and fulfillment
- 👥 User and role management
- ⚙️ System settings and configuration

## 🗂️ Project Structure

```
/
├── apps/
│   ├── api/          # Spring Boot backend
│   └── web/          # React frontend
├── infra/
│   ├── docker/       # Docker configurations
│   └── ci/           # CI/CD pipelines
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Java 21 (for local development)
- Node.js 20+ (for local development)
- MySQL 8 (or use Docker)

### Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-org/dar-lemlih-apiculture.git
cd dar-lemlih-apiculture
```

2. **Setup environment variables**
```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
# Edit .env files with your configuration
```

3. **Start the development environment**
```bash
docker-compose -f infra/docker/docker-compose.yml up --build
```

> 🐝 **Tip:** LocalStack is bundled with the Docker compose setup. The default S3 bucket (`media`) is created automatically at startup so the new media pipeline works out-of-the-box.

4. **Seed demo data**
```bash
# Wait for services to be ready, then:
curl -X POST http://localhost:8080/api/admin/seed
```

5. **Access the applications**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- API Documentation: http://localhost:8080/swagger-ui.html

## 📸 Media Storage

Product imagery now goes through a dedicated storage abstraction with first-class LocalStack support.

- When `STORAGE_S3_ENABLED=true` (default), uploads target the LocalStack S3 endpoint (`http://localhost:4566`) and land in the `media` bucket.
- If you prefer pure filesystem storage (e.g., during quick prototypes), set `STORAGE_S3_ENABLED=false`. Files are then persisted under `./uploads` with automatic static serving at `/uploads/*`.
- All validation limits (max file size, allowed extensions, simultaneous uploads) are configurable through the new `app.uploads.*` properties.
- The backend automatically ensures the bucket exists at startup when S3 mode is enabled.

### Default Credentials

- **Admin**: admin@darlemlih.ma / Admin!234
- **Customer**: customer@darlemlih.ma / Customer!234

## 🧪 Testing

```bash
# Run backend tests
cd apps/api && ./mvnw test

# Run frontend tests
cd apps/web && npm test
```

## 📦 Production Deployment

1. Build production images:
```bash
docker build -f infra/docker/Dockerfile.api -t darlemlih-api apps/api
docker build -f infra/docker/Dockerfile.web -t darlemlih-web apps/web
```

2. Deploy using your preferred orchestration platform (Kubernetes, Docker Swarm, etc.)

## 🌍 Environment Variables

### Backend (Spring Boot)
- `DB_URL`: MySQL connection URL
- `JWT_SECRET`: Secret key for JWT signing
- `PAYMENT_PROVIDER`: Payment gateway (mock|stripe|checkoutcom)
- `SMTP_HOST`: Email server configuration
- `STORAGE_S3_ENABLED`: Enable S3/LocalStack media storage (default `true`)
- `AWS_ENDPOINT_URL`, `AWS_PUBLIC_ENDPOINT`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`: LocalStack/AWS connectivity
- `S3_BUCKET`: Target bucket for media assets (`media` by default)
- `UPLOAD_PATH`: Filesystem root for local storage fallback (`./uploads`)
- `UPLOAD_PUBLIC_BASE_URL`: Public URL prefix for locally served files (`/uploads`)
- `UPLOAD_MAX_SIZE`, `UPLOAD_MAX_FILES`, `UPLOAD_ALLOWED_EXTENSIONS`, `UPLOAD_ALLOWED_CONTENT_TYPES`: Upload validation knobs

### Frontend (React)
- `VITE_API_URL`: Backend API URL
- `VITE_APP_DEFAULT_LANG`: Default language (fr|en|ar)
- `VITE_PAYMENT_PROVIDER`: Payment provider

## 📝 API Documentation

The API follows REST principles and is documented using OpenAPI 3.0. Access the interactive documentation at:
- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs

## 🔒 Security Features

- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Password hashing with BCrypt
- Rate limiting on auth endpoints
- CORS configuration
- Input validation and sanitization
- HTTPS-ready configuration

## 🌐 Internationalization

The platform supports three languages:
- 🇫🇷 French (default)
- 🇬🇧 English
- 🇸🇦 Arabic (with RTL support)

## 📧 Contact

For questions or support, contact: support@darlemlih.ma

## 📄 License

© 2025 Dar Lemlih Apiculture. All rights reserved.
