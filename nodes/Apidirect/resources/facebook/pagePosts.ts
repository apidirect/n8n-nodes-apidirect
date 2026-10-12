// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const facebookPagePostsFields: INodeProperties[] = [
	{
		displayName: "Page ID",
		name: "pageId",
		type: "string",
		default: "",
		description: "Facebook page ID (numeric)",
		routing: {
			send: {
				type: "query",
				property: "page_id",
			},
		},
		required: true,
		displayOptions: {
			show: {
				resource: ["facebook"],
				operation: ["pagePosts"],
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
				resource: ["facebook"],
				operation: ["pagePosts"],
			},
		},
		options: [
			{
				displayName: "End Date",
				name: "endDate",
				type: "string",
				default: "",
				description: "Only posts up to this date (YYYY-MM-DD)",
				routing: {
					send: {
						type: "query",
						property: "end_date",
					},
				},
			},
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
				description: "Number of pages to fetch (1-15, default 1). Billed per page. Each page fetched is billed as one request.",
				routing: {
					send: {
						type: "query",
						property: "pages",
					},
				},
			},
			{
				displayName: "Start Date",
				name: "startDate",
				type: "string",
				default: "",
				description: "Only posts from this date onward (YYYY-MM-DD)",
				routing: {
					send: {
						type: "query",
						property: "start_date",
					},
				},
			},
		],
	},
];
