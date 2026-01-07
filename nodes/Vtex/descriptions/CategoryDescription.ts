import { INodeProperties } from 'n8n-workflow';

export const categoryOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['category'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new category',
				action: 'Create a category',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a category',
				action: 'Delete a category',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a category',
				action: 'Get a category',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many categories',
				action: 'Get many categories',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a category',
				action: 'Update a category',
			},
		],
		default: 'get',
	},
];

export const categoryFields: INodeProperties[] = [
	// ----------------------------------
	//         category:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Category name',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Parent Category ID',
				name: 'FatherCategoryId',
				type: 'number',
				default: null,
				description: 'Parent category ID (leave empty for root category)',
			},
			{
				displayName: 'Title',
				name: 'Title',
				type: 'string',
				default: '',
				description: 'Category title',
			},
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Category description',
			},
			{
				displayName: 'Is Active',
				name: 'IsActive',
				type: 'boolean',
				default: true,
				description: 'Whether the category is active',
			},
		],
	},

	// ----------------------------------
	//         category:get/delete
	// ----------------------------------
	{
		displayName: 'Category ID',
		name: 'categoryId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['get', 'delete'],
			},
		},
		default: '',
		description: 'ID of the category',
	},

	// ----------------------------------
	//         category:update
	// ----------------------------------
	{
		displayName: 'Category ID',
		name: 'categoryId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'ID of the category to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'Name',
				type: 'string',
				default: '',
				description: 'Category name',
			},
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Category description',
			},
			{
				displayName: 'Is Active',
				name: 'IsActive',
				type: 'boolean',
				default: true,
				description: 'Whether the category is active',
			},
		],
	},
];

