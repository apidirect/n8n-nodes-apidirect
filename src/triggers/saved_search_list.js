'use strict';

const savedSearches = require('../lib/saved-searches');

// Hidden: feeds the "Saved Search" dropdowns of the other steps.
module.exports = {
  key: 'saved_search_list',
  noun: 'Saved Search',
  display: {
    label: 'List Saved Searches',
    description: 'Lists the saved searches on the account, for dropdowns.',
    hidden: true,
  },
  operation: {
    type: 'polling',
    perform: async (z) => {
      const searches = await savedSearches.list(z);
      return searches.map((s) => ({ ...s, label: savedSearches.dropdownLabel(s) }));
    },
    sample: {
      id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      label: 'Mentions of Acme on X',
      name: 'Mentions of Acme on X',
      endpoint: '/v1/twitter/posts',
      params: { query: 'Acme', sort_by: 'most_recent', pages: '2' },
      created_at: '2026-10-05T12:00:00+00:00',
      updated_at: '2026-10-05T12:00:00+00:00',
      last_run_at: null,
      run_count: 0,
      seen_count: 0,
    },
  },
};
