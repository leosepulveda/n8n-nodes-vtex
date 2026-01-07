# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.2] - 2026-01-07

### Changed
- **Package Name**: Changed to `n8n-nodes-vtex-apis` for npm publication
  - Complies with n8n Community Node naming requirements (must start with `n8n-nodes-`)
  - Install with: `n8n-nodes-vtex-apis`

### Fixed - Critical Bug
- **CRITICAL**: Fixed Coupon creation - `utmSource` field was not being sent to VTEX API
  - The field was marked as required in the UI but wasn't being extracted in the execution code
  - Now correctly sends `utmSource` along with `couponCode` and `additionalFields`
  - Coupons will now be created with the correct UTM tracking

## [0.3.1] - 2026-01-07

### Fixed - Critical Bugs from QA & Documentation Compliance
- **CRITICAL**: Fixed Promotions API URLs - Added missing `/benefits/` path segment
  - All promotion endpoints now correctly use `/api/rnb/pvt/benefits/calculatorconfiguration`
  - Fixed `isArchived` parameter name in listPromotions
- **CRITICAL**: Fixed Product Search brand filter logic
  - Brand filter now correctly combines with existing `fq` filters using AND
  - Previously would overwrite any existing filter query

### Added - Missing Operations
- **Pricing**: Added `Get Computed` operation
  - Get computed price with promotions, taxes, and regional pricing
  - Supports trade policy and region ID parameters
- **Pricing**: Added `Get Many` operation
  - List all prices with pagination support
  - Supports page and pageSize parameters
- **Inventory**: Added `Get Many by Warehouse` operation
  - List all inventory items in a specific warehouse
  - Supports pagination
- **SKU**: Added `Get by RefId` operation
  - Search for SKU using Reference ID
  - Alternative to searching by SKU ID

### Fixed - Based on Official VTEX Documentation
- **CRITICAL**: Fixed Coupon creation - Added required `utmSource` field
  - According to [VTEX Coupons API docs](https://developers.vtex.com/docs/guides/creating-and-managing-coupons-with-promotions-api)
  - At least one of `utmSource` or `utmCampaign` is mandatory
  - Added all required fields: `utmSource`, `utmCampaign`, `isArchived`, `expirationIntervalPerUse`
  - Now properly validates against VTEX API requirements

### Technical Improvements
- Comprehensive QA audit comparing with MCP implementation
- Fixed all critical API endpoint discrepancies
- Enhanced filter combination logic for search operations
- All implementations now validated against official VTEX documentation

## [0.3.0] - 2026-01-07

### Added
- **Promotion operations** (6 operations):
  - Create promotion with percentage or fixed amount discount
  - Get promotion by ID
  - Get many promotions (with archived filter)
  - Update promotion
  - Archive promotion
  - Unarchive promotion
- **Coupon operations** (4 operations):
  - Create coupon with custom code
  - Get coupon by code
  - Get many coupons
  - Archive coupon
- **Master Data / CRM operations** (6 operations):
  - Create document in Master Data entities
  - Get document by ID with field selection
  - Update document
  - Delete document
  - Search documents with advanced filters and pagination
  - Get client by email (shortcut for CRM)
- **Product Search operations** (2 operations):
  - Advanced product search with filters, categories, brands, and sorting
  - Get product by identifier (ID, EAN, Reference ID, SKU ID)

### Improved
- Professional field descriptions with placeholders
- Complete parameter validation
- Enhanced error handling
- Better UX with organized field collections

### Fixed
- Fixed "Could not get parameter" error in Master Data > Get Client by Email operation
- Fixed Product Search: Query now correctly goes in URL path instead of query parameter (following VTEX API spec)

## [0.2.0] - 2026-01-07

### Added
- **Category operations**:
  - Create category
  - Get category by ID
  - Get many categories (tree structure)
  - Update category
  - Delete category
- **Brand operations**:
  - Create brand
  - Get brand by ID
  - Get many brands
  - Update brand
  - Delete brand
- **Inventory operations**:
  - Get inventory for SKU
  - Update inventory quantity by warehouse
- **Pricing operations**:
  - Get price for SKU
  - Create or update price
  - Delete price
- **Warehouse operations**:
  - Create warehouse
  - Get warehouse by ID
  - Get many warehouses
  - Update warehouse
  - Delete warehouse

### Fixed
- Credential test endpoint now uses `/api/catalog_system/pvt/brand/list` for better compatibility

## [0.1.0] - 2026-01-07

### Added
- Initial release of n8n-nodes-vtex
- VTEX API credentials configuration
- Product operations:
  - Create product
  - Get product by ID
  - Get many products
  - Update product
  - Delete product
- SKU operations:
  - Create SKU
  - Get SKU by ID
  - Get many SKUs (with optional product filter)
  - Update SKU
- Order operations:
  - Get order by ID
  - Get many orders with filters (status, date range)
  - Start handling order
  - Cancel order
- Complete TypeScript implementation
- Comprehensive error handling
- Node icon (VTEX logo)

### Documentation
- Complete README with installation instructions
- API credentials setup guide
- Usage examples
- Development guidelines

## [Unreleased]

### Planned Features
- Docks operations (Logistics)
- Gift Card operations
- Marketplace operations (Seller management)

---

For more information, see the [README](README.md).

