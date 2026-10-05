'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createEnv } = require('./helpers/gas-env');

const TWEETS = { count: 2, pages: 1, posts: [
  { url: 'https://x.com/a/1', title: 'Hello Acme', likes: 3, author: 'a', hashtags: ['acme'] },
  { url: 'https://x.com/b/2', title: 'Bye Acme', likes: 9, author: 'b', hashtags: [] },
] };

function envWithKey(handler) {
  const env = createEnv({ fetchHandler: handler });
  env.setApiKey('ak_live_test');
  return env;
}

test('APIDIRECT_SEARCH resolves the platform, sends the query and returns a table', () => {
  const env = envWithKey(() => ({ code: 200, body: TWEETS }));
  const table = env.fn('APIDIRECT_SEARCH')('twitter', 'Acme', null, null, 'sort_by=relevance&pages=2');
  assert.deepEqual(table[0], ['url', 'title', 'likes', 'author', 'hashtags']);
  assert.equal(table.length, 3);
  assert.deepEqual(table[1], ['https://x.com/a/1', 'Hello Acme', 3, 'a', 'acme']);
  assert.equal(env.fetchLog[0].url, 'https://apidirect.io/v1/twitter/posts?query=Acme&pages=2&sort_by=relevance');
  assert.equal(env.fetchLog[0].options.headers['X-API-Key'], 'ak_live_test');
});

test('APIDIRECT_SEARCH honours max_results, fields and headers=false', () => {
  const env = envWithKey(() => ({ code: 200, body: TWEETS }));
  const fn = env.fn('APIDIRECT_SEARCH');
  assert.deepEqual(fn('x', 'Acme', 1, 'title,likes'), [['title', 'likes'], ['Hello Acme', 3]]);
  assert.deepEqual(fn('x', 'Acme', 1, 'title', 'headers=false'), [['Hello Acme']]);
  assert.deepEqual(fn('x', 'Acme', 1, [['title', 'url']]), [['title', 'url'], ['Hello Acme', 'https://x.com/a/1']]);
  assert.equal(env.fetchLog.length, 1, 'identical requests are served from the cache');
});

test('APIDIRECT_SEARCH errors are readable', () => {
  const env = envWithKey(() => ({ code: 200, body: TWEETS }));
  const fn = env.fn('APIDIRECT_SEARCH');
  assert.throws(() => fn('myspace', 'Acme'), /Unknown platform "myspace"/);
  assert.throws(() => fn('twitter', ''), /something to search for/);
  assert.doesNotThrow(() => fn('linkedin', '', null, null, 'author=williamhgates'));
  const noKey = createEnv({ fetchHandler: () => ({ code: 200, body: TWEETS }) });
  assert.throws(() => noKey.fn('APIDIRECT_SEARCH')('twitter', 'Acme'), /No API Direct key yet.*utm_source=google-sheets/);
  assert.equal(noKey.fetchLog.length, 0);
});

test('APIDIRECT_SEARCH returns a placeholder for empty results', () => {
  const env = envWithKey(() => ({ code: 200, body: { count: 0, posts: [] } }));
  assert.deepEqual(env.fn('APIDIRECT_SEARCH')('reddit', 'nothing-here'), [['(no results)']]);
});

test('APIDIRECT calls any endpoint and returns scalars for one field of one result', () => {
  const env = envWithKey((url) => {
    if (url.includes('/v1/youtube/channel')) return { code: 200, body: { channel: { channel_id: 'c', subscriber_count: 1200000 } } };
    if (url.includes('/v1/linkedin/company')) return { code: 200, body: { name: 'Acme', employees: 42, locations: [{ city: 'Austin' }] } };
    return { code: 404, body: { error: 'no' } };
  });
  const fn = env.fn('APIDIRECT');
  assert.equal(fn('youtube/channel', 'name=mkbhd', null, 'subscriber_count'), 1200000);
  assert.deepEqual(fn('youtube/channel', 'name=mkbhd'), [['channel_id', 'subscriber_count'], ['c', 1200000]]);
  assert.deepEqual(fn('/v1/linkedin/company', [['url', 'https://www.linkedin.com/company/acme']], null, 'name,employees,locations'),
    [['name', 'employees', 'locations'], ['Acme', 42, '[{"city":"Austin"}]']]);
  assert.throws(() => fn('nope/endpoint'), /Unknown endpoint "nope\/endpoint"/);
  assert.throws(() => fn('youtube/video'), /"url" is required/);
});

test('APIDIRECT and APIDIRECT_AI return AI Mode answers as text', () => {
  const env = envWithKey(() => ({ code: 200, body: { reply_parts: [{ type: 'paragraph', text: 'Answer.' }], reference_links: [] } }));
  assert.equal(env.fn('APIDIRECT_AI')('What is X?', 'country=gb'), 'Answer.');
  assert.equal(env.fetchLog[0].options.method, 'post');
  assert.deepEqual(JSON.parse(env.fetchLog[0].options.payload), { prompt: 'What is X?', country: 'gb' });
  assert.equal(env.fn('APIDIRECT')('web/ai-mode', 'prompt=What is X?&country=gb'), 'Answer.');
  assert.equal(env.fetchLog.length, 1, 'same prompt served from cache');
  assert.throws(() => env.fn('APIDIRECT_AI')(''), /prompt/);
});

test('APIDIRECT_ENDPOINTS and APIDIRECT_FIELDS describe the catalog', () => {
  const env = createEnv();
  const all = env.fn('APIDIRECT_ENDPOINTS')();
  assert.deepEqual(all[0], ['platform', 'endpoint', 'name', 'price', 'required', 'optional', 'docs']);
  assert.equal(all.length, 102);
  assert.ok(all.some((row) => row[1] === 'facebook/group/search' && /temporarily unavailable/.test(row[2])), 'suspended endpoints are listed and flagged');
  const li = env.fn('APIDIRECT_ENDPOINTS')('LinkedIn');
  assert.equal(li.length, 10);
  assert.equal(li[1][0], 'LinkedIn');
  assert.equal(env.fn('APIDIRECT_ENDPOINTS')('tweets').length, 14, 'an alias selects its platform');
  assert.throws(() => env.fn('APIDIRECT_ENDPOINTS')('myspace'), /Unknown platform/);
  const fields = env.fn('APIDIRECT_FIELDS')('reddit');
  assert.ok(fields.length > 5);
  assert.ok(fields.every((r) => r.length === 1));
  assert.deepEqual(env.fn('APIDIRECT_FIELDS')('twitter/tweet/retweets'), [['(columns depend on the results; run the endpoint to see them)']]);
});

test('the cache keeps large responses in chunks and separates API keys', () => {
  const big = { posts: Array.from({ length: 2000 }, (_, i) => ({ url: 'https://x.com/' + i, text: 'lorem ipsum '.repeat(10) })) };
  const env = envWithKey(() => ({ code: 200, body: big }));
  const fn = env.fn('APIDIRECT_SEARCH');
  const first = fn('twitter', 'big');
  assert.equal(first.length, 2001);
  assert.ok(JSON.stringify(big).length > 100000, 'response exceeds one cache entry');
  fn('twitter', 'big');
  assert.equal(env.fetchLog.length, 1);
  env.setApiKey('ak_live_other');
  fn('twitter', 'big');
  assert.equal(env.fetchLog.length, 2, 'another key does not share cached results');
});

test('requests that fail are not cached', () => {
  let calls = 0;
  const env = envWithKey(() => { calls++; return calls <= 3 ? { code: 503, body: { error: 'down' } } : { code: 200, body: TWEETS }; });
  const fn = env.fn('APIDIRECT_SEARCH');
  assert.throws(() => fn('twitter', 'Acme'), /temporarily unavailable/);
  assert.equal(fn('twitter', 'Acme').length, 3);
  assert.equal(calls, 4, 'three failed attempts, then one real fetch');
});
