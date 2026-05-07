# Atlas Nectar API — Spring Boot 3.2

REST API for the Dar Lemlih apiculture platform. Built with **Spring Boot 3.2**, **Java 21**, and **MySQL**.

## Features

- **Stateless Auth**: JWT-based authentication with Spring Security.
- **Product Catalog**: REST endpoints for categories and terroir honey products.
- **Order Management**: Order processing and history (WIP).
- **Payment Integration**: Stripe Java SDK integration.
- **Database Migrations**: Flyway for schema management.
- **Documentation**: OpenAPI 3.0 (Swagger UI).
- **Storage**: AWS S3 / LocalStack for product imagery.

## Tech Stack

- **Framework**: Spring Boot 3.2.12
- **Language**: Java 21
- **Database**: MySQL 8.0
- **Migrations**: Flyway
- **Security**: Spring Security + JJWT
- **Docs**: SpringDoc OpenAPI
- **Validation**: Jakarta Bean Validation
- **Mapping**: MapStruct + Lombok

## Getting Started

### Prerequisites

- Java 21 SDK
- MySQL 8.0 instance
- Maven 3.9+ (or use the provided `./mvnw`)

### Configuration

Copy the example environment file and fill in your database and security credentials:

```bash
cp .env.example .env
```

### Running Locally

```bash
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`.

### API Documentation

Access the Swagger UI at:
`http://localhost:8080/swagger-ui.html`

## Project Structure

```
src/main/java/com/darlemlih/apiculture/
  ├── config/          # Security, CORS, OpenAPI, S3 configs
  ├── controllers/     # REST Endpoints
  ├── dto/             # Data Transfer Objects & Mappers
  ├── entities/        # JPA Entities
  ├── exceptions/      # Global error handling
  ├── repositories/    # Spring Data JPA Repositories
  ├── security/        # JWT Filter & Token Provider
  └── services/        # Business logic implementation
```

## Testing

```bash
./mvnw test
```

Includes unit tests and integration tests using **Testcontainers** for MySQL.
