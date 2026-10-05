/**
 * Per-user settings. The API key lives in the user's PropertiesService store,
 * never in the spreadsheet, so sharing a sheet never shares a key.
 */

var PROP_API_KEY = 'apidirect.apiKey';

function getApiKey_() {
  return PropertiesService.getUserProperties().getProperty(PROP_API_KEY) || '';
}

function maskKey_(key) {
  if (!key) return '';
  if (key.length <= 12) return key.slice(0, 3) + '…';
  return key.slice(0, 8) + '…' + key.slice(-4);
}

/** Settings for the sidebar; never returns the full key. */
function getSettings() {
  var key = getApiKey_();
  return {
    hasKey: !!key,
    maskedKey: maskKey_(key),
    signupUrl: SIGNUP_URL,
    keysUrl: KEYS_URL,
    docsUrl: DOCS_URL,
    pricingUrl: PRICING_URL,
    billingUrl: BILLING_URL,
    version: ADDON_VERSION,
  };
}

/**
 * Validates a key against the API's cheapest endpoint and stores it.
 * Only a 401 means the key is wrong; 402/429 mean it works but the account
 * is out of credit or rate limited, which is still worth saving.
 */
function saveApiKey(key) {
  var trimmed = String(key || '').trim();
  if (!trimmed) throw new Error('Paste an API key first.');
  if (/\s/.test(trimmed)) throw new Error('That does not look like an API key (it contains spaces).');
  try {
    callPath('GET', '/v1/time', null, { apiKey: trimmed, deadlineMs: 20000, maxRetries: 1 });
  } catch (e) {
    if (e && e.status === 401) {
      throw new Error('API Direct rejected that key. Copy a key from ' + KEYS_URL + ' (keys start with ak_live_).');
    }
    if (e && e.status === 0) throw e;
    // Any other status proves the key is accepted; the account state is the user's business.
  }
  PropertiesService.getUserProperties().setProperty(PROP_API_KEY, trimmed);
  return getSettings();
}

function clearApiKey() {
  PropertiesService.getUserProperties().deleteProperty(PROP_API_KEY);
  return getSettings();
}
