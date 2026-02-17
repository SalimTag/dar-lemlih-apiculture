# Development Guide

Welcome to the Dar Lemlih Apiculture development guide! This document will help you set up your development environment and understand the development workflow.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Testing](#testing)
- [Debugging](#debugging)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Tools

- **Java 21**: [Download from Adoptium](https://adoptium.net/)
- **Node.js 20+**: [Download from nodejs.org](https://nodejs.org/)
- **Docker & Docker Compose**: [Download from docker.com](https://www.docker.com/products/docker-desktop)
- **Git**: [Download from git-scm.com](https://git-scm.com/)
- **Maven** (included via wrapper in the project)

### Recommended Tools

- **IDE**: IntelliJ IDEA, VS Code, or Eclipse
- **Database Client**: DBeaver, TablePlus, or MySQL Workbench
- **API Client**: Postman, Insomnia, or HTTPie
- **Git Client**: GitKraken, Sourcetree, or command line

### Verify Installation

```bash
# Check Java version
java -version  # Should show version 21.x

# Check Node version
node -v  # Should show v20.x or higher

# Check npm version
npm -v

# Check Docker
docker --version
docker-compose --version

# Check Git
git --version
```

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SalimTag/dar-lemlih-apiculture.git
cd dar-lemlih-apiculture
```

### 2. Set Up Environment Variables

#### Backend (.env)
```bash
cd apps/api
cp .env.example .env
```

Edit `apps/api/.env` and configure:
```bash
# Use local MySQL
DB_URL=jdbc:mysql://localhost:3306/darlemlih?createDatabaseIfNotExist=true&useSSL=false
DB_USER=dar
DB_PASSWORD=lemlih

# Generate a secure JWT secret (256 bits minimum)
JWT_SECRET=your_super_secure_secret_key_here_minimum_32_characters

# Use mock payment for development
PAYMENT_PROVIDER=mock

# LocalStack for S3 development
STORAGE_S3_ENABLED=true
AWS_ENDPOINT_URL=http://localhost:4566
```

#### Frontend (.env)
```bash
cd apps/web
cp .env.example .env
```

Edit `apps/web/.env`:
```bash
VITE_API_URL=http://localhost:8080
VITE_APP_DEFAULT_LANG=fr
VITE_PAYMENT_PROVIDER=mock
```

### 3. Start Infrastructure Services

Start MySQL, LocalStack, MailHog, and phpMyAdmin:

```bash
docker-compose -f infra/docker/docker-compose.yml up -d mysql localstack mailhog phpmyadmin
```

Wait for services to be ready:
```bash
# Check MySQL is ready
docker-compose -f infra/docker/docker-compose.yml logs mysql | tail -20

# Check LocalStack is ready
curl http://localhost:4566/_localstack/health
```

### 4. Start Backend (Spring Boot)

```bash
cd apps/api

# Install dependencies and run
./mvnw spring-boot:run
```

The backend will be available at `http://localhost:8080`

### 5. Seed Demo Data

Once the backend is running:

```bash
# Seed products, categories, and test users
curl -X POST http://localhost:8080/api/admin/seed

# Reset default user passwords
curl -X POST http://localhost:8080/api/admin/reset-passwords
```

### 6. Start Frontend (Next.js)

Open a new terminal:

```bash
cd apps/web

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 7. Access the Applications

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | - |
| Backend API | http://localhost:8080 | - |
| Swagger UI | http://localhost:8080/swagger-ui.html | - |
| phpMyAdmin | http://localhost:8090 | dar / lemlih |
| MailHog | http://localhost:8025 | - |
| LocalStack | http://localhost:4566 | - |

**Default Test Users:**
- Admin: `admin@darlemlih.ma` / `Admin!234`
- Customer: `customer@darlemlih.ma` / `Customer!234`

## Development Workflow

### Daily Development

1. **Pull Latest Changes**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Start Services**
   ```bash
   # Start infrastructure
   docker-compose -f infra/docker/docker-compose.yml up -d
   
   # Start backend
   cd apps/api && ./mvnw spring-boot:run
   
   # Start frontend (new terminal)
   cd apps/web && npm run dev
   ```

4. **Make Changes**
   - Edit code in your IDE
   - Hot reload will automatically update:
     - Backend: Spring Boot DevTools
     - Frontend: Next.js Fast Refresh

5. **Test Your Changes**
   ```bash
   # Backend tests
   cd apps/api && ./mvnw test
   
   # Frontend tests
   cd apps/web && npm test
   
   # Lint frontend
   cd apps/web && npm run lint
   ```

6. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

7. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Hot Reload

#### Backend Hot Reload
Spring Boot DevTools is included in the project. Changes to Java files will automatically trigger a restart.

To see changes:
1. Edit a Java file
2. Save the file
3. The application will automatically restart (takes 5-10 seconds)

#### Frontend Hot Reload
Next.js Fast Refresh is enabled by default. Changes to TypeScript/React files will update instantly in the browser.

## Code Style

### Backend (Java/Spring Boot)

We follow the Google Java Style Guide with some modifications.

**Key Points:**
- 2 spaces for indentation
- Maximum line length: 120 characters
- Use meaningful variable names
- Add JavaDoc for public APIs
- Use Lombok to reduce boilerplate

**Example:**
```java
package com.darlemlih.apiculture.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service for managing honey products.
 */
@Service
@RequiredArgsConstructor
public class ProductService {
  
  private final ProductRepository productRepository;
  
  /**
   * Retrieves all active products.
   * 
   * @return list of active products
   */
  public List<Product> getActiveProducts() {
    return productRepository.findByActiveTrue();
  }
}
```

**Run Checkstyle:**
```bash
cd apps/api
./mvnw checkstyle:check
```

### Frontend (TypeScript/React)

We use ESLint and Prettier for code formatting.

**Key Points:**
- 2 spaces for indentation
- Use TypeScript for all files
- Use functional components with hooks
- Use meaningful component and variable names
- Add JSDoc for complex functions

**Example:**
```typescript
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

/**
 * Displays a product card with image, name, price, and add to cart button.
 */
export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  
  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await onAddToCart(product.id);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddToCart} disabled={loading}>
        Add to Cart
      </button>
    </div>
  );
}
```

**Run Linter:**
```bash
cd apps/web
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

## Testing

### Backend Testing

#### Unit Tests
```bash
cd apps/api
./mvnw test
```

#### Integration Tests
```bash
cd apps/api
./mvnw verify -P integration-tests
```

#### Test Coverage
```bash
cd apps/api
./mvnw clean verify
# Coverage report: target/site/jacoco/index.html
```

#### Writing Tests

**Unit Test Example:**
```java
@SpringBootTest
class ProductServiceTest {
  
  @Mock
  private ProductRepository productRepository;
  
  @InjectMocks
  private ProductService productService;
  
  @Test
  void getActiveProducts_shouldReturnOnlyActiveProducts() {
    // Given
    Product activeProduct = new Product();
    activeProduct.setActive(true);
    when(productRepository.findByActiveTrue()).thenReturn(List.of(activeProduct));
    
    // When
    List<Product> result = productService.getActiveProducts();
    
    // Then
    assertThat(result).hasSize(1);
    assertThat(result.get(0).isActive()).isTrue();
  }
}
```

### Frontend Testing

#### Unit Tests
```bash
cd apps/web
npm test
```

#### Watch Mode
```bash
cd apps/web
npm run test:watch
```

#### E2E Tests (Playwright)
```bash
cd apps/web

# Install browsers (first time)
npx playwright install --with-deps

# Run E2E tests
npm run playwright:test

# Run with UI
npx playwright test --ui

# Run specific test
npx playwright test tests/auth.spec.ts
```

#### Writing Tests

**Component Test Example:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Mountain Honey',
    price: 25.99,
    imageUrl: '/honey.jpg'
  };
  
  it('should render product details', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    
    expect(screen.getByText('Mountain Honey')).toBeInTheDocument();
    expect(screen.getByText('$25.99')).toBeInTheDocument();
  });
  
  it('should call onAddToCart when button clicked', () => {
    const handleAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);
    
    fireEvent.click(screen.getByText('Add to Cart'));
    
    expect(handleAddToCart).toHaveBeenCalledWith(1);
  });
});
```

## Debugging

### Backend Debugging (IntelliJ IDEA)

1. Create a new "Run/Debug Configuration"
2. Select "Spring Boot"
3. Set Main class: `com.darlemlih.apiculture.ApicultureApplication`
4. Set VM options: `-Dspring.profiles.active=dev`
5. Click "Debug" (Shift+F9)

### Backend Debugging (VS Code)

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "Debug Spring Boot",
      "request": "launch",
      "mainClass": "com.darlemlih.apiculture.ApicultureApplication",
      "projectName": "apiculture",
      "args": "--spring.profiles.active=dev"
    }
  ]
}
```

### Frontend Debugging

#### Browser DevTools
1. Open browser DevTools (F12)
2. Go to "Sources" tab
3. Find your component in webpack:// sources
4. Set breakpoints

#### VS Code Debugging

Install "Debugger for Chrome" extension, then create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug Next.js",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/apps/web"
    }
  ]
}
```

### Database Debugging

#### Using phpMyAdmin
1. Navigate to http://localhost:8090
2. Login with `dar` / `lemlih`
3. Browse tables and run SQL queries

#### Using CLI
```bash
# Access MySQL CLI
docker exec -it <mysql-container-id> mysql -u dar -p
# Enter password: lemlih

# Show databases
SHOW DATABASES;

# Use darlemlih database
USE darlemlih;

# Show tables
SHOW TABLES;

# Query products
SELECT * FROM products;
```

## Common Tasks

### Add a New Database Migration

1. Create a new SQL file:
   ```bash
   cd apps/api/src/main/resources/db/migration
   # Format: V{version}__{description}.sql
   touch V4__add_product_reviews.sql
   ```

2. Write the migration:
   ```sql
   CREATE TABLE product_reviews (
     id BIGINT AUTO_INCREMENT PRIMARY KEY,
     product_id BIGINT NOT NULL,
     user_id BIGINT NOT NULL,
     rating INT NOT NULL,
     comment TEXT,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (product_id) REFERENCES products(id),
     FOREIGN KEY (user_id) REFERENCES users(id)
   );
   ```

3. Restart the application - Flyway will automatically apply the migration

### Add a New API Endpoint

1. **Create DTO**:
   ```java
   // apps/api/src/main/java/com/darlemlih/apiculture/dto/ReviewDTO.java
   @Data
   public class ReviewDTO {
     private Long id;
     private Long productId;
     private Integer rating;
     private String comment;
   }
   ```

2. **Create Entity** (if needed):
   ```java
   // apps/api/src/main/java/com/darlemlih/apiculture/entities/Review.java
   @Entity
   @Table(name = "product_reviews")
   public class Review {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     
     // ... other fields
   }
   ```

3. **Create Repository**:
   ```java
   // apps/api/src/main/java/com/darlemlih/apiculture/repositories/ReviewRepository.java
   public interface ReviewRepository extends JpaRepository<Review, Long> {
     List<Review> findByProductId(Long productId);
   }
   ```

4. **Create Service**:
   ```java
   // apps/api/src/main/java/com/darlemlih/apiculture/services/ReviewService.java
   @Service
   @RequiredArgsConstructor
   public class ReviewService {
     private final ReviewRepository reviewRepository;
     
     public List<Review> getProductReviews(Long productId) {
       return reviewRepository.findByProductId(productId);
     }
   }
   ```

5. **Create Controller**:
   ```java
   // apps/api/src/main/java/com/darlemlih/apiculture/controllers/ReviewController.java
   @RestController
   @RequestMapping("/api/reviews")
   @RequiredArgsConstructor
   public class ReviewController {
     private final ReviewService reviewService;
     
     @GetMapping("/product/{productId}")
     public ResponseEntity<List<ReviewDTO>> getProductReviews(@PathVariable Long productId) {
       List<Review> reviews = reviewService.getProductReviews(productId);
       return ResponseEntity.ok(reviews);
     }
   }
   ```

6. **Test the endpoint**:
   ```bash
   curl http://localhost:8080/api/reviews/product/1
   ```

### Add a New Frontend Component

1. **Create component file**:
   ```bash
   cd apps/web/src/components
   mkdir reviews
   touch reviews/ReviewList.tsx
   ```

2. **Implement component**:
   ```typescript
   // apps/web/src/components/reviews/ReviewList.tsx
   import { useEffect, useState } from 'react';
   
   interface Review {
     id: number;
     rating: number;
     comment: string;
   }
   
   interface ReviewListProps {
     productId: number;
   }
   
   export function ReviewList({ productId }: ReviewListProps) {
     const [reviews, setReviews] = useState<Review[]>([]);
     const [loading, setLoading] = useState(true);
     
     useEffect(() => {
       fetch(`/api/reviews/product/${productId}`)
         .then(res => res.json())
         .then(data => setReviews(data))
         .finally(() => setLoading(false));
     }, [productId]);
     
     if (loading) return <div>Loading reviews...</div>;
     
     return (
       <div className="review-list">
         {reviews.map(review => (
           <div key={review.id} className="review">
             <div>Rating: {review.rating}/5</div>
             <p>{review.comment}</p>
           </div>
         ))}
       </div>
     );
   }
   ```

3. **Use in page**:
   ```typescript
   import { ReviewList } from '@/components/reviews/ReviewList';
   
   export default function ProductPage({ params }: { params: { id: string } }) {
     return (
       <div>
         {/* ... product details ... */}
         <ReviewList productId={parseInt(params.id)} />
       </div>
     );
   }
   ```

### Clear and Reset Development Data

```bash
# Stop all services
docker-compose -f infra/docker/docker-compose.yml down

# Remove volumes (WARNING: This deletes all data)
docker-compose -f infra/docker/docker-compose.yml down -v

# Start fresh
docker-compose -f infra/docker/docker-compose.yml up -d

# Wait for MySQL to be ready, then seed
sleep 30
curl -X POST http://localhost:8080/api/admin/seed
```

## Troubleshooting

### Port Already in Use

If you get "port already in use" errors:

```bash
# Find process using port 8080 (backend)
lsof -i :8080
# or on Windows
netstat -ano | findstr :8080

# Kill the process
kill -9 <PID>
# or on Windows
taskkill /PID <PID> /F

# Same for port 5173 (frontend)
lsof -i :5173
kill -9 <PID>
```

### Maven Build Fails

```bash
# Clear Maven cache
rm -rf ~/.m2/repository

# Clean and rebuild
cd apps/api
./mvnw clean install -U
```

### NPM Install Fails

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Database Connection Issues

```bash
# Check if MySQL is running
docker-compose -f infra/docker/docker-compose.yml ps

# Check MySQL logs
docker-compose -f infra/docker/docker-compose.yml logs mysql

# Restart MySQL
docker-compose -f infra/docker/docker-compose.yml restart mysql
```

### Frontend Can't Connect to Backend

1. Check backend is running: `curl http://localhost:8080/actuator/health`
2. Check CORS configuration in `apps/api/src/main/resources/application.yml`
3. Verify `VITE_API_URL` in `apps/web/.env` matches backend URL

## Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Next.js Documentation](https://nextjs.org/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Docker Documentation](https://docs.docker.com/)

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/SalimTag/dar-lemlih-apiculture/issues)
- **Discussions**: [GitHub Discussions](https://github.com/SalimTag/dar-lemlih-apiculture/discussions)
- **Email**: support@darlemlih.ma
