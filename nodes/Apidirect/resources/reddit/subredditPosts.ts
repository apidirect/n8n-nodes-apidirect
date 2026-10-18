// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const redditSubredditPostsFields: INodeProperties[] = [
	{
		displayName: "URL",
		name: "url",
		type: "string",
		default: "",
		description: "Subreddit URL, e.g. https://www.reddit.com/r/Python/ (max 500 characters). Provide exactly one of subreddit or URL. Provide exactly one of: URL.",
		routing: {
			send: {
				type: "query",
				property: "url",
			},
		},
		displayOptions: {
			show: {
				resource: ["reddit"],
				operation: ["subredditPosts"],
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
				resource: ["reddit"],
				operation: ["subredditPosts"],
			},
		},
		options: [
			{
				displayName: "Flair",
				name: "flair",
				type: "string",
				default: "",
				description: "Only posts with exactly this flair, e.g. Hiring (max 64 characters, not case-sensitive)",
				routing: {
					send: {
						type: "query",
						property: "flair",
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
				description: "Number of pages to fetch, 1-40 (default: 1). Each page returns up to 25 posts. Each page fetched is billed as one request.",
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
						name: "All",
						value: "all",
					},
					{
						name: "Default",
						value: "",
					},
				],
				default: "",
				description: "Time window for sort_by=top or sort_by=controversial: 1h, 24h, 7d, 30d, 12m, or all (default: 24h, Reddit's own default). Rejected with any other sort_by.",
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
						name: "Controversial",
						value: "controversial",
					},
					{
						name: "Hot",
						value: "hot",
					},
					{
						name: "Most Recent",
						value: "most_recent",
					},
					{
						name: "Rising",
						value: "rising",
					},
					{
						name: "Top",
						value: "top",
					},
				],
				default: "hot",
				description: "Sort order: hot, most_recent, top, rising, or controversial (default: hot)",
				routing: {
					send: {
						type: "query",
						property: "sort_by",
					},
				},
			},
			{
				displayName: "Subreddit",
				name: "subreddit",
				type: "string",
				default: "",
				description: "Subreddit name, with or without r/, e.g. Python. Provide exactly one of subreddit or URL.",
				routing: {
					send: {
						type: "query",
						property: "subreddit",
					},
				},
			},
		],
	},
];
