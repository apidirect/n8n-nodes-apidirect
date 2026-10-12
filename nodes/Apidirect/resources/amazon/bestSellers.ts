// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const amazonBestSellersFields: INodeProperties[] = [
	{
		displayName: "Category",
		name: "category",
		type: "string",
		default: "",
		description: "Category slug, e.g. electronics or software (see https://apidirect.io/docs/amazon-categories)",
		routing: {
			send: {
				type: "query",
				property: "category",
			},
		},
		required: true,
		displayOptions: {
			show: {
				resource: ["amazon"],
				operation: ["bestSellers"],
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
				resource: ["amazon"],
				operation: ["bestSellers"],
			},
		},
		options: [
			{
				displayName: "Country",
				name: "country",
				type: "string",
				default: "us",
				description: "Marketplace country code (default: \"us\")",
				routing: {
					send: {
						type: "query",
						property: "country",
					},
				},
			},
			{
				displayName: "Page",
				name: "page",
				type: "number",
				default: 1,
				description: "Page number, 1 or 2 (default: 1). Each page returns up to 50 items; rankings cover the top 100.",
				routing: {
					send: {
						type: "query",
						property: "page",
					},
				},
			},
			{
				displayName: "Type",
				name: "type",
				type: "options",
				options: [
					{
						name: "Best Sellers",
						value: "best_sellers",
					},
					{
						name: "Gift Ideas",
						value: "gift_ideas",
					},
					{
						name: "Most Wished For",
						value: "most_wished_for",
					},
					{
						name: "Movers And Shakers",
						value: "movers_and_shakers",
					},
					{
						name: "New Releases",
						value: "new_releases",
					},
				],
				default: "best_sellers",
				description: "Ranking type",
				routing: {
					send: {
						type: "query",
						property: "type",
					},
				},
			},
		],
	},
];
