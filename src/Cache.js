/**
 * Response cache for custom functions. Sheets re-evaluates custom functions
 * whenever a sheet is reopened or an argument changes, and every evaluation
 * would otherwise be a billed request. Entries live up to 6 hours and are
 * keyed by a digest of the request and the key, so nothing is shared between
 * accounts. Values over the 100 KB CacheService limit are split into chunks.
 */

var CACHE_TTL_SECONDS = 6 * 60 * 60;
var CACHE_CHUNK_CHARS = 90000;
var CACHE_MAX_CHUNKS = 20;

function digest_(text) {
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text, Utilities.Charset.UTF_8);
  var hex = '';
  for (var i = 0; i < bytes.length; i++) {
    var b = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    hex += (b < 16 ? '0' : '') + b.toString(16);
  }
  return hex;
}

function cacheKeyFor_(request, apiKey) {
  return 'ad1:' + digest_(apiKey + '|' + request.method + '|' + request.url + '|' + (request.payload ? JSON.stringify(request.payload) : ''));
}

function cacheGet_(key) {
  var cache = CacheService.getScriptCache();
  var head = cache.get(key);
  if (head === null || head === undefined) return null;
  var meta = parseJson_(head);
  if (!meta || typeof meta.n !== 'number') return null;
  var keys = [];
  for (var i = 0; i < meta.n; i++) keys.push(key + ':' + i);
  var chunks = cache.getAll(keys);
  var text = '';
  for (var j = 0; j < meta.n; j++) {
    var part = chunks[key + ':' + j];
    if (part === null || part === undefined) return null;
    text += part;
  }
  return parseJson_(text);
}

function cachePut_(key, data) {
  var text = JSON.stringify(data);
  var n = Math.ceil(text.length / CACHE_CHUNK_CHARS);
  if (n === 0 || n > CACHE_MAX_CHUNKS) return false;
  var cache = CacheService.getScriptCache();
  var values = {};
  for (var i = 0; i < n; i++) {
    values[key + ':' + i] = text.slice(i * CACHE_CHUNK_CHARS, (i + 1) * CACHE_CHUNK_CHARS);
  }
  values[key] = JSON.stringify({ n: n });
  cache.putAll(values, CACHE_TTL_SECONDS);
  return true;
}
