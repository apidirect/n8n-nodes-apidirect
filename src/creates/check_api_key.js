'use strict';

const { BASE_URL } = require('../lib/http');
const { normalizeDates } = require('../lib/dates');

// GET /v1/time: the cheapest call on the API. Doubles as the auth test.
module.exports = {
  key: 'check_api_key',
  noun: 'Server Time',
  display: {
    label: 'Check API Key',
    description:
      'Checks that the connected API key works and returns the API server\'s current time. ' +
      '$0.001 per request after the free tier.',
  },
  operation: {
    inputFields: [],
    perform: async (z) => {
      const response = await z.request({ url: `${BASE_URL}/v1/time` });
      return normalizeDates(response.data);
    },
    sample: {
      timestamp: '2026-10-03T22:30:00.000000+00:00',
      unix: 1791066600,
      formatted: '2026-10-03T22:30:00Z',
    },
    outputFields: [
      { key: 'timestamp', label: 'Timestamp', type: 'datetime' },
      { key: 'unix', label: 'Unix Time', type: 'integer' },
      { key: 'formatted', label: 'Formatted Time' },
    ],
  },
};
