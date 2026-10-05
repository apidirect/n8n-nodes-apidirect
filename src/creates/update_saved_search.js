'use strict';

const savedSearches = require('../lib/saved-searches');
const { truthy, cleanDict } = require('../lib/params');
const { savedSearchField, endpointField, paramsField, nameField } = require('../lib/fields');
const { SAVED_SEARCH_SAMPLE, SAVED_SEARCH_OUTPUT_FIELDS } = require('../lib/saved-search-samples');

module.exports = {
  key: 'update_saved_search',
  noun: 'Saved Search',
  display: {
    label: 'Update Saved Search',
    description:
      'Updates a saved search\'s name, endpoint or parameters, or forgets everything it has returned so far. ' +
      'Only the fields you fill in change.',
  },
  operation: {
    inputFields: [
      savedSearchField('The saved search to change.'),
      nameField(false),
      endpointField(false),
      {
        ...paramsField(false),
        helpText:
          'Replaces the search\'s parameters when filled in, by their API names (for example `query`, `sort_by`, ' +
          '`pages`). Changing parameters keeps the results already seen; changing the endpoint forgets them.',
      },
      {
        key: 'reset_seen',
        label: 'Forget Seen Results',
        type: 'boolean',
        helpText: 'Forget everything the search has returned so far, so its next run returns everything it finds.',
      },
    ],
    perform: async (z, bundle) => {
      const { saved_search_id: id, name, endpoint, params } = bundle.inputData;
      const fields = {};
      if (name !== undefined && name !== null && String(name).trim() !== '') fields.name = String(name).trim();
      if (endpoint) fields.endpoint = endpoint;
      const cleanParams = cleanDict(params);
      if (Object.keys(cleanParams).length) fields.params = cleanParams;
      if (truthy(bundle.inputData.reset_seen)) fields.reset_seen = true;
      if (!Object.keys(fields).length) {
        throw new z.errors.Error('Fill in at least one of Name, Endpoint, Parameters or Forget Seen Results.', 'NothingToUpdate', 400);
      }
      return savedSearches.update(z, id, fields);
    },
    sample: { ...SAVED_SEARCH_SAMPLE, updated_at: '2026-10-05T12:30:00+00:00' },
    outputFields: SAVED_SEARCH_OUTPUT_FIELDS,
  },
};
