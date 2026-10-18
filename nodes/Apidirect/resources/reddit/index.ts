// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';
import { redditPostCommentsFields } from './postComments';
import { redditPostCrosspostsFields } from './postCrossposts';
import { redditPostFields } from './post';
import { redditCommentsFields } from './comments';
import { redditPostsFields } from './posts';
import { redditSubredditsFields } from './subreddits';
import { redditUsersFields } from './users';
import { redditSubredditFields } from './subreddit';
import { redditSubredditPostsFields } from './subredditPosts';
import { redditSubredditRulesFields } from './subredditRules';
import { redditTrendingFields } from './trending';
import { redditUserCommentsFields } from './userComments';
import { redditUserPostsFields } from './userPosts';
import { redditUserFields } from './user';

export const redditDescription: INodeProperties[] = [
	{
		displayName: "Operation",
		name: "operation",
		type: "options",
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ["reddit"],
			},
		},
		options: [
			{
				name: "Post Comments",
				value: "postComments",
				action: "Get post comments",
				description: "Get the comments on a Reddit post, replies included, by URL or post ID ($0.003 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/reddit/post/comments",
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
				name: "Post Crossposts",
				value: "postCrossposts",
				action: "Get post crossposts",
				description: "Get the other submissions of a Reddit post's link across Reddit: crossposts and reposts of the same URL, by post URL or ID ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/reddit/post/crossposts",
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
				name: "Post Details",
				value: "post",
				action: "Get post details",
				description: "Get one Reddit post by URL or post ID ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/reddit/post",
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
				name: "Search Comments",
				value: "comments",
				action: "Search comments",
				description: "Search Reddit comments by keyword, optionally in one subreddit ($0.003 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/reddit/comments",
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
				name: "Search Posts",
				value: "posts",
				action: "Search posts",
				description: "Search Reddit posts by keyword ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/reddit/posts",
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
				name: "Search Subreddits",
				value: "subreddits",
				action: "Search subreddits",
				description: "Search subreddits by keyword ($0.003 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/reddit/subreddits",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "subreddits",
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
				description: "Search Reddit users by keyword ($0.003 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/reddit/users",
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
				name: "Subreddit Details",
				value: "subreddit",
				action: "Get subreddit details",
				description: "Get a subreddit's details by name or URL ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/reddit/subreddit",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "subreddit",
								},
							},
						],
					},
				},
			},
			{
				name: "Subreddit Posts",
				value: "subredditPosts",
				action: "Get subreddit posts",
				description: "Get a subreddit's posts by name or URL ($0.003 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/reddit/subreddit/posts",
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
				name: "Subreddit Rules",
				value: "subredditRules",
				action: "Get subreddit rules",
				description: "Get a subreddit's rules by name or URL, in the order the subreddit lists them ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/reddit/subreddit/rules",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "rules",
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
				description: "Get the posts trending across Reddit right now, from r/popular (worldwide or one country's) or r/all ($0.003 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/reddit/trending",
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
				name: "User Comments",
				value: "userComments",
				action: "Get user comments",
				description: "Get a Reddit user's comments by username or profile URL ($0.003 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/reddit/user/comments",
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
				name: "User Posts",
				value: "userPosts",
				action: "Get user posts",
				description: "Get a Reddit user's submitted posts by username or profile URL ($0.003 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/reddit/user/posts",
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
				description: "Get a Reddit user's profile by username or profile URL ($0.003 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/reddit/user",
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
		default: "comments",
	},
	...redditPostCommentsFields,
	...redditPostCrosspostsFields,
	...redditPostFields,
	...redditCommentsFields,
	...redditPostsFields,
	...redditSubredditsFields,
	...redditUsersFields,
	...redditSubredditFields,
	...redditSubredditPostsFields,
	...redditSubredditRulesFields,
	...redditTrendingFields,
	...redditUserCommentsFields,
	...redditUserPostsFields,
	...redditUserFields,
];
