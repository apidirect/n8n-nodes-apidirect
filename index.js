'use strict';

const zapier = require('zapier-platform-core');
const packageJson = require('./package.json');

const authentication = require('./authentication');
const catalog = require('./src/catalog');
const { addApiKey, throwForApiError } = require('./src/lib/http');
const { makeCreate, makeSearch, makeTrigger } = require('./src/lib/build');

const checkApiKey = require('./src/creates/check_api_key');
const batchRequests = require('./src/creates/batch_requests');

const triggers = {};
const creates = {
  [checkApiKey.key]: checkApiKey,
  [batchRequests.key]: batchRequests,
};
const searches = {};

for (const entry of catalog) {
  if (entry.kind === 'detail') {
    const search = makeSearch(entry);
    searches[search.key] = search;
  } else {
    const create = makeCreate(entry);
    creates[create.key] = create;
  }
  if (entry.trigger) {
    const trigger = makeTrigger(entry);
    triggers[trigger.key] = trigger;
  }
}

module.exports = {
  version: packageJson.version,
  platformVersion: zapier.version,
  authentication,
  // Inputs are cleaned by the steps themselves (src/lib/params.js), so the
  // platform's own cleaning is off, as Zapier's check D028 recommends.
  flags: { cleanInputData: false },
  beforeRequest: [addApiKey],
  afterResponse: [throwForApiError],
  triggers,
  creates,
  searches,
};
