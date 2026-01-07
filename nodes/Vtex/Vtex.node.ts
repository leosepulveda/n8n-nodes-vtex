import { IExecuteFunctions } from 'n8n-workflow';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import { getVtexApiClient } from './GenericFunctions';
import {
	productOperations,
	productFields,
	skuOperations,
	skuFields,
	orderOperations,
	orderFields,
	categoryOperations,
	categoryFields,
	brandOperations,
	brandFields,
	inventoryOperations,
	inventoryFields,
	pricingOperations,
	pricingFields,
	warehouseOperations,
	warehouseFields,
	promotionOperations,
	promotionFields,
	couponOperations,
	couponFields,
	masterDataOperations,
	masterDataFields,
	productSearchOperations,
	productSearchFields,
} from './descriptions';

export class Vtex implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'VTEX',
		name: 'vtex',
		icon: 'file:vtex.svg',
		group: ['transform'],
		version: 2,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with VTEX e-commerce platform',
		defaults: {
			name: 'VTEX',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'vtexApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Brand',
						value: 'brand',
					},
					{
						name: 'Category',
						value: 'category',
					},
					{
						name: 'Coupon',
						value: 'coupon',
					},
					{
						name: 'Inventory',
						value: 'inventory',
					},
					{
						name: 'Master Data (CRM)',
						value: 'masterData',
					},
					{
						name: 'Order',
						value: 'order',
					},
					{
						name: 'Pricing',
						value: 'pricing',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Product Search',
						value: 'productSearch',
					},
					{
						name: 'Promotion',
						value: 'promotion',
					},
					{
						name: 'SKU',
						value: 'sku',
					},
					{
						name: 'Warehouse',
						value: 'warehouse',
					},
				],
				default: 'product',
			},

			// Product
			...productOperations,
			...productFields,

			// SKU
			...skuOperations,
			...skuFields,

			// Order
			...orderOperations,
			...orderFields,

			// Category
			...categoryOperations,
			...categoryFields,

			// Brand
			...brandOperations,
			...brandFields,

			// Inventory
			...inventoryOperations,
			...inventoryFields,

			// Pricing
			...pricingOperations,
			...pricingFields,

			// Warehouse
			...warehouseOperations,
			...warehouseFields,

			// Promotion
			...promotionOperations,
			...promotionFields,

			// Coupon
			...couponOperations,
			...couponFields,

			// Master Data
			...masterDataOperations,
			...masterDataFields,

			// Product Search
			...productSearchOperations,
			...productSearchFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		const vtexClient = await getVtexApiClient.call(this);

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'product') {
					// ========== PRODUCT OPERATIONS ==========
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const categoryId = this.getNodeParameter('categoryId', i) as number;
						const brandId = this.getNodeParameter('brandId', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const body = {
							Name: name,
							CategoryId: categoryId,
							BrandId: brandId,
							...additionalFields,
						};

						const responseData = await vtexClient.createProduct(body);
						returnData.push({ json: responseData });
					} else if (operation === 'get') {
						const productId = this.getNodeParameter('productId', i) as string;
						const responseData = await vtexClient.getProduct(productId);
						returnData.push({ json: responseData });
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const limit = this.getNodeParameter('limit', i, 50) as number;

						const responseData = await vtexClient.listProducts(1, returnAll ? 100 : limit);
						if (Array.isArray(responseData)) {
							responseData.forEach((item) => returnData.push({ json: item }));
						} else {
							returnData.push({ json: responseData });
						}
					} else if (operation === 'update') {
						const productId = this.getNodeParameter('productId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as any;

						const responseData = await vtexClient.updateProduct(productId, updateFields);
						returnData.push({ json: responseData });
					} else if (operation === 'delete') {
						const productId = this.getNodeParameter('productId', i) as string;
						const responseData = await vtexClient.deleteProduct(productId);
						returnData.push({ json: { success: true, productId, ...responseData } });
					}
				} else if (resource === 'sku') {
					// ========== SKU OPERATIONS ==========
					if (operation === 'create') {
						const productId = this.getNodeParameter('productId', i) as number;
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const body = {
							ProductId: productId,
							Name: name,
							...additionalFields,
						};

						const responseData = await vtexClient.createSKU(body);
						returnData.push({ json: responseData });
					} else if (operation === 'get') {
						const skuId = this.getNodeParameter('skuId', i) as string;
						const responseData = await vtexClient.getSKU(skuId);
						returnData.push({ json: responseData });
					} else if (operation === 'getByRefId') {
						const refId = this.getNodeParameter('refId', i) as string;
						const responseData = await vtexClient.getSKUByRefId(refId);
						returnData.push({ json: responseData });
					} else if (operation === 'getMany') {
						const productId = this.getNodeParameter('productId', i, '') as string;
						const responseData = await vtexClient.listSKUs(productId || undefined);

						if (Array.isArray(responseData)) {
							responseData.forEach((item) => returnData.push({ json: item }));
						} else {
							returnData.push({ json: responseData });
						}
					} else if (operation === 'update') {
						const skuId = this.getNodeParameter('skuId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as any;

						const responseData = await vtexClient.updateSKU(skuId, updateFields);
						returnData.push({ json: responseData });
					}
				} else if (resource === 'order') {
					// ========== ORDER OPERATIONS ==========
					if (operation === 'get') {
						const orderId = this.getNodeParameter('orderId', i) as string;
						const responseData = await vtexClient.getOrder(orderId);
						returnData.push({ json: responseData });
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const limit = this.getNodeParameter('limit', i, 15) as number;
						const filters = this.getNodeParameter('filters', i, {}) as any;

						// Build filter parameters
						const params: any = {
							per_page: returnAll ? 100 : limit,
							page: 1,
						};

						if (filters.f_status) {
							params.f_status = filters.f_status;
						}

						if (filters.creationDateFrom || filters.creationDateTo) {
							const from = filters.creationDateFrom
								? new Date(filters.creationDateFrom).toISOString()
								: '2020-01-01T00:00:00.000Z';
							const to = filters.creationDateTo
								? new Date(filters.creationDateTo).toISOString()
								: new Date().toISOString();
							params.f_creationDate = `creationDate:[${from} TO ${to}]`;
						}

						const responseData = await vtexClient.listOrders(params);

						if (responseData.list && Array.isArray(responseData.list)) {
							responseData.list.forEach((item: any) => returnData.push({ json: item }));
						} else {
							returnData.push({ json: responseData });
						}
					} else if (operation === 'startHandling') {
						const orderId = this.getNodeParameter('orderId', i) as string;
						const responseData = await vtexClient.startHandling(orderId);
						returnData.push({ json: responseData });
					} else if (operation === 'cancel') {
						const orderId = this.getNodeParameter('orderId', i) as string;
						const reason = this.getNodeParameter('reason', i, '') as string;
						const responseData = await vtexClient.cancelOrder(orderId, reason);
						returnData.push({ json: { success: true, orderId, ...responseData } });
					}
				} else if (resource === 'category') {
					// ========== CATEGORY OPERATIONS ==========
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;
						const body = { Name: name, ...additionalFields };
						const responseData = await vtexClient.createCategory(body);
						returnData.push({ json: responseData });
					} else if (operation === 'get') {
						const categoryId = this.getNodeParameter('categoryId', i) as string;
						const responseData = await vtexClient.getCategory(categoryId);
						returnData.push({ json: responseData });
					} else if (operation === 'getMany') {
						const responseData = await vtexClient.listCategories();
						if (Array.isArray(responseData)) {
							responseData.forEach((item) => returnData.push({ json: item }));
						} else {
							returnData.push({ json: responseData });
						}
					} else if (operation === 'update') {
						const categoryId = this.getNodeParameter('categoryId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as any;
						const responseData = await vtexClient.updateCategory(categoryId, updateFields);
						returnData.push({ json: responseData });
					} else if (operation === 'delete') {
						const categoryId = this.getNodeParameter('categoryId', i) as string;
						const responseData = await vtexClient.deleteCategory(categoryId);
						returnData.push({ json: { success: true, categoryId, ...responseData } });
					}
				} else if (resource === 'brand') {
					// ========== BRAND OPERATIONS ==========
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;
						const body = { Name: name, ...additionalFields };
						const responseData = await vtexClient.createBrand(body);
						returnData.push({ json: responseData });
					} else if (operation === 'get') {
						const brandId = this.getNodeParameter('brandId', i) as string;
						const responseData = await vtexClient.getBrand(brandId);
						returnData.push({ json: responseData });
					} else if (operation === 'getMany') {
						const responseData = await vtexClient.listBrands();
						if (Array.isArray(responseData)) {
							responseData.forEach((item) => returnData.push({ json: item }));
						} else {
							returnData.push({ json: responseData });
						}
					} else if (operation === 'update') {
						const brandId = this.getNodeParameter('brandId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as any;
						const responseData = await vtexClient.updateBrand(brandId, updateFields);
						returnData.push({ json: responseData });
					} else if (operation === 'delete') {
						const brandId = this.getNodeParameter('brandId', i) as string;
						const responseData = await vtexClient.deleteBrand(brandId);
						returnData.push({ json: { success: true, brandId, ...responseData } });
					}
				} else if (resource === 'inventory') {
					// ========== INVENTORY OPERATIONS ==========
					if (operation === 'get') {
						const skuId = this.getNodeParameter('skuId', i) as string;
						const responseData = await vtexClient.getInventoryBySKU(skuId);
						returnData.push({ json: responseData });
					} else if (operation === 'getManyByWarehouse') {
						const warehouseId = this.getNodeParameter('warehouseId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
						const page = additionalFields.page || 1;
						const responseData = await vtexClient.listInventoryByWarehouse(warehouseId, page);
						if (Array.isArray(responseData)) {
							responseData.forEach((item) => returnData.push({ json: item }));
						} else {
							returnData.push({ json: responseData });
						}
					} else if (operation === 'update') {
						const skuId = this.getNodeParameter('skuId', i) as string;
						const warehouseId = this.getNodeParameter('warehouseId', i) as string;
						const quantity = this.getNodeParameter('quantity', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;
						const body = { quantity, ...additionalFields };
						const responseData = await vtexClient.updateInventory(skuId, warehouseId, body);
						returnData.push({ json: responseData });
					}
				} else if (resource === 'pricing') {
					// ========== PRICING OPERATIONS ==========
					if (operation === 'get') {
						const skuId = this.getNodeParameter('skuId', i) as string;
						const responseData = await vtexClient.getPrice(skuId);
						returnData.push({ json: responseData });
					} else if (operation === 'getComputed') {
						const skuId = this.getNodeParameter('skuId', i) as string;
						const computedOptions = this.getNodeParameter('computedOptions', i, {}) as any;
						const responseData = await vtexClient.getComputedPrice(
							skuId,
							computedOptions.tradePolicy,
							computedOptions.regionId,
						);
						returnData.push({ json: responseData });
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
						const page = additionalFields.page || 1;
						const pageSize = returnAll ? 100 : this.getNodeParameter('limit', i, 50) as number;
						const responseData = await vtexClient.listPrices(page, pageSize);
						if (Array.isArray(responseData)) {
							responseData.forEach((item) => returnData.push({ json: item }));
						} else {
							returnData.push({ json: responseData });
						}
					} else if (operation === 'createOrUpdate') {
						const skuId = this.getNodeParameter('skuId', i) as string;
						const basePrice = this.getNodeParameter('basePrice', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;
						const body = { itemId: skuId, basePrice, ...additionalFields };
						const responseData = await vtexClient.createOrUpdatePrice(skuId, body);
						returnData.push({ json: responseData });
					} else if (operation === 'delete') {
						const skuId = this.getNodeParameter('skuId', i) as string;
						const responseData = await vtexClient.deletePrice(skuId);
						returnData.push({ json: { success: true, skuId, ...responseData } });
					}
				} else if (resource === 'warehouse') {
					// ========== WAREHOUSE OPERATIONS ==========
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const body = { name };
						const responseData = await vtexClient.createWarehouse(body);
						returnData.push({ json: responseData });
					} else if (operation === 'get') {
						const warehouseId = this.getNodeParameter('warehouseId', i) as string;
						const responseData = await vtexClient.getWarehouse(warehouseId);
						returnData.push({ json: responseData });
					} else if (operation === 'getMany') {
						const responseData = await vtexClient.listWarehouses();
						if (Array.isArray(responseData)) {
							responseData.forEach((item) => returnData.push({ json: item }));
						} else {
							returnData.push({ json: responseData });
						}
					} else if (operation === 'update') {
						const warehouseId = this.getNodeParameter('warehouseId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as any;
						const responseData = await vtexClient.updateWarehouse(warehouseId, updateFields);
						returnData.push({ json: responseData });
					} else if (operation === 'delete') {
						const warehouseId = this.getNodeParameter('warehouseId', i) as string;
						const responseData = await vtexClient.deleteWarehouse(warehouseId);
						returnData.push({ json: { success: true, warehouseId, ...responseData } });
					}
				} else if (resource === 'promotion') {
					// ========== PROMOTION OPERATIONS ==========
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const beginDateUtc = this.getNodeParameter('beginDateUtc', i) as string;
						const endDateUtc = this.getNodeParameter('endDateUtc', i) as string;
						const discountType = this.getNodeParameter('discountType', i) as string;
						const discountValue = this.getNodeParameter('discountValue', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const body: any = {
							name,
							beginDateUtc,
							endDateUtc,
							...additionalFields,
						};

						// Set discount based on type
						if (discountType === 'percentage') {
							body.percentualDiscountValue = discountValue;
						} else {
							body.nominalDiscountValue = discountValue;
						}

						const responseData = await vtexClient.createPromotion(body);
						returnData.push({ json: responseData });
					} else if (operation === 'get') {
						const promotionId = this.getNodeParameter('promotionId', i) as string;
						const responseData = await vtexClient.getPromotion(promotionId);
						returnData.push({ json: responseData });
					} else if (operation === 'getMany') {
						const options = this.getNodeParameter('options', i) as any;
						const archived = options.archived || false;
						const responseData = await vtexClient.listPromotions(archived);
						if (Array.isArray(responseData)) {
							responseData.forEach((item) => returnData.push({ json: item }));
						} else {
							returnData.push({ json: responseData });
						}
					} else if (operation === 'update') {
						const promotionId = this.getNodeParameter('promotionId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as any;
						const responseData = await vtexClient.updatePromotion(promotionId, updateFields);
						returnData.push({ json: responseData });
					} else if (operation === 'archive') {
						const promotionId = this.getNodeParameter('promotionId', i) as string;
						const responseData = await vtexClient.archivePromotion(promotionId);
						returnData.push({ json: { success: true, promotionId, ...responseData } });
					} else if (operation === 'unarchive') {
						const promotionId = this.getNodeParameter('promotionId', i) as string;
						const responseData = await vtexClient.unarchivePromotion(promotionId);
						returnData.push({ json: { success: true, promotionId, ...responseData } });
					}
				} else if (resource === 'coupon') {
					// ========== COUPON OPERATIONS ==========
					if (operation === 'create') {
						const couponCode = this.getNodeParameter('couponCode', i) as string;
						const utmSource = this.getNodeParameter('utmSource', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;
						const body = { couponCode, utmSource, ...additionalFields };
						const responseData = await vtexClient.createCoupon(body);
						returnData.push({ json: responseData });
					} else if (operation === 'get') {
						const couponCode = this.getNodeParameter('couponCode', i) as string;
						const responseData = await vtexClient.getCoupon(couponCode);
						returnData.push({ json: responseData });
					} else if (operation === 'getMany') {
						const responseData = await vtexClient.listCoupons();
						if (Array.isArray(responseData)) {
							responseData.forEach((item) => returnData.push({ json: item }));
						} else {
							returnData.push({ json: responseData });
						}
					} else if (operation === 'archive') {
						const couponCode = this.getNodeParameter('couponCode', i) as string;
						const responseData = await vtexClient.archiveCoupon(couponCode);
						returnData.push({ json: { success: true, couponCode, ...responseData } });
					}
				} else if (resource === 'masterData') {
					// ========== MASTER DATA OPERATIONS ==========
					if (operation === 'getClientByEmail') {
						const email = this.getNodeParameter('email', i) as string;
						const responseData = await vtexClient.getClientByEmail(email);
						if (Array.isArray(responseData) && responseData.length > 0) {
							returnData.push({ json: responseData[0] });
						} else {
							returnData.push({ json: responseData });
						}
					} else {
						// Get entity for all operations except getClientByEmail
						const entityParam = this.getNodeParameter('entity', i) as string;
						const entity = entityParam === 'custom' ? this.getNodeParameter('customEntity', i) as string : entityParam;

						if (operation === 'createDocument') {
						const documentStr = this.getNodeParameter('document', i) as string;
						const document = typeof documentStr === 'string' ? JSON.parse(documentStr) : documentStr;
						const responseData = await vtexClient.createDocument(entity, document);
						returnData.push({ json: responseData });
					} else if (operation === 'getDocument') {
						const documentId = this.getNodeParameter('documentId', i) as string;
						const fieldsStr = this.getNodeParameter('fields', i, '') as string;
						const fields = fieldsStr ? fieldsStr.split(',').map(f => f.trim()) : undefined;
						const responseData = await vtexClient.getDocument(entity, documentId, fields);
						returnData.push({ json: responseData });
					} else if (operation === 'updateDocument') {
						const documentId = this.getNodeParameter('documentId', i) as string;
						const documentStr = this.getNodeParameter('document', i) as string;
						const document = typeof documentStr === 'string' ? JSON.parse(documentStr) : documentStr;
						const responseData = await vtexClient.updateDocument(entity, documentId, document);
						returnData.push({ json: responseData });
					} else if (operation === 'deleteDocument') {
						const documentId = this.getNodeParameter('documentId', i) as string;
						const responseData = await vtexClient.deleteDocument(entity, documentId);
						returnData.push({ json: { success: true, entity, documentId, ...responseData } });
					} else if (operation === 'searchDocuments') {
						const searchOptions = this.getNodeParameter('searchOptions', i) as any;
						const fieldsStr = this.getNodeParameter('fields', i, '') as string;
						if (fieldsStr) {
							searchOptions.fields = fieldsStr.split(',').map((f: string) => f.trim());
						}
						const responseData = await vtexClient.searchDocuments(entity, searchOptions);
						if (Array.isArray(responseData)) {
							responseData.forEach((item) => returnData.push({ json: item }));
						} else {
							returnData.push({ json: responseData });
						}
					}
					}
				} else if (resource === 'productSearch') {
					// ========== PRODUCT SEARCH OPERATIONS ==========
					if (operation === 'search') {
						const searchOptions = this.getNodeParameter('searchOptions', i) as any;
						const responseData = await vtexClient.searchProducts(searchOptions);
						if (Array.isArray(responseData)) {
							responseData.forEach((item) => returnData.push({ json: item }));
						} else {
							returnData.push({ json: responseData });
						}
					} else if (operation === 'getByIdentifier') {
						const field = this.getNodeParameter('field', i) as string;
						const value = this.getNodeParameter('value', i) as string;
						const responseData = await vtexClient.getProductByIdentifier(field, value);
						if (Array.isArray(responseData) && responseData.length > 0) {
							returnData.push({ json: responseData[0] });
						} else {
							returnData.push({ json: responseData });
						}
					}
				}
			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: {
							item: i,
						},
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error.message, {
					itemIndex: i,
				});
			}
		}

		return [returnData];
	}
}

