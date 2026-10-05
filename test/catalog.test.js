'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createEnv } = require('./helpers/gas-env');

const env = createEnv();
const CATALOG = env.get('CATALOG');

test('catalog has every platform and one endpoint per public operation', () => {
  assert.equal(CATALOG.platforms.length, 13);
  assert.equal(CATALOG.endpoints.length, 101);
  const suspended = CATALOG.endpoints.filter((e) => e.suspended);
  assert.deepEqual(suspended.map((e) => e.key), ['facebook/group/search'], 'suspended endpoints still ship, flagged');
  assert.match(suspended[0].description, /^Search for posts within a specific Facebook group/);
  assert.equal(suspended[0].price, '$0.008 per page');
  const linkedin = CATALOG.endpoints.filter((e) => e.platform === 'linkedin');
  assert.equal(linkedin.length, 9, 'LinkedIn ships by default');
  const keys = new Set(CATALOG.endpoints.map((e) => e.key));
  assert.equal(keys.size, CATALOG.endpoints.length, 'endpoint keys are unique');
});

test('every endpoint is well formed', () => {
  const platformIds = new Set(CATALOG.platforms.map((p) => p.id));
  for (const e of CATALOG.endpoints) {
    assert.ok(platformIds.has(e.platform), e.key + ' platform');
    assert.ok(e.label && e.label.length < 40, e.key + ' label');
    assert.ok(['list', 'detail', 'text'].includes(e.kind), e.key + ' kind');
    if (e.kind === 'list') assert.ok(e.listKey, e.key + ' listKey');
    assert.ok(e.price.startsWith('$'), e.key + ' price: ' + e.price);
    assert.match(e.docs, /^https:\/\/apidirect\.io\/docs\//);
    for (const p of e.params) {
      assert.ok(p.name && p.label, e.key + ' param label');
      assert.ok(['string', 'integer', 'number', 'boolean'].includes(p.type), e.key + '.' + p.name + ' type ' + p.type);
    }
    if (e.saveable) assert.equal(e.kind, 'list', e.key + ' saveable endpoints return lists');
    assert.ok(!e.label.includes(CATALOG.platforms.find((p) => p.id === e.platform).label.split('/')[0]) || e.platform === 'google', e.key + ' label repeats platform: ' + e.label);
  }
});

test('internal endpoints are not exposed', () => {
  for (const e of CATALOG.endpoints) {
    assert.ok(!e.path.startsWith('/v1/saved-searches'), e.path);
    assert.ok(!e.path.startsWith('/v1/batch'), e.path);
    assert.notEqual(e.path, '/v1/time');
  }
});

test('aliases point at search endpoints that exist', () => {
  const keys = new Set(CATALOG.endpoints.map((e) => e.key));
  for (const [alias, key] of Object.entries(CATALOG.aliases)) {
    assert.ok(keys.has(key), alias + ' -> ' + key);
  }
  assert.equal(CATALOG.aliases.twitter, 'twitter/posts');
  assert.equal(CATALOG.aliases.linkedin, 'linkedin/posts');
  assert.equal(CATALOG.aliases['linkedin jobs'], 'linkedin/jobs');
  assert.equal(CATALOG.aliases['google search'], 'web/search');
  assert.equal(CATALOG.aliases.news, 'news/articles');
});

test('AI Mode is sent as POST so long prompts fit', () => {
  const ai = CATALOG.endpoints.find((e) => e.key === 'web/ai-mode');
  assert.equal(ai.method, 'POST');
  assert.equal(ai.kind, 'text');
});
