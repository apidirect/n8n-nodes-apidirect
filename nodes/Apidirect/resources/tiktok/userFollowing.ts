// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const tiktokUserFollowingFields: INodeProperties[] = [
	{
		displayName: "Username",
		name: "username",
		type: "string",
		default: "",
		description: "TikTok username, with or without leading @ (max 100 characters). Provide exactly one of username, user_id, or URL. Provide exactly one of: Username, User ID, URL.",
		routing: {
			send: {
				type: "query",
				property: "username",
			},
		},
		displayOptions: {
			show: {
				resource: ["tiktok"],
				operation: ["userFollowing"],
			},
		},
	},
	{
		displayName: "User ID",
		name: "userId",
		type: "string",
		default: "",
		description: "Numeric TikTok user ID, as returned by Search Users or User Profile. Provide exactly one of username, user_id, or URL. Provide exactly one of: Username, User ID, URL.",
		routing: {
			send: {
				type: "query",
				property: "user_id",
			},
		},
		displayOptions: {
			show: {
				resource: ["tiktok"],
				operation: ["userFollowing"],
			},
		},
	},
	{
		displayName: "URL",
		name: "url",
		type: "string",
		default: "",
		description: "TikTok profile URL, e.g. https://www.tiktok.com/@tiktok (max 500 characters). Provide exactly one of username, user_id, or URL. Provide exactly one of: Username, User ID, URL.",
		routing: {
			send: {
				type: "query",
				property: "url",
			},
		},
		displayOptions: {
			show: {
				resource: ["tiktok"],
				operation: ["userFollowing"],
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
				resource: ["tiktok"],
				operation: ["userFollowing"],
			},
		},
		options: [
			{
				displayName: "Pages",
				name: "pages",
				type: "number",
				default: 1,
				description: "Number of pages to fetch, 1-1000 (default: 1). Each page returns up to 50 accounts. Each page fetched is billed as one request.",
				routing: {
					send: {
						type: "query",
						property: "pages",
					},
				},
			},
		],
	},
];
