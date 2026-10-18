// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const redditTrendingFields: INodeProperties[] = [
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
				operation: ["trending"],
			},
		},
		options: [
			{
				displayName: "Country",
				name: "country",
				type: "options",
				options: [
					{
						name: "Ar",
						value: "AR",
					},
					{
						name: "Au",
						value: "AU",
					},
					{
						name: "Bg",
						value: "BG",
					},
					{
						name: "Ca",
						value: "CA",
					},
					{
						name: "Cl",
						value: "CL",
					},
					{
						name: "Co",
						value: "CO",
					},
					{
						name: "Cz",
						value: "CZ",
					},
					{
						name: "De",
						value: "DE",
					},
					{
						name: "Default",
						value: "",
					},
					{
						name: "Es",
						value: "ES",
					},
					{
						name: "Fi",
						value: "FI",
					},
					{
						name: "Fr",
						value: "FR",
					},
					{
						name: "Gb",
						value: "GB",
					},
					{
						name: "Gr",
						value: "GR",
					},
					{
						name: "Hr",
						value: "HR",
					},
					{
						name: "Hu",
						value: "HU",
					},
					{
						name: "Ie",
						value: "IE",
					},
					{
						name: "In",
						value: "IN",
					},
					{
						name: "Is",
						value: "IS",
					},
					{
						name: "It",
						value: "IT",
					},
					{
						name: "Jp",
						value: "JP",
					},
					{
						name: "Mx",
						value: "MX",
					},
					{
						name: "My",
						value: "MY",
					},
					{
						name: "Nz",
						value: "NZ",
					},
					{
						name: "Ph",
						value: "PH",
					},
					{
						name: "Pl",
						value: "PL",
					},
					{
						name: "Pr",
						value: "PR",
					},
					{
						name: "Pt",
						value: "PT",
					},
					{
						name: "Ro",
						value: "RO",
					},
					{
						name: "Rs",
						value: "RS",
					},
					{
						name: "Se",
						value: "SE",
					},
					{
						name: "Sg",
						value: "SG",
					},
					{
						name: "Th",
						value: "TH",
					},
					{
						name: "Tr",
						value: "TR",
					},
					{
						name: "Tw",
						value: "TW",
					},
					{
						name: "Us",
						value: "US",
					},
				],
				default: "",
				description: "One country's r/popular, as on reddit.com: AR, AU, BG, CA, CL, CO, CZ, DE, ES, FI, FR, GB, GR, HR, HU, IE, IN, IS, IT, JP, MX, MY, NZ, PH, PL, PR, PT, RO, RS, SE, SG, TH, TR, TW or US (default: worldwide). Only with feed=popular.",
				routing: {
					send: {
						type: "query",
						property: "country",
					},
				},
			},
			{
				displayName: "Feed",
				name: "feed",
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
						name: "Popular",
						value: "popular",
					},
				],
				default: "",
				description: "Popular (r/popular: the most active posts in public, non-NSFW communities) or all (r/all: every community) (default: popular)",
				routing: {
					send: {
						type: "query",
						property: "feed",
					},
				},
			},
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
				description: "Number of pages to fetch, 1-20 (default: 1). Each page returns up to 25 posts. Each page fetched is billed as one request.",
				routing: {
					send: {
						type: "query",
						property: "pages",
					},
				},
			},
			{
				displayName: "Posted Ago",
				name: "postedAgo",
				type: "options",
				options: [
					{
						name: "12m",
						value: "12m",
					},
					{
						name: "1h",
						value: "1h",
					},
					{
						name: "24h",
						value: "24h",
					},
					{
						name: "30d",
						value: "30d",
					},
					{
						name: "7d",
						value: "7d",
					},
					{
						name: "All",
						value: "all",
					},
					{
						name: "Default",
						value: "",
					},
				],
				default: "",
				description: "Time window for sort_by=top or sort_by=controversial: 1h, 24h, 7d, 30d, 12m, or all (default: 24h). Rejected with any other sort_by.",
				routing: {
					send: {
						type: "query",
						property: "posted_ago",
					},
				},
			},
			{
				displayName: "Sort By",
				name: "sortBy",
				type: "options",
				options: [
					{
						name: "Controversial",
						value: "controversial",
					},
					{
						name: "Hot",
						value: "hot",
					},
					{
						name: "Most Recent",
						value: "most_recent",
					},
					{
						name: "Rising",
						value: "rising",
					},
					{
						name: "Top",
						value: "top",
					},
				],
				default: "hot",
				description: "Sort order: hot, most_recent, top, rising, or controversial (default: hot)",
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
