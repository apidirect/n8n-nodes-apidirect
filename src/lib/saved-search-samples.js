'use strict';

// Sample data and output fields shared by the saved-search steps.
const SAVED_SEARCH_SAMPLE = {
  id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  name: 'Mentions of Acme on X',
  endpoint: '/v1/twitter/posts',
  params: { query: 'Acme', sort_by: 'most_recent', pages: '2' },
  created_at: '2026-10-05T12:00:00+00:00',
  updated_at: '2026-10-05T12:00:00+00:00',
  last_run_at: null,
  run_count: 0,
  seen_count: 0,
};

const SAVED_SEARCH_OUTPUT_FIELDS = [
  { key: 'id', label: 'Saved Search ID' },
  { key: 'name', label: 'Name' },
  { key: 'endpoint', label: 'Endpoint' },
  { key: 'created_at', label: 'Created At', type: 'datetime' },
  { key: 'updated_at', label: 'Updated At', type: 'datetime' },
  { key: 'last_run_at', label: 'Last Run At', type: 'datetime' },
  { key: 'run_count', label: 'Run Count', type: 'integer' },
  { key: 'seen_count', label: 'Seen Count', type: 'integer' },
];

const RESULT_SAMPLE = {
  id: 'https://twitter.com/username/status/1973000000000000000',
  title: '@username on X',
  url: 'https://twitter.com/username/status/1973000000000000000',
  date: '2026-10-05T12:10:00Z',
  author: 'username',
  source: 'Twitter (X)',
  domain: 'x.com',
  snippet: 'Just switched to Acme and the onboarding was painless.',
  likes: 12,
};

module.exports = { SAVED_SEARCH_SAMPLE, SAVED_SEARCH_OUTPUT_FIELDS, RESULT_SAMPLE };
