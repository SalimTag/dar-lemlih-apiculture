# 🚀 Dar Lemlih Apiculture - Production Deployment Guide

## 🎯 **Complete E-commerce Application Ready for Production**

Your Dar Lemlih Apiculture e-commerce application is now fully production-ready with Docker Compose deployment!

## 📋 **What's Included (All 10 Steps Complete)**

### ✅ **Step 1: Products API Integration**
- Real API integration with fallback
- Loading, error, and empty states
- Dynamic product loading

### ✅ **Step 2: Complete Cart System**
- Cart drawer with mini cart
- Full cart page with management
- LocalStorage persistence

### ✅ **Step 3: Authentication System**
- JWT-based auth with refresh tokens
- Login/Register forms
- Protected routes and admin access

### ✅ **Step 4: Checkout System**
- Multi-step checkout process
- Address and payment forms
- Order creation and confirmation

### ✅ **Step 5: Admin Panel**
- Dashboard with analytics
- Product CRUD operations
- Order management

### ✅ **Step 6: Database & Seeds**
- Flyway migrations
- Sample products and categories
- Admin user setup

### ✅ **Step 7: SEO Optimization**
- Meta tags and OpenGraph
- Sitemap and robots.txt
- Structured data

### ✅ **Step 8: Internationalization**
- EN/FR/AR language support
- Currency conversion (USD/EUR/MAD)
- Language and currency selectors

### ✅ **Step 9: Analytics & Emails**
- Google Analytics 4 integration
- Email notification system
- Order confirmations and admin alerts

### ✅ **Step 10: Production Deployment**
- Docker Compose stack
- Nginx reverse proxy
- SSL configuration
- Health checks and monitoring

## 🐳 **Deployment Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx (80/443)│    │  React Frontend │    │ Spring Boot API│
│   Reverse Proxy │────│   (Port 80)     │────│   (Port 8080)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐    ┌─────────────────┐
                    │   MySQL (3306)  │    │   Redis (6379)  │
                    │   Database      │    │   Cache         │
                    └─────────────────┘    └─────────────────┘
```

## 🚀 **Quick Start Deployment**

### 1. **Clone and Setup**
```bash
git clone <your-repo>
cd dar-lemlih-apiculture
```

### 2. **Configure Environment**
```bash
cd infra/docker
cp env.example .env
nano .env  # Configure your settings
```

### 3. **Deploy Everything**
```bash
./deploy.sh
```

### 4. **Access Your Application**
- 🌐 **Frontend**: https://localhost
- 🔌 **API**: https://localhost/api
- 👨‍💼 **Admin**: https://localhost/admin
- 📊 **Health**: https://localhost/health

## ⚙️ **Environment Configuration**

### **Required Variables**
```bash
# Database
MYSQL_ROOT_PASSWORD=your-secure-password
MYSQL_DATABASE=darlemlih
MYSQL_USER=darlemlih
MYSQL_PASSWORD=your-secure-password

# JWT Security
JWT_SECRET=your-super-long-random-secret-key

# Email Service
MAIL_HOST=smtp.gmail.com
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Google Analytics
GA_TRACKING_ID=G-XXXXXXXXXX
```

### **Optional Variables**
```bash
# Redis (if external)
REDIS_URL=redis://your-redis-host:6379

# File Uploads
UPLOAD_DIR=/app/uploads
MAX_FILE_SIZE=10MB

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=3600
```

## 🔧 **Production Customization**

### **SSL Certificates**
Replace self-signed certificates with real ones:
```bash
# Place your certificates in infra/docker/ssl/
cp your-cert.pem infra/docker/ssl/cert.pem
cp your-key.pem infra/docker/ssl/key.pem
```

### **Domain Configuration**
Update nginx.conf with your domain:
```nginx
server_name yourdomain.com www.yourdomain.com;
```

### **Database Backups**
Set up automated backups:
```bash
# Create backup script
cat > backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec mysql mysqldump -u root -p$MYSQL_ROOT_PASSWORD darlemlih > backup_$DATE.sql
gzip backup_$DATE.sql
EOF

chmod +x backup.sh
```

## 📊 **Monitoring & Health Checks**

### **Built-in Health Endpoints**
- **API Health**: `/actuator/health`
- **Database**: MySQL ping
- **Cache**: Redis ping
- **Application**: HTTP status

### **Log Monitoring**
```bash
# View all logs
docker-compose -f docker-compose.prod.yml logs -f

# View specific service logs
docker-compose -f docker-compose.prod.yml logs -f api
docker-compose -f docker-compose.prod.yml logs -f web
```

### **Performance Monitoring**
- **Response Times**: Nginx access logs
- **Error Rates**: Application error logs
- **Resource Usage**: Docker stats

## 🔒 **Security Features**

### **Built-in Security**
- ✅ HTTPS with SSL/TLS
- ✅ JWT authentication
- ✅ Rate limiting
- ✅ CORS protection
- ✅ Security headers
- ✅ SQL injection prevention
- ✅ XSS protection

### **Additional Security Measures**
```bash
# Firewall setup
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable

# Regular security updates
apt update && apt upgrade -y
```

## 📈 **Scaling & Performance**

### **Horizontal Scaling**
```yaml
# Scale API instances
docker-compose -f docker-compose.prod.yml up -d --scale api=3

# Load balancer configuration
# Add to nginx.conf upstream
upstream api_backend {
    server api:8080;
    server api2:8080;
    server api3:8080;
}
```

### **Performance Optimization**
- **Caching**: Redis for sessions and data
- **CDN**: Static asset delivery
- **Database**: Connection pooling
- **Compression**: Gzip enabled

## 🚨 **Troubleshooting**

### **Common Issues**

#### **Database Connection Failed**
```bash
# Check MySQL status
docker-compose exec mysql mysqladmin ping -h localhost

# View MySQL logs
docker-compose logs mysql
```

#### **API Not Responding**
```bash
# Check API health
curl -f http://localhost:8080/actuator/health

# Restart API service
docker-compose restart api
```

#### **Frontend Not Loading**
```bash
# Check web service
docker-compose logs web

# Verify nginx configuration
docker-compose exec nginx nginx -t
```

### **Recovery Procedures**
```bash
# Complete restart
docker-compose down
docker-compose up -d

# Reset database (WARNING: Data loss!)
docker-compose down -v
docker-compose up -d
```

## 📚 **Maintenance Commands**

### **Daily Operations**
```bash
# Check service status
docker-compose ps

# View recent logs
docker-compose logs --tail=50

# Monitor resources
docker stats
```

### **Weekly Operations**
```bash
# Database backup
./backup.sh

# Log rotation
docker-compose exec nginx logrotate /etc/logrotate.d/nginx

# Security updates
docker-compose pull
docker-compose up -d
```

### **Monthly Operations**
```bash
# SSL certificate renewal
# Database optimization
# Performance review
# Security audit
```

## 🌍 **Production Checklist**

### **Before Going Live**
- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Domain DNS configured
- [ ] Database backups scheduled
- [ ] Monitoring alerts set up
- [ ] Security audit completed
- [ ] Performance testing done
- [ ] Documentation updated

### **Post-Deployment**
- [ ] Health checks passing
- [ ] SSL working correctly
- [ ] Email notifications working
- [ ] Payment processing tested
- [ ] Admin panel accessible
- [ ] Analytics tracking working
- [ ] Error monitoring active

## 🎉 **Congratulations!**

You now have a **complete, production-ready e-commerce application** that includes:

- 🛍️ **Full Shopping Experience** (Cart, Checkout, Orders)
- 🔐 **User Authentication & Authorization**
- 👨‍💼 **Admin Management Panel**
- 🌍 **Multi-language Support** (EN/FR/AR)
- 💰 **Multi-currency Support** (USD/EUR/MAD)
- 📊 **Analytics & Email Notifications**
- 🐳 **Docker-based Deployment**
- 🔒 **Production Security Features**
- 📱 **Responsive Design**
- 🚀 **Scalable Architecture**

## 📞 **Support & Next Steps**

### **Immediate Actions**
1. **Test the application** thoroughly
2. **Configure your domain** and SSL
3. **Set up monitoring** and alerts
4. **Train your team** on admin features

### **Future Enhancements**
- **Mobile App**: React Native version
- **Advanced Analytics**: Custom dashboards
- **Marketing Tools**: Email campaigns, promotions
- **Inventory Management**: Advanced stock control
- **Customer Support**: Live chat integration

### **Business Growth**
- **Multi-store Support**: Franchise expansion
- **B2B Portal**: Wholesale customers
- **API Marketplace**: Third-party integrations
- **International Expansion**: More languages/currencies

---

**🍯 Welcome to the future of honey e-commerce!**

Your Dar Lemlih Apiculture application is now ready to serve customers worldwide with authentic Moroccan honey from the heart of the Atlas Mountains.
