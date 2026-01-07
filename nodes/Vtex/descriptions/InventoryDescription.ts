import { INodeProperties } from 'n8n-workflow';

export const inventoryOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['inventory'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get inventory for a SKU',
				action: 'Get inventory',
			},
			{
				name: 'Get Many by Warehouse',
				value: 'getManyByWarehouse',
				description: 'List all inventory items in a warehouse',
				action: 'Get many by warehouse',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update inventory quantity',
				action: 'Update inventory',
			},
		],
		default: 'get',
	},
];

export const inventoryFields: INodeProperties[] = [
	// ----------------------------------
	//         inventory:get
	// ----------------------------------
	{
		displayName: 'SKU ID',
		name: 'skuId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['inventory'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'SKU ID to get inventory for',
	},

	// ----------------------------------
	//         inventory:update
	// ----------------------------------
	{
		displayName: 'SKU ID',
		name: 'skuId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['inventory'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'SKU ID to update inventory for',
	},
	{
		displayName: 'Warehouse ID',
		name: 'warehouseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['inventory'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Warehouse ID where inventory is located',
	},
	{
		displayName: 'Quantity',
		name: 'quantity',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['inventory'],
				operation: ['update'],
			},
		},
		default: 0,
		description: 'New quantity for the SKU',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['inventory'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Unlimited Quantity',
				name: 'unlimitedQuantity',
				type: 'boolean',
				default: false,
				description: 'Whether to set unlimited quantity',
			},
		],
	},

	// ----------------------------------
	//         inventory:getManyByWarehouse
	// ----------------------------------
	{
		displayName: 'Warehouse ID',
		name: 'warehouseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['inventory'],
				operation: ['getManyByWarehouse'],
			},
		},
		default: '',
		description: 'Warehouse ID to list inventory from',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['inventory'],
				operation: ['getManyByWarehouse'],
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

