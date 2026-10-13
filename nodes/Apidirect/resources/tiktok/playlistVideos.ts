// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const tiktokPlaylistVideosFields: INodeProperties[] = [
	{
		displayName: "URL",
		name: "url",
		type: "string",
		default: "",
		description: "TikTok playlist URL, e.g. https://www.tiktok.com/@natgeo/playlist/Cinematic-7509464647364283178 (max 500 characters). Provide exactly one of URL or playlist_id. Provide exactly one of: URL.",
		routing: {
			send: {
				type: "query",
				property: "url",
			},
		},
		displayOptions: {
			show: {
				resource: ["tiktok"],
				operation: ["playlistVideos"],
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
				operation: ["playlistVideos"],
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
				description: "Number of pages to fetch, 1-1000 (default: 1). Each page returns up to 30 videos. Each page fetched is billed as one request.",
				routing: {
					send: {
						type: "query",
						property: "pages",
					},
				},
			},
			{
				displayName: "Playlist ID",
				name: "playlistId",
				type: "string",
				default: "",
				description: "Numeric playlist ID: the number at the end of a playlist URL. Provide exactly one of URL or playlist_id.",
				routing: {
					send: {
						type: "query",
						property: "playlist_id",
					},
				},
			},
		],
	},
];
