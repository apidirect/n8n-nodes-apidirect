// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const tiktokUserLikesFields: INodeProperties[] = [
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
				operation: ["userLikes"],
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
				operation: ["userLikes"],
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
				operation: ["userLikes"],
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
				operation: ["userLikes"],
			},
		},
		options: [
			{
				displayName: "Get Sentiment",
				name: "getSentiment",
				type: "boolean",
				default: false,
				description: "Whether to add AI emotion analysis (dominant emotion, polarity, intensity) to each result. Adds $0.001 per page.",
				routing: {
					send: {
						type: "query",
						property: "get_sentiment",
					},
				},
			},
			{
				displayName: "Pages",
				name: "pages",
				type: "number",
				default: 1,
				description: "Number of pages to fetch, 1-1000 (default: 1). Each page returns up to 30 videos. Each page fetched is billed as one request.",
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
