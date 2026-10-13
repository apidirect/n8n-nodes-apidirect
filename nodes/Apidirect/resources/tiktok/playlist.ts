// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const tiktokPlaylistFields: INodeProperties[] = [
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
				operation: ["playlist"],
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
				operation: ["playlist"],
			},
		},
		options: [
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
