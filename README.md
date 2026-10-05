# API Direct for Zapier

The [Zapier](https://zapier.com) integration for [API Direct](https://apidirect.io?utm_source=zapier): real-time public data from LinkedIn, X/Twitter, Reddit, YouTube, Instagram, TikTok, Facebook, Threads, Bluesky, Truth Social, Google (web search, AI Mode, news, forums, Maps), Amazon and Trustpilot, in any Zap.

Built with the [Zapier Platform CLI](https://docs.zapier.com/platform/quickstart/cli-tutorial).

## What it does

- **103 actions covering every operation in the public spec** (104 operations: AI Mode's GET and POST are one action that posts long prompts). Endpoints that return a list (Search Twitter Posts, Get LinkedIn Company Posts, Get Google Place Reviews, ...) are actions whose results come through as line items. Endpoints that return one object (Find Twitter User, Find LinkedIn Person, Find Google Place, ...) are searches. Run Batch Requests and Check API Key cover `/v1/batch` and `/v1/time`.
- **79 polling triggers**, one per endpoint that returns a list: New Twitter Post Matching Search, New Reddit Post Matching Search, New LinkedIn Job Matching Search, New Google Place Review, New Instagram Follower, and so on. Each one is built on a [saved search](https://apidirect.io/docs/saved-searches): the first poll creates a saved search for the step's endpoint and inputs (named `Zapier · <trigger> · <fingerprint>`), later polls run it, and the API gives every result a stable `id` that Zapier dedupes on.
- **Saved search steps**: New Saved Search Result (trigger, with a dropdown of the account's saved searches), Create / Update / Delete / Run Saved Search (actions) and Find Saved Search (search), for searches managed outside the trigger.

Authentication is the API key from the [dashboard](https://apidirect.io/dashboard/keys), sent as `X-API-Key`. Every endpoint has a monthly free tier; beyond it, each call bills at the price on its [pricing](https://apidirect.io/docs/pricing) row (the step descriptions repeat it).

## Layout

```
index.js                     app definition: auth, middleware, every trigger/create/search
authentication.js            API-key auth, tested against GET /v1/time
src/catalog/<platform>.js    GENERATED: one entry per endpoint (labels, fields, samples, output fields)
src/lib/build.js             turns catalog entries into Zapier creates, searches and polling triggers
src/lib/saved-searches.js    saved search API client, find-or-create for triggers
src/lib/http.js              base URL, X-API-Key middleware, API error -> Zapier error
src/lib/dates.js             "YYYY-MM-DD HH:MM:SS" (UTC) -> ISO 8601
src/triggers, creates, searches/   hand-written saved search steps
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

- Triggers never mark results as seen on the API side (`mark_seen: false`), so two Zaps, or a Zap and another API client, can share one saved search. Zapier keeps its own per-Zap list of ids it has triggered on. The New Saved Search Result trigger has a "Mark Results as Seen" option for the case where the Zap is the only consumer.
- Each poll bills the endpoint the saved search calls (one request per page fetched); the saved search calls themselves are free.
- Searches (detail endpoints) return the object unwrapped from its `user` / `post` / `place` envelope, so fields map directly.

## Links

- Docs: https://apidirect.io/docs
- Saved searches: https://apidirect.io/docs/saved-searches
- Support: support@apidirect.io
