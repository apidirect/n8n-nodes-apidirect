'use strict';

const catalog = require('../catalog');

// Shared input fields for the saved-search steps.
const savedSearchField = (helpText) => ({
  key: 'saved_search_id',
  label: 'Saved Search',
  required: true,
  dynamic: 'saved_search_list.id.label',
  helpText,
});

// Every endpoint a saved search can run, labelled like its action.
const endpointChoices = () => {
  const choices = {};
  for (const entry of catalog) {
    if (entry.kind === 'list') {
      choices[entry.path] = `${entry.action.label} (${entry.path})`;
    }
  }
  return choices;
};

const endpointField = (required) => ({
  key: 'endpoint',
  label: 'Endpoint',
  required,
  choices: endpointChoices(),
  helpText:
    'The API Direct endpoint the search calls. Any endpoint that returns a list of results can be saved; ' +
    'see the [saved searches docs](https://apidirect.io/docs/saved-searches#supported-endpoints).',
});

const paramsField = (required) => ({
  key: 'params',
  label: 'Parameters',
  required,
  dict: true,
  helpText:
    'The parameters the endpoint takes when called directly, by their API names (for example `query`, ' +
    '`sort_by`, `pages`, `posted_ago`). Each endpoint\'s [documentation page](https://apidirect.io/docs) lists them.',
});

const nameField = (required) => ({
  key: 'name',
  label: 'Name',
  required,
  helpText: 'A label for the search, up to 100 characters.',
});

// Catalog entry for a saved search's endpoint, so steps can describe its results.
const entryForEndpoint = (endpoint) => catalog.find((e) => e.path === endpoint && e.kind === 'list');

module.exports = { savedSearchField, endpointField, paramsField, nameField, entryForEndpoint };
