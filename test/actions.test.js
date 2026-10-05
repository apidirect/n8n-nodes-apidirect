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
