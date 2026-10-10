<p align="center">
  <a href="https://apidirect.io?utm_source=google-sheets"><img src="marketplace/icons/icon-128.png" alt="API Direct" width="80" height="80"></a>
</p>

<h1 align="center">API Direct for Google Sheets</h1>

<p align="center">
  Real-time data from LinkedIn, X/Twitter, Reddit, YouTube, Instagram, TikTok, Facebook, Threads, Bluesky, Truth Social, Amazon, Trustpilot and Google (web search, AI Mode, news, forums, Maps) in your spreadsheet, through one API key.
</p>

<p align="center">
  <a href="https://github.com/apidirect/sheets-addon/actions/workflows/ci.yml"><img src="https://github.com/apidirect/sheets-addon/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="License: MIT"></a>
</p>

Built and maintained by the [API Direct](https://apidirect.io?utm_source=google-sheets) team. API Direct is a pay-as-you-go API: no subscription, you pay per request, and every endpoint has a free monthly tier.

**Contents:** [Install](#install) · [Set your API key](#set-your-api-key) · [Custom functions](#custom-functions) · [Sidebar](#sidebar) · [Scheduled refreshes](#scheduled-refreshes) · [Endpoints](#endpoints) · [Permissions](#permissions) · [Limits](#limits-worth-knowing) · [Development](#development) · [Support](#support)

## Install

**From the Google Workspace Marketplace** (once the listing is approved): open a spreadsheet, choose **Extensions → Add-ons → Get add-ons**, search for **API Direct** and click **Install**. The add-on then appears under **Extensions → API Direct**.

**From source**, for development or a private copy:

1. `npm install` (installs [clasp](https://github.com/google/clasp)), then `npx clasp login`.
2. Enable the Apps Script API at <https://script.google.com/home/usersettings>.
3. Create a container-bound script in a spreadsheet (**Extensions → Apps Script**), copy its script ID from **Project Settings**, and put it in `.clasp.json` (see `.clasp.json.example`).
4. `npm run push`, reload the spreadsheet, and the **API Direct** menu appears under **Extensions**.

## Set your API key

1. Sign up at [apidirect.io](https://apidirect.io/signup?utm_source=google-sheets). New accounts get $5 of free credit plus 50 free requests per endpoint per month (20 for the three Google Places endpoints).
2. Copy a key from the [API Keys](https://apidirect.io/dashboard/keys?utm_source=google-sheets) page (it starts with `ak_live_`).
3. In the spreadsheet, open **Extensions → API Direct → Set API key**, paste it and click **Save and test**.

The key is stored in your own Google account's add-on settings ([PropertiesService user properties](https://developers.google.com/apps-script/guides/properties)), never in the spreadsheet, so sharing the sheet never shares the key.

## Custom functions

Type a formula, get a table. Results spill into the cells below and to the right, with a header row.

```
=APIDIRECT_SEARCH("twitter", "Acme OR @acme", 50)
=APIDIRECT_SEARCH("linkedin", "series A", 20, "author,title,likes,url", "sort_by=most_recent&posted_ago=7d")
=APIDIRECT_SEARCH("linkedin jobs", "data engineer", , , "job_type=full_time")
=APIDIRECT_SEARCH("reddit comments", "best CRM", 100, "author,date,snippet,url")
=APIDIRECT_SEARCH("news", "Acme Corp", , "title,source,published_datetime_utc,url", "time_published=7d")
=APIDIRECT("twitter/user", "username=nasa", , "followers_count")
=APIDIRECT("youtube/comments", "url=https://www.youtube.com/watch?v=dQw4w9WgXcQ&pages=2", 200)
=APIDIRECT("linkedin/company", "url=https://www.linkedin.com/company/anthropic", , "name,employees,followers,website")
=APIDIRECT_AI("Which CRM suits a 10-person startup?")
=APIDIRECT_ENDPOINTS("linkedin")
=APIDIRECT_FIELDS("reddit")
```

| Function | What it does |
|---|---|
| `APIDIRECT_SEARCH(platform, query, [max_results], [fields], [options])` | Searches a platform. `platform` is `twitter`, `facebook`, `instagram`, `tiktok`, `youtube`, `reddit`, `threads`, `bluesky`, `linkedin`, `amazon`, `trustpilot`, `news`, `web`, `forums` or `places`, or a variant such as `linkedin jobs`, `linkedin companies`, `youtube channels`, `reddit comments`, `twitter users`, `facebook pages`. |
| `APIDIRECT(endpoint, [params], [max_results], [fields])` | Calls any endpoint, for example `twitter/user/tweets` or `/v1/places/reviews`. Asking for one field of a single-result endpoint returns just that value, handy for `=APIDIRECT("youtube/channel","name=mkbhd",,"subscriber_count")`. |
| `APIDIRECT_AI(prompt, [options])` | Asks Google AI Mode and returns the answer as text. |
| `APIDIRECT_ENDPOINTS([platform])` | Lists endpoints with their parameters and prices. |
| `APIDIRECT_FIELDS(endpoint)` | Lists the columns an endpoint returns, for the `fields` argument. |

Argument notes:

- `params` and `options` take `name=value&name=value` (also `;` or newline separated), or a two-column range of names and values. `headers=false` drops the header row.
- `fields` is a comma-separated list or a range of column names. Nested values use dots: `author.name`.
- Dates in cells are sent as `YYYY-MM-DD`. Lists of scalars are joined with commas; lists of objects become JSON text.
- A single call must finish within Google's 30-second limit for custom functions. For multi-page pulls (`pages=3` and up) use the sidebar, which has no such limit.
- Results are cached for six hours per identical request, so reopening the sheet or dragging a formula around does not bill again. Change any argument (or wait) to refetch.

Custom functions run with the spreadsheet owner's stored key, as Google documents for the Properties service. Each collaborator who opens the sidebar uses their own key.

## Sidebar

**Extensions → API Direct → Open sidebar**. Pick a platform and endpoint, fill in the parameters (required ones first, the rest under *More options*), choose the columns, max rows and destination cell, and click **Run**. The results are written as plain values, so they stay put and never recalculate. Every endpoint shows its price and a link to its documentation.

## Scheduled refreshes

Click **Schedule…** under any request in the sidebar to keep a sheet up to date automatically:

- **Append only new results** re-runs the request and appends only the rows the sheet does not hold yet, each stamped with a `fetched_at` column. Results are matched on their identifying fields (the API's post, user or review ids, or the URL), which the add-on always keeps as columns, so the sheet itself is the memory and nothing is stored anywhere else. Ideal for monitoring mentions, reviews, jobs or new followers.
- **Replace the whole table** re-runs the request and overwrites the sheet, for leaderboards, profiles or anything you want fresh rather than accumulated.

Pick every hour, 6 hours, 12 hours, day or week. Google allows add-on time-driven triggers to run at most hourly. A schedule runs in the name of the person who created it, with their key, and shows its last run, row counts and any error under the **Schedules** tab, where you can also run it now or delete it. Each run is billed like a normal request.

## Endpoints

101 endpoints across 13 platforms, every public data endpoint in the [API reference](https://apidirect.io/openapi.json), the same set as the [n8n node](https://github.com/apidirect/n8n-nodes-apidirect) plus LinkedIn:

| Platform | Endpoints |
|---|---|
| **Twitter/X** | Search Posts, Search Users, User Profile, User Tweets, User Followers, User Following, Verified Followers, User Replies, Tweet Details, Tweet Retweets, Tweet Quotes, Tweet Comments, Trends |
| **Facebook** | Search Posts, Search Pages, Search Videos, Search Events, Search Locations, Page Details, Page Posts, Page Photos, Page Videos, Page Reels, Page Reviews, Group Details, Group Posts, Group Posts Search\*, Post Comments |
| **Instagram** | Search Posts, Search Users, User Profile, User Posts, Post Details, User Followers, User Following, User Stories, User Highlights, Highlight Stories, Post Comments, Comment Replies, Post Likes, Hashtag Posts |
| **TikTok** | Search Videos, Search Users, User Profile, Video Details |
| **YouTube** | Search Videos, Search Channels, Channel Details, Video Details, Video Comments |
| **Reddit** | Search Posts, Search Comments, Search Users |
| **Threads** | Search Posts, Search Users, User Profile, User Posts |
| **Truth Social** | User Posts |
| **Bluesky** | Search Posts, Search Users, User Profile, User Posts, User Followers, User Following, User Likes, Post Details, Post Comments, Post Likes, Post Quotes, Post Reposts |
| **LinkedIn** | Search Posts, Person Profile, Person Posts, Post Details, Search Companies, Company Profile, Company Posts, Search Jobs, Job Details |
| **Amazon** | Search Products, Product Details, Seller Profile, Seller Reviews, Seller Products, Best Sellers |
| **Trustpilot** | Company Reviews, Search Companies, Category Companies, Category Newest, Category Details, Search Categories, User Profile |
| **Google** | Web Search, AI Mode, News Articles, Forum Posts, Places Search, Place Details, Place Reviews, Place Photos |

\* Marked temporarily unavailable by the API while it is upgraded: the sidebar says so and requests return the API's 503 message until it is back. No add-on update is needed when it returns.

Most list endpoints accept `get_sentiment=true` to add AI emotion, polarity and intensity scores to each row. The catalog (`src/Catalog.js`) is generated from the public [OpenAPI spec](https://apidirect.io/openapi.json), so names, parameters and prices match the API docs.

## Permissions

The add-on asks for four non-sensitive scopes, which is why it needs no OAuth verification for sensitive data:

| Scope | Why |
|---|---|
| `spreadsheets.currentonly` | Write results into the spreadsheet the add-on is open in, and nothing else in your Drive. |
| `script.container.ui` | Show the menu and sidebar. |
| `script.external_request` | Call `https://apidirect.io` (the manifest's `urlFetchWhitelist` pins it to that host). |
| `script.scriptapp` | Create the hourly trigger that runs scheduled refreshes. Only used when you create a schedule. |

The add-on sends your request parameters and your API key to API Direct and nothing else. It stores the key and your schedules in your own Google account's add-on properties. See the [privacy policy](https://apidirect.io/privacy) and [terms](https://apidirect.io/terms).

## Limits worth knowing

- **Concurrency**: API Direct allows 10 concurrent requests per endpoint per account. Filling a column with 50 formulas at once trips that limit; the add-on retries with backoff, but a sidebar pull or a schedule is the better tool for bulk work.
- **Pagination**: `page` fetches one page; `pages` fetches and merges several server-side, billed per page. See [Pagination](https://apidirect.io/docs/pagination).
- **Cell size**: values over 50,000 characters are truncated with `…`.
- **Append mode and edits**: new rows are recognised by their id or URL columns, so editing or deleting those columns in an append sheet lets the same result be added again. Other columns can be edited freely.

## Development

```
npm install            # clasp
npm test               # unit tests (node:test), no Google account needed
npm run catalog        # regenerate src/Catalog.js from spec/openapi.json
npm run catalog:check  # fail if the catalog is stale (CI does this)
npm run assets         # regenerate Marketplace icons, banner and screenshots (Playwright)
npm run push           # clasp push to the script in .clasp.json
```

Layout: `src/` is the Apps Script project (`appsscript.json` manifest, `Code.js` menu, `Api.js` HTTP, `Table.js` flattening, `Functions.js` custom functions, `SidebarServer.js`, `Schedules.js`, `Settings.js`, `Cache.js`, `Sidebar*.html`). `test/helpers/gas-env.js` loads those files into a sandbox with fake `UrlFetchApp`, `PropertiesService`, `CacheService`, `SpreadsheetApp` and `ScriptApp`, so every piece of logic runs under `node --test`. `marketplace/` holds the store listing text and assets.

To update the endpoints, replace `spec/openapi.json` with the current <https://apidirect.io/openapi.json>, run `npm run catalog`, review the diff and bump the version in `package.json`, `src/Api.js` and `CHANGELOG.md`.

Publishing (maintainers): `npx clasp push`, then `npx clasp deploy --description "1.0.0"` for a versioned deployment, and point the Google Workspace Marketplace SDK app configuration at that script version. `marketplace/listing.md` has the listing text and asset list.

## Support

- **Documentation**: [apidirect.io/docs/google-sheets](https://apidirect.io/docs/google-sheets), plus the [API docs](https://apidirect.io/docs/introduction), [error codes](https://apidirect.io/docs/error-handling) and [rate limits](https://apidirect.io/docs/rate-limits).
- **Help, bugs and feature requests**: [open an issue](https://github.com/apidirect/sheets-addon/issues) or email [support@apidirect.io](mailto:support@apidirect.io) with the endpoint, the formula or sidebar request, and the error text.
- **Security issues**: email [support@apidirect.io](mailto:support@apidirect.io) rather than opening a public issue.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
