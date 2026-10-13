// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const tiktokHashtagVideosFields: INodeProperties[] = [
	{
		displayName: "Name",
		name: "name",
		type: "string",
		default: "",
		description: "Hashtag name, with or without leading # (max 100 characters). Provide exactly one of name, hashtag_id, or URL. Provide exactly one of: Name, URL.",
		routing: {
			send: {
				type: "query",
				property: "name",
			},
		},
		displayOptions: {
			show: {
				resource: ["tiktok"],
				operation: ["hashtagVideos"],
			},
		},
	},
	{
		displayName: "URL",
		name: "url",
		type: "string",
		default: "",
		description: "TikTok hashtag URL, e.g. https://www.tiktok.com/tag/cooking (max 500 characters). Provide exactly one of name, hashtag_id, or URL. Provide exactly one of: Name, URL.",
		routing: {
			send: {
				type: "query",
				property: "url",
			},
		},
		displayOptions: {
			show: {
				resource: ["tiktok"],
				operation: ["hashtagVideos"],
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
				operation: ["hashtagVideos"],
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
				displayName: "Hashtag ID",
				name: "hashtagId",
				type: "string",
				default: "",
				description: "Numeric hashtag ID, as returned by Search Hashtags. Provide exactly one of name, hashtag_id, or URL.",
				routing: {
					send: {
						type: "query",
						property: "hashtag_id",
					},
				},
			},
			{
				displayName: "Pages",
				name: "pages",
				type: "number",
				default: 1,
				description: "Number of pages to fetch, 1-1000 (default: 1). Each page returns up to 20 videos. Each page fetched is billed as one request.",
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
