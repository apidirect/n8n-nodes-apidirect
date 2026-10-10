# API Direct for Zapier

The [Zapier](https://zapier.com) integration for [API Direct](https://apidirect.io?utm_source=zapier): real-time public data from LinkedIn, X/Twitter, Reddit, YouTube, Instagram, TikTok, Facebook, Threads, Bluesky, Truth Social, Google (web search, AI Mode, news, forums, Maps), Amazon and Trustpilot, in any Zap.

Built with the [Zapier Platform CLI](https://docs.zapier.com/platform/quickstart/cli-tutorial).

## What it does

- **103 actions covering every operation in the public spec** (104 operations: AI Mode's GET and POST are one action that posts long prompts). Endpoints that return a list (Search Twitter Posts, Get LinkedIn Company Posts, Get Google Place Reviews, ...) are actions whose results come through as line items. Endpoints that return one object (Find Twitter User, Find LinkedIn Person, Find Google Place, ...) are searches. Run Batch Requests and Check API Key cover `/v1/batch` and `/v1/time`.
- **79 polling triggers**, one per endpoint that returns a list: New Twitter Post Matching Search, New Reddit Post Matching Search, New LinkedIn Job Matching Search, New Google Place Review, New Instagram Follower, and so on. Each poll calls the endpoint with the step's inputs (newest first where the endpoint sorts that way) and gives every result a stable `id` built from the fields that identify it (post URL, user id, review id, ...), which Zapier dedupes on per Zap.

Authentication is the API key from the [dashboard](https://apidirect.io/dashboard/keys), sent as `X-API-Key`. Every endpoint has a monthly free tier; beyond it, each call bills at the price on its [pricing](https://apidirect.io/docs/pricing) row (the step descriptions repeat it).

## Layout

```
index.js                     app definition: auth, middleware, every trigger/create/search
authentication.js            API-key auth, tested against GET /v1/time
src/catalog/<platform>.js    GENERATED: one entry per endpoint (labels, fields, samples, output fields)
src/lib/build.js             turns catalog entries into Zapier creates, searches and polling triggers (stable ids)
src/lib/http.js              base URL, X-API-Key middleware, API error -> Zapier error
src/lib/dates.js             "YYYY-MM-DD HH:MM:SS" (UTC) -> ISO 8601
src/creates/                 hand-written Check API Key and Run Batch Requests
scripts/generate.py          the generator (standard-library Python)
spec/openapi.json            its input: the API Direct OpenAPI spec, LinkedIn included
test/                        jest + nock tests, including Zapier's publishing checks
```

## Develop

```bash
npm install
npm test                         # jest: auth, actions, triggers, publishing checks on every step
npx zapier-platform validate     # Zapier schema validation (+ integration checks when logged in)
```

To add or change endpoints, update `spec/openapi.json` (a copy of the public spec, https://apidirect.io/openapi.json) and the label tables at the top of `scripts/generate.py`, then:

```bash
npm run generate                 # rewrites src/catalog/
```

CI fails if `src/catalog/` is out of date with the spec, and `test/catalog.test.js` fails if any operation in the spec has no step.

## Deploy

```bash
npx zapier-platform login        # once, as the API Direct developer account
npx zapier-platform register     # once, creates .zapierapprc
npx zapier-platform push         # upload this version
npx zapier-platform promote 1.0.0
```

Zapier's [publishing requirements](https://docs.zapier.com/platform/publish/integration-publishing-requirements) and [integration checks](https://docs.zapier.com/platform/publish/integration-checks-reference) are what `test/catalog.test.js` enforces locally: title-case labels, "Triggers when ..." descriptions, static samples with `id`, ISO 8601 dates, output fields that match the samples.

## Notes on behaviour

- Triggers are plain polls of the endpoint: the API keeps no state for them. Each result's `id` is the first of the endpoint's identifying fields it carries (the `LISTS` table in `scripts/generate.py`; groups join as `field=value|field=value`), or a SHA-256 of the item when none is present. Zapier keeps its own per-Zap list of ids it has triggered on, so two Zaps polling the same endpoint do not affect each other.
- Each poll bills the endpoint once per page fetched (the "Pages to Fetch" field), at the price in the trigger's description.
- Searches (detail endpoints) return the object unwrapped from its `user` / `post` / `place` envelope, so fields map directly.

## Links

- Docs: https://apidirect.io/docs
- Pricing: https://apidirect.io/docs/pricing
- Support: support@apidirect.io
