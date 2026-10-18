// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const redditUserFields: INodeProperties[] = [
	{
		displayName: "Username",
		name: "username",
		type: "string",
		default: "",
		description: "Reddit username, with or without u/ (3-20 characters). Provide exactly one of username or URL. Provide exactly one of: Username, URL.",
		routing: {
			send: {
				type: "query",
				property: "username",
			},
		},
		displayOptions: {
			show: {
				resource: ["reddit"],
				operation: ["user"],
			},
		},
	},
	{
		displayName: "URL",
		name: "url",
		type: "string",
		default: "",
		description: "Reddit profile URL, e.g. https://www.reddit.com/user/spez (max 500 characters). Provide exactly one of username or URL. Provide exactly one of: Username, URL.",
		routing: {
			send: {
				type: "query",
				property: "url",
			},
		},
		displayOptions: {
			show: {
				resource: ["reddit"],
				operation: ["user"],
			},
		},
	},
];
