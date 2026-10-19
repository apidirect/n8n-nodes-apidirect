// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';
import { threadsPostsFields } from './posts';
import { threadsUsersFields } from './users';
import { threadsUserPostsFields } from './userPosts';
import { threadsUserFields } from './user';

export const threadsDescription: INodeProperties[] = [
	{
		displayName: "Operation",
		name: "operation",
		type: "options",
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ["threads"],
			},
		},
		options: [
			{
				name: "Search Posts",
				value: "posts",
				action: "Search posts",
				description: "Search Threads posts by keyword ($0.006 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/threads/posts",
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
				name: "Search Users",
				value: "users",
				action: "Search users",
				description: "Search Threads users by keyword ($0.006 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/threads/users",
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
				name: "User Posts",
				value: "userPosts",
				action: "Get user posts",
				description: "Get a user's recent posts (their feed) on Threads by username ($0.006 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/threads/user/posts",
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
				description: "Get the full profile for a single Threads user by username ($0.006 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/threads/user",
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
		default: "posts",
	},
	...threadsPostsFields,
	...threadsUsersFields,
	...threadsUserPostsFields,
	...threadsUserFields,
];
