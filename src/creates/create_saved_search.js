'use strict';

const savedSearches = require('../lib/saved-searches');
const { cleanDict } = require('../lib/params');
const { endpointField, paramsField, nameField } = require('../lib/fields');
const { SAVED_SEARCH_SAMPLE, SAVED_SEARCH_OUTPUT_FIELDS } = require('../lib/saved-search-samples');

module.exports = {
  key: 'create_saved_search',
  noun: 'Saved Search',
  display: {
    label: 'Create Saved Search',
    description:
      'Creates a saved search: an endpoint plus parameters that, each time it runs, returns only the results ' +
      'no earlier run returned. Free; running it bills the endpoint it calls.',
  },
  operation: {
    inputFields: [endpointField(true), paramsField(false), nameField(false)],
    perform: async (z, bundle) => {
      const { endpoint, params, name } = bundle.inputData;
      return savedSearches.create(z, { endpoint, params: cleanDict(params), name: (name || '').trim() });
    },
    sample: SAVED_SEARCH_SAMPLE,
    outputFields: SAVED_SEARCH_OUTPUT_FIELDS,
  },
};
