// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import type { INodeProperties } from 'n8n-workflow';
import { tiktokCommentRepliesFields } from './commentReplies';
import { tiktokHashtagFields } from './hashtag';
import { tiktokHashtagVideosFields } from './hashtagVideos';
import { tiktokMusicFields } from './music';
import { tiktokMusicVideosFields } from './musicVideos';
import { tiktokPlaylistFields } from './playlist';
import { tiktokPlaylistVideosFields } from './playlistVideos';
import { tiktokHashtagsFields } from './hashtags';
import { tiktokUsersFields } from './users';
import { tiktokVideosFields } from './videos';
import { tiktokUserFollowersFields } from './userFollowers';
import { tiktokUserFollowingFields } from './userFollowing';
import { tiktokUserLikesFields } from './userLikes';
import { tiktokUserFields } from './user';
import { tiktokUserStoriesFields } from './userStories';
import { tiktokUserVideosFields } from './userVideos';
import { tiktokVideoCommentsFields } from './videoComments';
import { tiktokVideoFields } from './video';

export const tiktokDescription: INodeProperties[] = [
	{
		displayName: "Operation",
		name: "operation",
		type: "options",
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ["tiktok"],
			},
		},
		options: [
			{
				name: "Comment Replies",
				value: "commentReplies",
				action: "Get comment replies",
				description: "Get the replies to one comment (its thread) by video URL or numeric video ID plus the comment ID ($0.006 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/comment/replies",
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
				name: "Hashtag Details",
				value: "hashtag",
				action: "Get hashtag details",
				description: "Get a hashtag's details by name, numeric hashtag ID, or hashtag URL ($0.006 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/hashtag",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "hashtag",
								},
							},
						],
					},
				},
			},
			{
				name: "Hashtag Videos",
				value: "hashtagVideos",
				action: "Get hashtag videos",
				description: "Get the videos under a hashtag by name, numeric hashtag ID, or hashtag URL ($0.006 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/hashtag/videos",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "videos",
								},
							},
						],
					},
				},
			},
			{
				name: "Music Details",
				value: "music",
				action: "Get music details",
				description: "Get a sound's details by music URL or numeric music ID ($0.006 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/music",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "music",
								},
							},
						],
					},
				},
			},
			{
				name: "Music Videos",
				value: "musicVideos",
				action: "Get music videos",
				description: "Get the videos using a sound by music URL or numeric music ID ($0.006 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/music/videos",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "videos",
								},
							},
						],
					},
				},
			},
			{
				name: "Playlist Details",
				value: "playlist",
				action: "Get playlist details",
				description: "Get a playlist's details by playlist URL or numeric playlist ID ($0.006 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/playlist",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "playlist",
								},
							},
						],
					},
				},
			},
			{
				name: "Playlist Videos",
				value: "playlistVideos",
				action: "Get playlist videos",
				description: "Get a playlist's videos in playlist order by playlist URL or numeric playlist ID ($0.006 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/playlist/videos",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "videos",
								},
							},
						],
					},
				},
			},
			{
				name: "Search Hashtags",
				value: "hashtags",
				action: "Search hashtags",
				description: "Search TikTok hashtags by keyword ($0.006 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/hashtags",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "hashtags",
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
				description: "Search TikTok users by keyword ($0.006 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/users",
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
				name: "Search Videos",
				value: "videos",
				action: "Search videos",
				description: "Search TikTok videos by keyword ($0.006 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/videos",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "videos",
								},
							},
						],
					},
				},
			},
			{
				name: "User Followers",
				value: "userFollowers",
				action: "Get user followers",
				description: "Get a user's followers, newest first, by username, numeric user ID, or profile URL ($0.006 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/user/followers",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "followers",
								},
							},
						],
					},
				},
			},
			{
				name: "User Following",
				value: "userFollowing",
				action: "Get user following",
				description: "Get the accounts a user follows, by username, numeric user ID, or profile URL ($0.006 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/user/following",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "following",
								},
							},
						],
					},
				},
			},
			{
				name: "User Likes",
				value: "userLikes",
				action: "Get user likes",
				description: "Get the videos a user has liked, by username, numeric user ID, or profile URL ($0.006 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/user/likes",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "videos",
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
				description: "Get the full profile for a single TikTok user by username, user ID, or profile URL ($0.006 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/user",
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
			{
				name: "User Stories",
				value: "userStories",
				action: "Get user stories",
				description: "Get a user's currently live stories (the 24-hour posts shown on their profile) by username, numeric user ID, or profile URL ($0.006 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/user/stories",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "stories",
								},
							},
						],
					},
				},
			},
			{
				name: "User Videos",
				value: "userVideos",
				action: "Get user videos",
				description: "Get a user's videos, newest first, by username, numeric user ID, or profile URL ($0.006 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/user/videos",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "videos",
								},
							},
						],
					},
				},
			},
			{
				name: "Video Comments",
				value: "videoComments",
				action: "Get video comments",
				description: "Get the top-level comments on a video, in TikTok's default order, by video URL or numeric video ID ($0.006 per page)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/video/comments",
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
				name: "Video Details",
				value: "video",
				action: "Get video details",
				description: "Get full details for a single TikTok video by URL or video ID ($0.006 per request)",
				routing: {
					request: {
						method: "GET",
						url: "/tiktok/video",
					},
					output: {
						postReceive: [
							{
								type: "rootProperty",
								properties: {
									property: "video",
								},
							},
						],
					},
				},
			},
		],
		default: "commentReplies",
	},
	...tiktokCommentRepliesFields,
	...tiktokHashtagFields,
	...tiktokHashtagVideosFields,
	...tiktokMusicFields,
	...tiktokMusicVideosFields,
	...tiktokPlaylistFields,
	...tiktokPlaylistVideosFields,
	...tiktokHashtagsFields,
	...tiktokUsersFields,
	...tiktokVideosFields,
	...tiktokUserFollowersFields,
	...tiktokUserFollowingFields,
	...tiktokUserLikesFields,
	...tiktokUserFields,
	...tiktokUserStoriesFields,
	...tiktokUserVideosFields,
	...tiktokVideoCommentsFields,
	...tiktokVideoFields,
];
