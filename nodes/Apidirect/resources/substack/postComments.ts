// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const substackPostCommentsFields: INodeProperties[] = [
	{
		displayName: "URL",
		name: "url",
		type: "string",
		default: "",
		description: "Post URL, e.g. https://www.lennysnewsletter.com/p/all-of-the-lenny-and-friends-summit (max 500 characters). Provide URL, post_id, or publication and slug. Provide exactly one of: URL.",
		routing: {
			send: {
				type: "query",
				property: "url",
			},
		},
		displayOptions: {
			show: {
				resource: ["substack"],
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
				resource: ["substack"],
				operation: ["postComments"],
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
				displayName: "Post ID",
				name: "postId",
				type: "string",
				default: "",
				description: "Numeric post ID, as returned in post_id. Provide URL, post_id, or publication and slug.",
				routing: {
					send: {
						type: "query",
						property: "post_id",
					},
				},
			},
			{
				displayName: "Publication",
				name: "publication",
				type: "string",
				default: "",
				description: "Publication subdomain, host or URL, used together with slug",
				routing: {
					send: {
						type: "query",
						property: "publication",
					},
				},
			},
			{
				displayName: "Slug",
				name: "slug",
				type: "string",
				default: "",
				description: "Post URL slug, e.g. all-of-the-lenny-and-friends-summit, used together with publication",
				routing: {
					send: {
						type: "query",
						property: "slug",
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
						name: "Oldest",
						value: "oldest",
					},
					{
						name: "Relevance",
						value: "relevance",
					},
				],
				default: "relevance",
				description: "Sort order: \"relevance\" (best first), \"most_recent\" or \"oldest\"",
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
