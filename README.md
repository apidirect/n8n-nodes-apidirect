<p align="center">
  <a href="https://apidirect.io"><img src="nodes/Apidirect/apidirect.svg" alt="API Direct" width="80" height="80"></a>
</p>

<h1 align="center">API Direct for n8n</h1>

<p align="center">
  The official n8n node for <a href="https://apidirect.io">API Direct</a>: search and monitor social media, news, and the web from your workflows.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/n8n-nodes-apidirect"><img src="https://img.shields.io/npm/v/n8n-nodes-apidirect?label=npm" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/n8n-nodes-apidirect"><img src="https://img.shields.io/npm/dm/n8n-nodes-apidirect" alt="npm downloads"></a>
  <a href="https://github.com/apidirect/n8n-nodes-apidirect/actions/workflows/ci.yml"><img src="https://github.com/apidirect/n8n-nodes-apidirect/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="LICENSE.md"><img src="https://img.shields.io/npm/l/n8n-nodes-apidirect" alt="License: MIT"></a>
</p>

Built and maintained by the API Direct team. API Direct is a pay-as-you-go API for real-time data from Twitter/X, Facebook, Instagram, TikTok, YouTube, Reddit, Threads, Truth Social, Bluesky, Amazon, Trustpilot, and Google, all through one key and one consistent interface. There are no subscriptions: you only pay for the requests you make.

**Contents:** [Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Usage](#usage) · [Compatibility](#compatibility) · [Support](#support) · [Changelog](#changelog)

## Installation

API Direct is a [verified community node](https://docs.n8n.io/integrations/community-nodes/installation/verified-install/). On n8n Cloud and current self-hosted versions, search for **API Direct** in the nodes panel and add it to your workflow; n8n installs it automatically.

On self-hosted n8n you can also install it manually: open **Settings → Community nodes**, choose **Install a community node**, and enter `n8n-nodes-apidirect`.

Full setup guide: [apidirect.io/docs/n8n](https://apidirect.io/docs/n8n).

## Credentials

1. Sign up at [apidirect.io](https://apidirect.io). New accounts get $5 of free credit, plus 50 free requests per endpoint per month.
2. Create an API key on the [API Keys](https://apidirect.io/dashboard/keys) page.
3. In n8n, create new **API Direct API** credentials and paste the key.

n8n tests the key automatically against the cheapest endpoint (`/v1/time`, $0.001). See [Authentication](https://apidirect.io/docs/authentication).

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

## Usage

- **Pagination**: list operations take a `Page` or `Pages` field instead of cursors. Where the API fetches multiple pages server-side in one call (`Pages`), each page is billed as one request, so `Pages: 3` costs three times the per-page price. See [Pagination](https://apidirect.io/docs/pagination).
- **Pricing**: every operation's description shows its price ($0.001 to $0.01 per request or page). There are no subscriptions or monthly minimums. See [Pricing](https://apidirect.io/docs/pricing).
- **Boolean search**: search operations pass your query to each platform's own search engine, so exact phrases, `OR`, exclusions and grouping work where the platform supports them. See [Boolean search](https://apidirect.io/docs/boolean-search).
- **Dependent IDs**: some Facebook operations need IDs returned by others. For example, `Page Details` returns the `page_id`, `delegate_page_id`, and `reels_page_id` used by the page posts, videos and reels operations, and `Search Locations` returns the `location_id` used to filter post and event searches.
- **AI Agents**: the node can be attached to an n8n AI Agent as a tool, so the agent can pick an operation and search any platform on demand.

## Compatibility

Requires n8n 1.94.0 or later. Developed and tested against n8n 1.x.

## Support

- **Documentation**: [apidirect.io/docs](https://apidirect.io/docs/introduction), including [error codes](https://apidirect.io/docs/error-handling) and [rate limits](https://apidirect.io/docs/rate-limits).
- **Help, bug reports and feature requests**: email [support@apidirect.io](mailto:support@apidirect.io). Please include the resource and operation you used and the error message.
- **Security issues**: email [support@apidirect.io](mailto:support@apidirect.io) rather than opening a public issue.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full release history.

## License

[MIT](LICENSE.md) © API Direct
