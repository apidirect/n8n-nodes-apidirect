'use strict';

const { BASE_URL } = require('./src/lib/http');

// API-key auth. The key goes in the X-API-Key header (added by the
// `addApiKey` middleware in index.js); GET /v1/time proves it works.
module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'api_key',
      label: 'API Key',
      type: 'password',
      required: true,
      helpText:
        'Your API Direct key (starts with `ak_live_`). Copy it from the ' +
        `[API Keys page](${BASE_URL}/dashboard/keys) of your dashboard, or ` +
        `[create a free account](${BASE_URL}/signup?utm_source=zapier) first. ` +
        'Every endpoint has a monthly free tier; usage beyond it is billed per request.',
    },
  ],
  test: {
    url: `${BASE_URL}/v1/time`,
    method: 'GET',
  },
  // /v1/time returns no account details, so the label shows the key's tail.
  connectionLabel: (z, bundle) => {
    const key = String((bundle.authData && bundle.authData.api_key) || '');
    return key.length >= 4 ? `Key ending in ${key.slice(-4)}` : 'API Direct';
  },
};
