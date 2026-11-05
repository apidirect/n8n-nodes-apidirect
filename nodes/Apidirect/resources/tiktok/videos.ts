// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const tiktokVideosFields: INodeProperties[] = [
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
				resource: ["tiktok"],
				operation: ["videos"],
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
				operation: ["videos"],
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
				description: "Number of pages to fetch, 1-10 (default: 1). Each page fetched is billed as one request.",
				routing: {
					send: {
						type: "query",
						property: "pages",
					},
				},
			},
			{
				displayName: "Publish Time",
				name: "publishTime",
				type: "options",
				options: [
					{
						name: "All Time",
						value: 0,
					},
					{
						name: "Last 180 Days",
						value: 180,
					},
					{
						name: "Last 24 Hours",
						value: 1,
					},
					{
						name: "Last 30 Days",
						value: 30,
					},
					{
						name: "Last 7 Days",
						value: 7,
					},
					{
						name: "Last 90 Days",
						value: 90,
					},
				],
				default: 0,
				description: "Time filter: 0=ALL, 1=24h, 7=week, 30=month, 90=3months, 180=6months",
				routing: {
					send: {
						type: "query",
						property: "publish_time",
					},
				},
			},
			{
				displayName: "Region",
				name: "region",
				type: "string",
				default: "",
				description: "ISO 3166-1 alpha-2 country code (e.g. us, gb, jp; use gb for the UK, not uk)",
				routing: {
					send: {
						type: "query",
						property: "region",
					},
				},
			},
			{
				displayName: "Sort By",
				name: "sortBy",
				type: "options",
				options: [
					{
						name: "Most Liked",
						value: "most_liked",
					},
					{
						name: "Most Recent",
						value: "most_recent",
					},
					{
						name: "Relevance",
						value: "relevance",
					},
				],
				default: "relevance",
				description: "Sort order: \"relevance\", \"most_recent\", or \"most_liked\"",
				routing: {
					send: {
						type: "query",
						property: "sort_by",
					},
				},
			},
		],
	},
];
