# Changelog

All notable changes to `n8n-nodes-apidirect` are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the package follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- The node and credential icons are redrawn from the API Direct "A" logo as clean vector outlines (straight strokes, sharp corners, 1 KB path instead of 11 KB), in light and dark variants.

## [0.6.1] - 2026-10-01

### Changed

- The package is now maintained under the API Direct GitHub organization ([apidirect/n8n-nodes-apidirect](https://github.com/apidirect/n8n-nodes-apidirect)), and package.json lists API Direct as author.
- The node and credential icons now use the API Direct logo.
- The node subtitle now shows readable names, such as "Twitter: Search Posts", instead of raw values like "posts: twitter".

## [0.6.0] - 2026-10-01

### Added

- Reddit Search Posts: Posted Ago filter (past hour to past year).
- X Search Posts: Posted Ago, Start Date and End Date filters.

## [0.5.0] - 2026-09-17

### Added

- Bluesky resource with 12 operations: Search Posts, Search Users, User Profile, User Posts, User Followers, User Following, User Likes, Post Details, Post Comments, Post Likes, Post Quotes and Post Reposts.

### Changed

- Instagram User Followers description updated to match the API.

## [0.4.0] - 2026-09-09

### Added

- Trustpilot resource with 7 operations: Company Reviews, Company Search, Category Companies, Category Newest, Category Details, Category Search and User Profile.

### Changed

- Page caps updated to match the API.

## [0.3.0] - 2026-09-03

### Added

- Nine Instagram operations: User Followers, User Following, User Stories, User Highlights, Highlight Stories, Post Comments, Comment Replies, Post Likes and Hashtag Posts.

## [0.2.0] - 2026-09-01

### Added

- Amazon resource with 6 operations across 24 marketplaces: Product Search, Product Details, Seller Profile, Seller Reviews, Seller Products and Best Sellers.

## [0.1.3] - 2026-08-18

### Fixed

- Codex metadata fixes requested by the n8n review: fully qualified node identifier and valid category names.

## [0.1.2] - 2026-08-14

### Changed

- AI Mode now uses POST, so it supports full 12,000-character prompts.
- Facebook sort options are dropdowns.
- Clearer TikTok publish-time labels.
- Neutral defaults for optional filters.

### Fixed

- Corrected billing wording in operation descriptions.

## [0.1.1] - 2026-08-14

### Fixed

- Resource options restructured for n8n community package scanner compliance.

## [0.1.0] - 2026-08-14

### Added

- Initial release: 9 resources and 58 operations, API key credential with a connection test, AI sentiment analysis fields, and support for use as an AI Agent tool.

[Unreleased]: https://www.npmjs.com/package/n8n-nodes-apidirect?activeTab=versions
[0.6.1]: https://www.npmjs.com/package/n8n-nodes-apidirect/v/0.6.1
[0.6.0]: https://www.npmjs.com/package/n8n-nodes-apidirect/v/0.6.0
[0.5.0]: https://www.npmjs.com/package/n8n-nodes-apidirect/v/0.5.0
[0.4.0]: https://www.npmjs.com/package/n8n-nodes-apidirect/v/0.4.0
[0.3.0]: https://www.npmjs.com/package/n8n-nodes-apidirect/v/0.3.0
[0.2.0]: https://www.npmjs.com/package/n8n-nodes-apidirect/v/0.2.0
[0.1.3]: https://www.npmjs.com/package/n8n-nodes-apidirect/v/0.1.3
[0.1.2]: https://www.npmjs.com/package/n8n-nodes-apidirect/v/0.1.2
[0.1.1]: https://www.npmjs.com/package/n8n-nodes-apidirect/v/0.1.1
[0.1.0]: https://www.npmjs.com/package/n8n-nodes-apidirect/v/0.1.0
