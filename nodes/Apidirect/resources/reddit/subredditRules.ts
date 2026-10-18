// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const redditSubredditRulesFields: INodeProperties[] = [
	{
		displayName: "URL",
		name: "url",
		type: "string",
		default: "",
		description: "Subreddit URL, e.g. https://www.reddit.com/r/Python/ (max 500 characters). Provide exactly one of subreddit or URL. Provide exactly one of: URL.",
		routing: {
			send: {
				type: "query",
				property: "url",
			},
		},
		displayOptions: {
			show: {
				resource: ["reddit"],
				operation: ["subredditRules"],
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
				operation: ["subredditRules"],
			},
		},
		options: [
			{
				displayName: "Subreddit",
				name: "subreddit",
				type: "string",
				default: "",
				description: "Subreddit name, with or without r/, e.g. Python. Provide exactly one of subreddit or URL.",
				routing: {
					send: {
						type: "query",
						property: "subreddit",
					},
				},
			},
		],
	},
];
