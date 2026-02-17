# Contributing to Dar Lemlih Apiculture

Thank you for your interest in contributing to Dar Lemlih Apiculture! This document provides guidelines and instructions for contributing to this project.

## 🌟 How to Contribute

### Reporting Issues

If you find a bug or have a suggestion:

1. **Search Existing Issues**: Check if the issue already exists
2. **Create a New Issue**: Use a clear, descriptive title
3. **Provide Details**: Include steps to reproduce, expected vs actual behavior, and your environment details

### Submitting Pull Requests

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/dar-lemlih-apiculture.git
   cd dar-lemlih-apiculture
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the coding standards below
   - Write clear, concise commit messages
   - Add tests for new features
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   # Backend tests
   cd apps/api && ./mvnw test
   
   # Frontend tests
   cd apps/web && npm test
   
   # Linting
   cd apps/web && npm run lint
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear description of your changes
   - Link any related issues
   - Ensure CI checks pass

## 📋 Coding Standards

### Backend (Java/Spring Boot)

- Follow Java naming conventions
- Use meaningful variable and method names
- Add JavaDoc comments for public APIs
- Keep methods small and focused
- Use Spring Boot best practices

Example:
```java
/**
 * Processes a honey product order and initiates payment
 * 
 * @param order The order details including products and quantities
 * @param userId The authenticated user's ID
 * @return OrderConfirmation with order ID and payment status
 * @throws InsufficientStockException if products are out of stock
 */
public OrderConfirmation processOrder(Order order, String userId) {
    // Implementation
}
```

### Frontend (TypeScript/React)

- Use TypeScript for type safety
- Follow React hooks best practices
- Use functional components
- Add JSDoc comments for complex functions
- Keep components small and reusable

Example:
```typescript
/**
 * Detects and validates user input for product search
 * @param query - The search query string
 * @param filters - Optional filters for the search
 * @returns Validated search parameters
 */
function validateSearchQuery(query: string, filters?: SearchFilters): SearchParams {
    // Implementation
}
```

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add honey product filtering by region
fix: resolve authentication token refresh issue
docs: update API documentation for payment endpoints
```

## 🧪 Testing Guidelines

- Write unit tests for new features
- Maintain or improve code coverage
- Test edge cases and error handling
- Ensure tests are deterministic and isolated

## 🔒 Security

- Never commit sensitive data (API keys, passwords, etc.)
- Use environment variables for configuration
- Follow OWASP security best practices
- Report security vulnerabilities privately via email

## 📝 Documentation

- Update README.md if adding new features
- Add inline code comments for complex logic
- Update API documentation (OpenAPI/Swagger)
- Include examples in documentation

## ✅ Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No sensitive data in commits
- [ ] Commit messages follow conventions
- [ ] PR description is clear and detailed

## 🤝 Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 📧 Questions?

If you have questions about contributing, feel free to:
- Open a discussion on GitHub
- Reach out to the maintainers
- Check existing documentation

## 🙏 Recognition

Contributors will be recognized in the project's documentation and release notes.

Thank you for contributing to Dar Lemlih Apiculture! 🍯
