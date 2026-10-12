# Changelog

## 1.0.0 (2026-10-12)

First release.

- API-key authentication (`X-API-Key`), tested against `GET /v1/time`.
- 120 actions covering all 121 operations of the public OpenAPI spec (v1.2.0): one per endpoint across Amazon, Bluesky, Facebook, forums, Google (web search, AI Mode, news, Places), Instagram, LinkedIn, Reddit, Substack, Threads, TikTok, Trustpilot, Truth Social, Twitter/X and YouTube. List endpoints are actions returning line items; single-object endpoints are searches; Run Batch Requests and Check API Key cover `/v1/batch` and `/v1/time`; Ask Google AI Mode sends long prompts as a POST.
- 92 polling triggers, one per endpoint that returns a list: "New Twitter Post Matching Search", "New Google Place Review", "New LinkedIn Job Matching Search", "New Substack Publication Post" and so on. Each poll calls the endpoint directly and gives every result a stable `id` (post URL, user id, review id, ...) for Zapier to dedupe on.
- Timestamps normalized to ISO 8601 UTC for Zapier's date formatting.
- Search Facebook Group Posts (`/v1/facebook/group/search`) is included although the API currently answers 503 `endpoint_suspended` for it; its description says so. Regenerate when the spec drops the notice.
