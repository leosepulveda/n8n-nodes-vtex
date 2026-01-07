import { INodeProperties } from 'n8n-workflow';

export const skuOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sku'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new SKU',
				action: 'Create a SKU',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a SKU by ID',
				action: 'Get a SKU',
			},
			{
				name: 'Get by RefId',
				value: 'getByRefId',
				description: 'Get a SKU by Reference ID',
				action: 'Get SKU by reference ID',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many SKUs',
				action: 'Get many SKUs',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a SKU',
				action: 'Update a SKU',
			},
		],
		default: 'get',
	},
];

export const skuFields: INodeProperties[] = [
	// ----------------------------------
	//         sku:create
	// ----------------------------------
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['sku'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'Product ID to which this SKU belongs',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sku'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'SKU name',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['sku'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Reference ID',
				name: 'RefId',
				type: 'string',
				default: '',
				description: 'SKU reference ID',
			},
			{
				displayName: 'Is Active',
				name: 'IsActive',
				type: 'boolean',
				default: true,
				description: 'Whether the SKU is active',
			},
			{
				displayName: 'Height (cm)',
				name: 'Height',
				type: 'number',
				default: 0,
				description: 'Package height in centimeters',
			},
			{
				displayName: 'Length (cm)',
				name: 'Length',
				type: 'number',
				default: 0,
				description: 'Package length in centimeters',
			},
			{
				displayName: 'Width (cm)',
				name: 'Width',
				type: 'number',
				default: 0,
				description: 'Package width in centimeters',
			},
			{
				displayName: 'Weight (kg)',
				name: 'WeightKg',
				type: 'number',
				default: 0,
				description: 'Package weight in kilograms',
			},
		],
	},

	// ----------------------------------
	//         sku:get
	// ----------------------------------
	{
		displayName: 'SKU ID',
		name: 'skuId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sku'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'ID of the SKU to retrieve',
	},

	// ----------------------------------
	//         sku:getByRefId
	// ----------------------------------
	{
		displayName: 'Reference ID',
		name: 'refId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sku'],
				operation: ['getByRefId'],
			},
		},
		default: '',
		description: 'Reference ID of the SKU to retrieve',
		placeholder: 'REF123',
	},

	// ----------------------------------
	//         sku:getMany
	// ----------------------------------
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['sku'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'Filter SKUs by Product ID (optional)',
	},

	// ----------------------------------
	//         sku:update
	// ----------------------------------
	{
		displayName: 'SKU ID',
		name: 'skuId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sku'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'ID of the SKU to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['sku'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'Name',
				type: 'string',
				default: '',
				description: 'SKU name',
			},
			{
				displayName: 'Is Active',
				name: 'IsActive',
				type: 'boolean',
				default: true,
				description: 'Whether the SKU is active',
			},
			{
				displayName: 'Height (cm)',
				name: 'Height',
				type: 'number',
				default: 0,
				description: 'Package height in centimeters',
			},
			{
				displayName: 'Length (cm)',
				name: 'Length',
				type: 'number',
				default: 0,
				description: 'Package length in centimeters',
			},
			{
				displayName: 'Width (cm)',
				name: 'Width',
				type: 'number',
				default: 0,
				description: 'Package width in centimeters',
			},
			{
				displayName: 'Weight (kg)',
				name: 'WeightKg',
				type: 'number',
				default: 0,
				description: 'Package weight in kilograms',
			},
		],
	},
];

