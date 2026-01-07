import { INodeProperties } from 'n8n-workflow';

export const pricingOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['pricing'],
			},
		},
		options: [
			{
				name: 'Create or Update',
				value: 'createOrUpdate',
				description: 'Create or update price for a SKU',
				action: 'Create or update price',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete price for a SKU',
				action: 'Delete price',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get price for a SKU',
				action: 'Get price',
			},
			{
				name: 'Get Computed',
				value: 'getComputed',
				description: 'Get computed price (with promotions, taxes, region)',
				action: 'Get computed price',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'List all prices with pagination',
				action: 'Get many prices',
			},
		],
		default: 'get',
	},
];

export const pricingFields: INodeProperties[] = [
	// ----------------------------------
	//         pricing:get/delete/getComputed
	// ----------------------------------
	{
		displayName: 'SKU ID',
		name: 'skuId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['pricing'],
				operation: ['get', 'delete', 'getComputed'],
			},
		},
		default: '',
		description: 'SKU ID to get or delete price for',
	},

	// ----------------------------------
	//         pricing:createOrUpdate
	// ----------------------------------
	{
		displayName: 'SKU ID',
		name: 'skuId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['pricing'],
				operation: ['createOrUpdate'],
			},
		},
		default: '',
		description: 'SKU ID to set price for',
	},
	{
		displayName: 'Base Price',
		name: 'basePrice',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['pricing'],
				operation: ['createOrUpdate'],
			},
		},
		default: 0,
		description: 'Base price for the SKU',
		typeOptions: {
			minValue: 0,
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['pricing'],
				operation: ['createOrUpdate'],
			},
		},
		options: [
			{
				displayName: 'List Price',
				name: 'listPrice',
				type: 'number',
				default: 0,
				description: 'List price (before discount)',
				typeOptions: {
					minValue: 0,
				},
			},
			{
				displayName: 'Cost Price',
				name: 'costPrice',
				type: 'number',
				default: 0,
				description: 'Cost price',
				typeOptions: {
					minValue: 0,
				},
			},
			{
				displayName: 'Markup',
				name: 'markup',
				type: 'number',
				default: 0,
				description: 'Markup percentage',
			},
		],
	},

	// ----------------------------------
	//         pricing:getComputed
	// ----------------------------------
	{
		displayName: 'Additional Options',
		name: 'computedOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['pricing'],
				operation: ['getComputed'],
			},
		},
		options: [
			{
				displayName: 'Trade Policy',
				name: 'tradePolicy',
				type: 'string',
				default: '',
				description: 'Trade policy (sales channel) ID',
				placeholder: '1',
			},
			{
				displayName: 'Region ID',
				name: 'regionId',
				type: 'string',
				default: '',
				description: 'Region ID for regional pricing',
				placeholder: 'v2.3A4D558',
			},
		],
	},

	// ----------------------------------
	//         pricing:getMany
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['pricing'],
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
				resource: ['pricing'],
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
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['pricing'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number for pagination',
				typeOptions: {
					minValue: 1,
				},
			},
		],
	},
];

