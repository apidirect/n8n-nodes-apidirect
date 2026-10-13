// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const tiktokMusicFields: INodeProperties[] = [
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
				operation: ["music"],
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
				operation: ["music"],
			},
		},
		options: [
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
		],
	},
];
