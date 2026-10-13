// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const tiktokCommentRepliesFields: INodeProperties[] = [
	{
		displayName: "Comment ID",
		name: "commentId",
		type: "string",
		default: "",
		description: "Numeric ID of the comment, as returned by Video Comments",
		routing: {
			send: {
				type: "query",
				property: "comment_id",
			},
		},
		required: true,
		displayOptions: {
			show: {
				resource: ["tiktok"],
				operation: ["commentReplies"],
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
				operation: ["commentReplies"],
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
				description: "Number of pages to fetch, 1-1000 (default: 1). Each page returns up to 50 replies. Each page fetched is billed as one request.",
				routing: {
					send: {
						type: "query",
						property: "pages",
					},
				},
			},
			{
				displayName: "URL",
				name: "url",
				type: "string",
				default: "",
				description: "TikTok video URL, e.g. https://www.tiktok.com/@tiktok/video/7516594811734854943 (max 500 characters). Short links are accepted. Provide exactly one of URL or video_id.",
				routing: {
					send: {
						type: "query",
						property: "url",
					},
				},
			},
			{
				displayName: "Video ID",
				name: "videoId",
				type: "string",
				default: "",
				description: "Numeric TikTok video ID: the number at the end of a video URL. Provide exactly one of URL or video_id.",
				routing: {
					send: {
						type: "query",
						property: "video_id",
					},
				},
			},
		],
	},
];
