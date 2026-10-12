// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';
import { substackCategoryFeedFields } from './categoryFeed';
import { substackCategoryPublicationsFields } from './categoryPublications';
import { substackNoteFields } from './note';
import { substackPostCommentsFields } from './postComments';
import { substackPostFields } from './post';
import { substackPostLikesFields } from './postLikes';
import { substackPublicationFields } from './publication';
import { substackPublicationPostsFields } from './publicationPosts';
import { substackPublicationRecommendationsFields } from './publicationRecommendations';
import { substackNotesFields } from './notes';
import { substackPostsFields } from './posts';
import { substackPublicationsFields } from './publications';
import { substackUsersFields } from './users';
import { substackTrendingFields } from './trending';
import { substackUserActivityFields } from './userActivity';
import { substackUserPostsFields } from './userPosts';
import { substackUserFields } from './user';

export const substackDescription: INodeProperties[] = [
	{
		displayName: "Operation",
		name: "operation",
		type: "options",
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ["substack"],
			},
		},
		options: [
			{
				name: "Category Feed",
				value: "categoryFeed",
				action: "Get category feed",
				description: "Get a Substack category's feed: the posts and notes Substack shows for the topic, top, newest or posts only ($0.003 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/category/feed",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "items",
								},
							},
						],
					},
				},
			},
			{
				name: "Category Publications",
				value: "categoryPublications",
				action: "Get category publications",
				description: "Get a Substack category's leaderboard: the top publications ranked by Substack, each with its full details (subscriber badge, paid band, prices, author) and rank ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/category/publications",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "publications",
								},
							},
						],
					},
				},
			},
			{
				name: "Note Details",
				value: "note",
				action: "Get note details",
				description: "Get a Substack Note by URL or ID, with its replies ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/note",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "replies",
								},
							},
						],
					},
				},
			},
			{
				name: "Post Comments",
				value: "postComments",
				action: "Get post comments",
				description: "Get the full comment thread of a Substack post, nested ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/post/comments",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "comments",
								},
							},
						],
					},
				},
			},
			{
				name: "Post Details",
				value: "post",
				action: "Get post details",
				description: "Get a Substack post by URL, ID, or publication and slug ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/post",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "post",
								},
							},
						],
					},
				},
			},
			{
				name: "Post Likes",
				value: "postLikes",
				action: "Get post likes",
				description: "Get the people who liked a Substack post ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/post/likes",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "likes",
								},
							},
						],
					},
				},
			},
			{
				name: "Publication Details",
				value: "publication",
				action: "Get publication details",
				description: "Get a Substack publication by subdomain, custom domain, URL or ID ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/publication",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "publication",
								},
							},
						],
					},
				},
			},
			{
				name: "Publication Posts",
				value: "publicationPosts",
				action: "Get publication posts",
				description: "Get a publication's posts, newest first, top or most discussed, or search them by keyword ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/publication/posts",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "posts",
								},
							},
						],
					},
				},
			},
			{
				name: "Publication Recommendations",
				value: "publicationRecommendations",
				action: "Get publication recommendations",
				description: "Get the publications a Substack publication recommends to its readers, and the publications that recommend it ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/publication/recommendations",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "recommended_by",
								},
							},
						],
					},
				},
			},
			{
				name: "Search Notes",
				value: "notes",
				action: "Search notes",
				description: "Search Substack Notes by keyword ($0.003 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/notes",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "notes",
								},
							},
						],
					},
				},
			},
			{
				name: "Search Posts",
				value: "posts",
				action: "Search posts",
				description: "Search Substack posts by keyword across every publication ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/posts",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "posts",
								},
							},
						],
					},
				},
			},
			{
				name: "Search Publications",
				value: "publications",
				action: "Search publications",
				description: "Search Substack publications by name or keyword ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/publications",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "publications",
								},
							},
						],
					},
				},
			},
			{
				name: "Search Users",
				value: "users",
				action: "Search users",
				description: "Search Substack authors and publication profiles by name or keyword ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/users",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "users",
								},
							},
						],
					},
				},
			},
			{
				name: "Trending Posts",
				value: "trending",
				action: "Get trending posts",
				description: "Get the posts currently trending across all of Substack, as featured on its explore page ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/trending",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "posts",
								},
							},
						],
					},
				},
			},
			{
				name: "User Activity",
				value: "userActivity",
				action: "Get user activity",
				description: "Get an author's public activity feed: their Notes and the posts they publish or restack, newest first, or only their notes, posts, replies, restacks or likes ($0.003 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/user/activity",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "items",
								},
							},
						],
					},
				},
			},
			{
				name: "User Posts",
				value: "userPosts",
				action: "Get user posts",
				description: "Get an author's posts across all their publications, newest first ($0.003 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/user/posts",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "posts",
								},
							},
						],
					},
				},
			},
			{
				name: "User Profile",
				value: "user",
				action: "Get user profile",
				description: "Get a Substack author's full profile by handle, user ID or profile URL ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/substack/user",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "user",
								},
							},
						],
					},
				},
			},
		],
		default: "categoryFeed",
	},
	...substackCategoryFeedFields,
	...substackCategoryPublicationsFields,
	...substackNoteFields,
	...substackPostCommentsFields,
	...substackPostFields,
	...substackPostLikesFields,
	...substackPublicationFields,
	...substackPublicationPostsFields,
	...substackPublicationRecommendationsFields,
	...substackNotesFields,
	...substackPostsFields,
	...substackPublicationsFields,
	...substackUsersFields,
	...substackTrendingFields,
	...substackUserActivityFields,
	...substackUserPostsFields,
	...substackUserFields,
];
