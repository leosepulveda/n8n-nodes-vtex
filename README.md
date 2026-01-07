# n8n-nodes-vtex-apis

This is an n8n community node that lets you interact with the VTEX e-commerce platform in your n8n workflows.

[VTEX](https://vtex.com) is a leading enterprise e-commerce platform for Latin America and beyond. This node provides access to the VTEX APIs for catalog management, orders, inventory, pricing, and more.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Node Installation

1. Go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-vtex-apis` in **Enter npm package name**.
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes: select **I understand the risks of installing unverified code from a public source**.
5. Select **Install**.

After installing the node, you can use it like any other node. n8n displays the node in search results in the **Nodes** panel.

### Manual Installation

To get started locally, install the dependencies and build the code:

```bash
npm install
npm run build
```

Then link the node to your n8n installation:

```bash
npm link
cd ~/.n8n/nodes
npm link n8n-nodes-vtex-apis
```

## Operations

This node currently supports the following operations:

### Product
- **Create** - Create a new product
- **Get** - Retrieve a product by ID
- **Get Many** - List multiple products
- **Update** - Update an existing product
- **Delete** - Delete a product

### SKU
- **Create** - Create a new SKU for a product
- **Get** - Retrieve a SKU by ID
- **Get Many** - List multiple SKUs
- **Update** - Update an existing SKU

### Order
- **Get** - Retrieve an order by ID
- **Get Many** - List multiple orders with filters
- **Start Handling** - Start handling an order
- **Cancel** - Cancel an order

### Category
- **Create** - Create a new category
- **Get** - Retrieve a category by ID
- **Get Many** - List all categories (tree structure)
- **Update** - Update an existing category
- **Delete** - Delete a category

### Brand
- **Create** - Create a new brand
- **Get** - Retrieve a brand by ID
- **Get Many** - List all brands
- **Update** - Update an existing brand
- **Delete** - Delete a brand

### Inventory
- **Get** - Get inventory for a SKU
- **Update** - Update inventory quantity by warehouse

### Pricing
- **Get** - Get price for a SKU
- **Create or Update** - Set price for a SKU
- **Delete** - Delete price for a SKU

### Warehouse
- **Create** - Create a new warehouse
- **Get** - Retrieve a warehouse by ID
- **Get Many** - List all warehouses
- **Update** - Update an existing warehouse
- **Delete** - Delete a warehouse

### Promotion 🆕
- **Create** - Create a new promotion with percentage or fixed discount
- **Get** - Retrieve a promotion by ID
- **Get Many** - List promotions (with archived filter)
- **Update** - Update a promotion
- **Archive** - Archive a promotion
- **Unarchive** - Reactivate an archived promotion

### Coupon 🆕
- **Create** - Create a coupon with custom code
- **Get** - Retrieve a coupon by code
- **Get Many** - List all coupons
- **Archive** - Archive a coupon

### Master Data (CRM) 🆕
- **Create Document** - Create a document in any Master Data entity
- **Get Document** - Retrieve a document with field selection
- **Update Document** - Update a document
- **Delete Document** - Delete a document
- **Search Documents** - Search with advanced filters and pagination
- **Get Client by Email** - Quick client lookup by email

### Product Search 🆕
- **Search** - Advanced product search with filters, categories, and sorting
- **Get by Identifier** - Find products by ID, EAN, Reference ID, or SKU ID

## Credentials

To use this node, you need VTEX API credentials:

1. Go to your VTEX Admin
2. Navigate to **Account Settings → Account → Security → Application Keys**
3. Click **Generate access key**
4. Save your **App Key** and **App Token** securely
5. In n8n, create new credentials for "VTEX API" and enter:
   - **Account Name**: Your VTEX account name (e.g., `mystore`)
   - **Environment**: Usually `vtexcommercestable`
   - **App Key**: Your VTEX App Key
   - **App Token**: Your VTEX App Token

### Required Permissions

Your App Key needs appropriate permissions depending on which operations you'll use:
- **Catalog API** - For product and SKU operations
- **OMS API** - For order operations
- **Pricing API** - For pricing operations
- **Logistics API** - For inventory and warehouse operations

## Compatibility

This node is compatible with n8n version 1.0.0 and above.

Tested with:
- n8n v1.0+
- Node.js 18+

## Usage

### Example: Create a Product

1. Add a **VTEX** node to your workflow
2. Select **Product** as the resource
3. Select **Create** as the operation
4. Fill in the required fields:
   - Name: "Premium T-Shirt"
   - Category ID: 1
   - Brand ID: 2
5. Optionally add additional fields like description, reference ID, etc.

### Example: Get Recent Orders

1. Add a **VTEX** node to your workflow
2. Select **Order** as the resource
3. Select **Get Many** as the operation
4. Configure filters:
   - Add "Creation Date From" filter for recent orders
5. Process the order data in subsequent nodes

### Example: Update Inventory

Coming soon! Inventory operations will be added in the next version.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [VTEX Developer Portal](https://developers.vtex.com/)
* [VTEX API Reference](https://developers.vtex.com/docs/api-reference)

## Development

### Building the Node

```bash
npm run build
```

### Watching for Changes

```bash
npm run dev
```

### Linting

```bash
npm run lint
npm run lintfix
```

## Version History

### 0.1.0 (Initial Release)
- Product operations (Create, Get, Get Many, Update, Delete)
- SKU operations (Create, Get, Get Many, Update)
- Order operations (Get, Get Many, Start Handling, Cancel)
- VTEX API authentication

## License

[MIT](LICENSE)

## Author

**Leonardo Sepúlveda**
- Email: lsepulvedatabares@gmail.com
- GitHub: [@leosepulveda](https://github.com/leosepulveda)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions:
- Open an issue on [GitHub](https://github.com/leosepulveda/n8n-nodes-vtex/issues)
- Check the [VTEX Developer Portal](https://developers.vtex.com/) for API documentation
- Visit the [n8n community forum](https://community.n8n.io/)

---

**Made with ❤️ for the n8n and VTEX communities**

