// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const tiktokVideoFields: INodeProperties[] = [
	{
		displayName: "URL",
		name: "url",
		type: "string",
		default: "",
		description: "TikTok video URL, e.g. https://www.tiktok.com/@tiktok/video/7516594811734854943 (max 500 characters). Provide exactly one of: URL, Video ID.",
		routing: {
			send: {
				type: "query",
				property: "url",
			},
		},
		displayOptions: {
			show: {
				resource: ["tiktok"],
				operation: ["video"],
			},
		},
	},
	{
		displayName: "Video ID",
		name: "videoId",
		type: "string",
		default: "",
		description: "Numeric TikTok video ID: the number at the end of a video URL, e.g. 7516594811734854943. Provide exactly one of: URL, Video ID.",
		routing: {
			send: {
				type: "query",
				property: "video_id",
			},
		},
		displayOptions: {
			show: {
				resource: ["tiktok"],
				operation: ["video"],
			},
		},
	},
];
