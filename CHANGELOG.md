# Changelog

## 1.0.0 (2026-10-05)

First release.

- API-key authentication (`X-API-Key`), tested against `GET /v1/time`.
- 100 actions: one per API Direct endpoint across Amazon, Bluesky, Facebook, forums, Google (web search, AI Mode, news, Places), Instagram, LinkedIn, Reddit, Threads, TikTok, Trustpilot, Truth Social, Twitter/X and YouTube. List endpoints are actions returning line items; single-object endpoints are searches.
- 78 polling triggers, one per endpoint that returns a list, built on [saved searches](https://apidirect.io/docs/saved-searches): "New Twitter Post Matching Search", "New Google Place Review", "New LinkedIn Job Matching Search" and so on.
- Saved search steps: New Saved Search Result (trigger, with a dropdown of the account's saved searches), Create, Update, Delete and Run Saved Search (actions), Find Saved Search (search).
- Timestamps normalized to ISO 8601 UTC for Zapier's date formatting.
- Not included: Search Facebook Group Posts (`/v1/facebook/group/search`), which the API marks temporarily unavailable. The generator skips any endpoint whose spec description starts with "Temporarily unavailable"; regenerate when it is back.
