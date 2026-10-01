// This file is auto-generated from the API Direct endpoint catalog.
// Do not edit by hand.
import {
	NodeConnectionTypes,
	type INodePropertyOptions,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { twitterDescription } from './resources/twitter';
import { facebookDescription } from './resources/facebook';
import { redditDescription } from './resources/reddit';
import { youtubeDescription } from './resources/youtube';
import { instagramDescription } from './resources/instagram';
import { threadsDescription } from './resources/threads';
import { truthsocialDescription } from './resources/truthsocial';
import { blueskyDescription } from './resources/bluesky';
import { tiktokDescription } from './resources/tiktok';
import { amazonDescription } from './resources/amazon';
import { trustpilotDescription } from './resources/trustpilot';
import { googleDescription } from './resources/google';

// Platform names, including brand names like Threads that read as plurals
const resourceOptions: INodePropertyOptions[] = [
	{ name: "Amazon", value: "amazon" },
	{ name: "Bluesky", value: "bluesky" },
	{ name: "Facebook", value: "facebook" },
	{ name: "Google", value: "google" },
	{ name: "Instagram", value: "instagram" },
	{ name: "Reddit", value: "reddit" },
	{ name: "Threads", value: "threads" },
	{ name: "TikTok", value: "tiktok" },
	{ name: "Trustpilot", value: "trustpilot" },
	{ name: "Truth Social", value: "truthsocial" },
	{ name: "Twitter", value: "twitter" },
	{ name: "YouTube", value: "youtube" },
];

export class Apidirect implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'API Direct',
		name: 'apidirect',
		icon: { light: 'file:apidirect.svg', dark: 'file:apidirect.dark.svg' },
		group: ['transform'],
		version: 1,
		// Readable subtitle, e.g. "Twitter: Search Posts" rather than "posts: twitter".
		// Operation values repeat across resources, so names are keyed by "resource.operation".
		subtitle:
			'={{ ({"amazon":"Amazon","bluesky":"Bluesky","facebook":"Facebook","google":"Google","instagram":"Instagram","reddit":"Reddit","threads":"Threads","tiktok":"TikTok","trustpilot":"Trustpilot","truthsocial":"Truth Social","twitter":"Twitter","youtube":"YouTube"})[$parameter["resource"]] + ": " + (({"twitter.posts":"Search Posts","twitter.users":"Search Users","twitter.trends":"Trends","twitter.tweetComments":"Tweet Comments","twitter.tweet":"Tweet Details","twitter.tweetQuotes":"Tweet Quotes","twitter.tweetRetweets":"Tweet Retweets","twitter.userFollowers":"User Followers","twitter.userFollowing":"User Following","twitter.user":"User Profile","twitter.userReplies":"User Replies","twitter.userTweets":"User Tweets","twitter.userVerifiedFollowers":"Verified Followers","facebook.groupDetails":"Group Details","facebook.groupPosts":"Group Posts","facebook.groupSearch":"Group Posts Search","facebook.pageDetails":"Page Details","facebook.pagePhotos":"Page Photos","facebook.pagePosts":"Page Posts","facebook.pageReels":"Page Reels","facebook.pageReviews":"Page Reviews","facebook.pageVideos":"Page Videos","facebook.postComments":"Post Comments","facebook.searchEvents":"Search Events","facebook.searchLocations":"Search Locations","facebook.searchPages":"Search Pages","facebook.searchPosts":"Search Posts","facebook.searchVideos":"Search Videos","reddit.comments":"Search Comments","reddit.posts":"Search Posts","reddit.users":"Search Users","youtube.channelDetails":"Channel Details","youtube.channels":"Search Channels","youtube.videos":"Search Videos","youtube.comments":"Video Comments","youtube.videoDetails":"Video Details","instagram.commentReplies":"Comment Replies","instagram.hashtagPosts":"Hashtag Posts","instagram.highlightStories":"Highlight Stories","instagram.postComments":"Post Comments","instagram.post":"Post Details","instagram.postLikes":"Post Likes","instagram.posts":"Search Posts","instagram.users":"Search Users","instagram.userFollowers":"User Followers","instagram.userFollowing":"User Following","instagram.userHighlights":"User Highlights","instagram.userPosts":"User Posts","instagram.user":"User Profile","instagram.userStories":"User Stories","threads.posts":"Search Posts","threads.users":"Search Users","threads.userPosts":"User Posts","threads.user":"User Profile","truthsocial.userPosts":"User Posts","bluesky.postComments":"Post Comments","bluesky.post":"Post Details","bluesky.postLikes":"Post Likes","bluesky.postQuotes":"Post Quotes","bluesky.postReposts":"Post Reposts","bluesky.posts":"Search Posts","bluesky.users":"Search Users","bluesky.userFollowers":"User Followers","bluesky.userFollowing":"User Following","bluesky.userLikes":"User Likes","bluesky.userPosts":"User Posts","bluesky.user":"User Profile","tiktok.users":"Search Users","tiktok.videos":"Search Videos","tiktok.user":"User Profile","tiktok.video":"Video Details","amazon.bestSellers":"Best Sellers","amazon.productDetails":"Product Details","amazon.products":"Product Search","amazon.sellerProducts":"Seller Products","amazon.sellerProfile":"Seller Profile","amazon.sellerReviews":"Seller Reviews","trustpilot.categoryCompanies":"Category Companies","trustpilot.category":"Category Details","trustpilot.categoryNewest":"Category Newest","trustpilot.categories":"Category Search","trustpilot.companyReviews":"Company Reviews","trustpilot.companies":"Company Search","trustpilot.user":"User Profile","google.aiMode":"AI Mode","google.forumPosts":"Forum Posts","google.newsArticles":"News Articles","google.placesDetails":"Place Details","google.placesPhotos":"Place Photos","google.placesReviews":"Place Reviews","google.placesSearch":"Places Search","google.webSearch":"Web Search"})[$parameter["resource"] + "." + $parameter["operation"]] || $parameter["operation"]) }}',
		description: 'Search and monitor social media, news, and the web via the API Direct social listening API',
		defaults: {
			name: 'API Direct',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'apidirectApi', required: true }],
		requestDefaults: {
			baseURL: 'https://apidirect.io/v1',
			headers: {
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: resourceOptions,
				default: 'twitter',
			},
			...twitterDescription,
			...facebookDescription,
			...redditDescription,
			...youtubeDescription,
			...instagramDescription,
			...threadsDescription,
			...truthsocialDescription,
			...blueskyDescription,
			...tiktokDescription,
			...amazonDescription,
			...trustpilotDescription,
			...googleDescription,
		],
	};
}
