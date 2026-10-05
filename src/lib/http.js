'use strict';

// Everything the app knows about talking to apidirect.io: base URL, the
// X-API-Key header, and how API Direct's error bodies become Zapier errors.

const packageJson = require('../../package.json');

const BASE_URL = 'https://apidirect.io';
const USER_AGENT = `apidirect-zapier/${packageJson.version}`;

// Attached to every request. Also marks every response as "don't throw yet" so
// `throwForApiError` below can turn the API's JSON error into a readable one.
const addApiKey = (request, z, bundle) => {
  request.headers = request.headers || {};
  request.headers['X-API-Key'] = (bundle.authData && bundle.authData.api_key) || '';
  request.headers.Accept = 'application/json';
  request.headers['User-Agent'] = USER_AGENT;
  request.skipThrowForStatus = true;
  // Let throwForApiError below see 429s too, so the API's own message and
  // code (concurrency vs. a spending limit) reach the user.
  request.throwForThrottlingEarly = false;
  return request;
};

const parseBody = (response) => {
  if (response.data && typeof response.data === 'object') {
    return response.data;
  }
  try {
    return JSON.parse(response.content);
  } catch (e) {
    return {};
  }
};

// API Direct errors are JSON: {"error": "...", "code": "..."} with an HTTP
// status. 401 means a bad key, 402 the free tier ran out with no card on file,
// 429 and 5xx are worth a retry later (Zapier re-runs a ThrottledError).
const throwForApiError = (response, z) => {
  if (response.status < 400) {
    return response;
  }
  const body = parseBody(response);
  const message = body.error || `API Direct returned HTTP ${response.status}`;
  const code = body.code || `http_${response.status}`;

  if (response.status === 401) {
    throw new z.errors.Error(
      `${message}. Check the API key on this connection against ${BASE_URL}/dashboard/keys.`,
      'AuthenticationError',
      401,
    );
  }
  if (response.status === 402) {
    throw new z.errors.Error(
      `${message}. Add a payment method at ${BASE_URL}/dashboard to keep using this endpoint.`,
      'PaymentRequired',
      402,
    );
  }
  if (response.status === 429) {
    // concurrency_limit_exceeded or upstream_rate_limit: try again shortly.
    // daily/monthly spending limits: there is no point retrying soon.
    if (code === 'daily_limit_exceeded' || code === 'monthly_limit_exceeded') {
      throw new z.errors.Error(`${message}. Raise the limit at ${BASE_URL}/dashboard.`, code, 429);
    }
    throw new z.errors.ThrottledError(message, 60);
  }
  if (response.status === 502 || response.status === 503 || response.status === 504) {
    throw new z.errors.ThrottledError(message, 120);
  }
  throw new z.errors.Error(message, code, response.status);
};

module.exports = { BASE_URL, USER_AGENT, addApiKey, throwForApiError, parseBody };
