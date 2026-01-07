import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class VtexApi implements ICredentialType {
	name = 'vtexApi';
	displayName = 'VTEX API';
	documentationUrl = 'https://developers.vtex.com/docs/api-reference';
	properties: INodeProperties[] = [
		{
			displayName: 'Account Name',
			name: 'accountName',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'mystore',
			description: 'Your VTEX account name (without .vtexcommercestable.com.br)',
		},
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'string',
			default: 'vtexcommercestable',
			required: true,
			description: 'VTEX environment (usually vtexcommercestable)',
		},
		{
			displayName: 'App Key',
			name: 'appKey',
			type: 'string',
			default: '',
			required: true,
			typeOptions: {
				password: false,
			},
			description: 'Your VTEX App Key from Account Settings → Security → Application Keys',
		},
		{
			displayName: 'App Token',
			name: 'appToken',
			type: 'string',
			default: '',
			required: true,
			typeOptions: {
				password: true,
			},
			description: 'Your VTEX App Token from Account Settings → Security → Application Keys',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-VTEX-API-AppKey': '={{$credentials.appKey}}',
				'X-VTEX-API-AppToken': '={{$credentials.appToken}}',
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '=https://{{$credentials.accountName}}.{{$credentials.environment}}.com.br',
			url: '/api/catalog_system/pvt/brand/list',
			method: 'GET',
		},
	};
}

