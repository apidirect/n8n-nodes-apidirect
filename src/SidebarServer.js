/**
 * Functions the sidebar calls through google.script.run.
 */

var SIDEBAR_DEADLINE_MS = 5 * 60 * 1000;

/** Everything the sidebar needs to render. */
function getSidebarData() {
  return {
    catalog: {
      version: CATALOG.version,
      platforms: CATALOG.platforms,
      endpoints: CATALOG.endpoints.map(function (e) {
        return {
          key: e.key, label: e.label, platform: e.platform, kind: e.kind, price: e.price,
          freeTier: e.freeTier, description: e.description, docs: e.docs, saveable: e.saveable, suspended: e.suspended,
          params: e.params, fields: e.fields,
        };
      }),
    },
    settings: getSettings(),
    schedules: listSchedules(),
    intervals: scheduleIntervals_(),
    activeCell: getActiveCellA1(),
  };
}

/** The selected cell as "Sheet name!A1". */
function getActiveCellA1() {
  var range = SpreadsheetApp.getActiveSpreadsheet().getActiveRange();
  if (!range) return '';
  var cell = range.getCell(1, 1);
  return cell.getSheet().getName() + '!' + cell.getA1Notation();
}

/**
 * Runs an endpoint and writes the table into the sheet.
 * request: {endpoint, params, fields, maxRows, headers, destination, clearBelow}
 * destination: "" or "active" for the selected cell, otherwise "Sheet!A1".
 */
function runToSheet(request) {
  var endpoint = requireEndpoint(request.endpoint);
  var apiKey = getApiKey_();
  if (!apiKey) throw new Error(noKeyMessage_());
  var params = request.params || {};
  var data = callEndpoint(endpoint, params, { apiKey: apiKey, deadlineMs: SIDEBAR_DEADLINE_MS });
  var table;
  if (endpoint.kind === 'text') {
    table = [['answer'], [aiReplyText(data)]];
    if (request.headers === false) table.shift();
  } else {
    var rows = extractRows(endpoint, data);
    table = toTable(rows, {
      fields: request.fields && request.fields.length ? request.fields : null,
      maxRows: request.maxRows === null || request.maxRows === undefined || request.maxRows === '' ? null : Number(request.maxRows),
      headers: request.headers !== false,
    });
  }
  var target = resolveDestination_(request.destination);
  var written = writeTable(target.sheet, target.row, target.column, table, { clearBelow: !!request.clearBelow });
  var dataRows = request.headers === false ? table.length : Math.max(table.length - 1, 0);
  return {
    rows: dataRows,
    columns: table.length ? table[0].length : 0,
    range: written.range,
    sheet: target.sheet.getName(),
    count: data && typeof data.count === 'number' ? data.count : null,
  };
}

function resolveDestination_(destination) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var text = String(destination || '').trim();
  if (!text || text.toLowerCase() === 'active') {
    var active = ss.getActiveRange();
    if (!active) throw new Error('Select a cell first, or type a destination such as Sheet1!A1.');
    var cell = active.getCell(1, 1);
    return { sheet: cell.getSheet(), row: cell.getRow(), column: cell.getColumn() };
  }
  var bang = text.lastIndexOf('!');
  var sheetName = bang >= 0 ? text.slice(0, bang).replace(/^'|'$/g, '') : '';
  var a1 = bang >= 0 ? text.slice(bang + 1) : text;
  var sheet = sheetName ? ss.getSheetByName(sheetName) : ss.getActiveSheet();
  if (!sheet) sheet = ss.insertSheet(sheetName);
  var match = /^\$?([A-Za-z]{1,3})\$?(\d+)(?::.*)?$/.exec(a1.trim());
  if (!match) throw new Error('Could not read the destination "' + text + '". Use a cell such as Sheet1!A1.');
  return { sheet: sheet, row: parseInt(match[2], 10), column: columnIndex_(match[1].toUpperCase()) };
}

function columnIndex_(letters) {
  var n = 0;
  for (var i = 0; i < letters.length; i++) n = n * 26 + (letters.charCodeAt(i) - 64);
  return n;
}

function columnLetters_(index) {
  var s = '';
  var n = index;
  while (n > 0) {
    var rem = (n - 1) % 26;
    s = String.fromCharCode(65 + rem) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

/**
 * Writes a 2-D array at (row, column), growing the sheet when needed.
 * options.clearBelow clears every used cell from the target row down, across
 * the table's columns, before writing (for "replace the old pull").
 */
function writeTable(sheet, row, column, table, options) {
  var opts = options || {};
  var numRows = table.length;
  var numCols = numRows ? Math.max.apply(null, table.map(function (r) { return r.length; })) : 0;
  if (!numRows || !numCols) {
    return { range: sheet.getName() + '!' + columnLetters_(column) + row, rows: 0, columns: 0 };
  }
  var square = table.map(function (r) {
    var line = r.slice();
    while (line.length < numCols) line.push('');
    return line;
  });
  if (opts.clearBelow) {
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    var clearRows = Math.max(lastRow - row + 1, 0);
    var clearCols = Math.max(Math.max(lastCol - column + 1, 0), numCols);
    if (clearRows > 0 && clearCols > 0) sheet.getRange(row, column, clearRows, clearCols).clearContent();
  }
  var needRows = row + numRows - 1 - sheet.getMaxRows();
  if (needRows > 0) sheet.insertRowsAfter(sheet.getMaxRows(), needRows);
  var needCols = column + numCols - 1 - sheet.getMaxColumns();
  if (needCols > 0) sheet.insertColumnsAfter(sheet.getMaxColumns(), needCols);
  var range = sheet.getRange(row, column, numRows, numCols);
  range.setValues(square);
  return {
    range: sheet.getName() + '!' + columnLetters_(column) + row + ':' + columnLetters_(column + numCols - 1) + (row + numRows - 1),
    rows: numRows,
    columns: numCols,
  };
}
