'use strict';

const { App, appTester, authData, api, tweet, nock } = require('./helpers');
const { itemId } = require('../src/lib/build');

describe('generated polling triggers', () => {
  afterEach(() => nock.cleanAll());

  it('polls the endpoint with the step inputs and ids items by url, newest first', async () => {
    api()
      .get('/v1/twitter/posts')
      .query({ query: 'Acme', sort_by: 'most_recent', pages: '2' })
      .reply(200, { posts: [tweet(3), tweet(2), tweet(1)], count: 3, query: 'Acme' });

    const results = await appTester(App.triggers.new_twitter_posts.operation.perform, {
      authData,
      inputData: { query: 'Acme', sort_by: 'most_recent', pages: 2 },
      meta: { isLoadingSample: false },
    });
    expect(results.map((r) => r.id)).toEqual([tweet(3).url, tweet(2).url, tweet(1).url]);
    expect(results[0].date).toBe('2026-10-05T12:03:00Z');
    expect(results[0].snippet).toBe(tweet(3).snippet);
  });

  it('sends only the fields the user filled and keeps booleans as strings', async () => {
    let query;
    api()
      .get('/v1/reddit/posts')
      .query((q) => {
        query = q;
        return true;
      })
      .reply(200, { posts: [{ ...tweet(1), url: 'https://reddit.com/r/x/1' }], count: 1 });

    const results = await appTester(App.triggers.new_reddit_posts.operation.perform, {
      authData,
      inputData: { query: 'acme crm', get_sentiment: true, sort_by: '', pages: 1 },
    });
    expect(query).toEqual({ query: 'acme crm', get_sentiment: 'true' }); // pages is not a field of this endpoint, so it is dropped
    expect(results).toEqual([{ id: 'https://reddit.com/r/x/1', ...tweet(1), url: 'https://reddit.com/r/x/1', date: '2026-10-05T12:01:00Z' }]);
  });

  it('falls back to the next id field when the first is missing', async () => {
    api()
      .get('/v1/instagram/user/followers')
      .query(true)
      .reply(200, {
        followers: [
          { user_id: '123', username: 'first', url: 'https://instagram.com/first' },
          { username: 'second', url: 'https://instagram.com/second' },
          { url: 'https://instagram.com/third' },
        ],
        count: 3,
      });
    const results = await appTester(App.triggers.new_instagram_user_followers.operation.perform, { authData, inputData: { username: 'acme' } });
    expect(results.map((r) => r.id)).toEqual(['123', 'second', 'https://instagram.com/third']);
  });

  it('joins grouped id fields and hashes items with no id field at all', async () => {
    const review = { author_name: 'Ann', review_date: '2026-10-01', review_text: 'Great', rating: 5 };
    api()
      .get('/v1/amazon/seller/reviews')
      .query(true)
      .reply(200, { reviews: [review, { rating: 1, review_text: '' }], count: 2 });
    const results = await appTester(App.triggers.new_amazon_seller_reviews.operation.perform, { authData, inputData: { seller_id: 'A1' } });
    expect(results[0].id).toBe('author_name=Ann|review_date=2026-10-01|review_text=Great');
    expect(results[1].id).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(results[1].id).toBe(itemId([['author_name', 'review_date', 'review_text']], { rating: 1, review_text: '' }));
  });

  it('turns an id the API already provides into a string', async () => {
    api().get('/v1/facebook/locations').query(true).reply(200, { results: [{ id: 1234567890, name: 'Acme HQ' }], count: 1 });
    const results = await appTester(App.triggers.new_facebook_locations.operation.perform, { authData, inputData: { query: 'Acme' } });
    expect(results).toEqual([{ id: '1234567890', name: 'Acme HQ' }]);
  });

  it('returns nothing when the endpoint has no results', async () => {
    api().get('/v1/youtube/posts').query(true).reply(200, { posts: [], count: 0 });
    expect(await appTester(App.triggers.new_youtube_posts.operation.perform, { authData, inputData: { query: 'ai' } })).toEqual([]);
    api().get('/v1/youtube/posts').query(true).reply(200, { count: 0 });
    expect(await appTester(App.triggers.new_youtube_posts.operation.perform, { authData, inputData: { query: 'ai' } })).toEqual([]);
  });

  it('surfaces API errors with their code', async () => {
    api().get('/v1/linkedin/jobs').query(true).reply(400, { error: 'query is required', code: 'missing_parameter' });
    await expect(appTester(App.triggers.new_linkedin_jobs.operation.perform, { authData, inputData: {} })).rejects.toThrow(/query is required/);
  });
});

describe('itemId', () => {
  it('is stable regardless of key order and ignores empty or structured values', () => {
    const a = { x: 1, y: { b: 2, a: 1 }, z: [1, 2] };
    const b = { z: [1, 2], y: { a: 1, b: 2 }, x: 1 };
    expect(itemId([], a)).toBe(itemId([], b));
    expect(itemId(['flag', 'meta', 'name'], { flag: true, meta: { id: 1 }, name: ' Bob ' })).toBe('Bob');
    expect(itemId(['count'], { count: 0 })).toBe('0');
  });
});
