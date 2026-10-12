// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const amazonProductsFields: INodeProperties[] = [
	{
		displayName: "Query",
		name: "query",
		type: "string",
		default: "",
		description: "Search keyword or a product ASIN (max 500 characters)",
		routing: {
			send: {
				type: "query",
				property: "query",
			},
		},
		required: true,
		displayOptions: {
			show: {
				resource: ["amazon"],
				operation: ["products"],
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
				operation: ["products"],
			},
		},
		options: [
			{
				displayName: "Brand",
				name: "brand",
				type: "string",
				default: "",
				description: "Brand name(s), comma-separated for multiple",
				routing: {
					send: {
						type: "query",
						property: "brand",
					},
				},
			},
			{
				displayName: "Category",
				name: "category",
				type: "string",
				default: "",
				description: "Numeric Amazon category node ID(s) from an Amazon URL's ?node= parameter, comma-separated",
				routing: {
					send: {
						type: "query",
						property: "category",
					},
				},
			},
			{
				displayName: "Category ID",
				name: "categoryId",
				type: "string",
				default: "",
				description: "Category slug, e.g. electronics (see https://apidirect.io/docs/amazon-categories)",
				routing: {
					send: {
						type: "query",
						property: "category_id",
					},
				},
			},
			{
				displayName: "Country",
				name: "country",
				type: "string",
				default: "us",
				description: "Marketplace country code (default: \"us\"). One of: us, au, br, ca, cn, fr, de, in, it, mx, nl, sg, es, tr, ae, gb, jp, sa, pl, se, be, eg, za, ie.",
				routing: {
					send: {
						type: "query",
						property: "country",
					},
				},
			},
			{
				displayName: "Deals And Discounts",
				name: "dealsAndDiscounts",
				type: "options",
				options: [
					{
						name: "All Discounts",
						value: "all_discounts",
					},
					{
						name: "None",
						value: "none",
					},
					{
						name: "Todays Deals",
						value: "todays_deals",
					},
				],
				default: "none",
				description: "Deals filter",
				routing: {
					send: {
						type: "query",
						property: "deals_and_discounts",
					},
				},
			},
			{
				displayName: "Four Stars And Up",
				name: "fourStarsAndUp",
				type: "boolean",
				default: false,
				description: "Whether to only products rated 4 stars and up",
				routing: {
					send: {
						type: "query",
						property: "four_stars_and_up",
					},
				},
			},
			{
				displayName: "Is Prime",
				name: "isPrime",
				type: "boolean",
				default: false,
				description: "Whether to only products with Prime-eligible offers",
				routing: {
					send: {
						type: "query",
						property: "is_prime",
					},
				},
			},
			{
				displayName: "Max Price",
				name: "maxPrice",
				type: "number",
				default: 0,
				description: "Maximum price in the marketplace currency",
				routing: {
					send: {
						type: "query",
						property: "max_price",
					},
				},
			},
			{
				displayName: "Min Price",
				name: "minPrice",
				type: "number",
				default: 0,
				description: "Minimum price in the marketplace currency",
				routing: {
					send: {
						type: "query",
						property: "min_price",
					},
				},
			},
			{
				displayName: "Page",
				name: "page",
				type: "number",
				default: 1,
				description: "Page number, 1-20 (default: 1). Each page returns ~16 results.",
				routing: {
					send: {
						type: "query",
						property: "page",
					},
				},
			},
			{
				displayName: "Product Condition",
				name: "productCondition",
				type: "options",
				options: [
					{
						name: "All",
						value: "all",
					},
					{
						name: "Collectible",
						value: "collectible",
					},
					{
						name: "New",
						value: "new",
					},
					{
						name: "Renewed",
						value: "renewed",
					},
					{
						name: "Used",
						value: "used",
					},
				],
				default: "all",
				description: "Product condition filter",
				routing: {
					send: {
						type: "query",
						property: "product_condition",
					},
				},
			},
			{
				displayName: "Seller ID",
				name: "sellerId",
				type: "string",
				default: "",
				description: "Only products from specific seller ID(s), comma-separated",
				routing: {
					send: {
						type: "query",
						property: "seller_id",
					},
				},
			},
			{
				displayName: "Sort By",
				name: "sortBy",
				type: "options",
				options: [
					{
						name: "Best Sellers",
						value: "best_sellers",
					},
					{
						name: "Highest Price",
						value: "highest_price",
					},
					{
						name: "Lowest Price",
						value: "lowest_price",
					},
					{
						name: "Newest",
						value: "newest",
					},
					{
						name: "Relevance",
						value: "relevance",
					},
					{
						name: "Reviews",
						value: "reviews",
					},
				],
				default: "relevance",
				description: "Sort order",
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
