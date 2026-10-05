'use strict';

const savedSearches = require('../lib/saved-searches');
const { normalizeDates } = require('../lib/dates');
const { truthy } = require('../lib/params');
const { savedSearchField, entryForEndpoint } = require('../lib/fields');
const { RESULT_SAMPLE } = require('../lib/saved-search-samples');

const GENERIC_OUTPUT_FIELDS = [
  { key: 'id', label: 'ID', primary: true },
  { key: 'url', label: 'URL' },
  { key: 'title', label: 'Title' },
  { key: 'snippet', label: 'Snippet' },
  { key: 'author', label: 'Author' },
  { key: 'date', label: 'Date' },
  { key: 'source', label: 'Source' },
  { key: 'domain', label: 'Domain' },
];

// Polls a saved search the user manages themselves (created in the API, in
// another Zap with "Create Saved Search", or in the dashboard).
module.exports = {
  key: 'new_saved_search_result',
  noun: 'Result',
  display: {
    label: 'New Saved Search Result',
    description:
      'Triggers when a saved search returns a result it has not returned before. ' +
      'Works with any saved search on the account: pick one and every check runs it and bills ' +
      'the endpoint it calls at that endpoint\'s normal price.',
  },
  operation: {
    type: 'polling',
    inputFields: [
      savedSearchField(
        'The saved search to run on every check. Create one with the Create Saved Search action or ' +
          'the [API](https://apidirect.io/docs/saved-searches).',
      ),
      {
        key: 'mark_seen',
        label: 'Mark Results as Seen',
        type: 'boolean',
        default: 'false',
        helpText:
          'Off (recommended): every check returns the search\'s current results and this Zap keeps its own list of ' +
          'what it has triggered on, so other Zaps and API callers can use the same saved search. ' +
          'On: each check also marks its results as seen on API Direct, so later runs of the search anywhere ' +
          'skip them. Turn it on only if this Zap is the only thing that runs the search.',
      },
    ],
    perform: async (z, bundle) => {
      const id = bundle.inputData.saved_search_id;
      const testing = Boolean(bundle.meta && (bundle.meta.isLoadingSample || bundle.meta.isPopulatingDedupe));
      const markSeen = !testing && truthy(bundle.inputData.mark_seen);
      const data = await savedSearches.run(z, id, { includeSeen: !markSeen, markSeen });
      const items = [...(data.results || []), ...(data.seen_results || [])];
      return normalizeDates(items).map((item) => ({ ...item, id: String(item.id) }));
    },
    sample: RESULT_SAMPLE,
    // `id` is always there; the rest depends on the endpoint the chosen
    // saved search calls, so it is looked up once the search is picked.
    outputFields: [
      GENERIC_OUTPUT_FIELDS[0],
      async (z, bundle) => {
        const id = bundle.inputData && bundle.inputData.saved_search_id;
        if (!id) {
          return GENERIC_OUTPUT_FIELDS.slice(1);
        }
        try {
          const search = await savedSearches.get(z, id);
          const entry = search && entryForEndpoint(search.endpoint);
          return entry ? entry.trigger.outputFields.slice(1) : GENERIC_OUTPUT_FIELDS.slice(1);
        } catch (e) {
          return GENERIC_OUTPUT_FIELDS.slice(1);
        }
      },
    ],
  },
};
