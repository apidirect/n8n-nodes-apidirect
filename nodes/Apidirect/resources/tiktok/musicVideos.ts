// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const tiktokMusicVideosFields: INodeProperties[] = [
	{
		displayName: "URL",
		name: "url",
		type: "string",
		default: "",
		description: "TikTok music URL, e.g. https://www.tiktok.com/music/Face-Off-7016547803243022337 (max 500 characters). Provide exactly one of URL or music_id. Provide exactly one of: URL.",
		routing: {
			send: {
				type: "query",
				property: "url",
			},
		},
		displayOptions: {
			show: {
				resource: ["tiktok"],
				operation: ["musicVideos"],
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
				operation: ["musicVideos"],
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
				displayName: "Music ID",
				name: "musicId",
				type: "string",
				default: "",
				description: "Numeric music ID: the number at the end of a music URL, also returned as music_id on every video. Provide exactly one of URL or music_id.",
				routing: {
					send: {
						type: "query",
						property: "music_id",
					},
				},
			},
			{
				displayName: "Pages",
				name: "pages",
				type: "number",
				default: 1,
				description: "Number of pages to fetch, 1-1000 (default: 1). Each page returns up to 12 videos. Each page fetched is billed as one request.",
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
