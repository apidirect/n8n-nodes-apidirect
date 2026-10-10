'use strict';

const nock = require('nock');
const zapier = require('zapier-platform-core');
const App = require('../index');

const appTester = zapier.createAppTester(App);
const BASE = 'https://apidirect.io';
const authData = { api_key: 'ak_live_test_1234' };

// nock scope for apidirect.io that insists on the X-API-Key header
const api = () => nock(BASE, { reqheaders: { 'x-api-key': authData.api_key } });

const tweet = (n) => ({
  author: `user${n}`,
  date: `2026-10-05 12:0${n}:00`,
  likes: n,
  snippet: `Tweet number ${n} about Acme`,
  source: 'Twitter (X)',
  title: `@user${n} on X`,
  url: `https://twitter.com/user${n}/status/19730000000000000${n}`,
});

module.exports = { App, appTester, BASE, authData, api, tweet, nock };
