// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const substackUserFields: INodeProperties[] = [
	{
		displayName: "Username",
		name: "username",
		type: "string",
		default: "",
		description: "Substack handle, e.g. lenny, with or without a leading @ (max 100 characters). Provide one of username, user_id or URL. Provide exactly one of: Username, User ID, URL.",
		routing: {
			send: {
				type: "query",
				property: "username",
			},
		},
		displayOptions: {
			show: {
				resource: ["substack"],
				operation: ["user"],
			},
		},
	},
	{
		displayName: "User ID",
		name: "userId",
		type: "string",
		default: "",
		description: "Numeric Substack user ID, as returned in user_id. Provide one of username, user_id or URL. Provide exactly one of: Username, User ID, URL.",
		routing: {
			send: {
				type: "query",
				property: "user_id",
			},
		},
		displayOptions: {
			show: {
				resource: ["substack"],
				operation: ["user"],
			},
		},
	},
	{
		displayName: "URL",
		name: "url",
		type: "string",
		default: "",
		description: "Profile URL, e.g. https://substack.com/@lenny (max 500 characters). Provide one of username, user_id or URL. Provide exactly one of: Username, User ID, URL.",
		routing: {
			send: {
				type: "query",
				property: "url",
			},
		},
		displayOptions: {
			show: {
				resource: ["substack"],
				operation: ["user"],
			},
		},
	},
];
