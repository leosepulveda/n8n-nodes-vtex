import { INodeProperties } from 'n8n-workflow';

export const couponOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
			},
		},
		options: [
			{
				name: 'Archive',
				value: 'archive',
				description: 'Archive a coupon',
				action: 'Archive a coupon',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new coupon',
				action: 'Create a coupon',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a coupon by code',
				action: 'Get a coupon',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many coupons',
				action: 'Get many coupons',
			},
		],
		default: 'get',
	},
];

export const couponFields: INodeProperties[] = [
	// ----------------------------------
	//         coupon:create
	// ----------------------------------
	{
		displayName: 'Coupon Code',
		name: 'couponCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Unique coupon code (e.g., WELCOME10, BLACKFRIDAY)',
		placeholder: 'COUPON2024',
	},
	{
		displayName: 'UTM Source',
		name: 'utmSource',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'UTM Source to link this coupon to a promotion. At least UTM Source or UTM Campaign is required.',
		placeholder: 'newsletter',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'UTM Campaign',
				name: 'utmCampaign',
				type: 'string',
				default: '',
				description: 'UTM Campaign to link this coupon to a promotion (optional if UTM Source is provided)',
				placeholder: 'blackfriday2024',
			},
			{
				displayName: 'Max Uses Per Customer',
				name: 'maxItemsPerClient',
				type: 'number',
				default: 1,
				description: 'Maximum number of times a customer can use this coupon',
				typeOptions: {
					minValue: 1,
				},
			},
			{
				displayName: 'Is Archived',
				name: 'isArchived',
				type: 'boolean',
				default: false,
				description: 'Whether the coupon should be created as archived',
			},
			{
				displayName: 'Expiration Interval Per Use',
				name: 'expirationIntervalPerUse',
				type: 'string',
				default: '00:00:00',
				description: 'Time interval (HH:MM:SS) before the coupon can be used again by the same customer',
				placeholder: '00:10:00',
			},
		],
	},

	// ----------------------------------
	//         coupon:get/archive
	// ----------------------------------
	{
		displayName: 'Coupon Code',
		name: 'couponCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['get', 'archive'],
			},
		},
		default: '',
		description: 'Coupon code to retrieve or archive',
	},
];

