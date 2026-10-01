# n8n-nodes-apidirect

This is an n8n community node. It lets you use [API Direct](https://apidirect.io) in your n8n workflows.

API Direct is a pay-as-you-go social listening API that searches real-time data across social media, news, and the web through a single unified interface — no subscriptions, you only pay for the requests you make.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. The npm package name is `n8n-nodes-apidirect`.

## Operations

One node, twelve resources, 92 operations:

| Resource | Operations |
|---|---|
| **Twitter/X** | Search Posts, Search Users, User Profile, User Tweets, User Followers, User Following, Verified Followers, User Replies, Tweet Details, Tweet Retweets, Tweet Quotes, Tweet Comments, Trends |
| **Facebook** | Page Details, Page Posts, Page Photos, Page Videos, Page Reels, Page Reviews, Group Details, Group Posts, Group Posts Search, Post Comments, Search Posts, Search Pages, Search Videos, Search Events, Search Locations |
| **Instagram** | Search Posts, Search Users, User Profile, User Posts, Post Details, User Followers, User Following, User Stories, User Highlights, Highlight Stories, Post Comments, Comment Replies, Post Likes, Hashtag Posts |
| **TikTok** | Search Videos, Search Users, User Profile, Video Details |
| **YouTube** | Search Videos, Search Channels, Channel Details, Video Details, Video Comments |
| **Reddit** | Search Posts, Search Comments, Search Users |
| **Threads** | Search Posts, Search Users, User Profile, User Posts |
| **Truth Social** | User Posts |
| **Bluesky** | Search Posts, Search Users, User Profile, User Posts, User Followers, User Following, User Likes, Post Details, Post Comments, Post Likes, Post Quotes, Post Reposts |
| **Amazon** | Product Search, Product Details, Seller Profile, Seller Reviews, Seller Products, Best Sellers |
| **Trustpilot** | Company Reviews, Company Search, Category Companies, Category Newest, Category Details, Category Search, User Profile |
| **Google** | Web Search, AI Mode, News Articles, Forum Posts, Places Search, Place Details, Place Reviews, Place Photos |

Most list operations also support an optional AI sentiment analysis field (`Get Sentiment`) that adds emotion, polarity, and intensity scores to each result.

## Credentials

1. Sign up at [apidirect.io](https://apidirect.io) — new accounts get $5 of free credit, plus 50 free requests per endpoint per month.
2. Create an API key at [apidirect.io/dashboard/keys](https://apidirect.io/dashboard/keys).
3. In n8n, create new **API Direct API** credentials and paste the key.

The credential test calls the cheapest endpoint (`/v1/time`, $0.001) to verify the key.

## Compatibility

Requires n8n 1.94.0 or later. Developed and tested against n8n 1.x (2026).

## Usage

- **Pagination**: list operations take a `Page` or `Pages` field instead of cursors. Where the API fetches multiple pages server-side in one call (`Pages`), each page is billed as one request — `Pages: 3` costs 3× the per-page price.
- **Pricing**: every operation's description shows its price ($0.001–$0.01 per request/page). There are no subscriptions or monthly minimums. See [pricing](https://apidirect.io/docs/pricing).
- **Dependent IDs**: some Facebook operations need IDs returned by others — e.g. `Page Details` returns the `page_id`, `delegate_page_id`, and `reels_page_id` used by the page posts/videos/reels operations, and `Search Locations` returns the `location_id` used to filter post/event searches.
- **AI Agent tool**: the node is marked usable as a tool, so it can be attached to n8n AI Agents.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [API Direct documentation](https://apidirect.io/docs/introduction)
- [Error codes](https://apidirect.io/docs/error-handling) · [Rate limits](https://apidirect.io/docs/rate-limits) · [Boolean search syntax](https://apidirect.io/docs/boolean-search)

## Version history

- **0.6.0** — Reddit Search Posts: new Posted Ago filter (past hour to past year). X Search Posts: new Posted Ago, Start Date and End Date filters.
- **0.5.0** — New Bluesky resource: Search Posts, Search Users, User Profile, User Posts, User Followers, User Following, User Likes, Post Details, Post Comments, Post Likes, Post Quotes, and Post Reposts. Instagram User Followers description updated to match the API.
- **0.4.0** — New Trustpilot resource: Company Reviews, Company Search, Category Companies, Category Newest, Category Details, Category Search, and User Profile. Page caps updated to match the API.
- **0.3.0** — Nine new Instagram operations: User Followers, User Following, User Stories, User Highlights, Highlight Stories, Post Comments, Comment Replies, Post Likes, Hashtag Posts.
- **0.2.0** — New Amazon resource: Product Search, Product Details, Seller Profile, Seller Reviews, Seller Products, and Best Sellers across 24 marketplaces.
- **0.1.3** — Codex metadata fixes requested by n8n review (fully-qualified node identifier, valid category names).
- **0.1.2** — Audit fixes: AI Mode now uses POST (supports full 12k-char prompts), Facebook sort options are dropdowns, clearer TikTok publish-time labels, neutral defaults for optional filters, corrected billing wording.
- **0.1.1** — Package-scanner compliance fix.
- **0.1.0** — Initial release: 9 resources, 58 operations, API-key credential with test, sentiment analysis fields, AI-agent-tool support.
