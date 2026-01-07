import { INodeProperties } from 'n8n-workflow';

export const masterDataOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['masterData'],
			},
		},
		options: [
			{
				name: 'Create Document',
				value: 'createDocument',
				description: 'Create a document in Master Data',
				action: 'Create a document',
			},
			{
				name: 'Delete Document',
				value: 'deleteDocument',
				description: 'Delete a document from Master Data',
				action: 'Delete a document',
			},
			{
				name: 'Get Client by Email',
				value: 'getClientByEmail',
				description: 'Get client information by email',
				action: 'Get client by email',
			},
			{
				name: 'Get Document',
				value: 'getDocument',
				description: 'Get a document from Master Data',
				action: 'Get a document',
			},
			{
				name: 'Search Documents',
				value: 'searchDocuments',
				description: 'Search documents in Master Data',
				action: 'Search documents',
			},
			{
				name: 'Update Document',
				value: 'updateDocument',
				description: 'Update a document in Master Data',
				action: 'Update a document',
			},
		],
		default: 'getClientByEmail',
	},
];

export const masterDataFields: INodeProperties[] = [
	// ----------------------------------
	//         masterData:createDocument
	// ----------------------------------
	{
		displayName: 'Entity',
		name: 'entity',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['masterData'],
				operation: ['createDocument', 'getDocument', 'updateDocument', 'deleteDocument', 'searchDocuments'],
			},
		},
		options: [
			{
				name: 'Client (CL)',
				value: 'CL',
				description: 'Customer data entity',
			},
			{
				name: 'Address (AD)',
				value: 'AD',
				description: 'Address data entity',
			},
			{
				name: 'Custom',
				value: 'custom',
				description: 'Custom entity acronym',
			},
		],
		default: 'CL',
		description: 'Master Data entity to work with',
	},
	{
		displayName: 'Custom Entity',
		name: 'customEntity',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['masterData'],
				operation: ['createDocument', 'getDocument', 'updateDocument', 'deleteDocument', 'searchDocuments'],
				entity: ['custom'],
			},
		},
		default: '',
		placeholder: 'MY',
		description: 'Custom entity acronym',
	},
	{
		displayName: 'Document Data (JSON)',
		name: 'document',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['masterData'],
				operation: ['createDocument'],
			},
		},
		default: '{\n  "email": "customer@example.com",\n  "firstName": "John",\n  "lastName": "Doe"\n}',
		description: 'Document data as JSON object',
	},

	// ----------------------------------
	//         masterData:getDocument
	// ----------------------------------
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['masterData'],
				operation: ['getDocument', 'updateDocument', 'deleteDocument'],
			},
		},
		default: '',
		description: 'ID of the document to retrieve',
	},
	{
		displayName: 'Fields to Return',
		name: 'fields',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['masterData'],
				operation: ['getDocument', 'searchDocuments'],
			},
		},
		default: '',
		placeholder: 'email,firstName,lastName',
		description: 'Comma-separated list of fields to return (leave empty for all fields)',
	},

	// ----------------------------------
	//         masterData:updateDocument
	// ----------------------------------
	{
		displayName: 'Document Data (JSON)',
		name: 'document',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['masterData'],
				operation: ['updateDocument'],
			},
		},
		default: '{\n  "firstName": "Jane"\n}',
		description: 'Updated document data as JSON object',
	},

	// ----------------------------------
	//         masterData:searchDocuments
	// ----------------------------------
	{
		displayName: 'Search Options',
		name: 'searchOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['masterData'],
				operation: ['searchDocuments'],
			},
		},
		options: [
			{
				displayName: 'Where Clause',
				name: 'where',
				type: 'string',
				default: '',
				placeholder: 'email=test@example.com',
				description: 'Filter condition (e.g., email=test@example.com)',
			},
			{
				displayName: 'Limit',
				name: 'size',
				type: 'number',
				default: 10,
				description: 'Maximum number of results to return',
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
			},
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
			{
				displayName: 'Sort By',
				name: 'sort',
				type: 'string',
				default: '',
				placeholder: 'createdIn DESC',
				description: 'Sort field and direction (e.g., createdIn DESC)',
			},
		],
	},

	// ----------------------------------
	//         masterData:getClientByEmail
	// ----------------------------------
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['masterData'],
				operation: ['getClientByEmail'],
			},
		},
		default: '',
		placeholder: 'customer@example.com',
		description: 'Client email address',
	},
];

