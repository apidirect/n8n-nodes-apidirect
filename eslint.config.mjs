// Lint the Apps Script sources: catch typos in identifiers across files.
const appsScriptGlobals = {
  UrlFetchApp: 'readonly', PropertiesService: 'readonly', CacheService: 'readonly', Utilities: 'readonly',
  SpreadsheetApp: 'readonly', ScriptApp: 'readonly', LockService: 'readonly', HtmlService: 'readonly',
  Logger: 'readonly', console: 'readonly',
};

export default [
  { ignores: ['src/Catalog.js', 'node_modules/**', 'marketplace/**'] },
  {
    files: ['src/**/*.js'],
    ignores: ['src/Catalog.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'script',
      globals: { ...appsScriptGlobals, API_BASE_URL: 'readonly', ADDON_VERSION: 'readonly', UTM: 'readonly', SIGNUP_URL: 'readonly', KEYS_URL: 'readonly', BILLING_URL: 'readonly', DOCS_URL: 'readonly', PRICING_URL: 'readonly', ApiError: 'readonly', normalizeKey_: 'readonly', findEndpoint: 'readonly', resolveSearchEndpoint: 'readonly', requireEndpoint: 'readonly', formatDateParam_: 'readonly', paramToString_: 'readonly', prepareParams: 'readonly', orderParams_: 'readonly', encodeQuery_: 'readonly', buildRequest: 'readonly', describeHttpError_: 'readonly', parseJson_: 'readonly', isRetryable_: 'readonly', sendRequest: 'readonly', callEndpoint: 'readonly', callPath: 'readonly', noKeyMessage_: 'readonly', CACHE_TTL_SECONDS: 'readonly', CACHE_CHUNK_CHARS: 'readonly', CACHE_MAX_CHUNKS: 'readonly', digest_: 'readonly', cacheKeyFor_: 'readonly', cacheGet_: 'readonly', cachePut_: 'readonly', CATALOG: 'readonly', onInstall: 'readonly', onOpen: 'readonly', showSidebar: 'readonly', showSettings: 'readonly', showSchedules: 'readonly', openSidebar_: 'readonly', showHelp: 'readonly', include: 'readonly', CUSTOM_FUNCTION_DEADLINE_MS: 'readonly', APIDIRECT_SEARCH: 'readonly', APIDIRECT: 'readonly', APIDIRECT_AI: 'readonly', APIDIRECT_ENDPOINTS: 'readonly', APIDIRECT_FIELDS: 'readonly', fetchForFunction_: 'readonly', runCustomFunction_: 'readonly', TRIGGER_HANDLER: 'readonly', SCHEDULE_PREFIX: 'readonly', DUE_TOLERANCE_MS: 'readonly', FETCHED_AT_COLUMN: 'readonly', SCHEDULE_DEADLINE_MS: 'readonly', scheduleIntervals_: 'readonly', spreadsheetId_: 'readonly', schedulePrefix_: 'readonly', loadSchedules_: 'readonly', saveSchedule_: 'readonly', removeSchedule_: 'readonly', newScheduleId_: 'readonly', listSchedules: 'readonly', platformLabel_: 'readonly', cleanSheetName_: 'readonly', createSchedule: 'readonly', runScheduleNow: 'readonly', deleteSchedule: 'readonly', runScheduledRefreshes: 'readonly', isDue_: 'readonly', recordFailure_: 'readonly', runSchedule_: 'readonly', appendNewResults_: 'readonly', replaceTable_: 'readonly', findTriggers_: 'readonly', ensureTrigger_: 'readonly', removeTriggers_: 'readonly', PROP_API_KEY: 'readonly', getApiKey_: 'readonly', maskKey_: 'readonly', getSettings: 'readonly', saveApiKey: 'readonly', clearApiKey: 'readonly', SIDEBAR_DEADLINE_MS: 'readonly', getSidebarData: 'readonly', getActiveCellA1: 'readonly', runToSheet: 'readonly', resolveDestination_: 'readonly', columnIndex_: 'readonly', columnLetters_: 'readonly', writeTable: 'readonly', MAX_CELL_CHARS: 'readonly', flattenRecord: 'readonly', cellValue: 'readonly', truncate_: 'readonly', extractRows: 'readonly', collectColumns: 'readonly', toTable: 'readonly', parseOptions: 'readonly', parseOptionsRange_: 'readonly', parseFields: 'readonly', parseLimit: 'readonly', parseBoolean: 'readonly', aiReplyText: 'readonly' },
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'off',
      'no-redeclare': ['error', { builtinGlobals: false }],
      'no-dupe-keys': 'error',
      'no-unreachable': 'error',
      'eqeqeq': ['error', 'smart'],
    },
  },
  {
    files: ['test/**/*.js', 'scripts/**/*.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'commonjs', globals: { require: 'readonly', module: 'writable', __dirname: 'readonly', process: 'readonly', console: 'readonly', Buffer: 'readonly', structuredClone: 'readonly' } },
    rules: { 'no-undef': 'error', 'no-unused-vars': 'warn' },
  },
];
