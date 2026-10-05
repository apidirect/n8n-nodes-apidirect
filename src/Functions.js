/**
 * Custom functions (=APIDIRECT_SEARCH(), =APIDIRECT(), ...). They run with a
 * 30-second budget and cannot write outside their own output range, so they
 * fetch, flatten and return; the sidebar covers bigger pulls and schedules.
 */

var CUSTOM_FUNCTION_DEADLINE_MS = 27000;

/**
 * Searches a platform through API Direct and returns the results as a table with a header row.
 *
 * @param {string} platform Platform to search: twitter, reddit, linkedin, youtube, instagram, tiktok, facebook, threads, bluesky, news, web, forums, places, amazon or trustpilot. Variants such as "linkedin jobs", "linkedin companies", "youtube channels", "reddit comments" or "twitter users" search those instead.
 * @param {string} query What to search for. Boolean operators work where the platform supports them.
 * @param {number} [max_results] Most rows to return. Leave empty for everything the request returned.
 * @param {string} [fields] Comma-separated columns to keep, for example "url,text,likes". Leave empty for every column.
 * @param {string} [options] Extra parameters as "name=value&name=value", for example "sort_by=most_recent&pages=2", or a two-column range of names and values. "headers=false" drops the header row.
 * @return {Array<Array>} The results, one row per result.
 * @customfunction
 */
function APIDIRECT_SEARCH(platform, query, max_results, fields, options) {
  var endpoint = resolveSearchEndpoint(platform);
  var params = parseOptions(options);
  var headers = parseBoolean(params.headers, true);
  delete params.headers;
  var text = query === null || query === undefined ? '' : (query instanceof Date ? formatDateParam_(query) : String(query)).trim();
  if (text) {
    params.query = text;
  } else if (!('query' in params)) {
    var needsQuery = endpoint.params.some(function (p) { return p.name === 'query' && p.required; });
    if (needsQuery) throw new Error('Give APIDIRECT_SEARCH something to search for.');
  }
  return runCustomFunction_(endpoint, params, {
    maxRows: parseLimit(max_results),
    fields: parseFields(fields),
    headers: headers,
  });
}

/**
 * Calls any API Direct endpoint and returns the response as a table. Use APIDIRECT_ENDPOINTS() to list endpoints and their parameters.
 *
 * @param {string} endpoint Endpoint name, for example "twitter/user/tweets", "linkedin/company" or "youtube/comments".
 * @param {string} [params] Parameters as "name=value&name=value", for example "username=nasa&pages=2", or a two-column range of names and values. "headers=false" drops the header row.
 * @param {number} [max_results] Most rows to return. Leave empty for everything the request returned.
 * @param {string} [fields] Comma-separated columns to keep, for example "url,text". A single field on a single-result endpoint returns just that value.
 * @return {Array<Array>} The results, one row per result, or a single value when one field of one result was asked for.
 * @customfunction
 */
function APIDIRECT(endpoint, params, max_results, fields) {
  var resolved = requireEndpoint(endpoint);
  var parsed = parseOptions(params);
  var headers = parseBoolean(parsed.headers, true);
  delete parsed.headers;
  if (resolved.kind === 'text') {
    var data = fetchForFunction_(resolved, parsed);
    return aiReplyText(data);
  }
  return runCustomFunction_(resolved, parsed, {
    maxRows: parseLimit(max_results),
    fields: parseFields(fields),
    headers: headers,
    scalar: true,
  });
}

/**
 * Asks Google AI Mode a question through API Direct and returns the answer as text.
 *
 * @param {string} prompt The question or prompt.
 * @param {string} [options] Extra parameters as "name=value", for example "country=gb&language=en".
 * @return {string} The answer.
 * @customfunction
 */
function APIDIRECT_AI(prompt, options) {
  var text = prompt === null || prompt === undefined ? '' : String(prompt).trim();
  if (!text) throw new Error('Give APIDIRECT_AI a prompt.');
  var params = parseOptions(options);
  params.prompt = text;
  var endpoint = requireEndpoint('web/ai-mode');
  return aiReplyText(fetchForFunction_(endpoint, params));
}

/**
 * Lists the API Direct endpoints the add-on can call, with their parameters and prices.
 *
 * @param {string} [platform] Only endpoints for this platform, for example "linkedin". Leave empty for all.
 * @return {Array<Array>} One row per endpoint.
 * @customfunction
 */
function APIDIRECT_ENDPOINTS(platform) {
  var filter = platform ? String(platform).trim().toLowerCase() : '';
  var platformIds = {};
  CATALOG.platforms.forEach(function (p) { platformIds[p.id] = p.label; });
  if (filter && !platformIds[filter]) {
    var alias = findEndpoint(filter);
    if (alias) {
      filter = alias.platform;
    } else {
      throw new Error('Unknown platform "' + platform + '". Platforms: ' + Object.keys(platformIds).join(', '));
    }
  }
  var rows = [['platform', 'endpoint', 'name', 'price', 'required', 'optional', 'docs']];
  CATALOG.endpoints.forEach(function (e) {
    if (filter && e.platform !== filter) return;
    var required = e.params.filter(function (p) { return p.required; }).map(function (p) { return p.name; });
    var optional = e.params.filter(function (p) { return !p.required; }).map(function (p) { return p.name; });
    rows.push([platformIds[e.platform], e.key, e.label + (e.suspended ? ' (temporarily unavailable)' : ''), e.price, required.join(', '), optional.join(', '), e.docs]);
  });
  return rows;
}

/**
 * Lists the columns an endpoint returns, to use with the fields argument of APIDIRECT_SEARCH and APIDIRECT.
 *
 * @param {string} endpoint Endpoint name or platform, for example "twitter/posts" or "reddit".
 * @return {Array<Array>} One column name per row.
 * @customfunction
 */
function APIDIRECT_FIELDS(endpoint) {
  var resolved = requireEndpoint(endpoint);
  if (!resolved.fields.length) return [['(columns depend on the results; run the endpoint to see them)']];
  return resolved.fields.map(function (f) { return [f]; });
}

/** Fetches with the user's key, through the cache. */
function fetchForFunction_(endpoint, params) {
  var apiKey = getApiKey_();
  if (!apiKey) throw new Error(noKeyMessage_());
  var request = buildRequest(endpoint, params);
  var cacheKey = cacheKeyFor_(request, apiKey);
  var cached = cacheGet_(cacheKey);
  if (cached !== null) return cached;
  var data = sendRequest(request, { apiKey: apiKey, deadlineMs: CUSTOM_FUNCTION_DEADLINE_MS, maxRetries: 2 });
  cachePut_(cacheKey, data);
  return data;
}

function runCustomFunction_(endpoint, params, options) {
  var data = fetchForFunction_(endpoint, params);
  var rows = extractRows(endpoint, data);
  var table = toTable(rows, { fields: options.fields, maxRows: options.maxRows, headers: options.headers });
  var dataRows = options.headers === false ? table.length : table.length - 1;
  if (options.scalar && options.fields && options.fields.length === 1 && dataRows === 1) {
    return table[table.length - 1][0];
  }
  if (dataRows === 0 && options.headers !== false && table.length === 1 && table[0].length === 0) {
    return [['(no results)']];
  }
  return table;
}
