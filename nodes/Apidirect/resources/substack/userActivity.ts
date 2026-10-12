// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const substackUserActivityFields: INodeProperties[] = [
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
				operation: ["userActivity"],
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
				operation: ["userActivity"],
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
				operation: ["userActivity"],
			},
		},
	},
	{
		displayName: "Additional Fields",
		name: "additionalFields",
		type: "collection",
		placeholder: "Add Field",
		default: {
		},
		displayOptions: {
			show: {
				resource: ["substack"],
				operation: ["userActivity"],
			},
		},
		options: [
			{
				displayName: "Pages",
				name: "pages",
				type: "number",
				default: 1,
				description: "Number of pages to fetch, 1-250 (default: 1). Each page returns 12 items; you are billed per page returned.",
				routing: {
					send: {
						type: "query",
						property: "pages",
					},
				},
			},
			{
				displayName: "Type",
				name: "type",
				type: "options",
				options: [
					{
						name: "Default",
						value: "",
					},
					{
						name: "Like",
						value: "like",
					},
					{
						name: "Note",
						value: "note",
					},
					{
						name: "Post",
						value: "post",
					},
					{
						name: "Reply",
						value: "reply",
					},
					{
						name: "Restack",
						value: "restack",
					},
				],
				default: "",
				description: "Only this kind of activity: \"note\", \"post\", \"reply\", \"restack\" or \"like\"",
				routing: {
					send: {
						type: "query",
						property: "type",
					},
				},
			},
		],
	},
];
