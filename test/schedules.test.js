'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createEnv } = require('./helpers/gas-env');

function savedSearchApi(runResults) {
  const calls = [];
  const handler = (url, opts) => {
    calls.push({ url, method: opts.method, payload: opts.payload ? JSON.parse(opts.payload) : null });
    if (url.endsWith('/v1/saved-searches') && opts.method === 'post') {
      return { code: 201, body: { saved_search: { id: 'ss_1', name: 'x' } } };
    }
    if (/\/v1\/saved-searches\/ss_1\/run$/.test(url)) {
      const batch = runResults.shift() || [];
      return { code: 200, body: { results: batch, count: batch.length, total: batch.length, seen: 0, run_at: '2026-10-05T12:00:00Z' } };
    }
    if (/\/v1\/saved-searches\/ss_1$/.test(url) && opts.method === 'delete') return { code: 200, body: { id: 'ss_1' } };
    if (url.includes('/v1/reddit/posts')) return { code: 200, body: { posts: [{ url: 'r1', title: 'a' }, { url: 'r2', title: 'b' }] } };
    if (url.includes('/v1/web/ai-mode')) return { code: 200, body: { reply_parts: [{ text: 'Answer' }] } };
    return { code: 404, body: { error: 'unexpected ' + url } };
  };
  return { handler, calls };
}

test('createSchedule (append) saves a search, runs once, writes header + rows and installs the trigger', () => {
  const api = savedSearchApi([[{ id: 'p1', url: 'u1', title: 'first', likes: 1 }], [{ id: 'p2', url: 'u2', title: 'second', likes: 2 }], []]);
  const env = createEnv({ fetchHandler: api.handler });
  env.setApiKey('ak_live_test');
  const schedules = env.fn('createSchedule')({ name: 'Acme on X', endpoint: 'twitter/posts', params: { query: 'Acme', pages: 1 }, intervalHours: 24, mode: 'append', sheetName: 'Acme: X/feed' });
  assert.equal(schedules.length, 1);
  const s = schedules[0];
  assert.equal(s.sheetName, 'Acme X feed');
  assert.equal(s.endpointLabel, 'Twitter/X · Search Posts');
  assert.equal(s.lastStatus, 'ok');
  assert.equal(s.lastRows, 1);
  assert.equal(s.triggerActive, true);
  assert.equal(env.triggers.length, 1);
  assert.equal(env.triggers[0].getHandlerFunction(), 'runScheduledRefreshes');
  assert.equal(env.triggers[0].hours, 1);
  const create = api.calls.find((c) => c.url.endsWith('/v1/saved-searches'));
  assert.deepEqual(create.payload, { endpoint: '/v1/twitter/posts', params: { query: 'Acme', pages: '1' }, name: 'Google Sheets · Acme on X' });
  const run = api.calls.find((c) => /run$/.test(c.url));
  assert.deepEqual(run.payload, { mark_seen: true });
  const sheet = env.spreadsheet.getSheetByName('Acme X feed');
  const values = sheet.getValues();
  assert.deepEqual(values[0], ['id', 'url', 'title', 'likes', 'fetched_at']);
  assert.equal(values[1][1], 'u1');
  assert.match(values[1][4], /^\d{4}-\d{2}-\d{2}T/);
  assert.equal(sheet.frozenRows, 1);

  // Not due yet: nothing appended.
  env.fn('runScheduledRefreshes')();
  assert.equal(sheet.getLastRow(), 2);

  // Force it due: the second batch is appended under the same columns.
  const key = env.userProps.getKeys().find((k) => k.startsWith('apidirect.schedule.'));
  const stored = JSON.parse(env.userProps.getProperty(key));
  stored.nextRunAt = new Date(Date.now() - 1000).toISOString();
  env.userProps.setProperty(key, JSON.stringify(stored));
  env.fn('runScheduledRefreshes')();
  assert.equal(sheet.getLastRow(), 3);
  assert.deepEqual(sheet.getRange(3, 1, 1, 4).getValues(), [['p2', 'u2', 'second', 2]]);
  const after = JSON.parse(env.userProps.getProperty(key));
  assert.equal(after.totalRows, 2);
  assert.ok(Date.parse(after.nextRunAt) > Date.now() + 23 * 3600 * 1000);
});

test('createSchedule (replace) rewrites the whole table and notes the refresh time', () => {
  const api = savedSearchApi([]);
  const env = createEnv({ fetchHandler: api.handler });
  env.setApiKey('ak_live_test');
  env.fn('createSchedule')({ name: 'Reddit', endpoint: 'reddit/posts', params: { query: 'Acme' }, intervalHours: 6, mode: 'replace', fields: ['title', 'url'] });
  const sheet = env.spreadsheet.getSheetByName('Reddit');
  assert.deepEqual(sheet.getValues(), [['title', 'url'], ['a', 'r1'], ['b', 'r2']]);
  assert.match(sheet.getRange(1, 1).getNote(), /Refreshed by API Direct/);
  assert.ok(!api.calls.some((c) => c.url.endsWith('/v1/saved-searches')), 'replace mode uses no saved search');
  sheet.getRange(10, 10, 1, 1).setValues([['stale']]);
  env.fn('runScheduleNow')(env.fn('listSchedules')()[0].id);
  assert.deepEqual(sheet.getValues(), [['title', 'url'], ['a', 'r1'], ['b', 'r2']], 'stale cells are gone');
});

test('schedules validate their inputs', () => {
  const api = savedSearchApi([]);
  const env = createEnv({ fetchHandler: api.handler });
  const create = env.fn('createSchedule');
  assert.throws(() => create({ endpoint: 'twitter/posts', params: { query: 'x' }, intervalHours: 24 }), /No API Direct key yet/);
  env.setApiKey('ak_live_test');
  assert.throws(() => create({ endpoint: 'twitter/user', params: { username: 'nasa' }, intervalHours: 24, mode: 'append' }), /cannot be polled.*Replace/);
  assert.throws(() => create({ endpoint: 'twitter/posts', params: { query: 'x' }, intervalHours: 2 }), /how often/);
  assert.throws(() => create({ endpoint: 'twitter/posts', params: {}, intervalHours: 24 }), /"query" is required/);
  assert.equal(env.triggers.length, 0);
  assert.equal(env.fn('listSchedules')().length, 0);
});

test('a failing first run removes the saved search and reports the error', () => {
  const api = savedSearchApi([]);
  const env = createEnv({ fetchHandler: (url, opts) => (/run$/.test(url) ? { code: 400, body: { error: 'upstream broke', code: 'bad' } } : api.handler(url, opts)) });
  env.setApiKey('ak_live_test');
  assert.throws(() => env.fn('createSchedule')({ endpoint: 'twitter/posts', params: { query: 'x' }, intervalHours: 24 }), /upstream broke/);
  assert.ok(api.calls.some((c) => c.method === 'delete' && /ss_1$/.test(c.url)), 'saved search deleted');
  assert.equal(env.fn('listSchedules')().length, 0);
  assert.equal(env.triggers.length, 0);
});

test('trigger runs record failures, keep others going, and deleting the last schedule removes the trigger', () => {
  const api = savedSearchApi([[{ id: 'p1', url: 'u1' }]]);
  const env = createEnv({ fetchHandler: api.handler });
  env.setApiKey('ak_live_test');
  env.fn('createSchedule')({ name: 'A', endpoint: 'twitter/posts', params: { query: 'a' }, intervalHours: 1, mode: 'append', sheetName: 'A' });
  env.fn('createSchedule')({ name: 'B', endpoint: 'reddit/posts', params: { query: 'b' }, intervalHours: 1, mode: 'replace', sheetName: 'B' });
  assert.equal(env.triggers.length, 1, 'one trigger serves every schedule');
  env.userProps.getKeys().filter((k) => k.startsWith('apidirect.schedule.')).forEach((k) => {
    const s = JSON.parse(env.userProps.getProperty(k));
    s.nextRunAt = '2000-01-01T00:00:00.000Z';
    env.userProps.setProperty(k, JSON.stringify(s));
  });
  env.setFetchHandler((url, opts) => (/run$/.test(url) ? { code: 402, body: { error: 'Insufficient credit' } } : api.handler(url, opts)));
  env.fn('runScheduledRefreshes')();
  const list = env.fn('listSchedules')();
  assert.equal(list[0].lastStatus, 'error');
  assert.match(list[0].lastMessage, /no credit left/);
  assert.equal(list[1].lastStatus, 'ok');
  assert.ok(Date.parse(list[0].nextRunAt) < Date.now() + 2 * 3600 * 1000, 'failed schedules retry within the hour');

  env.fn('deleteSchedule')(list[0].id);
  assert.equal(env.triggers.length, 1);
  assert.equal(env.fn('deleteSchedule')(list[1].id).length, 0);
  assert.equal(env.triggers.length, 0);
  assert.ok(api.calls.some((c) => c.method === 'delete'), 'saved search deleted with its schedule');
});

test('schedules are kept per spreadsheet and per user', () => {
  const api = savedSearchApi([[]]);
  const env = createEnv({ fetchHandler: api.handler, spreadsheetId: 'ss-A' });
  env.setApiKey('ak_live_test');
  env.fn('createSchedule')({ name: 'A', endpoint: 'reddit/posts', params: { query: 'a' }, intervalHours: 24, mode: 'replace', sheetName: 'A' });
  assert.equal(env.fn('listSchedules')().length, 1);
  const other = createEnv({ fetchHandler: api.handler, spreadsheetId: 'ss-B' });
  Object.entries(env.userProps.getProperties()).forEach(([k, v]) => other.userProps.setProperty(k, v));
  assert.equal(other.fn('listSchedules')().length, 0);
  assert.ok(env.userProps.getKeys().some((k) => k.startsWith('apidirect.schedule.ss-A.')));
});

test('a schedule with no results yet writes the catalog header so the sheet is not blank', () => {
  const api = savedSearchApi([[]]);
  const env = createEnv({ fetchHandler: api.handler });
  env.setApiKey('ak_live_test');
  env.fn('createSchedule')({ name: 'Quiet', endpoint: 'news/articles', params: { query: 'nothing' }, intervalHours: 24, mode: 'append', sheetName: 'Quiet' });
  const header = env.spreadsheet.getSheetByName('Quiet').getValues()[0];
  assert.ok(header.includes('fetched_at'));
  assert.ok(header.length > 5);
});
