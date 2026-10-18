// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const redditPostCommentsFields: INodeProperties[] = [
	{
		displayName: "URL",
		name: "url",
		type: "string",
		default: "",
		description: "Reddit post URL, e.g. https://www.reddit.com/r/Python/comments/1wwv97o/my_python_magic_is_gone/ or https://redd.it/1wwv97o (max 500 characters). Provide exactly one of URL or post_id. Provide exactly one of: URL.",
		routing: {
			send: {
				type: "query",
				property: "url",
			},
		},
		displayOptions: {
			show: {
				resource: ["reddit"],
				operation: ["postComments"],
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
				operation: ["postComments"],
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
				description: "Number of pages to fetch, 1-10 (default: 1). Each page returns up to 50 comments. Each page fetched is billed as one request.",
				routing: {
					send: {
						type: "query",
						property: "pages",
					},
				},
			},
			{
				displayName: "Post ID",
				name: "postId",
				type: "string",
				default: "",
				description: "Reddit post ID, e.g. 1wwv97o (a t3_ prefix is accepted). Provide exactly one of URL or post_id.",
				routing: {
					send: {
						type: "query",
						property: "post_id",
					},
				},
			},
			{
				displayName: "Sort By",
				name: "sortBy",
				type: "options",
				options: [
					{
						name: "Best",
						value: "best",
					},
					{
						name: "Controversial",
						value: "controversial",
					},
					{
						name: "Most Recent",
						value: "most_recent",
					},
					{
						name: "Oldest",
						value: "oldest",
					},
					{
						name: "Qa",
						value: "qa",
					},
					{
						name: "Top",
						value: "top",
					},
				],
				default: "top",
				description: "Sort order: top, best (Reddit's default order), most_recent, controversial, oldest, or qa (Q&A) (default: top)",
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
