import { INodeProperties } from 'n8n-workflow';

export const orderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['order'],
			},
		},
		options: [
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel an order',
				action: 'Cancel an order',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an order',
				action: 'Get an order',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many orders',
				action: 'Get many orders',
			},
			{
				name: 'Start Handling',
				value: 'startHandling',
				description: 'Start handling an order',
				action: 'Start handling an order',
			},
		],
		default: 'get',
	},
];

export const orderFields: INodeProperties[] = [
	// ----------------------------------
	//         order:get
	// ----------------------------------
	{
		displayName: 'Order ID',
		name: 'orderId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['get', 'cancel', 'startHandling'],
			},
		},
		default: '',
		description: 'ID of the order (e.g., v12345-01)',
	},

	// ----------------------------------
	//         order:cancel
	// ----------------------------------
	{
		displayName: 'Cancellation Reason',
		name: 'reason',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['cancel'],
			},
		},
		default: '',
		description: 'Reason for cancellation',
	},

	// ----------------------------------
	//         order:getMany
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['order'],
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
				resource: ['order'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 15,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'f_status',
				type: 'string',
				default: '',
				description: 'Filter by order status',
			},
			{
				displayName: 'Creation Date From',
				name: 'creationDateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter orders created after this date',
			},
			{
				displayName: 'Creation Date To',
				name: 'creationDateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter orders created before this date',
			},
		],
	},
];

