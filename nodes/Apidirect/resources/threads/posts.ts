// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const threadsPostsFields: INodeProperties[] = [
	{
		displayName: "Query",
		name: "query",
		type: "string",
		default: "",
		description: "Search keyword (max 500 characters)",
		routing: {
			send: {
				type: "query",
				property: "query",
			},
		},
		required: true,
		displayOptions: {
			show: {
				resource: ["threads"],
				operation: ["posts"],
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
				operation: ["posts"],
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
				description: "Number of pages to fetch, 1-200 (default: 1). The first page returns about 20 posts and later pages about 10. Each page fetched is billed as one request.",
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
