'use strict';

const savedSearches = require('../lib/saved-searches');
const { normalizeDates } = require('../lib/dates');
const { truthy } = require('../lib/params');
const { savedSearchField } = require('../lib/fields');
const { SAVED_SEARCH_SAMPLE, RESULT_SAMPLE } = require('../lib/saved-search-samples');

module.exports = {
  key: 'run_saved_search',
  noun: 'Run',
  display: {
    label: 'Run Saved Search',
    description:
      'Runs a saved search and returns the results no earlier run returned, as line items. The run is free; ' +
      'the endpoint it calls bills at its normal price.',
  },
  operation: {
    inputFields: [
      savedSearchField('The saved search to run.'),
      {
        key: 'mark_seen',
        label: 'Mark Results as Seen',
        type: 'boolean',
        default: 'true',
        helpText: 'Off previews what is new without remembering anything; the next run returns these results again.',
      },
      {
        key: 'include_seen',
        label: 'Include Already-Seen Results',
        type: 'boolean',
        default: 'false',
        helpText: 'Also return the results earlier runs already returned, under Seen Results.',
      },
    ],
    perform: async (z, bundle) => {
      const data = await savedSearches.run(z, bundle.inputData.saved_search_id, {
        includeSeen: truthy(bundle.inputData.include_seen),
        markSeen: bundle.inputData.mark_seen === undefined ? true : truthy(bundle.inputData.mark_seen),
      });
      return normalizeDates(data);
    },
    sample: {
      saved_search: { ...SAVED_SEARCH_SAMPLE, last_run_at: '2026-10-05T12:15:00+00:00', run_count: 2, seen_count: 41 },
      results: [RESULT_SAMPLE],
      count: 1,
      total: 40,
      seen: 39,
      run_at: '2026-10-05T12:15:00+00:00',
    },
    outputFields: [
      { key: 'count', label: 'New Results', type: 'integer' },
      { key: 'total', label: 'Results Returned by the Endpoint', type: 'integer' },
      { key: 'seen', label: 'Results Already Seen', type: 'integer' },
      { key: 'run_at', label: 'Run At', type: 'datetime' },
      { key: 'saved_search__id', label: 'Saved Search ID' },
      { key: 'saved_search__name', label: 'Saved Search Name' },
      { key: 'saved_search__endpoint', label: 'Endpoint' },
      { key: 'results[]id', label: 'Results: ID' },
      { key: 'results[]url', label: 'Results: URL' },
      { key: 'results[]title', label: 'Results: Title' },
      { key: 'results[]snippet', label: 'Results: Snippet' },
      { key: 'results[]author', label: 'Results: Author' },
      { key: 'results[]date', label: 'Results: Date' },
    ],
  },
};
