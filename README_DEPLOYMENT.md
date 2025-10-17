# 🍯 Dar Lemlih Apiculture - Complete E-commerce System

## 🚀 **DEPLOYMENT READY!**

Your complete e-commerce application is now ready for production deployment. This is a full-featured honey e-commerce platform with all modern features.

## ✨ **What's Included**

### 🛍️ **Complete E-commerce Features**
- ✅ **Product Catalog** - API-driven with 12+ honey varieties
- ✅ **Shopping Cart** - Full cart management with localStorage persistence
- ✅ **User Authentication** - JWT-based login/register system
- ✅ **Checkout Process** - Multi-step checkout with address & payment
- ✅ **Order Management** - Order history and tracking
- ✅ **Admin Panel** - Complete product and order management
- ✅ **Multi-language** - English, French, Arabic support
- ✅ **Multi-currency** - USD, EUR, MAD with real-time conversion
- ✅ **SEO Optimized** - Meta tags, sitemap, robots.txt
- ✅ **Analytics Ready** - Google Analytics 4 integration
- ✅ **Email System** - Order confirmations, notifications
- ✅ **Docker Ready** - Complete containerized deployment

### 🏗️ **Technical Stack**
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Spring Boot 3 + Java 21 + MySQL 8
- **Database**: MySQL with Flyway migrations
- **Cache**: Redis for sessions and caching
- **Web Server**: Nginx with SSL and reverse proxy
- **Containerization**: Docker + Docker Compose
- **State Management**: Zustand for frontend state
- **Internationalization**: react-i18next (EN/FR/AR)
- **Authentication**: JWT with refresh tokens
- **Email**: Spring Mail with Thymeleaf templates

## 🚀 **Quick Deployment**

### 1. **Prerequisites**
```bash
# Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. **Configure Environment**
```bash
cd infra/docker
cp env.example .env
nano .env  # Configure your settings
```

### 3. **Deploy**
```bash
./deploy.sh
```

### 4. **Access Your Application**
- **Web App**: https://localhost
- **API**: https://localhost/api
- **Admin**: https://localhost/admin

## 📋 **Environment Configuration**

### Required Environment Variables
```bash
# Database
MYSQL_ROOT_PASSWORD=your-secure-password
MYSQL_DATABASE=darlemlih
MYSQL_USER=darlemlih
MYSQL_PASSWORD=your-db-password

# JWT Security
JWT_SECRET=your-super-secret-jwt-key-make-it-very-long-and-random
JWT_EXPIRATION=86400000

# Email (Gmail example)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM=noreply@darlemlih.com

# Stripe Payments
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Google Analytics
GA_TRACKING_ID=G-XXXXXXXXXX
```

## 🗄️ **Database Schema**

### Pre-seeded Data
- **12 Premium Honey Products** with full descriptions
- **4 Product Categories** (Premium, Wild, Flower, Mountain)
- **Admin User** (admin@darlemlih.com / password: password)
- **Sample Customer** and orders for testing

### Sample Products
1. **Wild Thyme Honey** - $24.99 (Featured)
2. **Lavender Honey** - $22.99
3. **Sunflower Honey** - $19.99
4. **Rose Honey** - $28.99 (Featured)
5. **Cedar Honey** - $32.99 (Featured)
6. **Orange Blossom Honey** - $26.99
7. **Eucalyptus Honey** - $29.99
8. **Acacia Honey** - $21.99
9. **Mountain Wildflower Honey** - $27.99 (Featured)
10. **Thyme Mountain Honey** - $31.99 (Featured)
11. **Juniper Honey** - $35.99 (Featured)
12. **Sage Honey** - $25.99

## 🌐 **Multi-language Support**

### Available Languages
- **English** (en) - Default
- **French** (fr) - Français
- **Arabic** (ar) - العربية

### Currency Support
- **USD** - US Dollar
- **EUR** - Euro
- **MAD** - Moroccan Dirham

## 🔐 **Security Features**

- **JWT Authentication** with refresh tokens
- **Password Hashing** with BCrypt
- **CORS Protection** configured
- **Rate Limiting** on API endpoints
- **SQL Injection Protection** with JPA
- **XSS Protection** headers
- **HTTPS Enforcement** with SSL
- **Input Validation** on all forms

## 📊 **Analytics & Monitoring**

### Google Analytics 4 Events
- `view_item` - Product page views
- `add_to_cart` - Add to cart actions
- `begin_checkout` - Checkout start
- `purchase` - Order completion
- `login` / `sign_up` - Authentication events

### Health Checks
- **API Health**: `/actuator/health`
- **Database**: MySQL connection monitoring
- **Redis**: Cache health monitoring
- **Web**: Nginx status monitoring

## 📧 **Email System**

### Email Templates
- **Order Confirmation** - Customer order confirmation
- **Admin Notification** - New order alerts
- **Welcome Email** - New customer welcome
- **Password Reset** - Password reset links
- **Abandoned Cart** - Cart recovery emails

## 🛠️ **Development Commands**

### Frontend Development
```bash
cd apps/web
npm install
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd apps/api
./mvnw clean install # Build the application
./mvnw spring-boot:run # Run the application
./mvnw test          # Run tests
```

### Docker Development
```bash
cd infra/docker
docker-compose -f docker-compose.dev.yml up -d
```

## 📁 **Project Structure**

```
dar-lemlih-apiculture/
├── apps/
│   ├── api/                 # Spring Boot Backend
│   │   ├── src/main/java/   # Java source code
│   │   ├── src/main/resources/ # Configuration & migrations
│   │   └── pom.xml          # Maven dependencies
│   └── web/                 # React Frontend
│       ├── src/             # React source code
│       ├── public/          # Static assets
│       └── package.json     # NPM dependencies
├── infra/
│   └── docker/              # Docker configuration
│       ├── docker-compose.prod.yml
│       ├── nginx.conf
│       └── deploy.sh
└── README_DEPLOYMENT.md
```

## 🚀 **Production Checklist**

### Before Going Live
- [ ] Configure real SSL certificates
- [ ] Set up domain DNS records
- [ ] Configure email SMTP settings
- [ ] Set up Stripe webhook endpoints
- [ ] Configure Google Analytics tracking
- [ ] Set up database backups
- [ ] Configure monitoring and alerts
- [ ] Test all payment flows
- [ ] Verify email delivery
- [ ] Test multi-language functionality

### Performance Optimization
- [ ] Enable Redis caching
- [ ] Configure CDN for static assets
- [ ] Optimize database queries
- [ ] Enable gzip compression
- [ ] Set up image optimization
- [ ] Configure browser caching

## 🆘 **Troubleshooting**

### Common Issues

**Database Connection Failed**
```bash
docker-compose logs mysql
docker-compose restart mysql
```

**API Not Responding**
```bash
docker-compose logs api
docker-compose restart api
```

**Web App Not Loading**
```bash
docker-compose logs web
docker-compose restart web
```

**SSL Certificate Issues**
```bash
# Generate new self-signed certificates
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/key.pem -out ssl/cert.pem \
  -subj "/C=MA/ST=Morocco/L=Casablanca/O=Dar Lemlih/CN=yourdomain.com"
```

### Logs and Monitoring
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f api
docker-compose logs -f web
docker-compose logs -f mysql

# Check service status
docker-compose ps
docker-compose top
```

## 🎯 **Next Steps**

1. **Customize Branding** - Update colors, logos, and content
2. **Add More Products** - Use the admin panel to add more honey varieties
3. **Configure Payments** - Set up Stripe for real payments
4. **Set Up Analytics** - Configure Google Analytics tracking
5. **Email Marketing** - Set up email campaigns
6. **SEO Optimization** - Add more content and optimize for search
7. **Mobile App** - Consider building a mobile app
8. **API Documentation** - Add Swagger/OpenAPI documentation

## 📞 **Support**

For technical support or questions:
- **Email**: support@darlemlih.com
- **Documentation**: Check the code comments and README files
- **Issues**: Create GitHub issues for bugs or feature requests

---

## 🎉 **Congratulations!**

You now have a complete, production-ready e-commerce platform for Dar Lemlih Apiculture. Your honey business is ready to serve customers worldwide with a modern, secure, and scalable solution.

**🍯 Welcome to the future of honey e-commerce!**
