import { INodeProperties } from 'n8n-workflow';

export const brandOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['brand'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new brand',
				action: 'Create a brand',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a brand',
				action: 'Delete a brand',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a brand',
				action: 'Get a brand',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many brands',
				action: 'Get many brands',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a brand',
				action: 'Update a brand',
			},
		],
		default: 'get',
	},
];

export const brandFields: INodeProperties[] = [
	// ----------------------------------
	//         brand:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['brand'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Brand name',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['brand'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'Text',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Brand description',
			},
			{
				displayName: 'Keywords',
				name: 'Keywords',
				type: 'string',
				default: '',
				description: 'Brand keywords for SEO',
			},
			{
				displayName: 'Is Active',
				name: 'Active',
				type: 'boolean',
				default: true,
				description: 'Whether the brand is active',
			},
		],
	},

	// ----------------------------------
	//         brand:get/delete
	// ----------------------------------
	{
		displayName: 'Brand ID',
		name: 'brandId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['brand'],
				operation: ['get', 'delete'],
			},
		},
		default: '',
		description: 'ID of the brand',
	},

	// ----------------------------------
	//         brand:update
	// ----------------------------------
	{
		displayName: 'Brand ID',
		name: 'brandId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['brand'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'ID of the brand to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['brand'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'Name',
				type: 'string',
				default: '',
				description: 'Brand name',
			},
			{
				displayName: 'Description',
				name: 'Text',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Brand description',
			},
			{
				displayName: 'Is Active',
				name: 'Active',
				type: 'boolean',
				default: true,
				description: 'Whether the brand is active',
			},
		],
	},
];

