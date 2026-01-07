import { INodeProperties } from 'n8n-workflow';

export const promotionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['promotion'],
			},
		},
		options: [
			{
				name: 'Archive',
				value: 'archive',
				description: 'Archive a promotion',
				action: 'Archive a promotion',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new promotion',
				action: 'Create a promotion',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a promotion by ID',
				action: 'Get a promotion',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many promotions',
				action: 'Get many promotions',
			},
			{
				name: 'Unarchive',
				value: 'unarchive',
				description: 'Unarchive a promotion',
				action: 'Unarchive a promotion',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a promotion',
				action: 'Update a promotion',
			},
		],
		default: 'get',
	},
];

export const promotionFields: INodeProperties[] = [
	// ----------------------------------
	//         promotion:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Promotion name',
	},
	{
		displayName: 'Begin Date',
		name: 'beginDateUtc',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Start date and time (UTC)',
	},
	{
		displayName: 'End Date',
		name: 'endDateUtc',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'End date and time (UTC)',
	},
	{
		displayName: 'Discount Type',
		name: 'discountType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Percentage',
				value: 'percentage',
				description: 'Discount as percentage',
			},
			{
				name: 'Fixed Amount',
				value: 'nominal',
				description: 'Fixed amount discount',
			},
		],
		default: 'percentage',
		description: 'Type of discount to apply',
	},
	{
		displayName: 'Discount Value',
		name: 'discountValue',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'Discount value (percentage or amount depending on type)',
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
				resource: ['promotion'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Promotion description',
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether the promotion is active',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'Regular',
						value: 'regular',
					},
					{
						name: 'Combo',
						value: 'combo',
					},
					{
						name: 'Progressive',
						value: 'progressive',
					},
					{
						name: 'Buy and Win',
						value: 'buyAndWin',
					},
				],
				default: 'regular',
				description: 'Promotion type',
			},
			{
				displayName: 'UTM Source',
				name: 'utmSource',
				type: 'string',
				default: '',
				description: 'UTM source for tracking',
			},
			{
				displayName: 'UTM Campaign',
				name: 'utmCampaign',
				type: 'string',
				default: '',
				description: 'UTM campaign for tracking',
			},
		],
	},

	// ----------------------------------
	//         promotion:get/archive/unarchive
	// ----------------------------------
	{
		displayName: 'Promotion ID',
		name: 'promotionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['get', 'archive', 'unarchive'],
			},
		},
		default: '',
		description: 'ID of the promotion',
	},

	// ----------------------------------
	//         promotion:getMany
	// ----------------------------------
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Include Archived',
				name: 'archived',
				type: 'boolean',
				default: false,
				description: 'Whether to include archived promotions',
			},
		],
	},

	// ----------------------------------
	//         promotion:update
	// ----------------------------------
	{
		displayName: 'Promotion ID',
		name: 'promotionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'ID of the promotion to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Promotion name',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Promotion description',
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether the promotion is active',
			},
		],
	},
];

