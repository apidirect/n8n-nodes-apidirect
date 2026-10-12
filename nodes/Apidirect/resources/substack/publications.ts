// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const substackPublicationsFields: INodeProperties[] = [
	{
		displayName: "Query",
		name: "query",
		type: "string",
		default: "",
		description: "Search keyword (max 500 characters)",
		routing: {
			send: {
				type: "query",
				property: "query",
			},
		},
		required: true,
		displayOptions: {
			show: {
				resource: ["substack"],
				operation: ["publications"],
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
				operation: ["publications"],
			},
		},
		options: [
			{
				displayName: "Language",
				name: "language",
				type: "string",
				default: "",
				description: "Two-letter language code, e.g. es, to rank publications in that language first",
				routing: {
					send: {
						type: "query",
						property: "language",
					},
				},
			},
			{
				displayName: "Page",
				name: "page",
				type: "number",
				default: 1,
				description: "Page number, 1-4 (default: 1). 20 publications per page.",
				routing: {
					send: {
						type: "query",
						property: "page",
					},
				},
			},
		],
	},
];
