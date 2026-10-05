'use strict';

const savedSearches = require('../lib/saved-searches');
const { savedSearchField } = require('../lib/fields');

module.exports = {
  key: 'delete_saved_search',
  noun: 'Saved Search',
  display: {
    label: 'Delete Saved Search',
    description: 'Deletes a saved search and everything it remembered. This cannot be undone.',
  },
  operation: {
    inputFields: [savedSearchField('The saved search to delete.')],
    perform: (z, bundle) => savedSearches.remove(z, bundle.inputData.saved_search_id),
    sample: { message: 'Saved search deleted', id: '7c9e6679-7425-40de-944b-e07fc1f90ae7' },
    outputFields: [
      { key: 'message', label: 'Message' },
      { key: 'id', label: 'Saved Search ID' },
    ],
  },
};
