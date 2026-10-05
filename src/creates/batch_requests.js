'use strict';

const { BASE_URL } = require('../lib/http');
const { normalizeDates } = require('../lib/dates');

// POST /v1/batch: up to 100 calls in one request. The requests come in as a
// JSON array, since each item carries its own parameters.
const parseRequests = (z, raw) => {
  let value = raw;
  if (typeof raw === 'string') {
    try {
      value = JSON.parse(raw);
    } catch (e) {
      throw new z.errors.Error(
        'Requests must be a JSON array, for example [{"endpoint": "/v1/twitter/user", "params": {"username": "naval"}}].',
        'InvalidRequests',
        400,
      );
    }
  }
  if (value && !Array.isArray(value) && Array.isArray(value.requests)) {
    value = value.requests;
  }
  if (!Array.isArray(value) || !value.length) {
    throw new z.errors.Error('Requests must be a JSON array with 1 to 100 items.', 'InvalidRequests', 400);
  }
  return value;
};

module.exports = {
  key: 'batch_requests',
  noun: 'Batch',
  display: {
    label: 'Run Batch Requests',
    description:
      'Runs up to 100 API calls in one request, in any mix of endpoints, and returns each one\'s status and body ' +
      'as line items. Batching is free; each item bills under its own endpoint at its normal price.',
  },
  operation: {
    inputFields: [
      {
        key: 'requests',
        label: 'Requests',
        type: 'text',
        required: true,
        helpText:
          'A JSON array of 1 to 100 items, each with an `endpoint` (for example `/v1/twitter/user`), optional ' +
          '`params` (the query parameters that endpoint takes) and an optional `tag` echoed back on its result. ' +
          'Every endpoint except `/v1/web/ai-mode` and `/v1/time` is allowed. See the ' +
          '[batch docs](https://apidirect.io/docs/batch).',
        placeholder: '[{"endpoint": "/v1/twitter/user", "params": {"username": "naval"}}]',
      },
    ],
    perform: async (z, bundle) => {
      const requests = parseRequests(z, bundle.inputData.requests);
      const response = await z.request({
        method: 'POST',
        url: `${BASE_URL}/v1/batch`,
        body: { requests },
      });
      return normalizeDates(response.data);
    },
    sample: {
      results: [
        {
          index: 0,
          endpoint: '/v1/twitter/user',
          tag: null,
          status: 200,
          body: { user: { name: 'Naval', username: 'naval', followers: 2100000 } },
        },
        {
          index: 1,
          endpoint: '/v1/instagram/user',
          tag: 'ig',
          status: 200,
          body: { user: { username: 'instagram' } },
        },
      ],
      summary: { total: 2, succeeded: 2, failed: 0, duration_ms: 4200 },
    },
    outputFields: [
      { key: 'summary__total', label: 'Total Items', type: 'integer' },
      { key: 'summary__succeeded', label: 'Succeeded', type: 'integer' },
      { key: 'summary__failed', label: 'Failed', type: 'integer' },
      { key: 'summary__duration_ms', label: 'Duration (ms)', type: 'integer' },
      { key: 'results[]index', label: 'Results: Index', type: 'integer' },
      { key: 'results[]endpoint', label: 'Results: Endpoint' },
      { key: 'results[]tag', label: 'Results: Tag' },
      { key: 'results[]status', label: 'Results: Status', type: 'integer' },
    ],
  },
};
