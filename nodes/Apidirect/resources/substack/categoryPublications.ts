// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const substackCategoryPublicationsFields: INodeProperties[] = [
	{
		displayName: "Category",
		name: "category",
		type: "string",
		default: "",
		description: "Category ID or slug, e.g. 4 or technology (bestsellers and podcasts for the site-wide boards). See https://apidirect.io/docs/substack-category-IDs.",
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
				operation: ["categoryPublications"],
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
				operation: ["categoryPublications"],
			},
		},
		options: [
			{
				displayName: "Page",
				name: "page",
				type: "number",
				default: 1,
				description: "Page number (default: 1), 25 publications per page. Up to 21 pages; rising 10; bestsellers and podcasts 4.",
				routing: {
					send: {
						type: "query",
						property: "page",
					},
				},
			},
			{
				displayName: "Tier",
				name: "tier",
				type: "options",
				options: [
					{
						name: "All",
						value: "all",
					},
					{
						name: "Default",
						value: "",
					},
					{
						name: "Paid",
						value: "paid",
					},
					{
						name: "Rising",
						value: "rising",
					},
				],
				default: "",
				description: "All, paid or rising (bestsellers: rising; podcasts: all or paid)",
				routing: {
					send: {
						type: "query",
						property: "tier",
					},
				},
			},
		],
	},
];
