'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createEnv } = require('./helpers/gas-env');

test('findEndpoint accepts keys, paths, URLs and aliases', () => {
  const env = createEnv();
  const find = env.fn('findEndpoint');
  assert.equal(find('twitter/posts').key, 'twitter/posts');
  assert.equal(find('/v1/twitter/posts').key, 'twitter/posts');
  assert.equal(find('v1/twitter/posts/').key, 'twitter/posts');
  assert.equal(find('https://apidirect.io/v1/linkedin/jobs?query=x').key, 'linkedin/jobs');
  assert.equal(find(' Twitter ').key, 'twitter/posts');
  assert.equal(find('LinkedIn Companies').key, 'linkedin/companies');
  assert.equal(find('youtube_channels').key, 'youtube/channels');
  assert.equal(find('nope'), null);
  assert.equal(find(''), null);
  assert.equal(find(null), null);
});

test('prepareParams validates and normalises values', () => {
  const env = createEnv();
  const prepare = env.fn('prepareParams');
  const twitter = env.fn('findEndpoint')('twitter/posts');
  const out = prepare(twitter, { query: ' Acme ', pages: 2, get_sentiment: true, sort_by: 'Relevance', start_date: new Date(Date.UTC(2026, 0, 5)), extra: '' });
  assert.deepEqual(out, { query: 'Acme', pages: '2', get_sentiment: 'true', sort_by: 'relevance', start_date: '2026-01-05' });
  assert.throws(() => prepare(twitter, {}), /"query" is required/);
  assert.throws(() => prepare(twitter, { query: 'x', sort_by: 'newest' }), /must be one of most_recent, relevance/);
  assert.throws(() => prepare(twitter, { query: 'x', pages: 'two' }), /must be a number/);
  assert.throws(() => prepare(twitter, { query: 'x', get_sentiment: 'maybe' }), /TRUE or FALSE/);
  assert.deepEqual(prepare(twitter, { query: 'x', get_sentiment: 'no' }), { query: 'x', get_sentiment: 'false' });
});

test('prepareParams keeps unknown parameters so the API can validate them', () => {
  const env = createEnv();
  const twitter = env.fn('findEndpoint')('twitter/posts');
  assert.deepEqual(env.fn('prepareParams')(twitter, { query: 'x', future_param: 'y' }), { query: 'x', future_param: 'y' });
});

test('linkedin/posts needs a query or a filter', () => {
  const env = createEnv();
  const prepare = env.fn('prepareParams');
  const li = env.fn('findEndpoint')('linkedin/posts');
  assert.throws(() => prepare(li, { page: 1 }), /unless a filter/);
  assert.deepEqual(prepare(li, { author: 'williamhgates' }), { author: 'williamhgates' });
});

test('buildRequest builds GET query strings in catalog order and POST bodies', () => {
  const env = createEnv();
  const build = env.fn('buildRequest');
  const find = env.fn('findEndpoint');
  const get = build(find('twitter/posts'), { pages: 2, query: 'Acme & Co', sort_by: 'relevance' });
  assert.equal(get.method, 'get');
  assert.equal(get.url, 'https://apidirect.io/v1/twitter/posts?query=Acme%20%26%20Co&pages=2&sort_by=relevance');
  assert.equal(get.payload, null);
  const post = build(find('web/ai-mode'), { prompt: 'What is API Direct?', country: 'gb' });
  assert.equal(post.method, 'post');
  assert.equal(post.url, 'https://apidirect.io/v1/web/ai-mode');
  assert.deepEqual(post.payload, { prompt: 'What is API Direct?', country: 'gb' });
});

test('sendRequest sets the key header, parses JSON and maps errors', () => {
  const env = createEnv({ fetchHandler: () => ({ code: 200, body: { posts: [] } }) });
  const send = env.fn('sendRequest');
  const data = send({ method: 'get', url: 'https://apidirect.io/v1/x', payload: null }, { apiKey: 'ak_live_1' });
  assert.deepEqual(data, { posts: [] });
  assert.equal(env.fetchLog[0].options.headers['X-API-Key'], 'ak_live_1');
  assert.equal(env.fetchLog[0].options.muteHttpExceptions, true);
  assert.match(env.fetchLog[0].options.headers['X-Client'], /^google-sheets-addon\//);

  env.setFetchHandler(() => ({ code: 401, body: { error: 'Invalid API key', code: 'invalid_api_key' } }));
  assert.throws(() => send({ method: 'get', url: 'u', payload: null }, { apiKey: 'bad' }), (e) => e.status === 401 && /Set API key/.test(e.message));
  env.setFetchHandler(() => ({ code: 402, body: { error: 'Insufficient credit', code: 'insufficient_credit' } }));
  assert.throws(() => send({ method: 'get', url: 'u', payload: null }, { apiKey: 'k' }), /no credit left.*Insufficient credit/);
  env.setFetchHandler(() => ({ code: 400, body: { error: 'query is required', code: 'missing_parameter' } }));
  assert.throws(() => send({ method: 'get', url: 'u', payload: null }, { apiKey: 'k' }), (e) => e.status === 400 && e.code === 'missing_parameter' && /query is required/.test(e.message));
  env.setFetchHandler(() => ({ code: 200, body: 'not json' }));
  assert.throws(() => send({ method: 'get', url: 'u', payload: null }, { apiKey: 'k' }), /not JSON/);
  assert.throws(() => send({ method: 'get', url: 'u', payload: null }, {}), /No API Direct key yet/);
});

test('sendRequest retries concurrency limits and 5xx with backoff, then gives up', () => {
  let calls = 0;
  const env = createEnv({ fetchHandler: () => { calls++; return calls < 3 ? { code: 429, body: { code: 'concurrency_limit_exceeded', error: 'Too many' } } : { code: 200, body: { ok: true } }; } });
  const send = env.fn('sendRequest');
  assert.deepEqual(send({ method: 'get', url: 'u', payload: null }, { apiKey: 'k' }), { ok: true });
  assert.equal(calls, 3);
  assert.deepEqual(env.sleeps, [1000, 2000]);

  calls = 0;
  env.setFetchHandler(() => { calls++; return { code: 503, body: { error: 'down' } }; });
  assert.throws(() => send({ method: 'get', url: 'u', payload: null }, { apiKey: 'k', maxRetries: 2 }), /temporarily unavailable \(503\)/);
  assert.equal(calls, 3);

  calls = 0;
  env.setFetchHandler(() => { calls++; return { code: 429, body: { code: 'rate_limit_exceeded', error: 'slow down' } }; });
  assert.throws(() => send({ method: 'get', url: 'u', payload: null }, { apiKey: 'k' }), /rate limit/);
  assert.equal(calls, 1, 'a hard rate limit is not retried');

  calls = 0;
  env.setFetchHandler(() => { calls++; return { code: 502, body: null }; });
  assert.throws(() => send({ method: 'get', url: 'u', payload: null }, { apiKey: 'k', deadlineMs: 500 }), /502/);
  assert.equal(calls, 1, 'no retry when the deadline would be missed');
});

test('callPath sends JSON bodies and query strings', () => {
  const env = createEnv({ fetchHandler: () => ({ code: 200, body: { saved_search: { id: 'ss1' } } }) });
  const callPath = env.fn('callPath');
  callPath('POST', '/v1/saved-searches', { endpoint: '/v1/twitter/posts', params: { query: 'x' } }, { apiKey: 'k' });
  assert.equal(env.fetchLog[0].url, 'https://apidirect.io/v1/saved-searches');
  assert.equal(env.fetchLog[0].options.method, 'post');
  assert.equal(env.fetchLog[0].options.contentType, 'application/json');
  assert.deepEqual(JSON.parse(env.fetchLog[0].options.payload), { endpoint: '/v1/twitter/posts', params: { query: 'x' } });
  callPath('GET', '/v1/time', { a: '1' }, { apiKey: 'k' });
  assert.equal(env.fetchLog[1].url, 'https://apidirect.io/v1/time?a=1');
  assert.equal(env.fetchLog[1].options.payload, undefined);
});
