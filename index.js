'use strict';

const zapier = require('zapier-platform-core');
const packageJson = require('./package.json');

const authentication = require('./authentication');
const catalog = require('./src/catalog');
const { addApiKey, throwForApiError } = require('./src/lib/http');
const { makeCreate, makeSearch, makeTrigger } = require('./src/lib/build');

const savedSearchList = require('./src/triggers/saved_search_list');
const newSavedSearchResult = require('./src/triggers/new_saved_search_result');
const createSavedSearch = require('./src/creates/create_saved_search');
const runSavedSearch = require('./src/creates/run_saved_search');
const updateSavedSearch = require('./src/creates/update_saved_search');
const deleteSavedSearch = require('./src/creates/delete_saved_search');
const findSavedSearch = require('./src/searches/find_saved_search');

const triggers = {
  [newSavedSearchResult.key]: newSavedSearchResult,
  [savedSearchList.key]: savedSearchList,
};
const creates = {
  [createSavedSearch.key]: createSavedSearch,
  [runSavedSearch.key]: runSavedSearch,
  [updateSavedSearch.key]: updateSavedSearch,
  [deleteSavedSearch.key]: deleteSavedSearch,
};
const searches = {
  [findSavedSearch.key]: findSavedSearch,
};

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
