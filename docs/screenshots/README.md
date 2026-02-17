# Screenshots Directory

This directory contains screenshots and visual documentation for the Dar Lemlih Apiculture e-commerce platform.

## Required Screenshots

### Customer Storefront
1. **Homepage** - Main landing page with featured products
2. **Product Catalog** - Product listing with filters
3. **Product Detail** - Single product view with details
4. **Shopping Cart** - Cart view with items
5. **Checkout** - Checkout flow
6. **Order Confirmation** - Order success page
7. **User Profile** - User account management
8. **Order History** - Past orders list
9. **Multilingual** - Language switcher (FR/EN/AR)
10. **RTL Support** - Arabic layout demonstration

### Admin Dashboard
1. **Dashboard Overview** - Analytics and metrics
2. **Product Management** - Product CRUD interface
3. **Category Management** - Category management
4. **Order Management** - Orders list and details
5. **User Management** - User administration
6. **Settings** - System configuration

### Mobile Responsiveness
1. **Mobile Homepage** - Mobile view
2. **Mobile Product List** - Product browsing on mobile
3. **Mobile Cart** - Shopping cart on mobile

## Screenshot Guidelines

When adding screenshots:
- Use high-quality images (PNG format preferred)
- Maintain consistent browser window size
- Include realistic demo data
- Highlight key features with annotations if needed
- Use meaningful filenames (e.g., `homepage-desktop.png`, `admin-dashboard.png`)

## File Naming Convention

```
[section]-[feature]-[device].png
```

Examples:
- `storefront-homepage-desktop.png`
- `admin-products-desktop.png`
- `storefront-cart-mobile.png`
- `storefront-arabic-rtl.png`

## To Add Screenshots

1. Run the application locally
2. Seed demo data: `curl -X POST http://localhost:8080/api/admin/seed`
3. Take screenshots of each section
4. Save them in this directory
5. Update README.md to reference the screenshots

## Dimensions

- **Desktop**: 1920x1080 or 1440x900
- **Mobile**: 375x812 (iPhone X) or 360x800 (Android)
- **Tablet**: 768x1024 (iPad)
