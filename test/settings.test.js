'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createEnv } = require('./helpers/gas-env');

test('saveApiKey checks the key against /v1/time and stores it per user', () => {
  const env = createEnv({ fetchHandler: () => ({ code: 200, body: { unix: 1 } }) });
  const settings = env.fn('saveApiKey')('  ak_live_abcdefghijklmnop  ');
  assert.equal(settings.hasKey, true);
  assert.equal(settings.maskedKey, 'ak_live_…mnop');
  assert.equal(env.fetchLog[0].url, 'https://apidirect.io/v1/time');
  assert.equal(env.userProps.getProperty('apidirect.apiKey'), 'ak_live_abcdefghijklmnop');
  assert.equal(env.fn('getApiKey_')(), 'ak_live_abcdefghijklmnop');
});

test('saveApiKey rejects only a 401; 402 and 429 still save', () => {
  const env = createEnv({ fetchHandler: () => ({ code: 401, body: { error: 'Invalid API key' } }) });
  assert.throws(() => env.fn('saveApiKey')('ak_live_bad'), /rejected that key/);
  assert.equal(env.userProps.getProperty('apidirect.apiKey'), null);
  env.setFetchHandler(() => ({ code: 402, body: { error: 'Insufficient credit' } }));
  assert.equal(env.fn('saveApiKey')('ak_live_poor').hasKey, true);
  env.setFetchHandler(() => ({ code: 429, body: { code: 'rate_limit_exceeded' } }));
  assert.equal(env.fn('saveApiKey')('ak_live_busy').maskedKey, 'ak_live_busy'.slice(0, 3) + '…');
  assert.throws(() => env.fn('saveApiKey')(''), /Paste an API key/);
  assert.throws(() => env.fn('saveApiKey')('ak live x'), /spaces/);
});

test('clearApiKey forgets the key and getSettings never leaks it', () => {
  const env = createEnv();
  env.setApiKey('ak_live_secretsecret');
  const settings = env.fn('getSettings')();
  assert.ok(!JSON.stringify(settings).includes('secretsecret'));
  assert.equal(env.fn('clearApiKey')().hasKey, false);
  assert.equal(env.userProps.getProperty('apidirect.apiKey'), null);
});
