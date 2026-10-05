'use strict';

const { App, appTester, authData, api, tweet, nock } = require('./helpers');

describe('creates (list endpoints)', () => {
  afterEach(() => nock.cleanAll());

  it('Search Twitter Posts sends only its own fields as the query string', async () => {
    api()
      .get('/v1/twitter/posts')
      .query({ query: 'Acme', sort_by: 'most_recent', pages: '2', get_sentiment: 'true' })
      .reply(200, { count: 2, pages: 2, posts: [tweet(1), tweet(2)] });
    const result = await appTester(App.creates.twitter_posts.operation.perform, {
      authData,
      inputData: { query: 'Acme', sort_by: 'most_recent', pages: 2, get_sentiment: true, unrelated: 'x', posted_ago: '' },
    });
    expect(result.count).toBe(2);
    expect(result.posts).toHaveLength(2);
    expect(result.posts[0].date).toBe('2026-10-05T12:01:00Z');
  });

  it('surfaces the API error message on 400', async () => {
    api().get('/v1/twitter/posts').query(true).reply(400, { error: 'Missing required parameter: query', code: 'missing_parameter' });
    await expect(
      appTester(App.creates.twitter_posts.operation.perform, { authData, inputData: {} }),
    ).rejects.toThrow(/Missing required parameter: query/);
  });

  it('Ask Google AI Mode posts long prompts as JSON', async () => {
    const prompt = 'x'.repeat(2000);
    api().post('/v1/web/ai-mode', { prompt, country: 'us' }).reply(200, { reply_parts: ['long'], reference_links: [], session_token: 't2' });
    const result = await appTester(App.creates.web_ai_mode.operation.perform, { authData, inputData: { prompt, country: 'us' } });
    expect(result.reply_parts).toEqual(['long']);
  });

  it('Run Batch Requests parses the JSON array and returns per-item results', async () => {
    api().post('/v1/batch', { requests: [{ endpoint: '/v1/twitter/user', params: { username: 'naval' } }] }).reply(200, { results: [{ index: 0, endpoint: '/v1/twitter/user', status: 200, body: { user: { username: 'naval' } } }], summary: { total: 1, succeeded: 1, failed: 0, duration_ms: 10 } });
    const result = await appTester(App.creates.batch_requests.operation.perform, { authData, inputData: { requests: '[{"endpoint": "/v1/twitter/user", "params": {"username": "naval"}}]' } });
    expect(result.summary.succeeded).toBe(1);
    await expect(appTester(App.creates.batch_requests.operation.perform, { authData, inputData: { requests: 'not json' } })).rejects.toThrow(/JSON array/);
  });

  it('Check API Key returns the server time', async () => {
    api().get('/v1/time').reply(200, { timestamp: '2026-10-05T12:00:00+00:00', unix: 1791201600, formatted: '2026-10-05 12:00:00 UTC' });
    const result = await appTester(App.creates.check_api_key.operation.perform, { authData, inputData: {} });
    expect(result.unix).toBe(1791201600);
    expect(result.formatted).toBe('2026-10-05T12:00:00Z');
  });

  it('Search Facebook Group Posts is wired even while the API marks it suspended', async () => {
    api().get('/v1/facebook/group/search').query(true).reply(503, { error: 'Endpoint temporarily unavailable', code: 'endpoint_suspended' });
    await expect(appTester(App.creates.facebook_group_search.operation.perform, { authData, inputData: { group_id: '1', query: 'x' } })).rejects.toThrow(/temporarily unavailable/);
    expect(App.creates.facebook_group_search.display.description).toMatch(/Currently offline/);
  });

  it('Ask Google AI Mode returns the answer object', async () => {
    api().get('/v1/web/ai-mode').query({ prompt: 'best crm' }).reply(200, { reply_parts: ['x'], reference_links: [], session_token: 't' });
    const result = await appTester(App.creates.web_ai_mode.operation.perform, { authData, inputData: { prompt: 'best crm' } });
    expect(result.session_token).toBe('t');
  });
});

describe('searches (detail endpoints)', () => {
  afterEach(() => nock.cleanAll());

  it('Find Twitter User unwraps the profile and returns it as a one-item list', async () => {
    api().get('/v1/twitter/user').query({ username: 'naval' }).reply(200, { user: { username: 'naval', followers: 2100000, created_at: '2007-01-01 00:00:00' } });
    const result = await appTester(App.searches.find_twitter_user.operation.perform, { authData, inputData: { username: 'naval' } });
    expect(result).toEqual([{ username: 'naval', followers: 2100000, created_at: '2007-01-01T00:00:00Z' }]);
  });

  it('Find LinkedIn Person returns the body when there is no wrapper', async () => {
    api().get('/v1/linkedin/person').query({ url: 'reidhoffman' }).reply(200, { name: 'Reid Hoffman', headline: 'Co-founder' });
    const result = await appTester(App.searches.find_linkedin_person.operation.perform, { authData, inputData: { url: 'reidhoffman' } });
    expect(result[0].name).toBe('Reid Hoffman');
  });
});
