'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createEnv } = require('./helpers/gas-env');

/** A fake API whose list endpoints return whatever the test queued for them, in order. */
function listApi(queues) {
  const calls = [];
  const handler = (url, opts) => {
    calls.push({ url, method: opts.method, payload: opts.payload ? JSON.parse(opts.payload) : null });
    for (const path of Object.keys(queues)) {
      if (url.includes(path)) {
        const queue = queues[path];
        const batch = queue.length > 1 ? queue.shift() : queue[0];
        return { code: 200, body: batch };
      }
    }
    return { code: 404, body: { error: 'unexpected ' + url } };
  };
  return { handler, calls };
}

function forceDue(env) {
  env.userProps.getKeys().filter((k) => k.startsWith('apidirect.schedule.')).forEach((k) => {
    const s = JSON.parse(env.userProps.getProperty(k));
    s.nextRunAt = '2000-01-01T00:00:00.000Z';
    env.userProps.setProperty(k, JSON.stringify(s));
  });
}

test('createSchedule (append) runs once, writes header + rows, installs the trigger and appends only unseen rows later', () => {
  const api = listApi({
    '/v1/twitter/posts': [
      { posts: [{ url: 'u1', title: 'first', likes: 1 }] },
      { posts: [{ url: 'u1', title: 'first again', likes: 5 }, { url: 'u2', title: 'second', likes: 2 }] },
      { posts: [{ url: 'u2', title: 'second', likes: 2 }, { url: 'u1', title: 'first', likes: 1 }] },
    ],
  });
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
  assert.ok(api.calls.every((c) => c.method === 'get' && c.url.includes('/v1/twitter/posts?')), 'append mode calls the endpoint itself');
  const sheet = env.spreadsheet.getSheetByName('Acme X feed');
  const values = sheet.getValues();
  assert.deepEqual(values[0], ['url', 'title', 'likes', 'fetched_at']);
  assert.equal(values[1][0], 'u1');
  assert.match(values[1][3], /^\d{4}-\d{2}-\d{2}T/);
  assert.equal(sheet.frozenRows, 1);

  // Not due yet: nothing fetched or appended.
  const callsBefore = api.calls.length;
  env.fn('runScheduledRefreshes')();
  assert.equal(api.calls.length, callsBefore);
  assert.equal(sheet.getLastRow(), 2);

  // Due: u1 is already in the sheet (even with changed likes), so only u2 is appended.
  forceDue(env);
  env.fn('runScheduledRefreshes')();
  assert.equal(sheet.getLastRow(), 3);
  assert.deepEqual(sheet.getRange(3, 1, 1, 3).getValues(), [['u2', 'second', 2]]);
  const key = env.userProps.getKeys().find((k) => k.startsWith('apidirect.schedule.'));
  const after = JSON.parse(env.userProps.getProperty(key));
  assert.deepEqual(after.keyFields, ['url']);
  assert.equal(after.totalRows, 2);
  assert.ok(Date.parse(after.nextRunAt) > Date.now() + 23 * 3600 * 1000);

  // Due again with nothing new: no rows, and the schedule reports 0.
  forceDue(env);
  env.fn('runScheduledRefreshes')();
  assert.equal(sheet.getLastRow(), 3);
  assert.equal(env.fn('listSchedules')()[0].lastRows, 0);
});

test('append mode keeps the identifying columns even when the user picked other fields, and reads keys back from the sheet', () => {
  const api = listApi({
    '/v1/instagram/user/followers': [
      { followers: [{ user_id: '17841400000000001', username: 'ana', full_name: 'Ana' }] },
      { followers: [{ user_id: '17841400000000001', username: 'ana', full_name: 'Ana' }, { user_id: '17841400000000002', username: 'bo', full_name: 'Bo' }] },
    ],
  });
  const env = createEnv({ fetchHandler: api.handler });
  env.setApiKey('ak_live_test');
  env.fn('createSchedule')({ name: 'Followers', endpoint: 'instagram/user/followers', params: { username: 'acme' }, intervalHours: 24, mode: 'append', fields: ['full_name'], sheetName: 'Followers' });
  const sheet = env.spreadsheet.getSheetByName('Followers');
  assert.deepEqual(sheet.getValues()[0], ['full_name', 'user_id', 'fetched_at'], 'the id column is added after the chosen ones');
  assert.equal(sheet.getRange(2, 2).getNumberFormat(), '@', 'long numeric ids are written as text');
  assert.equal(sheet.getValues()[1][1], '17841400000000001');

  // Simulate a lost add-on state: the sheet alone must still prevent duplicates.
  forceDue(env);
  env.fn('runScheduledRefreshes')();
  assert.equal(sheet.getLastRow(), 3);
  assert.deepEqual(sheet.getRange(3, 1, 1, 2).getValues(), [['Bo', '17841400000000002']]);
});

test('rows without any identifying field are matched on their whole content', () => {
  const api = listApi({
    '/v1/amazon/seller/reviews': [
      { reviews: [{ rating: 5, review_text: 'Great', author_name: '', review_date: '' }] },
      { reviews: [{ rating: 5, review_text: 'Great', author_name: '', review_date: '' }, { rating: 1, review_text: 'Bad', author_name: '', review_date: '' }] },
    ],
  });
  const env = createEnv({ fetchHandler: api.handler });
  env.setApiKey('ak_live_test');
  env.fn('createSchedule')({ name: 'Reviews', endpoint: 'amazon/seller/reviews', params: { seller_id: 'A1' }, intervalHours: 24, mode: 'append', sheetName: 'Reviews' });
  const sheet = env.spreadsheet.getSheetByName('Reviews');
  assert.equal(sheet.getLastRow(), 2);
  forceDue(env);
  env.fn('runScheduledRefreshes')();
  assert.equal(sheet.getLastRow(), 3, 'the identical review is skipped, the new one appended');
  assert.equal(sheet.getValues()[2][1], 'Bad');
});

test('createSchedule (replace) rewrites the whole table and notes the refresh time', () => {
  const api = listApi({ '/v1/reddit/posts': [{ posts: [{ url: 'r1', title: 'a' }, { url: 'r2', title: 'b' }] }] });
  const env = createEnv({ fetchHandler: api.handler });
  env.setApiKey('ak_live_test');
  env.fn('createSchedule')({ name: 'Reddit', endpoint: 'reddit/posts', params: { query: 'Acme' }, intervalHours: 6, mode: 'replace', fields: ['title', 'url'] });
  const sheet = env.spreadsheet.getSheetByName('Reddit');
  assert.deepEqual(sheet.getValues(), [['title', 'url'], ['a', 'r1'], ['b', 'r2']]);
  assert.match(sheet.getRange(1, 1).getNote(), /Refreshed by API Direct/);
  sheet.getRange(10, 10, 1, 1).setValues([['stale']]);
  env.fn('runScheduleNow')(env.fn('listSchedules')()[0].id);
  assert.deepEqual(sheet.getValues(), [['title', 'url'], ['a', 'r1'], ['b', 'r2']], 'stale cells are gone');
});

test('schedules validate their inputs', () => {
  const api = listApi({});
  const env = createEnv({ fetchHandler: api.handler });
  const create = env.fn('createSchedule');
  assert.throws(() => create({ endpoint: 'twitter/posts', params: { query: 'x' }, intervalHours: 24 }), /No API Direct key yet/);
  env.setApiKey('ak_live_test');
  assert.throws(() => create({ endpoint: 'twitter/user', params: { username: 'nasa' }, intervalHours: 24, mode: 'append' }), /single result.*Replace/);
  assert.throws(() => create({ endpoint: 'twitter/posts', params: { query: 'x' }, intervalHours: 2 }), /how often/);
  assert.throws(() => create({ endpoint: 'twitter/posts', params: {}, intervalHours: 24 }), /"query" is required/);
  assert.equal(env.triggers.length, 0);
  assert.equal(env.fn('listSchedules')().length, 0);
});

test('a failing first run keeps nothing and reports the error', () => {
  const env = createEnv({ fetchHandler: () => ({ code: 400, body: { error: 'upstream broke', code: 'bad' } }) });
  env.setApiKey('ak_live_test');
  assert.throws(() => env.fn('createSchedule')({ endpoint: 'twitter/posts', params: { query: 'x' }, intervalHours: 24 }), /upstream broke/);
  assert.equal(env.fn('listSchedules')().length, 0);
  assert.equal(env.triggers.length, 0);
});

test('trigger runs record failures, keep others going, and deleting the last schedule removes the trigger', () => {
  const api = listApi({ '/v1/twitter/posts': [{ posts: [{ url: 'u1' }] }], '/v1/reddit/posts': [{ posts: [{ url: 'r1', title: 'a' }] }] });
  const env = createEnv({ fetchHandler: api.handler });
  env.setApiKey('ak_live_test');
  env.fn('createSchedule')({ name: 'A', endpoint: 'twitter/posts', params: { query: 'a' }, intervalHours: 1, mode: 'append', sheetName: 'A' });
  env.fn('createSchedule')({ name: 'B', endpoint: 'reddit/posts', params: { query: 'b' }, intervalHours: 1, mode: 'replace', sheetName: 'B' });
  assert.equal(env.triggers.length, 1, 'one trigger serves every schedule');
  forceDue(env);
  env.setFetchHandler((url, opts) => (url.includes('/v1/twitter/posts') ? { code: 402, body: { error: 'Insufficient credit' } } : api.handler(url, opts)));
  env.fn('runScheduledRefreshes')();
  const list = env.fn('listSchedules')();
  assert.equal(list[0].lastStatus, 'error');
  assert.match(list[0].lastMessage, /free tier used up/);
  assert.equal(list[1].lastStatus, 'ok');
  assert.ok(Date.parse(list[0].nextRunAt) < Date.now() + 2 * 3600 * 1000, 'failed schedules retry within the hour');

  env.fn('deleteSchedule')(list[0].id);
  assert.equal(env.triggers.length, 1);
  assert.equal(env.fn('deleteSchedule')(list[1].id).length, 0);
  assert.equal(env.triggers.length, 0);
});

test('schedules are kept per spreadsheet and per user', () => {
  const api = listApi({ '/v1/reddit/posts': [{ posts: [] }] });
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
  const api = listApi({ '/v1/news/articles': [{ articles: [] }] });
  const env = createEnv({ fetchHandler: api.handler });
  env.setApiKey('ak_live_test');
  env.fn('createSchedule')({ name: 'Quiet', endpoint: 'news/articles', params: { query: 'nothing' }, intervalHours: 24, mode: 'append', sheetName: 'Quiet' });
  const header = env.spreadsheet.getSheetByName('Quiet').getValues()[0];
  assert.ok(header.includes('fetched_at'));
  assert.ok(header.includes('url'), 'the identifying column is there from the start');
  assert.ok(header.length > 5);
});
