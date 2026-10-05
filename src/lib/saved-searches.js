'use strict';

// Saved searches (https://apidirect.io/docs/saved-searches) are stored
// endpoint + params pairs. Running one calls the endpoint and gives every
// result a stable `id`, which is what Zapier's deduper keys on.

const crypto = require('crypto');
const { BASE_URL } = require('./http');

const SAVED_SEARCHES_URL = `${BASE_URL}/v1/saved-searches`;
const NAME_MAX = 100;

const list = async (z) => {
  const response = await z.request({ url: SAVED_SEARCHES_URL });
  return response.data.saved_searches || [];
};

const get = async (z, id) => {
  const response = await z.request({ url: `${SAVED_SEARCHES_URL}/${encodeURIComponent(id)}` });
  return response.data.saved_search;
};

const create = async (z, { endpoint, params, name }) => {
  const response = await z.request({
    method: 'POST',
    url: SAVED_SEARCHES_URL,
    body: { endpoint, params: params || {}, name: name || '' },
  });
  return response.data.saved_search;
};

const update = async (z, id, fields) => {
  const response = await z.request({
    method: 'PATCH',
    url: `${SAVED_SEARCHES_URL}/${encodeURIComponent(id)}`,
    body: fields,
  });
  return response.data.saved_search;
};

const remove = async (z, id) => {
  const response = await z.request({
    method: 'DELETE',
    url: `${SAVED_SEARCHES_URL}/${encodeURIComponent(id)}`,
  });
  return response.data;
};

// {saved_search, results, seen_results?, count, total, seen, run_at}
const run = async (z, id, { includeSeen = false, markSeen = true } = {}) => {
  const response = await z.request({
    method: 'POST',
    url: `${SAVED_SEARCHES_URL}/${encodeURIComponent(id)}/run`,
    body: { include_seen: includeSeen, mark_seen: markSeen },
  });
  return response.data;
};

// The API stores params as strings, so compare them as strings.
const sameParams = (a, b) => {
  const ka = Object.keys(a || {}).sort();
  const kb = Object.keys(b || {}).sort();
  if (ka.length !== kb.length) {
    return false;
  }
  return ka.every((k, i) => k === kb[i] && String(a[k]) === String(b[k]));
};

const fingerprint = (endpoint, params) => {
  const canonical = JSON.stringify([endpoint, Object.keys(params).sort().map((k) => [k, String(params[k])])]);
  return crypto.createHash('sha1').update(canonical).digest('hex').slice(0, 10);
};

// A readable, deterministic name for a search the app created for a trigger.
const nameFor = (label, endpoint, params) => {
  const suffix = ` · ${fingerprint(endpoint, params)}`;
  const head = `Zapier · ${label}`.slice(0, NAME_MAX - suffix.length);
  return head + suffix;
};

// The account's saved search for this endpoint + params, created on first use.
// Matching on endpoint + params (not the name) means a renamed search is still
// found and two Zaps with identical settings share one search.
const findOrCreate = async (z, { endpoint, params, label }) => {
  const existing = (await list(z)).find((s) => s.endpoint === endpoint && sameParams(s.params, params));
  if (existing) {
    return existing;
  }
  return create(z, { endpoint, params, name: nameFor(label, endpoint, params) });
};

// How a saved search shows in dropdowns: its name, or endpoint + short id.
const dropdownLabel = (search) => search.name || `${search.endpoint} (${String(search.id).slice(0, 8)})`;

module.exports = {
  SAVED_SEARCHES_URL,
  list,
  get,
  create,
  update,
  remove,
  run,
  findOrCreate,
  nameFor,
  fingerprint,
  sameParams,
  dropdownLabel,
};
