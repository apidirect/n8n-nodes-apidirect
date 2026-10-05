'use strict';

const { App, appTester, authData, api, savedSearch, tweet, nock } = require('./helpers');

const withIds = (items) => items.map((t) => ({ id: t.url, ...t }));

describe('generated polling triggers', () => {
  afterEach(() => nock.cleanAll());

  it('reuses the saved search whose endpoint and params match, then runs it without marking seen', async () => {
    const existing = savedSearch({ params: { query: 'Acme', sort_by: 'most_recent', pages: '1' } });
    api().get('/v1/saved-searches').reply(200, { saved_searches: [savedSearch({ id: 'other', endpoint: '/v1/reddit/posts' }), existing], count: 2 });
    api()
      .post(`/v1/saved-searches/${existing.id}/run`, { include_seen: true, mark_seen: false })
      .reply(200, { saved_search: existing, results: withIds([tweet(2)]), seen_results: withIds([tweet(1)]), count: 1, total: 2, seen: 1, run_at: 'x' });

    const results = await appTester(App.triggers.new_twitter_posts.operation.perform, {
      authData,
      inputData: { query: 'Acme', sort_by: 'most_recent', pages: 1 },
      meta: { isLoadingSample: false },
    });
    expect(results.map((r) => r.id)).toEqual([tweet(2).url, tweet(1).url]);
    expect(results[0].date).toBe('2026-10-05T12:02:00Z');
  });

  it('creates the saved search on first use with a deterministic name', async () => {
    api().get('/v1/saved-searches').reply(200, { saved_searches: [], count: 0 });
    let created;
    api()
      .post('/v1/saved-searches', (body) => {
        created = body;
        return body.endpoint === '/v1/reddit/posts' && body.params.query === 'acme crm';
      })
      .reply(201, { saved_search: savedSearch({ id: 'new-id', endpoint: '/v1/reddit/posts', params: { query: 'acme crm' } }) });
    api().post('/v1/saved-searches/new-id/run').reply(200, { results: withIds([{ ...tweet(1), url: 'https://reddit.com/r/x/1' }]), count: 1 });

    const results = await appTester(App.triggers.new_reddit_posts.operation.perform, { authData, inputData: { query: 'acme crm' } });
    expect(results).toHaveLength(1);
    expect(created.name).toMatch(/^Zapier · New Reddit Post Matching Search · [0-9a-f]{10}$/);
    expect(created.name.length).toBeLessThanOrEqual(100);
  });

  it('matches params as strings (the API stores them that way)', async () => {
    const existing = savedSearch({ endpoint: '/v1/youtube/posts', params: { query: 'ai', pages: '3' } });
    api().get('/v1/saved-searches').reply(200, { saved_searches: [existing], count: 1 });
    api().post(`/v1/saved-searches/${existing.id}/run`).reply(200, { results: [], count: 0 });
    const results = await appTester(App.triggers.new_youtube_posts.operation.perform, { authData, inputData: { query: 'ai', pages: 3 } });
    expect(results).toEqual([]);
  });
});

describe('saved search trigger and dropdown', () => {
  afterEach(() => nock.cleanAll());

  it('New Saved Search Result previews without marking seen while loading samples', async () => {
    const s = savedSearch();
    api().post(`/v1/saved-searches/${s.id}/run`, { include_seen: true, mark_seen: false }).reply(200, { results: [], seen_results: withIds([tweet(1)]) });
    const results = await appTester(App.triggers.new_saved_search_result.operation.perform, {
      authData,
      inputData: { saved_search_id: s.id, mark_seen: true },
      meta: { isLoadingSample: true },
    });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe(tweet(1).url);
  });

  it('New Saved Search Result marks seen only when asked, on a real poll', async () => {
    const s = savedSearch();
    api().post(`/v1/saved-searches/${s.id}/run`, { include_seen: false, mark_seen: true }).reply(200, { results: withIds([tweet(3)]) });
    const results = await appTester(App.triggers.new_saved_search_result.operation.perform, {
      authData,
      inputData: { saved_search_id: s.id, mark_seen: true },
      meta: { isLoadingSample: false, isPopulatingDedupe: false },
    });
    expect(results[0].id).toBe(tweet(3).url);
  });

  it('describes output fields from the saved search endpoint', async () => {
    const s = savedSearch({ endpoint: '/v1/reddit/posts' });
    api().get(`/v1/saved-searches/${s.id}`).reply(200, { saved_search: s });
    const [idField, dynamicFields] = App.triggers.new_saved_search_result.operation.outputFields;
    expect(idField).toEqual({ key: 'id', label: 'ID', primary: true });
    const fields = await appTester(dynamicFields, { authData, inputData: { saved_search_id: s.id } });
    expect(fields.some((f) => f.key === 'subreddit')).toBe(true);
    expect(fields.some((f) => f.key === 'id')).toBe(false);
  });

  it('the hidden list trigger labels nameless searches by endpoint', async () => {
    api().get('/v1/saved-searches').reply(200, { saved_searches: [savedSearch({ name: '' })], count: 1 });
    const results = await appTester(App.triggers.saved_search_list.operation.perform, { authData });
    expect(results[0].label).toBe('/v1/twitter/posts (7c9e6679)');
  });
});

describe('saved search actions', () => {
  afterEach(() => nock.cleanAll());

  it('Create Saved Search posts endpoint, params and name', async () => {
    api().post('/v1/saved-searches', { endpoint: '/v1/twitter/posts', params: { query: 'Acme' }, name: 'Acme' }).reply(201, { saved_search: savedSearch() });
    const result = await appTester(App.creates.create_saved_search.operation.perform, { authData, inputData: { endpoint: '/v1/twitter/posts', params: { query: 'Acme' }, name: 'Acme' } });
    expect(result.id).toBe(savedSearch().id);
  });

  it('Update Saved Search sends only filled fields and refuses an empty update', async () => {
    const s = savedSearch();
    api().patch(`/v1/saved-searches/${s.id}`, { name: 'Renamed', reset_seen: true }).reply(200, { saved_search: savedSearch({ name: 'Renamed' }) });
    const result = await appTester(App.creates.update_saved_search.operation.perform, { authData, inputData: { saved_search_id: s.id, name: 'Renamed', reset_seen: true, params: {} } });
    expect(result.name).toBe('Renamed');
    await expect(appTester(App.creates.update_saved_search.operation.perform, { authData, inputData: { saved_search_id: s.id } })).rejects.toThrow(/at least one/);
  });

  it('Run Saved Search defaults to marking seen and normalizes dates', async () => {
    const s = savedSearch();
    api().post(`/v1/saved-searches/${s.id}/run`, { include_seen: false, mark_seen: true }).reply(200, { saved_search: s, results: withIds([tweet(1)]), count: 1, total: 1, seen: 0, run_at: '2026-10-05T12:15:00+00:00' });
    const result = await appTester(App.creates.run_saved_search.operation.perform, { authData, inputData: { saved_search_id: s.id } });
    expect(result.results[0].date).toBe('2026-10-05T12:01:00Z');
  });

  it('Delete Saved Search returns the API confirmation', async () => {
    const s = savedSearch();
    api().delete(`/v1/saved-searches/${s.id}`).reply(200, { message: 'Saved search deleted', id: s.id });
    const result = await appTester(App.creates.delete_saved_search.operation.perform, { authData, inputData: { saved_search_id: s.id } });
    expect(result.message).toBe('Saved search deleted');
  });

  it('Find Saved Search prefers exact name matches', async () => {
    api().get('/v1/saved-searches').reply(200, { saved_searches: [savedSearch({ id: 'a', name: 'Acme mentions' }), savedSearch({ id: 'b', name: 'Acme' })], count: 2 });
    const result = await appTester(App.searches.find_saved_search.operation.perform, { authData, inputData: { name: 'acme' } });
    expect(result.map((s) => s.id)).toEqual(['b']);
  });
});
