# Changelog

All notable changes to the Dar Lemlih Apiculture project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-02-17

### Added

#### Platform Features
- 🌐 Multilingual support for French, English, and Arabic with RTL support
- 🔐 JWT-based authentication with access and refresh tokens
- 💳 Payment gateway abstraction supporting multiple providers (Mock, Stripe-ready)
- 🛒 Complete e-commerce flow with cart, checkout, and order management
- 📧 Email notification system with templates
- 📱 Responsive design optimized for mobile and desktop

#### Backend (Spring Boot)
- RESTful API with OpenAPI 3.0 documentation
- MySQL database with Flyway migrations
- Role-based access control (RBAC) with ADMIN and CUSTOMER roles
- Product and category management system
- Order processing and tracking
- User profile management
- S3-compatible media storage with LocalStack support
- Health check endpoints for monitoring
- CORS configuration for cross-origin requests
- Rate limiting on authentication endpoints

#### Frontend (Next.js/React)
- Modern UI built with Next.js 14 and shadcn/ui components
- TypeScript for type safety
- Zustand for state management with persistence
- next-intl for internationalization
- Responsive design with Tailwind CSS
- Shopping cart with persistent state
- User authentication flows
- Product catalog with search and filtering
- Admin dashboard for management
- Dark mode support

#### Infrastructure
- Docker and Docker Compose setup for all services
- LocalStack for local S3 development
- MySQL 8 database container
- MailHog for email testing
- phpMyAdmin for database management
- CI/CD pipeline with GitHub Actions
- Automated testing (unit, integration, E2E)
- Playwright for end-to-end testing

#### Documentation
- Comprehensive README with setup instructions
- API documentation via Swagger UI
- Deployment guide for various platforms
- Environment variable documentation
- Architecture documentation
- Contributing guidelines
- Code of Conduct
- MIT License

### Technical Stack
- **Backend**: Spring Boot 3.2, Java 21, Maven
- **Frontend**: Next.js 14, React 18, TypeScript 5.6
- **Database**: MySQL 8
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand 4.5
- **Authentication**: JWT
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Testing**: JUnit 5, Vitest, Playwright

### Security
- BCrypt password hashing
- JWT token-based authentication
- CORS protection
- SQL injection prevention through JPA
- XSS protection
- Rate limiting on sensitive endpoints
- Secure password requirements
- Environment variable management

## [Unreleased]

### Planned Features
- [ ] Advanced product search with Elasticsearch
- [ ] Product reviews and ratings system
- [ ] Wishlist functionality
- [ ] Real-time order tracking
- [ ] Mobile app (iOS/Android)
- [ ] Social media integration
- [ ] Newsletter subscription
- [ ] Advanced analytics dashboard
- [ ] Multi-vendor support
- [ ] Loyalty program

---

[1.0.0]: https://github.com/SalimTag/dar-lemlih-apiculture/releases/tag/v1.0.0
