/**
 * HTTP layer: resolves endpoints from the catalog, builds requests and talks
 * to https://apidirect.io. Nothing in here touches the spreadsheet.
 */

var API_BASE_URL = 'https://apidirect.io';
var ADDON_VERSION = '1.0.0';
var UTM = 'utm_source=google-sheets';
var SIGNUP_URL = 'https://apidirect.io/signup?' + UTM;
var KEYS_URL = 'https://apidirect.io/dashboard/keys?' + UTM;
var BILLING_URL = 'https://apidirect.io/dashboard/billing?' + UTM;
var DOCS_URL = 'https://apidirect.io/docs/google-sheets?' + UTM;
var PRICING_URL = 'https://apidirect.io/docs/pricing?' + UTM;

/** Thrown for every failed API call; `status` is the HTTP status (0 when no response). */
function ApiError(message, status, code) {
  this.name = 'ApiError';
  this.message = message;
  this.status = status || 0;
  this.code = code || '';
}
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

function normalizeKey_(value) {
  var text = String(value == null ? '' : value).trim().toLowerCase();
  text = text.replace(/^https?:\/\/(www\.)?apidirect\.io/, '');
  text = text.replace(/^\/+/, '').replace(/\/+$/, '');
  text = text.replace(/^v1\//, '');
  text = text.replace(/\?.*$/, '');
  return text;
}

/**
 * Finds an endpoint by key ("twitter/posts"), path ("/v1/twitter/posts"),
 * full URL, or a platform alias ("twitter", "linkedin jobs"). Returns null when unknown.
 */
function findEndpoint(nameOrPath) {
  var key = normalizeKey_(nameOrPath);
  if (!key) return null;
  var endpoints = CATALOG.endpoints;
  for (var i = 0; i < endpoints.length; i++) {
    if (endpoints[i].key === key) return endpoints[i];
  }
  var alias = key.replace(/[\s_\-\/]+/g, ' ').trim();
  var target = CATALOG.aliases[alias];
  if (target) return findEndpoint(target);
  return null;
}

/** Resolves the platform argument of APIDIRECT_SEARCH to an endpoint. */
function resolveSearchEndpoint(platform) {
  var endpoint = findEndpoint(platform);
  if (!endpoint) {
    throw new Error('Unknown platform "' + platform + '". Try one of: ' +
      CATALOG.platforms.map(function (p) { return p.id; }).join(', ') +
      ', or an endpoint from APIDIRECT_ENDPOINTS().');
  }
  return endpoint;
}

function requireEndpoint(nameOrPath) {
  var endpoint = findEndpoint(nameOrPath);
  if (!endpoint) {
    throw new Error('Unknown endpoint "' + nameOrPath + '". Use an endpoint from APIDIRECT_ENDPOINTS(), for example "twitter/posts".');
  }
  return endpoint;
}

function formatDateParam_(date) {
  var y = date.getUTCFullYear();
  var m = String(date.getUTCMonth() + 1);
  var d = String(date.getUTCDate());
  return y + '-' + (m.length < 2 ? '0' + m : m) + '-' + (d.length < 2 ? '0' + d : d);
}

/** Turns one parameter value into the string the API expects; '' means "leave it out". */
function paramToString_(value) {
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return isNaN(value.getTime()) ? '' : formatDateParam_(value);
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return isFinite(value) ? String(value) : '';
  if (Array.isArray(value)) {
    return value.map(paramToString_).filter(function (v) { return v !== ''; }).join(',');
  }
  return String(value).trim();
}

/**
 * Validates and normalises the parameters for an endpoint: drops blanks,
 * stringifies values, checks required parameters and enum values.
 */
function prepareParams(endpoint, params) {
  var result = {};
  var given = params || {};
  var known = {};
  endpoint.params.forEach(function (p) { known[p.name] = p; });
  Object.keys(given).forEach(function (name) {
    var value = paramToString_(given[name]);
    if (value === '') return;
    var spec = known[name];
    if (spec && spec.enum && spec.enum.indexOf(value) < 0) {
      var lowered = value.toLowerCase();
      var match = spec.enum.filter(function (e) { return String(e).toLowerCase() === lowered; })[0];
      if (match === undefined) {
        throw new Error('"' + name + '" must be one of ' + spec.enum.join(', ') + ' (got "' + value + '").');
      }
      value = String(match);
    }
    if (spec && (spec.type === 'integer' || spec.type === 'number') && !/^-?\d+(\.\d+)?$/.test(value)) {
      throw new Error('"' + name + '" must be a number (got "' + value + '").');
    }
    if (spec && spec.type === 'boolean') {
      var truthy = /^(true|yes|1|on)$/i.test(value);
      var falsy = /^(false|no|0|off)$/i.test(value);
      if (!truthy && !falsy) throw new Error('"' + name + '" must be TRUE or FALSE (got "' + value + '").');
      value = truthy ? 'true' : 'false';
    }
    result[name] = value;
  });
  endpoint.params.forEach(function (p) {
    if (p.required && !(p.name in result)) {
      throw new Error('"' + p.name + '" is required for ' + endpoint.key + ' (' + endpoint.label + ').');
    }
  });
  result = orderParams_(result, endpoint.params);
  if (endpoint.key === 'linkedin/posts' && !result.query) {
    var filters = ['author', 'mentions_member', 'from_company', 'author_company', 'mentions_company'];
    var hasFilter = filters.some(function (f) { return f in result; });
    if (!hasFilter) throw new Error('"query" is required for linkedin/posts unless a filter such as author or from_company is given.');
  }
  return result;
}

/** Same parameters, keyed in catalog order (unknown ones last, alphabetically) so requests are canonical. */
function orderParams_(params, order) {
  var rank = {};
  (order || []).forEach(function (p, i) { rank[p.name] = i; });
  var names = Object.keys(params).sort(function (a, b) {
    var ra = a in rank ? rank[a] : 1000, rb = b in rank ? rank[b] : 1000;
    return ra === rb ? (a < b ? -1 : a > b ? 1 : 0) : ra - rb;
  });
  var ordered = {};
  names.forEach(function (n) { ordered[n] = params[n]; });
  return ordered;
}

function encodeQuery_(params, order) {
  var names = Object.keys(orderParams_(params, order));
  return names.map(function (n) {
    return encodeURIComponent(n) + '=' + encodeURIComponent(params[n]);
  }).join('&');
}

/**
 * Builds the HTTP request for an endpoint: GET with a query string, or POST
 * with a JSON body for endpoints that take one (Google AI Mode prompts can be
 * too long for a URL).
 */
function buildRequest(endpoint, params) {
  var prepared = prepareParams(endpoint, params);
  if (endpoint.method === 'POST') {
    return { method: 'post', url: API_BASE_URL + endpoint.path, payload: prepared };
  }
  var query = encodeQuery_(prepared, endpoint.params);
  return { method: 'get', url: API_BASE_URL + endpoint.path + (query ? '?' + query : ''), payload: null };
}

function describeHttpError_(status, body) {
  var error = body && typeof body === 'object' ? body.error : '';
  var code = body && typeof body === 'object' ? body.code : '';
  var detail = error ? ' ' + error : '';
  switch (status) {
    case 400:
      return 'API Direct rejected the request (400).' + detail;
    case 401:
      return 'API Direct rejected the API key (401). Set a valid key via Extensions > API Direct > Set API key. Keys start with ak_live_ and live at ' + KEYS_URL;
    case 402:
      return 'API Direct: no credit left or spending limit reached (402).' + detail + ' Top up at ' + BILLING_URL;
    case 403:
      return 'API Direct refused the request (403).' + detail;
    case 404:
      return 'API Direct: not found (404).' + detail;
    case 429:
      return 'API Direct rate limit (429).' + detail + ' Fewer formulas at once, or use the sidebar to pull the data in one request.';
    default:
      if (status >= 500) return 'API Direct is temporarily unavailable (' + status + ').' + detail + ' Try again in a moment.';
      return 'API Direct error (' + status + ').' + detail;
  }
}

function parseJson_(text) {
  try { return JSON.parse(text); } catch (e) { return null; }
}

function isRetryable_(status, body) {
  if (status === 502 || status === 503 || status === 504) return true;
  if (status === 429) {
    var code = body && body.code;
    return code === 'concurrency_limit_exceeded' || code === 'upstream_rate_limit' || !code;
  }
  return false;
}

/**
 * Sends a prepared request. `options`: apiKey (required), deadlineMs (total
 * time budget including retries, default 25 s), maxRetries (default 3).
 * Returns the parsed JSON body; throws ApiError on any non-2xx status.
 */
function sendRequest(request, options) {
  var opts = options || {};
  var apiKey = opts.apiKey;
  if (!apiKey) throw new ApiError(noKeyMessage_(), 401, 'missing_api_key');
  var deadline = Date.now() + (opts.deadlineMs || 25000);
  var maxRetries = opts.maxRetries === undefined ? 3 : opts.maxRetries;
  var fetchOptions = {
    method: request.method,
    headers: {
      'X-API-Key': apiKey,
      'Accept': 'application/json',
      'X-Client': 'google-sheets-addon/' + ADDON_VERSION,
    },
    muteHttpExceptions: true,
  };
  if (request.payload) {
    fetchOptions.contentType = 'application/json';
    fetchOptions.payload = JSON.stringify(request.payload);
  }
  var attempt = 0;
  for (;;) {
    var response;
    try {
      response = UrlFetchApp.fetch(request.url, fetchOptions);
    } catch (e) {
      throw new ApiError('Could not reach API Direct: ' + (e && e.message ? e.message : e), 0, 'network');
    }
    var status = response.getResponseCode();
    var text = response.getContentText();
    var body = parseJson_(text);
    if (status >= 200 && status < 300) {
      if (body === null) throw new ApiError('API Direct returned a response that is not JSON.', status, 'bad_json');
      return body;
    }
    var waitMs = 1000 * Math.pow(2, attempt);
    if (isRetryable_(status, body) && attempt < maxRetries && Date.now() + waitMs < deadline) {
      Utilities.sleep(waitMs);
      attempt++;
      continue;
    }
    throw new ApiError(describeHttpError_(status, body), status, body && body.code);
  }
}

/** Convenience: resolve, build and send in one call. */
function callEndpoint(endpoint, params, options) {
  return sendRequest(buildRequest(endpoint, params), options);
}

/** Raw JSON call to any path, used for saved searches and the key check. */
function callPath(method, path, body, options) {
  var request = { method: method.toLowerCase(), url: API_BASE_URL + path, payload: body || null };
  if (request.method === 'get' && body) {
    request.payload = null;
    var query = encodeQuery_(body);
    if (query) request.url += '?' + query;
  }
  return sendRequest(request, options);
}

function noKeyMessage_() {
  return 'No API Direct key yet. Open Extensions > API Direct > Set API key. Free account: ' + SIGNUP_URL;
}
