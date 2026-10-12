// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const substackPublicationPostsFields: INodeProperties[] = [
	{
		displayName: "Publication",
		name: "publication",
		type: "string",
		default: "",
		description: "Publication subdomain (lenny), host (lenny.substack.com, www.lennysnewsletter.com) or any URL on it (max 500 characters)",
		routing: {
			send: {
				type: "query",
				property: "publication",
			},
		},
		required: true,
		displayOptions: {
			show: {
				resource: ["substack"],
				operation: ["publicationPosts"],
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
				operation: ["publicationPosts"],
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
				displayName: "Page",
				name: "page",
				type: "number",
				default: 1,
				description: "Page number (default: 1). 20 posts per page.",
				routing: {
					send: {
						type: "query",
						property: "page",
					},
				},
			},
			{
				displayName: "Podcasts Only",
				name: "podcastsOnly",
				type: "boolean",
				default: false,
				description: "Whether to return only podcast episodes",
				routing: {
					send: {
						type: "query",
						property: "podcasts_only",
					},
				},
			},
			{
				displayName: "Query",
				name: "query",
				type: "string",
				default: "",
				description: "Keyword to search the publication's posts for (max 500 characters)",
				routing: {
					send: {
						type: "query",
						property: "query",
					},
				},
			},
			{
				displayName: "Sort By",
				name: "sortBy",
				type: "options",
				options: [
					{
						name: "Discussions",
						value: "discussions",
					},
					{
						name: "Most Recent",
						value: "most_recent",
					},
					{
						name: "Top",
						value: "top",
					},
				],
				default: "most_recent",
				description: "Sort order: \"most_recent\" (newest first), \"top\" (all-time most popular first) or \"discussions\" (posts with comment activity)",
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
