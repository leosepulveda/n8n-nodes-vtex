import { INodeProperties } from 'n8n-workflow';

export const warehouseOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['warehouse'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new warehouse',
				action: 'Create a warehouse',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a warehouse',
				action: 'Delete a warehouse',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a warehouse',
				action: 'Get a warehouse',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many warehouses',
				action: 'Get many warehouses',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a warehouse',
				action: 'Update a warehouse',
			},
		],
		default: 'get',
	},
];

export const warehouseFields: INodeProperties[] = [
	// ----------------------------------
	//         warehouse:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['warehouse'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Warehouse name',
	},

	// ----------------------------------
	//         warehouse:get/delete
	// ----------------------------------
	{
		displayName: 'Warehouse ID',
		name: 'warehouseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['warehouse'],
				operation: ['get', 'delete'],
			},
		},
		default: '',
		description: 'ID of the warehouse',
	},

	// ----------------------------------
	//         warehouse:update
	// ----------------------------------
	{
		displayName: 'Warehouse ID',
		name: 'warehouseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['warehouse'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'ID of the warehouse to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['warehouse'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Warehouse name',
			},
		],
	},
];

