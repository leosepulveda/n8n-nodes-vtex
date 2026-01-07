import { INodeProperties } from 'n8n-workflow';

export const productOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['product'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new product',
				action: 'Create a product',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a product',
				action: 'Delete a product',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a product',
				action: 'Get a product',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many products',
				action: 'Get many products',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a product',
				action: 'Update a product',
			},
		],
		default: 'get',
	},
];

export const productFields: INodeProperties[] = [
	// ----------------------------------
	//         product:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Product name',
	},
	{
		displayName: 'Category ID',
		name: 'categoryId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'Category ID for the product',
	},
	{
		displayName: 'Brand ID',
		name: 'brandId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'Brand ID for the product',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Link ID',
				name: 'LinkId',
				type: 'string',
				default: '',
				description: 'Product URL slug',
			},
			{
				displayName: 'Reference ID',
				name: 'RefId',
				type: 'string',
				default: '',
				description: 'Product reference ID',
			},
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Product description',
			},
			{
				displayName: 'Is Visible',
				name: 'IsVisible',
				type: 'boolean',
				default: true,
				description: 'Whether the product is visible in the store',
			},
			{
				displayName: 'Is Active',
				name: 'IsActive',
				type: 'boolean',
				default: true,
				description: 'Whether the product is active',
			},
		],
	},

	// ----------------------------------
	//         product:get
	// ----------------------------------
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['get', 'delete'],
			},
		},
		default: '',
		description: 'ID of the product to retrieve or delete',
	},

	// ----------------------------------
	//         product:getMany
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getMany'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         product:update
	// ----------------------------------
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'ID of the product to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'Name',
				type: 'string',
				default: '',
				description: 'Product name',
			},
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Product description',
			},
			{
				displayName: 'Is Visible',
				name: 'IsVisible',
				type: 'boolean',
				default: true,
				description: 'Whether the product is visible in the store',
			},
			{
				displayName: 'Is Active',
				name: 'IsActive',
				type: 'boolean',
				default: true,
				description: 'Whether the product is active',
			},
		],
	},
];

