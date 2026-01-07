import { IExecuteFunctions, ILoadOptionsFunctions } from 'n8n-workflow';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * VTEX API Client for n8n
 * Adapted from mcp-vtex/src/vtex-client.ts
 */
export class VtexApiClient {
	private client: AxiosInstance;

	constructor(accountName: string, environment: string, appKey: string, appToken: string) {
		const baseURL = `https://${accountName}.${environment}.com.br`;

		this.client = axios.create({
			baseURL,
			headers: {
				'X-VTEX-API-AppKey': appKey,
				'X-VTEX-API-AppToken': appToken,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
	}

	/**
	 * Generic request method
	 */
	private async request<T = any>(config: AxiosRequestConfig): Promise<T> {
		try {
			const response: AxiosResponse<T> = await this.client.request(config);
			return response.data;
		} catch (error: any) {
			if (error.response) {
				throw new Error(
					`VTEX API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
				);
			}
			throw new Error(`VTEX API Request Failed: ${error.message}`);
		}
	}

	// ========== CATALOG - PRODUCTS ==========

	async createProduct(product: any): Promise<any> {
		return this.request({
			method: 'POST',
			url: '/api/catalog/pvt/product',
			data: product,
		});
	}

	async getProduct(productId: string): Promise<any> {
		return this.request({
			method: 'GET',
			url: `/api/catalog/pvt/product/${productId}`,
		});
	}

	async updateProduct(productId: string, updates: any): Promise<any> {
		return this.request({
			method: 'PUT',
			url: `/api/catalog/pvt/product/${productId}`,
			data: updates,
		});
	}

	async deleteProduct(productId: string): Promise<any> {
		return this.request({
			method: 'DELETE',
			url: `/api/catalog/pvt/product/${productId}`,
		});
	}

	async listProducts(page = 1, pageSize = 50): Promise<any> {
		const from = (page - 1) * pageSize + 1;
		const to = page * pageSize;
		return this.request({
			method: 'GET',
			url: `/api/catalog_system/pvt/products/GetProductAndSkuIds`,
			params: { _from: from, _to: to },
		});
	}

	// ========== CATALOG - SKUS ==========

	async createSKU(sku: any): Promise<any> {
		return this.request({
			method: 'POST',
			url: '/api/catalog/pvt/stockkeepingunit',
			data: sku,
		});
	}

	async getSKU(skuId: string): Promise<any> {
		return this.request({
			method: 'GET',
			url: `/api/catalog/pvt/stockkeepingunit/${skuId}`,
		});
	}

	async updateSKU(skuId: string, updates: any): Promise<any> {
		return this.request({
			method: 'PUT',
			url: `/api/catalog/pvt/stockkeepingunit/${skuId}`,
			data: updates,
		});
	}

	async listSKUs(productId?: string): Promise<any> {
		if (productId) {
			return this.request({
				method: 'GET',
				url: `/api/catalog_system/pvt/sku/stockkeepingunitByProductId/${productId}`,
			});
		}
		return this.request({
			method: 'GET',
			url: '/api/catalog_system/pvt/sku/stockkeepingunitids',
		});
	}

	async getSKUByRefId(refId: string): Promise<any> {
		return this.request({
			method: 'GET',
			url: '/api/catalog/pvt/stockkeepingunit',
			params: { refId },
		});
	}

	// ========== CATALOG - CATEGORIES ==========

	async createCategory(category: any): Promise<any> {
		return this.request({
			method: 'POST',
			url: '/api/catalog/pvt/category',
			data: category,
		});
	}

	async getCategory(categoryId: string): Promise<any> {
		return this.request({
			method: 'GET',
			url: `/api/catalog/pvt/category/${categoryId}`,
		});
	}

	async updateCategory(categoryId: string, updates: any): Promise<any> {
		return this.request({
			method: 'PUT',
			url: `/api/catalog/pvt/category/${categoryId}`,
			data: updates,
		});
	}

	async deleteCategory(categoryId: string): Promise<any> {
		return this.request({
			method: 'DELETE',
			url: `/api/catalog/pvt/category/${categoryId}`,
		});
	}

	async listCategories(): Promise<any> {
		return this.request({
			method: 'GET',
			url: '/api/catalog_system/pvt/category/tree/5',
		});
	}

	// ========== CATALOG - BRANDS ==========

	async createBrand(brand: any): Promise<any> {
		return this.request({
			method: 'POST',
			url: '/api/catalog/pvt/brand',
			data: brand,
		});
	}

	async getBrand(brandId: string): Promise<any> {
		return this.request({
			method: 'GET',
			url: `/api/catalog/pvt/brand/${brandId}`,
		});
	}

	async updateBrand(brandId: string, updates: any): Promise<any> {
		return this.request({
			method: 'PUT',
			url: `/api/catalog/pvt/brand/${brandId}`,
			data: updates,
		});
	}

	async deleteBrand(brandId: string): Promise<any> {
		return this.request({
			method: 'DELETE',
			url: `/api/catalog/pvt/brand/${brandId}`,
		});
	}

	async listBrands(): Promise<any> {
		return this.request({
			method: 'GET',
			url: '/api/catalog_system/pvt/brand/list',
		});
	}

	// ========== PRICING API ==========

	async getPrice(skuId: string): Promise<any> {
		return this.request({
			method: 'GET',
			url: `/api/pricing/prices/${skuId}`,
		});
	}

	async createOrUpdatePrice(skuId: string, priceData: any): Promise<any> {
		return this.request({
			method: 'PUT',
			url: `/api/pricing/prices/${skuId}`,
			data: priceData,
		});
	}

	async deletePrice(skuId: string): Promise<any> {
		return this.request({
			method: 'DELETE',
			url: `/api/pricing/prices/${skuId}`,
		});
	}

	async listPrices(page = 1, pageSize = 100): Promise<any> {
		return this.request({
			method: 'GET',
			url: '/api/pricing/prices',
			params: { page, pageSize },
		});
	}

	async getComputedPrice(skuId: string, tradePolicy?: string, regionId?: string): Promise<any> {
		const params: any = {};
		if (tradePolicy) params.sc = tradePolicy;
		if (regionId) params.regionId = regionId;

		return this.request({
			method: 'GET',
			url: `/api/pricing/prices/${skuId}/computed`,
			params,
		});
	}

	// ========== INVENTORY API ==========

	async getInventoryBySKU(skuId: string): Promise<any> {
		return this.request({
			method: 'GET',
			url: `/api/logistics/pvt/inventory/skus/${skuId}`,
		});
	}

	async updateInventory(skuId: string, warehouseId: string, inventory: any): Promise<any> {
		return this.request({
			method: 'PUT',
			url: `/api/logistics/pvt/inventory/skus/${skuId}/warehouses/${warehouseId}`,
			data: inventory,
		});
	}

	async listInventoryByWarehouse(warehouseId: string, page = 1): Promise<any> {
		return this.request({
			method: 'GET',
			url: `/api/logistics/pvt/inventory/items/warehouse/${warehouseId}`,
			params: { page },
		});
	}

	// ========== ORDERS API ==========

	async getOrder(orderId: string): Promise<any> {
		return this.request({
			method: 'GET',
			url: `/api/oms/pvt/orders/${orderId}`,
		});
	}

	async listOrders(params: any = {}): Promise<any> {
		return this.request({
			method: 'GET',
			url: '/api/oms/pvt/orders',
			params,
		});
	}

	async startHandling(orderId: string): Promise<any> {
		return this.request({
			method: 'POST',
			url: `/api/oms/pvt/orders/${orderId}/start-handling`,
		});
	}

	async cancelOrder(orderId: string, reason?: string): Promise<any> {
		return this.request({
			method: 'POST',
			url: `/api/oms/pvt/orders/${orderId}/cancel`,
			data: { reason },
		});
	}

	// ========== LOGISTICS - WAREHOUSES ==========

	async createWarehouse(warehouse: any): Promise<any> {
		return this.request({
			method: 'POST',
			url: '/api/logistics/pvt/configuration/warehouses',
			data: warehouse,
		});
	}

	async getWarehouse(warehouseId: string): Promise<any> {
		return this.request({
			method: 'GET',
			url: `/api/logistics/pvt/configuration/warehouses/${warehouseId}`,
		});
	}

	async listWarehouses(): Promise<any> {
		return this.request({
			method: 'GET',
			url: '/api/logistics/pvt/configuration/warehouses',
		});
	}

	async updateWarehouse(warehouseId: string, updates: any): Promise<any> {
		return this.request({
			method: 'PUT',
			url: `/api/logistics/pvt/configuration/warehouses/${warehouseId}`,
			data: updates,
		});
	}

	async deleteWarehouse(warehouseId: string): Promise<any> {
		return this.request({
			method: 'DELETE',
			url: `/api/logistics/pvt/configuration/warehouses/${warehouseId}`,
		});
	}

	// ========== LOGISTICS - DOCKS ==========

	async createDock(dock: any): Promise<any> {
		return this.request({
			method: 'POST',
			url: '/api/logistics/pvt/configuration/docks',
			data: dock,
		});
	}

	async getDock(dockId: string): Promise<any> {
		return this.request({
			method: 'GET',
			url: `/api/logistics/pvt/configuration/docks/${dockId}`,
		});
	}

	async listDocks(): Promise<any> {
		return this.request({
			method: 'GET',
			url: '/api/logistics/pvt/configuration/docks',
		});
	}

	// ========== PROMOTIONS API ==========

	async createPromotion(promotion: any): Promise<any> {
		return this.request({
			method: 'POST',
			url: '/api/rnb/pvt/benefits/calculatorconfiguration',
			data: promotion,
		});
	}

	async getPromotion(promotionId: string): Promise<any> {
		return this.request({
			method: 'GET',
			url: `/api/rnb/pvt/benefits/calculatorconfiguration/${promotionId}`,
		});
	}

	async listPromotions(archived = false): Promise<any> {
		return this.request({
			method: 'GET',
			url: '/api/rnb/pvt/benefits/calculatorconfiguration',
			params: { isArchived: archived },
		});
	}

	async updatePromotion(promotionId: string, updates: any): Promise<any> {
		return this.request({
			method: 'PUT',
			url: `/api/rnb/pvt/benefits/calculatorconfiguration/${promotionId}`,
			data: updates,
		});
	}

	async archivePromotion(promotionId: string): Promise<any> {
		return this.request({
			method: 'POST',
			url: `/api/rnb/pvt/benefits/calculatorconfiguration/${promotionId}/archive`,
		});
	}

	async unarchivePromotion(promotionId: string): Promise<any> {
		return this.request({
			method: 'POST',
			url: `/api/rnb/pvt/benefits/calculatorconfiguration/${promotionId}/unarchive`,
		});
	}

	// ========== COUPONS API ==========

	async createCoupon(coupon: any): Promise<any> {
		return this.request({
			method: 'POST',
			url: '/api/rnb/pvt/coupon',
			data: coupon,
		});
	}

	async getCoupon(couponCode: string): Promise<any> {
		return this.request({
			method: 'GET',
			url: `/api/rnb/pvt/coupon/${couponCode}`,
		});
	}

	async listCoupons(): Promise<any> {
		return this.request({
			method: 'GET',
			url: '/api/rnb/pvt/coupon',
		});
	}

	async archiveCoupon(couponCode: string): Promise<any> {
		return this.request({
			method: 'POST',
			url: `/api/rnb/pvt/coupon/${couponCode}/archive`,
		});
	}

	// ========== MASTER DATA API ==========

	async createDocument(entity: string, document: any): Promise<any> {
		return this.request({
			method: 'POST',
			url: `/api/dataentities/${entity}/documents`,
			data: document,
		});
	}

	async getDocument(entity: string, documentId: string, fields?: string[]): Promise<any> {
		const params: any = {};
		if (fields && fields.length > 0) {
			params._fields = fields.join(',');
		}
		return this.request({
			method: 'GET',
			url: `/api/dataentities/${entity}/documents/${documentId}`,
			params,
		});
	}

	async updateDocument(entity: string, documentId: string, document: any): Promise<any> {
		return this.request({
			method: 'PATCH',
			url: `/api/dataentities/${entity}/documents/${documentId}`,
			data: document,
		});
	}

	async deleteDocument(entity: string, documentId: string): Promise<any> {
		return this.request({
			method: 'DELETE',
			url: `/api/dataentities/${entity}/documents/${documentId}`,
		});
	}

	async searchDocuments(entity: string, searchParams: any): Promise<any> {
		const params: any = {};
		if (searchParams.where) params._where = searchParams.where;
		if (searchParams.fields) params._fields = searchParams.fields.join(',');
		if (searchParams.size) params._size = searchParams.size;
		if (searchParams.page) params._page = searchParams.page;
		if (searchParams.sort) params._sort = searchParams.sort;

		return this.request({
			method: 'GET',
			url: `/api/dataentities/${entity}/search`,
			params,
		});
	}

	async getClientByEmail(email: string): Promise<any> {
		return this.request({
			method: 'GET',
			url: '/api/dataentities/CL/search',
			params: {
				_where: `email=${email}`,
				_fields: 'email,firstName,lastName,document,phone',
			},
		});
	}

	// ========== SEARCH API ==========

	async searchProducts(searchParams: any): Promise<any> {
		const params: any = {};
		if (searchParams.orderBy) params.O = searchParams.orderBy;
		if (searchParams.from !== undefined) params._from = searchParams.from;
		if (searchParams.to !== undefined) params._to = searchParams.to;
		if (searchParams.map) params.map = searchParams.map;
		if (searchParams.fq) params.fq = searchParams.fq;

		// Build URL with search term in path (not as query param)
		let url = '/api/catalog_system/pub/products/search';
		
		if (searchParams.query) {
			// Query goes in URL path
			url = `/api/catalog_system/pub/products/search/${encodeURIComponent(searchParams.query)}`;
		} else if (searchParams.category) {
			// Category can also go in URL path
			url = `/api/catalog_system/pub/products/search/${encodeURIComponent(searchParams.category)}`;
		}

		// Additional filters like brand - combine with existing fq if present
		if (searchParams.brand) {
			const brandFilter = `B:${searchParams.brand}`;
			if (params.fq) {
				// Combine with existing fq using AND
				params.fq = `${params.fq} AND ${brandFilter}`;
			} else {
				params.fq = brandFilter;
			}
		}

		return this.request({
			method: 'GET',
			url,
			params,
		});
	}

	async getProductByIdentifier(field: string, value: string): Promise<any> {
		return this.request({
			method: 'GET',
			url: `/api/catalog_system/pub/products/search`,
			params: {
				fq: `${field}:${value}`,
			},
		});
	}
}

/**
 * Helper function to get VTEX API client instance
 */
export async function getVtexApiClient(
	this: IExecuteFunctions | ILoadOptionsFunctions,
): Promise<VtexApiClient> {
	const credentials = await this.getCredentials('vtexApi');

	return new VtexApiClient(
		credentials.accountName as string,
		credentials.environment as string,
		credentials.appKey as string,
		credentials.appToken as string,
	);
}

