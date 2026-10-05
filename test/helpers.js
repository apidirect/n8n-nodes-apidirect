'use strict';

const nock = require('nock');
const zapier = require('zapier-platform-core');
const App = require('../index');

const appTester = zapier.createAppTester(App);
const BASE = 'https://apidirect.io';
const authData = { api_key: 'ak_live_test_1234' };

// nock scope for apidirect.io that insists on the X-API-Key header
const api = () => nock(BASE, { reqheaders: { 'x-api-key': authData.api_key } });

const savedSearch = (overrides = {}) => ({
  id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  name: 'Mentions of Acme on X',
  endpoint: '/v1/twitter/posts',
  params: { query: 'Acme', sort_by: 'most_recent', pages: '1' },
  created_at: '2026-10-05T12:00:00+00:00',
  updated_at: '2026-10-05T12:00:00+00:00',
  last_run_at: null,
  run_count: 0,
  seen_count: 0,
  ...overrides,
});

const tweet = (n) => ({
  author: `user${n}`,
  date: `2026-10-05 12:0${n}:00`,
  likes: n,
  snippet: `Tweet number ${n} about Acme`,
  source: 'Twitter (X)',
  title: `@user${n} on X`,
  url: `https://twitter.com/user${n}/status/19730000000000000${n}`,
});

module.exports = { App, appTester, BASE, authData, api, savedSearch, tweet, nock };
