'use strict';

const { App, appTester, authData, api, nock } = require('./helpers');

describe('authentication', () => {
  afterEach(() => nock.cleanAll());

  it('sends the API key in X-API-Key and passes when /v1/time answers', async () => {
    api().get('/v1/time').reply(200, { timestamp: '2026-10-05T12:00:00+00:00', unix: 1791201600 });
    const result = await appTester(App.authentication.test, { authData });
    expect(result.timestamp).toBe('2026-10-05T12:00:00+00:00');
  });

  it('turns a 401 into a readable authentication error', async () => {
    api().get('/v1/time').reply(401, { error: 'Invalid API key', code: 'invalid_api_key' });
    await expect(appTester(App.authentication.test, { authData })).rejects.toThrow(/Invalid API key/);
  });

  it('labels the connection with the key tail only', async () => {
    const label = await appTester(App.authentication.connectionLabel, { authData });
    expect(label).toBe('Key ending in 1234');
    expect(label).not.toContain('ak_live');
  });

  it('retries later on 429 concurrency and 5xx', async () => {
    api().get('/v1/time').reply(429, { error: 'Too many concurrent requests', code: 'concurrency_limit_exceeded' });
    await expect(appTester(App.authentication.test, { authData })).rejects.toThrow(/Too many concurrent/);
    api().get('/v1/time').reply(503, { error: 'Service temporarily unavailable', code: 'service_unavailable' });
    await expect(appTester(App.authentication.test, { authData })).rejects.toThrow(/temporarily unavailable/);
  });

  it('explains a 402', async () => {
    api().get('/v1/time').reply(402, { error: 'Free tier used up', code: 'payment_required' });
    await expect(appTester(App.authentication.test, { authData })).rejects.toThrow(/payment method/);
  });
});
