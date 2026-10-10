# Google Workspace Marketplace listing

Everything the Marketplace SDK **Store listing** and **App configuration** pages ask for. Assets are in this folder; regenerate them with `npm run assets`.

## App configuration

| Field | Value |
|---|---|
| App name | API Direct |
| App integration | Google Workspace add-on → **Sheets add-on**. Script ID: from the Apps Script project's *Project Settings*. Version: the number from `clasp deploy` (use HEAD only for testing). |
| OAuth scopes | Exactly the four in `src/appsscript.json`: `https://www.googleapis.com/auth/spreadsheets.currentonly`, `https://www.googleapis.com/auth/script.container.ui`, `https://www.googleapis.com/auth/script.external_request`, `https://www.googleapis.com/auth/script.scriptapp` |
| Developer name | API Direct |
| Developer website | https://apidirect.io |
| Developer email | support@apidirect.io |
| Install settings | Individual install and Admin install |
| App visibility | Public |
| Icons | `icons/icon-128.png`, `icons/icon-32.png` (also `icon-96.png`, `icon-48.png` if asked) |

The OAuth consent screen (Google Cloud → APIs & Services → OAuth consent screen) must use the same app name, **External** user type, support email support@apidirect.io, homepage https://apidirect.io, privacy https://apidirect.io/privacy, terms https://apidirect.io/terms, authorized domain `apidirect.io`, the four scopes above, and be **published to production**. Leave the consent-screen logo empty unless you want to go through brand verification: with only non-sensitive scopes there is no verification otherwise. Enable the **Google Workspace Marketplace SDK** on the project and link the Apps Script project to it (Apps Script → Project Settings → Google Cloud Platform project → the project number).

## Store listing

**Language:** English (United States)

**App name** (≤ 50): `API Direct`

**Short description** (≤ 200):

> Real-time LinkedIn, X/Twitter, Reddit, YouTube, Instagram, TikTok, Facebook, news, Google and Amazon data in Sheets. =APIDIRECT_SEARCH(), a sidebar, and scheduled refreshes.

**Detailed description** (≤ 16,000):

> API Direct puts live public data from the web into your spreadsheet. Search LinkedIn, X/Twitter, Reddit, YouTube, Instagram, TikTok, Facebook, Threads, Bluesky and Truth Social; pull Google web search, AI Mode answers, news and forum posts; look up Google Maps places and reviews; and read Amazon products and Trustpilot reviews. One hundred endpoints, one API key.
>
> CUSTOM FUNCTIONS
> Type =APIDIRECT_SEARCH("twitter", "your brand", 50) and get a table of posts with authors, dates, engagement and links. =APIDIRECT("linkedin/company", "url=…", , "employees") returns a single value. =APIDIRECT_AI("question") returns a Google AI Mode answer as text. =APIDIRECT_ENDPOINTS() lists every endpoint with its parameters and price.
>
> SIDEBAR
> Pick a platform and endpoint, fill in the parameters, choose columns and a destination, and write the results as plain values. No formulas to recalculate, no API knowledge needed.
>
> SCHEDULED REFRESHES
> Keep a sheet updated every hour, day or week. Append mode adds only the results that are not in the sheet yet: new mentions, reviews, job posts, followers or news. Replace mode rewrites a table from scratch.
>
> PRICING
> The add-on is free. API Direct is pay as you go with no subscription: requests cost $0.002 to $0.01, every endpoint has a free monthly tier, and new accounts get $5 of credit. Create a key at apidirect.io/dashboard/keys and paste it under Extensions → API Direct → Set API key. The key is stored in your own Google account settings, never in the spreadsheet.
>
> PRIVACY
> The add-on only reads and writes the spreadsheet it is open in and only talks to apidirect.io. It asks for no access to your Drive, email or contacts.
>
> Documentation: apidirect.io/docs/google-sheets · Support: support@apidirect.io

**Category:** Productivity (secondary: Business tools, if a second category is offered)

**Pricing:** Freemium (the add-on is free; API usage is billed by API Direct)

**Graphic assets**

| Asset | File | Size |
|---|---|---|
| Application icon | `icons/icon-128.png`, `icons/icon-96.png`, `icons/icon-48.png`, `icons/icon-32.png` | 128×128, 96×96, 48×48, 32×32 |
| Application card banner | `banner-220x140.png` | 220×140 |
| Screenshots (1 to 10) | `screenshots/01-sidebar.png`, `02-custom-function.png`, `03-schedules.png`, `04-endpoints.png` | 1280×800 |
| OAuth consent screen logo (optional) | `icons/oauth-logo-120.png` | 120×120 |

The screenshots are rendered from the real sidebar HTML inside a mock Sheets frame; replace them with captures from a live spreadsheet when the test deployment is up.

**Support links**

| Link | URL |
|---|---|
| Terms of service | https://apidirect.io/terms |
| Privacy policy | https://apidirect.io/privacy |
| Support | https://github.com/apidirect/sheets-addon/issues |
| Setup instructions | https://apidirect.io/docs/google-sheets |
| Help menu link (editor add-ons) | https://apidirect.io/docs/google-sheets |
| Report an issue (editor add-ons) | https://github.com/apidirect/sheets-addon/issues |

**Distribution:** all regions. **Visibility:** Public (goes through Google's review; expect questions about the `script.scriptapp` scope, answered by "creates the hourly trigger for scheduled refreshes the user sets up").

## Before submitting

1. `npx clasp push` and `npx clasp deploy --description "1.0.0"`; note the version number.
2. Test with the HEAD deployment from the Marketplace SDK's "Test" install, or via **Extensions → Apps Script → Deploy → Test deployments**: set the key, run a sidebar request, a custom function and a schedule.
3. Fill in the pages above, upload the assets, save, and click **Publish**.
4. Marketplace review usually takes a few business days. The listing appears at https://workspace.google.com/marketplace once approved.
