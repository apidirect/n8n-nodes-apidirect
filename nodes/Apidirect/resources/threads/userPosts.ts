// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const threadsUserPostsFields: INodeProperties[] = [
	{
		displayName: "Username",
		name: "username",
		type: "string",
		default: "",
		description: "Threads username, with or without leading @ (max 100 characters)",
		routing: {
			send: {
				type: "query",
				property: "username",
			},
		},
		required: true,
		displayOptions: {
			show: {
				resource: ["threads"],
				operation: ["userPosts"],
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
				resource: ["threads"],
				operation: ["userPosts"],
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
				description: "Number of pages to fetch, 1-60 (default: 1). Each page returns up to about 35 posts. Each page fetched is billed as one request.",
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
