/**
 * Pure helpers that turn API responses into the 2-D arrays a sheet can hold,
 * and parse the loosely-typed arguments custom functions receive.
 */

var MAX_CELL_CHARS = 50000;

/** Flattens one result object into {"a.b": scalar} pairs. */
function flattenRecord(record, prefix, out) {
  var target = out || {};
  var pre = prefix || '';
  if (record === null || typeof record !== 'object' || Array.isArray(record)) {
    target[pre || 'value'] = cellValue(record);
    return target;
  }
  Object.keys(record).forEach(function (key) {
    var value = record[key];
    var path = pre ? pre + '.' + key : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      if (Object.keys(value).length === 0) {
        target[path] = '';
      } else {
        flattenRecord(value, path, target);
      }
    } else {
      target[path] = cellValue(value);
    }
  });
  return target;
}

/** Converts any JSON value into something a cell can hold. */
function cellValue(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number') return isFinite(value) ? value : '';
  if (typeof value === 'boolean') return value;
  if (Array.isArray(value)) {
    var scalars = value.every(function (v) { return v === null || typeof v !== 'object'; });
    if (scalars) {
      return truncate_(value.filter(function (v) { return v !== null && v !== undefined && v !== ''; })
        .map(function (v) { return String(v); }).join(', '));
    }
    return truncate_(JSON.stringify(value));
  }
  if (typeof value === 'object') return truncate_(JSON.stringify(value));
  return truncate_(String(value));
}

function truncate_(text) {
  if (text.length <= MAX_CELL_CHARS) return text;
  return text.slice(0, MAX_CELL_CHARS - 1) + '…';
}

/**
 * Picks the result rows out of a response: the list for list endpoints, the
 * single object (unwrapped) for detail endpoints.
 */
function extractRows(endpoint, data) {
  if (!data || typeof data !== 'object') return [];
  if (endpoint.kind === 'list') {
    var list = data[endpoint.listKey];
    return Array.isArray(list) ? list : [];
  }
  if (endpoint.kind === 'detail') {
    var object = endpoint.listKey ? data[endpoint.listKey] : data;
    if (object === null || object === undefined) return [];
    return [object];
  }
  return [data];
}

/** Union of keys across flattened rows, in order of first appearance. */
function collectColumns(flatRows) {
  var seen = {};
  var columns = [];
  flatRows.forEach(function (row) {
    Object.keys(row).forEach(function (key) {
      if (!seen[key]) {
        seen[key] = true;
        columns.push(key);
      }
    });
  });
  return columns;
}

/**
 * Builds a 2-D array. options: fields (array of column names or null),
 * maxRows (number or null), headers (boolean, default true), extra (object of
 * fixed columns appended to every row, e.g. {fetched_at: '...'}).
 */
function toTable(rows, options) {
  var opts = options || {};
  var flat = rows.map(function (r) { return flattenRecord(r); });
  // Columns come from every row so a max_results change never reshuffles them.
  var columns = opts.fields && opts.fields.length ? opts.fields.slice() : collectColumns(flat);
  if (opts.maxRows !== null && opts.maxRows !== undefined && opts.maxRows >= 0) {
    flat = flat.slice(0, opts.maxRows);
  }
  var extra = opts.extra || {};
  var extraKeys = Object.keys(extra);
  var table = [];
  if (opts.headers !== false) table.push(columns.concat(extraKeys));
  flat.forEach(function (row) {
    var line = columns.map(function (c) { return c in row ? row[c] : ''; });
    extraKeys.forEach(function (k) { line.push(extra[k]); });
    table.push(line);
  });
  return table;
}

/**
 * Parses the `options`/`params` argument of a custom function. Accepts a
 * string ("sort_by=most_recent&pages=2", also newline or ";" separated), a
 * two-column range of names and values, a two-row range of names over values,
 * or a plain object. Returns a plain object; blank values are dropped.
 */
function parseOptions(value) {
  if (value === null || value === undefined || value === '') return {};
  if (Array.isArray(value)) return parseOptionsRange_(value);
  if (typeof value === 'object' && !(value instanceof Date)) return value;
  var text = String(value).trim();
  if (!text) return {};
  var result = {};
  text.split(/[&;\n]+/).forEach(function (pair) {
    var trimmed = pair.trim();
    if (!trimmed) return;
    var eq = trimmed.indexOf('=');
    if (eq < 0) throw new Error('Could not read option "' + trimmed + '". Use name=value pairs separated by &.');
    var name = trimmed.slice(0, eq).trim();
    var val = trimmed.slice(eq + 1).trim();
    if (name && val !== '') result[name] = val;
  });
  return result;
}

function parseOptionsRange_(range) {
  var rows = range.filter(function (r) { return Array.isArray(r) && r.some(function (c) { return c !== '' && c !== null; }); });
  if (!rows.length) return {};
  var result = {};
  var allPairs = rows.every(function (r) { return r.length === 2; });
  if (allPairs) {
    rows.forEach(function (r) {
      var name = String(r[0] == null ? '' : r[0]).trim();
      if (name && r[1] !== '' && r[1] !== null && r[1] !== undefined) result[name] = r[1];
    });
    return result;
  }
  if (rows.length === 2) {
    rows[0].forEach(function (name, i) {
      var n = String(name == null ? '' : name).trim();
      var v = rows[1][i];
      if (n && v !== '' && v !== null && v !== undefined) result[n] = v;
    });
    return result;
  }
  throw new Error('Options must be a two-column range of names and values, or a two-row range of names over values.');
}

/** Parses the `fields` argument: comma/newline separated string or a range. Returns null for "all". */
function parseFields(value) {
  if (value === null || value === undefined || value === '') return null;
  var names = [];
  if (Array.isArray(value)) {
    value.forEach(function (row) {
      (Array.isArray(row) ? row : [row]).forEach(function (cell) {
        var text = String(cell == null ? '' : cell).trim();
        if (text) names.push(text);
      });
    });
  } else {
    String(value).split(/[,\n]+/).forEach(function (part) {
      var text = part.trim();
      if (text) names.push(text);
    });
  }
  return names.length ? names : null;
}

/** Parses a max-rows argument; null means no limit. */
function parseLimit(value) {
  if (value === null || value === undefined || value === '') return null;
  var n = Number(value);
  if (!isFinite(n) || n < 0) throw new Error('max_results must be a positive number.');
  return Math.floor(n);
}

/** Reads a boolean-ish option such as headers=false. */
function parseBoolean(value, fallback) {
  if (value === null || value === undefined || value === '') return fallback;
  if (typeof value === 'boolean') return value;
  var text = String(value).trim().toLowerCase();
  if (text === 'true' || text === 'yes' || text === '1') return true;
  if (text === 'false' || text === 'no' || text === '0') return false;
  return fallback;
}

/** Joins a Google AI Mode reply into readable text. */
function aiReplyText(data) {
  var parts = (data && data.reply_parts) || [];
  var lines = [];
  parts.forEach(function (part) {
    if (!part) return;
    if (part.text) lines.push(String(part.text).trim());
    if (Array.isArray(part.list)) {
      part.list.forEach(function (item, i) {
        if (!item) return;
        var bullet = part.ordered ? (i + 1) + '. ' : '• ';
        var title = item.title ? String(item.title).trim() : '';
        var text = item.text ? String(item.text).trim() : '';
        lines.push(bullet + (title && text ? title + ': ' + text : title || text));
      });
    }
  });
  return truncate_(lines.filter(Boolean).join('\n'));
}
