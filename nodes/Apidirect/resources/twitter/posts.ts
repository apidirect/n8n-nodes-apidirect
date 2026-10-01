// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const twitterPostsFields: INodeProperties[] = [
	{
		displayName: "Query",
		name: "query",
		type: "string",
		default: "",
		description: "Search keyword (max 500 characters). Supports X search operators.",
		routing: {
			send: {
				type: "query",
				property: "query",
			},
		},
		required: true,
		displayOptions: {
			show: {
				resource: ["twitter"],
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
				resource: ["twitter"],
				operation: ["posts"],
			},
		},
		options: [
			{
				displayName: "End Date",
				name: "endDate",
				type: "string",
				default: "",
				description: "Only posts up to and including this date (YYYY-MM-DD, UTC). Not with posted_ago.",
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
				description: "Number of pages to fetch, 1-20 (default: 1). Each page fetched is billed as one request.",
				routing: {
					send: {
						type: "query",
						property: "pages",
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
						name: "1h",
						value: "1h",
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
				description: "Only posts from this period: \"1h\", \"24h\", \"7d\", \"30d\", or \"12m\" (default: all time). Works with both sort orders.",
				routing: {
					send: {
						type: "query",
						property: "posted_ago",
					},
				},
			},
			{
				displayName: "Sort By",
				name: "sortBy",
				type: "options",
				options: [
					{
						name: "Most Recent",
						value: "most_recent",
					},
					{
						name: "Relevance",
						value: "relevance",
					},
				],
				default: "most_recent",
				description: "Sort order: \"most_recent\" or \"relevance\"",
				routing: {
					send: {
						type: "query",
						property: "sort_by",
					},
				},
			},
			{
				displayName: "Start Date",
				name: "startDate",
				type: "string",
				default: "",
				description: "Only posts from this date onward (YYYY-MM-DD, UTC). Not with posted_ago.",
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
