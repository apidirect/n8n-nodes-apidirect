// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const substackPostsFields: INodeProperties[] = [
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
				resource: ["substack"],
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
				resource: ["substack"],
				operation: ["posts"],
			},
		},
		options: [
			{
				displayName: "Get Sentiment",
				name: "getSentiment",
				type: "boolean",
				default: false,
				description: "Whether to add AI emotion analysis (dominant emotion, polarity, intensity) to each result. Adds $0.001 per request.",
				routing: {
					send: {
						type: "query",
						property: "get_sentiment",
					},
				},
			},
			{
				displayName: "Language",
				name: "language",
				type: "string",
				default: "",
				description: "Two-letter language code, e.g. es, to rank posts in that language first",
				routing: {
					send: {
						type: "query",
						property: "language",
					},
				},
			},
			{
				displayName: "Page",
				name: "page",
				type: "number",
				default: 1,
				description: "Page number, 1-101 (default: 1). 16-20 posts per page.",
				routing: {
					send: {
						type: "query",
						property: "page",
					},
				},
			},
			{
				displayName: "Posted Ago",
				name: "postedAgo",
				type: "options",
				options: [
					{
						name: "12m",
						value: "12m",
					},
					{
						name: "24h",
						value: "24h",
					},
					{
						name: "30d",
						value: "30d",
					},
					{
						name: "7d",
						value: "7d",
					},
					{
						name: "Default",
						value: "",
					},
				],
				default: "",
				description: "Only posts from this period: \"24h\", \"7d\", \"30d\", or \"12m\" (default: all time)",
				routing: {
					send: {
						type: "query",
						property: "posted_ago",
					},
				},
			},
		],
	},
];
