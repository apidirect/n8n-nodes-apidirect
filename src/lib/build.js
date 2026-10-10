'use strict';

// Turns catalog entries (src/catalog/*.js, generated from the OpenAPI spec)
// into Zapier triggers, creates and searches.

const crypto = require('crypto');

const { BASE_URL } = require('./http');
const { normalizeDates } = require('./dates');
const { toQuery } = require('./params');

// AI Mode prompts can run to 12,000 characters, longer than a query string
// should carry, so prompts past this length go in a JSON body (POST /v1/web/ai-mode).
const AI_MODE_PATH = '/v1/web/ai-mode';
const AI_MODE_POST_THRESHOLD = 1500;

const callEndpoint = async (z, bundle, entry, fields = entry.inputFields) => {
  const params = toQuery(bundle.inputData, fields);
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

// A value that can identify an item on its own: a non-empty string or number.
const usable = (v) => v !== undefined && v !== null && typeof v !== 'boolean' && typeof v !== 'object' && String(v).trim() !== '';

// JSON with keys in a fixed order, so the same item always hashes the same.
const canonical = (value) => {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((k) => `${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`;
  }
  return JSON.stringify(value);
};

// The stable id of one polled item: the first of the entry's id fields the
// item carries (a group of fields becomes "field=value|field=value"), or a
// hash of the whole item when none is present. Mirrors item_id() in
// scripts/generate.py, which derives the trigger samples' ids the same way.
const itemId = (idFields, item) => {
  for (const candidate of idFields || []) {
    if (Array.isArray(candidate)) {
      const values = candidate.map((f) => item[f]);
      if (values.every(usable)) {
        return candidate.map((f, i) => `${f}=${String(values[i]).trim()}`).join('|');
      }
    } else if (usable(item[candidate])) {
      return String(item[candidate]).trim();
    }
  }
  return `sha256:${crypto.createHash('sha256').update(canonical(item), 'utf8').digest('hex')}`;
};

// Polling trigger on a list endpoint: every poll calls the endpoint with the
// step's inputs (sorted newest first where the endpoint supports it) and
// returns the current page(s) of results, each with a stable `id`. Zapier
// keeps its own list of ids it has seen per Zap and triggers on the new ones.
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
      const data = await callEndpoint(z, bundle, entry, entry.trigger.inputFields);
      const items = data && Array.isArray(data[entry.listKey]) ? data[entry.listKey] : [];
      return items
        .filter((item) => item && typeof item === 'object' && !Array.isArray(item))
        .map((item) => {
          const { id: _ignored, ...rest } = item;
          return { id: itemId(entry.idFields, item), ...rest };
        });
    },
    sample: entry.trigger.sample,
    outputFields: entry.trigger.outputFields,
  },
});

module.exports = { makeCreate, makeSearch, makeTrigger, callEndpoint, itemId };
