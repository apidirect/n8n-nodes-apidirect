'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createEnv } = require('./helpers/gas-env');

const env = createEnv();
const flattenRecord = env.fn('flattenRecord');
const toTable = env.fn('toTable');
const parseOptions = env.fn('parseOptions');
const parseFields = env.fn('parseFields');
const parseLimit = env.fn('parseLimit');
const extractRows = env.fn('extractRows');
const aiReplyText = env.fn('aiReplyText');
const find = env.fn('findEndpoint');

test('flattenRecord flattens nested objects and joins scalar arrays', () => {
  const flat = flattenRecord({
    url: 'https://x.com/a/1', likes: 12, verified: false, empty: null,
    author: { name: 'A', stats: { followers: 5 } },
    hashtags: ['one', 'two', null],
    media: [{ type: 'photo' }],
    blank: {},
  });
  assert.deepEqual(flat, {
    url: 'https://x.com/a/1', likes: 12, verified: false, empty: '',
    'author.name': 'A', 'author.stats.followers': 5,
    hashtags: 'one, two',
    media: '[{"type":"photo"}]',
    blank: '',
  });
});

test('flattenRecord truncates oversized strings to the cell limit', () => {
  const flat = flattenRecord({ text: 'x'.repeat(60000) });
  assert.equal(flat.text.length, 50000);
  assert.ok(flat.text.endsWith('…'));
});

test('toTable builds a header row, a union of columns, limits and field selection', () => {
  const rows = [{ a: 1, b: 'x' }, { a: 2, c: true }, { a: 3 }];
  assert.deepEqual(toTable(rows), [['a', 'b', 'c'], [1, 'x', ''], [2, '', true], [3, '', '']]);
  assert.deepEqual(toTable(rows, { maxRows: 2 }), [['a', 'b', 'c'], [1, 'x', ''], [2, '', true]]);
  assert.deepEqual(toTable(rows, { fields: ['c', 'a', 'missing'] }), [['c', 'a', 'missing'], ['', 1, ''], [true, 2, ''], ['', 3, '']]);
  assert.deepEqual(toTable(rows, { headers: false, maxRows: 1 }), [[1, 'x', '']]);
  assert.deepEqual(toTable([], {}), [[]]);
  assert.deepEqual(toTable(rows, { fields: ['a'], extra: { fetched_at: 't' } }), [['a', 'fetched_at'], [1, 't'], [2, 't'], [3, 't']]);
});

test('parseOptions reads strings, pair ranges, header/value ranges and objects', () => {
  assert.deepEqual(parseOptions('sort_by=most_recent&pages=2'), { sort_by: 'most_recent', pages: '2' });
  assert.deepEqual(parseOptions(' pages = 3 ;\n get_sentiment=true '), { pages: '3', get_sentiment: 'true' });
  assert.deepEqual(parseOptions('author=a=b'), { author: 'a=b' });
  assert.deepEqual(parseOptions('query=Acme OR "Acme Inc"'), { query: 'Acme OR "Acme Inc"' });
  assert.deepEqual(parseOptions(''), {});
  assert.deepEqual(parseOptions(null), {});
  assert.deepEqual(parseOptions([['pages', 2], ['sort_by', 'relevance'], ['', ''], ['blank', '']]), { pages: 2, sort_by: 'relevance' });
  assert.deepEqual(parseOptions([['pages', 'sort_by', 'x'], [2, 'relevance', '']]), { pages: 2, sort_by: 'relevance' });
  assert.deepEqual(parseOptions({ pages: 1 }), { pages: 1 });
  assert.throws(() => parseOptions('justtext'), /name=value/);
  assert.throws(() => parseOptions([['a', 'b', 'c'], [1, 2, 3], [4, 5, 6]]), /two-column range/);
});

test('parseFields and parseLimit', () => {
  assert.deepEqual(parseFields('url, text,likes\nauthor.name'), ['url', 'text', 'likes', 'author.name']);
  assert.deepEqual(parseFields([['url', 'text'], ['', 'likes']]), ['url', 'text', 'likes']);
  assert.equal(parseFields(''), null);
  assert.equal(parseFields(undefined), null);
  assert.equal(parseLimit(''), null);
  assert.equal(parseLimit('25'), 25);
  assert.equal(parseLimit(10.7), 10);
  assert.throws(() => parseLimit(-1), /positive/);
});

test('extractRows picks the list, unwraps detail objects, keeps flat LinkedIn details', () => {
  assert.deepEqual(extractRows(find('twitter/posts'), { count: 1, posts: [{ url: 'u' }] }), [{ url: 'u' }]);
  assert.deepEqual(extractRows(find('twitter/posts'), { count: 0 }), []);
  assert.deepEqual(extractRows(find('twitter/user'), { user: { username: 'nasa' } }), [{ username: 'nasa' }]);
  assert.deepEqual(extractRows(find('linkedin/company'), { name: 'Acme', employees: 10 }), [{ name: 'Acme', employees: 10 }]);
  assert.deepEqual(extractRows(find('twitter/user'), { user: null }), []);
  assert.deepEqual(extractRows(find('twitter/user'), null), []);
});

test('aiReplyText joins paragraphs and lists', () => {
  const text = aiReplyText({ reply_parts: [
    { type: 'paragraph', text: 'Hello.' },
    { type: 'list', ordered: true, list: [{ title: 'One', text: 'first' }, { title: null, text: 'second' }] },
    { type: 'list', ordered: false, list: [{ title: 'Only title', text: '' }] },
    null,
  ] });
  assert.equal(text, 'Hello.\n1. One: first\n2. second\n• Only title');
  assert.equal(aiReplyText({ reply_parts: [] }), '');
  assert.equal(aiReplyText({}), '');
});
