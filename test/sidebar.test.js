'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createEnv } = require('./helpers/gas-env');

const POSTS = { count: 2, posts: [{ url: 'u1', title: 't1', likes: 1 }, { url: 'u2', title: 't2', likes: 2 }] };

test('getSidebarData returns the trimmed catalog, settings, schedules and the active cell', () => {
  const env = createEnv();
  env.setApiKey('ak_live_testkey12345');
  env.spreadsheet.setActive('Sheet1', 3, 2);
  const data = env.fn('getSidebarData')();
  assert.equal(data.catalog.endpoints.length, 101);
  assert.equal(data.catalog.endpoints.filter((e) => e.suspended).length, 1, 'the suspended flag reaches the sidebar');
  assert.ok(data.catalog.endpoints[0].params);
  assert.equal(data.catalog.endpoints[0].path, undefined, 'internal fields are left out');
  assert.equal(data.settings.hasKey, true);
  assert.equal(data.settings.maskedKey, 'ak_live_…2345');
  assert.deepEqual(data.schedules, []);
  assert.equal(data.activeCell, 'Sheet1!B3');
  assert.equal(data.intervals.length, 5);
});

test('runToSheet writes at the selected cell with a header row', () => {
  const env = createEnv({ fetchHandler: () => ({ code: 200, body: POSTS }) });
  env.setApiKey('ak_live_test');
  env.spreadsheet.setActive('Sheet1', 2, 3);
  const result = env.fn('runToSheet')({ endpoint: 'twitter/posts', params: { query: 'Acme' }, destination: 'active' });
  assert.deepEqual(result, { rows: 2, columns: 3, range: 'Sheet1!C2:E4', sheet: 'Sheet1', count: 2 });
  const sheet = env.spreadsheet.getSheetByName('Sheet1');
  assert.deepEqual(sheet.getRange(2, 3, 3, 3).getValues(), [['url', 'title', 'likes'], ['u1', 't1', 1], ['u2', 't2', 2]]);
});

test('runToSheet accepts Sheet!A1 destinations, creates sheets, selects fields and clears below', () => {
  const env = createEnv({ fetchHandler: () => ({ code: 200, body: POSTS }) });
  env.setApiKey('ak_live_test');
  const run = env.fn('runToSheet');
  const result = run({ endpoint: 'twitter/posts', params: { query: 'Acme' }, destination: "'Pulls'!B2", fields: ['likes', 'url'], headers: false, maxRows: 1 });
  assert.equal(result.range, 'Pulls!B2:C2');
  const sheet = env.spreadsheet.getSheetByName('Pulls');
  assert.deepEqual(sheet.getRange(2, 2, 1, 2).getValues(), [[1, 'u1']]);
  // Old, wider data below the target is cleared when asked.
  sheet.getRange(3, 2, 2, 4).setValues([['old', 'old', 'old', 'old'], ['old', 'old', 'old', 'old']]);
  run({ endpoint: 'twitter/posts', params: { query: 'Acme' }, destination: 'Pulls!B2', clearBelow: true });
  assert.deepEqual(sheet.getRange(2, 2, 4, 4).getValues(), [
    ['url', 'title', 'likes', ''], ['u1', 't1', 1, ''], ['u2', 't2', 2, ''], ['', '', '', '']]);
  assert.throws(() => run({ endpoint: 'twitter/posts', params: { query: 'x' }, destination: 'Pulls!not-a-cell' }), /Could not read the destination/);
});

test('runToSheet grows the sheet and reports AI answers', () => {
  const env = createEnv({ fetchHandler: (url) => (url.includes('ai-mode')
    ? { code: 200, body: { reply_parts: [{ text: 'An answer' }] } }
    : { code: 200, body: { posts: Array.from({ length: 1200 }, (_, i) => ({ i })) } }) });
  env.setApiKey('ak_live_test');
  const run = env.fn('runToSheet');
  const result = run({ endpoint: 'twitter/posts', params: { query: 'x' }, destination: 'Sheet1!A1' });
  assert.equal(result.rows, 1200);
  assert.equal(env.spreadsheet.getSheetByName('Sheet1').getMaxRows(), 1201);
  const ai = run({ endpoint: 'web/ai-mode', params: { prompt: 'hi' }, destination: 'Sheet1!H1' });
  assert.equal(ai.range, 'Sheet1!H1:H2');
  assert.deepEqual(env.spreadsheet.getSheetByName('Sheet1').getRange(1, 8, 2, 1).getValues(), [['answer'], ['An answer']]);
});

test('runToSheet needs a key', () => {
  const env = createEnv({ fetchHandler: () => ({ code: 200, body: POSTS }) });
  assert.throws(() => env.fn('runToSheet')({ endpoint: 'twitter/posts', params: { query: 'x' } }), /No API Direct key yet/);
  assert.equal(env.fetchLog.length, 0);
});

test('writeTable pads ragged rows and handles empty tables', () => {
  const env = createEnv();
  const sheet = env.spreadsheet.getSheetByName('Sheet1');
  const write = env.fn('writeTable');
  assert.deepEqual(write(sheet, 1, 1, [['a', 'b'], ['1']]), { range: 'Sheet1!A1:B2', rows: 2, columns: 2 });
  assert.deepEqual(sheet.getRange(1, 1, 2, 2).getValues(), [['a', 'b'], ['1', '']]);
  assert.deepEqual(write(sheet, 5, 2, []), { range: 'Sheet1!B5', rows: 0, columns: 0 });
  assert.deepEqual(write(sheet, 5, 2, [[]]), { range: 'Sheet1!B5', rows: 0, columns: 0 });
});
