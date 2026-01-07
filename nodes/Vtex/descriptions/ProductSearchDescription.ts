import { INodeProperties } from 'n8n-workflow';

export const productSearchOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['productSearch'],
			},
		},
		options: [
			{
				name: 'Get by Identifier',
				value: 'getByIdentifier',
				description: 'Get product by ID, EAN, Reference ID, or SKU ID',
				action: 'Get product by identifier',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search products with advanced filters',
				action: 'Search products',
			},
		],
		default: 'search',
	},
];

export const productSearchFields: INodeProperties[] = [
	// ----------------------------------
	//         productSearch:search
	// ----------------------------------
	{
		displayName: 'Search Options',
		name: 'searchOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['productSearch'],
				operation: ['search'],
			},
		},
		options: [
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Search query string',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Category name or path',
			},
			{
				displayName: 'Brand',
				name: 'brand',
				type: 'string',
				default: '',
				description: 'Brand name',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'options',
				options: [
					{
						name: 'Top Sales (Desc)',
						value: 'OrderByTopSaleDESC',
					},
					{
						name: 'Release Date (Desc)',
						value: 'OrderByReleaseDateDESC',
					},
					{
						name: 'Best Discount (Desc)',
						value: 'OrderByBestDiscountDESC',
					},
					{
						name: 'Price (Desc)',
						value: 'OrderByPriceDESC',
					},
					{
						name: 'Price (Asc)',
						value: 'OrderByPriceASC',
					},
					{
						name: 'Name (Asc)',
						value: 'OrderByNameASC',
					},
					{
						name: 'Name (Desc)',
						value: 'OrderByNameDESC',
					},
					{
						name: 'Score (Desc)',
						value: 'OrderByScoreDESC',
					},
				],
				default: 'OrderByTopSaleDESC',
				description: 'Sort order for results',
			},
			{
				displayName: 'From',
				name: 'from',
				type: 'number',
				default: 0,
				description: 'Starting index for pagination',
				typeOptions: {
					minValue: 0,
				},
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'number',
				default: 9,
				description: 'Ending index for pagination (max 50)',
				typeOptions: {
					minValue: 0,
					maxValue: 50,
				},
			},
			{
				displayName: 'Filter Query (fq)',
				name: 'fq',
				type: 'string',
				default: '',
				placeholder: 'spec_fct_1:value',
				description: 'Advanced filter query',
			},
		],
	},

	// ----------------------------------
	//         productSearch:getByIdentifier
	// ----------------------------------
	{
		displayName: 'Identifier Type',
		name: 'field',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['productSearch'],
				operation: ['getByIdentifier'],
			},
		},
		options: [
			{
				name: 'Product ID',
				value: 'id',
				description: 'Search by product ID',
			},
			{
				name: 'EAN',
				value: 'ean',
				description: 'Search by EAN (barcode)',
			},
			{
				name: 'Reference ID',
				value: 'reference',
				description: 'Search by reference ID',
			},
			{
				name: 'SKU ID',
				value: 'sku',
				description: 'Search by SKU ID',
			},
		],
		default: 'id',
		description: 'Type of identifier to search by',
	},
	{
		displayName: 'Identifier Value',
		name: 'value',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['productSearch'],
				operation: ['getByIdentifier'],
			},
		},
		default: '',
		description: 'Value of the identifier',
		placeholder: '12345',
	},
];

