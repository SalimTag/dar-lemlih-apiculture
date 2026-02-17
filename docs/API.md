# API Documentation

## Overview

The Dar Lemlih Apiculture API is a RESTful API built with Spring Boot that provides endpoints for managing an e-commerce platform for artisanal honey products.

**Base URL**: `http://localhost:8080` (development)

**OpenAPI Documentation**: Available at `/swagger-ui.html` when the application is running

## Authentication

Most endpoints require JWT authentication. Include the access token in the Authorization header:

```http
Authorization: Bearer {access_token}
```

### Token Lifecycle
- **Access Token**: Valid for 15 minutes
- **Refresh Token**: Valid for 7 days
- **Token Rotation**: Refresh tokens are rotated on each use

## API Endpoints

### Authentication Endpoints

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response** (200 OK):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CUSTOMER"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response** (200 OK):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CUSTOMER"
  }
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response** (200 OK):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {access_token}
```

**Response** (200 OK):
```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "CUSTOMER",
  "createdAt": "2025-01-01T00:00:00Z"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer {access_token}
```

**Response** (200 OK):
```json
{
  "message": "Successfully logged out"
}
```

### Product Endpoints

#### List All Products (Public)
```http
GET /api/products?page=0&size=20&sort=name,asc
```

**Query Parameters**:
- `page`: Page number (default: 0)
- `size`: Items per page (default: 20)
- `sort`: Sort field and direction (e.g., `name,asc`, `price,desc`)
- `category`: Filter by category ID
- `search`: Search in product name and description

**Response** (200 OK):
```json
{
  "content": [
    {
      "id": 1,
      "name": "Mountain Honey",
      "description": "Pure honey from mountain flowers",
      "price": 25.99,
      "stockQuantity": 50,
      "imageUrl": "https://s3.amazonaws.com/media/products/mountain-honey.jpg",
      "category": {
        "id": 1,
        "name": "Mountain Honey",
        "slug": "mountain-honey"
      },
      "active": true
    }
  ],
  "totalElements": 10,
  "totalPages": 1,
  "size": 20,
  "number": 0
}
```

#### Get Product Details (Public)
```http
GET /api/products/{id}
```

**Response** (200 OK):
```json
{
  "id": 1,
  "name": "Mountain Honey",
  "description": "Pure honey from mountain flowers harvested from the Atlas Mountains",
  "price": 25.99,
  "stockQuantity": 50,
  "imageUrl": "https://s3.amazonaws.com/media/products/mountain-honey.jpg",
  "category": {
    "id": 1,
    "name": "Mountain Honey",
    "slug": "mountain-honey",
    "description": "Honey collected from mountain regions"
  },
  "active": true,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

#### Create Product (Admin Only)
```http
POST /api/admin/products
Authorization: Bearer {admin_access_token}
Content-Type: application/json

{
  "name": "Lavender Honey",
  "description": "Aromatic honey from lavender fields",
  "price": 29.99,
  "stockQuantity": 30,
  "categoryId": 2,
  "imageUrl": "https://example.com/lavender.jpg",
  "active": true
}
```

**Response** (201 Created):
```json
{
  "id": 10,
  "name": "Lavender Honey",
  "description": "Aromatic honey from lavender fields",
  "price": 29.99,
  "stockQuantity": 30,
  "categoryId": 2,
  "imageUrl": "https://example.com/lavender.jpg",
  "active": true,
  "createdAt": "2025-01-15T10:30:00Z"
}
```

#### Update Product (Admin Only)
```http
PUT /api/admin/products/{id}
Authorization: Bearer {admin_access_token}
Content-Type: application/json

{
  "name": "Lavender Honey - Premium",
  "price": 34.99,
  "stockQuantity": 40
}
```

#### Delete Product (Admin Only)
```http
DELETE /api/admin/products/{id}
Authorization: Bearer {admin_access_token}
```

**Response** (204 No Content)

### Category Endpoints

#### List All Categories (Public)
```http
GET /api/categories
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Mountain Honey",
    "slug": "mountain-honey",
    "description": "Honey from mountain regions",
    "displayOrder": 1
  },
  {
    "id": 2,
    "name": "Lavender Honey",
    "slug": "lavender-honey",
    "description": "Honey from lavender fields",
    "displayOrder": 2
  }
]
```

#### Create Category (Admin Only)
```http
POST /api/admin/categories
Authorization: Bearer {admin_access_token}
Content-Type: application/json

{
  "name": "Acacia Honey",
  "slug": "acacia-honey",
  "description": "Light-colored honey from acacia trees",
  "displayOrder": 3
}
```

### Cart Endpoints

#### Get Current User's Cart
```http
GET /api/cart
Authorization: Bearer {access_token}
```

**Response** (200 OK):
```json
{
  "items": [
    {
      "id": 1,
      "product": {
        "id": 1,
        "name": "Mountain Honey",
        "price": 25.99,
        "imageUrl": "https://example.com/mountain.jpg"
      },
      "quantity": 2,
      "subtotal": 51.98
    }
  ],
  "totalItems": 2,
  "totalAmount": 51.98
}
```

#### Add Item to Cart
```http
POST /api/cart/items
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2
}
```

**Response** (201 Created):
```json
{
  "id": 1,
  "productId": 1,
  "quantity": 2,
  "addedAt": "2025-01-15T10:30:00Z"
}
```

#### Update Cart Item
```http
PUT /api/cart/items/{id}
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove Item from Cart
```http
DELETE /api/cart/items/{id}
Authorization: Bearer {access_token}
```

**Response** (204 No Content)

#### Clear Cart
```http
DELETE /api/cart
Authorization: Bearer {access_token}
```

### Order Endpoints

#### List User's Orders
```http
GET /api/orders?page=0&size=10
Authorization: Bearer {access_token}
```

**Response** (200 OK):
```json
{
  "content": [
    {
      "id": 1,
      "orderNumber": "ORD-20250115-001",
      "status": "DELIVERED",
      "totalAmount": 51.98,
      "items": [
        {
          "productName": "Mountain Honey",
          "quantity": 2,
          "unitPrice": 25.99
        }
      ],
      "shippingAddress": {
        "street": "123 Main St",
        "city": "Casablanca",
        "postalCode": "20000",
        "country": "Morocco"
      },
      "createdAt": "2025-01-10T14:30:00Z",
      "deliveredAt": "2025-01-12T10:00:00Z"
    }
  ],
  "totalElements": 5,
  "totalPages": 1
}
```

#### Get Order Details
```http
GET /api/orders/{id}
Authorization: Bearer {access_token}
```

#### Create Order (Checkout)
```http
POST /api/orders
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Casablanca",
    "postalCode": "20000",
    "country": "Morocco"
  },
  "paymentMethod": "CREDIT_CARD"
}
```

**Response** (201 Created):
```json
{
  "id": 10,
  "orderNumber": "ORD-20250115-010",
  "status": "PENDING",
  "totalAmount": 51.98,
  "paymentUrl": "https://payment-gateway.com/checkout/abc123",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

#### List All Orders (Admin Only)
```http
GET /api/admin/orders?status=PENDING&page=0&size=20
Authorization: Bearer {admin_access_token}
```

**Query Parameters**:
- `status`: Filter by order status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- `page`: Page number
- `size`: Items per page

#### Update Order Status (Admin Only)
```http
PUT /api/admin/orders/{id}
Authorization: Bearer {admin_access_token}
Content-Type: application/json

{
  "status": "SHIPPED",
  "trackingNumber": "TRK123456789"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email must be valid"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "status": 403,
  "error": "Forbidden",
  "message": "Access denied. Admin role required."
}
```

### 404 Not Found
```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "status": 404,
  "error": "Not Found",
  "message": "Product not found with id: 999"
}
```

### 500 Internal Server Error
```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "status": 500,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

Authentication endpoints have rate limiting enabled:

- **Login**: 5 attempts per 15 minutes per IP
- **Register**: 3 attempts per hour per IP
- **Password Reset**: 3 attempts per hour per email

When rate limit is exceeded, the API returns:

```json
{
  "status": 429,
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please try again later.",
  "retryAfter": 900
}
```

## Pagination

List endpoints support pagination with the following parameters:

- `page`: Page number (0-indexed, default: 0)
- `size`: Items per page (default: 20, max: 100)
- `sort`: Sort field and direction (e.g., `name,asc`)

**Example**:
```http
GET /api/products?page=0&size=20&sort=price,desc
```

**Response includes**:
```json
{
  "content": [...],
  "totalElements": 100,
  "totalPages": 5,
  "size": 20,
  "number": 0,
  "first": true,
  "last": false
}
```

## CORS

The API supports CORS with the following default configuration:

- **Allowed Origins**: Configured via `CORS_ALLOWED_ORIGINS` environment variable
- **Allowed Methods**: GET, POST, PUT, DELETE, PATCH, OPTIONS
- **Allowed Headers**: Authorization, Content-Type, Accept
- **Exposed Headers**: Content-Length, Content-Type
- **Max Age**: 3600 seconds

## Testing the API

### Using cURL

```bash
# Register a new user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login and save token
TOKEN=$(curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}' \
  | jq -r '.accessToken')

# Get products
curl -X GET http://localhost:8080/api/products \
  -H "Authorization: Bearer $TOKEN"

# Add item to cart
curl -X POST http://localhost:8080/api/cart/items \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

### Using Postman

1. Import the OpenAPI specification from `http://localhost:8080/v3/api-docs`
2. Set up an environment with `baseUrl=http://localhost:8080`
3. Create a variable for `accessToken`
4. Use Postman's authorization tab to automatically add Bearer token

### Using Swagger UI

1. Start the application
2. Navigate to `http://localhost:8080/swagger-ui.html`
3. Click "Authorize" and enter your access token
4. Test endpoints directly in the browser

## Additional Resources

- **OpenAPI Specification**: `/v3/api-docs`
- **Swagger UI**: `/swagger-ui.html`
- **Health Check**: `/actuator/health`
- **Application Info**: `/actuator/info`

## Support

For questions or issues with the API:
- Check the [README](../README.md)
- Review the [troubleshooting guide](../README.md#-troubleshooting)
- Open an issue on GitHub
