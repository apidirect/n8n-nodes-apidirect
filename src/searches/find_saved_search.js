'use strict';

const savedSearches = require('../lib/saved-searches');
const { SAVED_SEARCH_SAMPLE, SAVED_SEARCH_OUTPUT_FIELDS } = require('../lib/saved-search-samples');

module.exports = {
  key: 'find_saved_search',
  noun: 'Saved Search',
  display: {
    label: 'Find Saved Search',
    description: 'Finds a saved search by name. Matches are case-insensitive; the newest match is returned.',
  },
  operation: {
    inputFields: [
      {
        key: 'name',
        label: 'Name',
        required: true,
        helpText: 'The saved search\'s name, or part of it.',
      },
    ],
    perform: async (z, bundle) => {
      const needle = String(bundle.inputData.name || '').trim().toLowerCase();
      const searches = await savedSearches.list(z);
      const exact = searches.filter((s) => (s.name || '').toLowerCase() === needle);
      const partial = searches.filter((s) => (s.name || '').toLowerCase().includes(needle));
      return exact.length ? exact : partial;
    },
    sample: SAVED_SEARCH_SAMPLE,
    outputFields: SAVED_SEARCH_OUTPUT_FIELDS,
  },
};
