// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';

export const substackPublicationRecommendationsFields: INodeProperties[] = [
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
				operation: ["publicationRecommendations"],
			},
		},
		options: [
			{
				displayName: "Publication",
				name: "publication",
				type: "string",
				default: "",
				description: "Publication subdomain (lenny), host (lenny.substack.com, www.lennysnewsletter.com) or any URL on it (max 500 characters). Provide either publication or publication_id.",
				routing: {
					send: {
						type: "query",
						property: "publication",
					},
				},
			},
			{
				displayName: "Publication ID",
				name: "publicationId",
				type: "string",
				default: "",
				description: "Numeric publication ID, as returned in publication_id. Provide either publication or publication_id.",
				routing: {
					send: {
						type: "query",
						property: "publication_id",
					},
				},
			},
		],
	},
];
