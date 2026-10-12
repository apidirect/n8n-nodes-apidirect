// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const substackPostLikesFields: INodeProperties[] = [
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
				operation: ["postLikes"],
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
				operation: ["postLikes"],
			},
		},
		options: [
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
		],
	},
];
