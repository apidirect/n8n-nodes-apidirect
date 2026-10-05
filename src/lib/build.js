'use strict';

// Turns catalog entries (src/catalog/*.js, generated from the OpenAPI spec)
// into Zapier triggers, creates and searches.

const { BASE_URL } = require('./http');
const { normalizeDates } = require('./dates');
const { toQuery } = require('./params');
const savedSearches = require('./saved-searches');

// AI Mode prompts can run to 12,000 characters, longer than a query string
// should carry, so prompts past this length go in a JSON body (POST /v1/web/ai-mode).
const AI_MODE_PATH = '/v1/web/ai-mode';
const AI_MODE_POST_THRESHOLD = 1500;

const callEndpoint = async (z, bundle, entry) => {
  const params = toQuery(bundle.inputData, entry.inputFields);
  const request = { url: BASE_URL + entry.path, method: entry.method || 'GET', params };
  if (entry.path === AI_MODE_PATH && String(params.prompt || '').length > AI_MODE_POST_THRESHOLD) {
    request.method = 'POST';
    request.body = params;
    request.params = {};
  }
  const response = await z.request(request);
  return normalizeDates(response.data);
};

// List endpoints and AI Mode: one action returning the whole response. Lists
// (posts, users, ...) come through as line items.
const makeCreate = (entry) => ({
  key: entry.key,
  noun: entry.noun,
  display: {
    label: entry.action.label,
    description: entry.action.description,
  },
  operation: {
    inputFields: entry.inputFields,
    perform: (z, bundle) => callEndpoint(z, bundle, entry),
    sample: entry.sample,
    outputFields: entry.outputFields,
  },
});

// Detail endpoints (one profile, one post, one place): a search returning the
// object itself, unwrapped from its `user`/`post`/... envelope.
const makeSearch = (entry) => ({
  key: `find_${entry.key}`,
  noun: entry.noun,
  display: {
    label: entry.action.label,
    description: entry.action.description,
  },
  operation: {
    inputFields: entry.inputFields,
    perform: async (z, bundle) => {
      const data = await callEndpoint(z, bundle, entry);
      const item = entry.unwrapKey && data && data[entry.unwrapKey] ? data[entry.unwrapKey] : data;
      return item ? [item] : [];
    },
    sample: entry.sample,
    outputFields: entry.outputFields,
  },
});

// Polling trigger on a saved search for the endpoint + the step's inputs. The
// search is created on first poll and reused after that. Runs never mark
// results as seen on the API side (Zapier keeps its own seen list per Zap, and
// two Zaps may share one search), so every poll returns the endpoint's current
// results with their stable ids and Zapier triggers on the ones it has not
// seen. Results come back newest first where the endpoint sorts that way.
const makeTrigger = (entry) => ({
  key: `new_${entry.key}`,
  noun: entry.noun,
  display: {
    label: entry.trigger.label,
    description: entry.trigger.description,
  },
  operation: {
    type: 'polling',
    inputFields: entry.trigger.inputFields,
    perform: async (z, bundle) => {
      const params = toQuery(bundle.inputData, entry.trigger.inputFields);
      const search = await savedSearches.findOrCreate(z, {
        endpoint: entry.path,
        params,
        label: entry.trigger.label,
      });
      const data = await savedSearches.run(z, search.id, { includeSeen: true, markSeen: false });
      const items = [...(data.results || []), ...(data.seen_results || [])];
      return normalizeDates(items).map((item) => ({ ...item, id: String(item.id) }));
    },
    sample: entry.trigger.sample,
    outputFields: entry.trigger.outputFields,
  },
});

module.exports = { makeCreate, makeSearch, makeTrigger, callEndpoint };
