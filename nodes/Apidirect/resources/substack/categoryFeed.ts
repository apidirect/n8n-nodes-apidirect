// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const substackCategoryFeedFields: INodeProperties[] = [
	{
		displayName: "Category",
		name: "category",
		type: "string",
		default: "",
		description: "Category ID or slug, e.g. 4 or technology. See https://apidirect.io/docs/substack-category-IDs.",
		routing: {
			send: {
				type: "query",
				property: "category",
			},
		},
		required: true,
		displayOptions: {
			show: {
				resource: ["substack"],
				operation: ["categoryFeed"],
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
				operation: ["categoryFeed"],
			},
		},
		options: [
			{
				displayName: "Pages",
				name: "pages",
				type: "number",
				default: 1,
				description: "Number of pages to fetch, 1-250 (default: 1). Each page returns about 11 items; you are billed per page returned.",
				routing: {
					send: {
						type: "query",
						property: "pages",
					},
				},
			},
			{
				displayName: "Sort By",
				name: "sortBy",
				type: "options",
				options: [
					{
						name: "Most Recent",
						value: "most_recent",
					},
					{
						name: "Posts",
						value: "posts",
					},
					{
						name: "Top",
						value: "top",
					},
				],
				default: "top",
				description: "Sort order: \"top\", \"most_recent\" or \"posts\" (posts only, no notes)",
				routing: {
					send: {
						type: "query",
						property: "sort_by",
					},
				},
			},
		],
	},
];
