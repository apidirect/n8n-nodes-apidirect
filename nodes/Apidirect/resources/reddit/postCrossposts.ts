// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const redditPostCrosspostsFields: INodeProperties[] = [
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
				operation: ["postCrossposts"],
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
				operation: ["postCrossposts"],
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
				description: "Reddit post ID, e.g. 1wwv97o (a t3_ prefix is accepted). Provide exactly one of URL or post_id.",
				routing: {
					send: {
						type: "query",
						property: "post_id",
					},
				},
			},
		],
	},
];
