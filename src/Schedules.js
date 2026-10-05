/**
 * Scheduled refreshes: a saved search (API Direct remembers what it already
 * returned) or a plain endpoint call, run by an hourly time-driven trigger
 * and written into a sheet. Schedules belong to the user who created them
 * and are stored in their PropertiesService store, one entry per schedule.
 */

var TRIGGER_HANDLER = 'runScheduledRefreshes';
var SCHEDULE_PREFIX = 'apidirect.schedule.';
var DUE_TOLERANCE_MS = 15 * 60 * 1000;
var FETCHED_AT_COLUMN = 'fetched_at';
var SCHEDULE_DEADLINE_MS = 5 * 60 * 1000;

function scheduleIntervals_() {
  return [
    { hours: 1, label: 'Every hour' },
    { hours: 6, label: 'Every 6 hours' },
    { hours: 12, label: 'Every 12 hours' },
    { hours: 24, label: 'Every day' },
    { hours: 168, label: 'Every week' },
  ];
}

function spreadsheetId_() {
  return SpreadsheetApp.getActiveSpreadsheet().getId();
}

function schedulePrefix_() {
  return SCHEDULE_PREFIX + spreadsheetId_() + '.';
}

function loadSchedules_() {
  var prefix = schedulePrefix_();
  var all = PropertiesService.getUserProperties().getProperties();
  var schedules = [];
  Object.keys(all).forEach(function (key) {
    if (key.indexOf(prefix) !== 0) return;
    var parsed = parseJson_(all[key]);
    if (parsed && parsed.id) schedules.push(parsed);
  });
  schedules.sort(function (a, b) { return (a.createdAt || '') < (b.createdAt || '') ? -1 : 1; });
  return schedules;
}

function saveSchedule_(schedule) {
  PropertiesService.getUserProperties().setProperty(schedulePrefix_() + schedule.id, JSON.stringify(schedule));
}

function removeSchedule_(id) {
  PropertiesService.getUserProperties().deleteProperty(schedulePrefix_() + id);
}

function newScheduleId_() {
  return 's' + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
}

/** Schedules for this spreadsheet, as the sidebar shows them. */
function listSchedules() {
  var hasTrigger = findTriggers_().length > 0;
  return loadSchedules_().map(function (s) {
    var endpoint = findEndpoint(s.endpoint);
    return {
      id: s.id,
      name: s.name,
      endpoint: s.endpoint,
      endpointLabel: endpoint ? platformLabel_(endpoint.platform) + ' · ' + endpoint.label : s.endpoint,
      params: s.params,
      sheetName: s.sheetName,
      mode: s.mode,
      intervalHours: s.intervalHours,
      nextRunAt: s.nextRunAt,
      lastRunAt: s.lastRunAt,
      lastStatus: s.lastStatus,
      lastMessage: s.lastMessage,
      lastRows: s.lastRows,
      totalRows: s.totalRows,
      triggerActive: hasTrigger,
    };
  });
}

function platformLabel_(id) {
  for (var i = 0; i < CATALOG.platforms.length; i++) {
    if (CATALOG.platforms[i].id === id) return CATALOG.platforms[i].label;
  }
  return id;
}

function cleanSheetName_(name) {
  var text = String(name || '').replace(/[\[\]\*\?\/\\:]/g, ' ').replace(/\s+/g, ' ').trim();
  return text.slice(0, 100) || 'API Direct';
}

/**
 * Creates a schedule and runs it once right away.
 * definition: {name, endpoint, params, fields, sheetName, mode, intervalHours}
 */
function createSchedule(definition) {
  var endpoint = requireEndpoint(definition.endpoint);
  var apiKey = getApiKey_();
  if (!apiKey) throw new Error(noKeyMessage_());
  var mode = definition.mode === 'replace' ? 'replace' : 'append';
  if (mode === 'append' && !endpoint.saveable) {
    throw new Error(endpoint.label + ' cannot be polled for new results. Choose "Replace the table" instead.');
  }
  var intervals = scheduleIntervals_().map(function (i) { return i.hours; });
  var hours = Number(definition.intervalHours);
  if (intervals.indexOf(hours) < 0) throw new Error('Choose how often to refresh.');
  var params = prepareParams(endpoint, definition.params || {});
  var fields = definition.fields && definition.fields.length ? definition.fields.slice() : null;
  var name = String(definition.name || '').trim() || (endpoint.label + ' ' + (params.query || params.url || params.username || ''));
  var schedule = {
    id: newScheduleId_(),
    name: name.slice(0, 100),
    endpoint: endpoint.key,
    params: params,
    fields: fields,
    sheetName: cleanSheetName_(definition.sheetName || name),
    mode: mode,
    intervalHours: hours,
    savedSearchId: null,
    columns: null,
    createdAt: new Date().toISOString(),
    nextRunAt: null,
    lastRunAt: null,
    lastStatus: 'never',
    lastMessage: '',
    lastRows: 0,
    totalRows: 0,
  };
  if (mode === 'append') {
    var created = callPath('POST', '/v1/saved-searches', {
      endpoint: endpoint.path,
      params: params,
      name: ('Google Sheets · ' + schedule.name).slice(0, 100),
    }, { apiKey: apiKey, deadlineMs: 60000 });
    schedule.savedSearchId = created && created.saved_search ? created.saved_search.id : null;
    if (!schedule.savedSearchId) throw new Error('API Direct did not return a saved search id.');
  }
  try {
    runSchedule_(schedule, apiKey);
  } catch (e) {
    if (schedule.savedSearchId) {
      try { callPath('DELETE', '/v1/saved-searches/' + schedule.savedSearchId, null, { apiKey: apiKey, maxRetries: 0 }); } catch (ignored) { /* best effort */ }
    }
    throw e;
  }
  saveSchedule_(schedule);
  ensureTrigger_();
  return listSchedules();
}

function runScheduleNow(id) {
  var schedule = loadSchedules_().filter(function (s) { return s.id === id; })[0];
  if (!schedule) throw new Error('That schedule no longer exists.');
  var apiKey = getApiKey_();
  if (!apiKey) throw new Error(noKeyMessage_());
  try {
    runSchedule_(schedule, apiKey);
  } finally {
    saveSchedule_(schedule);
  }
  return listSchedules();
}

function deleteSchedule(id) {
  var schedule = loadSchedules_().filter(function (s) { return s.id === id; })[0];
  if (schedule && schedule.savedSearchId) {
    var apiKey = getApiKey_();
    if (apiKey) {
      try { callPath('DELETE', '/v1/saved-searches/' + schedule.savedSearchId, null, { apiKey: apiKey, maxRetries: 0 }); } catch (ignored) { /* already gone */ }
    }
  }
  removeSchedule_(id);
  if (loadSchedules_().length === 0) removeTriggers_();
  return listSchedules();
}

/** The time-driven trigger's handler: runs every schedule that is due. */
function runScheduledRefreshes() {
  var lock = LockService.getUserLock();
  if (!lock.tryLock(30000)) return;
  try {
    var apiKey = getApiKey_();
    var now = Date.now();
    loadSchedules_().forEach(function (schedule) {
      if (!isDue_(schedule, now)) return;
      try {
        if (!apiKey) throw new ApiError(noKeyMessage_(), 401, 'missing_api_key');
        runSchedule_(schedule, apiKey);
      } catch (e) {
        recordFailure_(schedule, e);
      }
      saveSchedule_(schedule);
    });
  } finally {
    lock.releaseLock();
  }
}

function isDue_(schedule, now) {
  if (!schedule.nextRunAt) return true;
  var next = Date.parse(schedule.nextRunAt);
  return isNaN(next) || next - DUE_TOLERANCE_MS <= now;
}

function recordFailure_(schedule, error) {
  schedule.lastStatus = 'error';
  schedule.lastMessage = String(error && error.message ? error.message : error).slice(0, 500);
  schedule.lastRows = 0;
  // Try again next time the trigger fires rather than waiting a full interval.
  schedule.nextRunAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
}

/** Runs one schedule and writes to its sheet. Mutates `schedule` with the outcome. */
function runSchedule_(schedule, apiKey) {
  var endpoint = requireEndpoint(schedule.endpoint);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(schedule.sheetName) || ss.insertSheet(schedule.sheetName);
  var ranAt = new Date();
  var written;
  try {
    if (schedule.mode === 'append') {
      written = appendNewResults_(schedule, endpoint, sheet, apiKey, ranAt);
    } else {
      written = replaceTable_(schedule, endpoint, sheet, apiKey, ranAt);
    }
  } catch (e) {
    recordFailure_(schedule, e);
    throw e;
  }
  schedule.lastRunAt = ranAt.toISOString();
  schedule.lastStatus = 'ok';
  schedule.lastMessage = '';
  schedule.lastRows = written;
  schedule.totalRows = (schedule.totalRows || 0) + written;
  schedule.nextRunAt = new Date(ranAt.getTime() + schedule.intervalHours * 60 * 60 * 1000).toISOString();
  return written;
}

function appendNewResults_(schedule, endpoint, sheet, apiKey, ranAt) {
  var data = callPath('POST', '/v1/saved-searches/' + schedule.savedSearchId + '/run', { mark_seen: true },
    { apiKey: apiKey, deadlineMs: SCHEDULE_DEADLINE_MS });
  var results = Array.isArray(data.results) ? data.results : [];
  var flat = results.map(function (r) { return flattenRecord(r); });
  if (!schedule.columns) {
    var columns = schedule.fields ? schedule.fields.slice() : collectColumns(flat);
    if (!columns.length) columns = endpoint.fields.slice();
    if (!columns.length) return 0; // nothing yet to shape the sheet with; next run will
    schedule.columns = columns;
  }
  var extra = {};
  extra[FETCHED_AT_COLUMN] = ranAt.toISOString();
  var table = toTable(results, { fields: schedule.columns, headers: false, extra: extra });
  var lastRow = sheet.getLastRow();
  if (lastRow === 0) {
    writeTable(sheet, 1, 1, [schedule.columns.concat([FETCHED_AT_COLUMN])]);
    sheet.setFrozenRows(1);
    lastRow = 1;
  }
  if (table.length) writeTable(sheet, lastRow + 1, 1, table);
  return table.length;
}

function replaceTable_(schedule, endpoint, sheet, apiKey, ranAt) {
  var data = callEndpoint(endpoint, schedule.params, { apiKey: apiKey, deadlineMs: SCHEDULE_DEADLINE_MS });
  var table;
  if (endpoint.kind === 'text') {
    table = [['answer'], [aiReplyText(data)]];
  } else {
    table = toTable(extractRows(endpoint, data), { fields: schedule.fields });
  }
  sheet.clearContents();
  writeTable(sheet, 1, 1, table);
  if (table.length) {
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1).setNote('Refreshed by API Direct at ' + ranAt.toISOString() + ' (' + schedule.name + ').');
  }
  return Math.max(table.length - 1, 0);
}

function findTriggers_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ScriptApp.getUserTriggers(ss).filter(function (t) { return t.getHandlerFunction() === TRIGGER_HANDLER; });
}

function ensureTrigger_() {
  if (findTriggers_().length) return;
  ScriptApp.newTrigger(TRIGGER_HANDLER).timeBased().everyHours(1).create();
}

function removeTriggers_() {
  findTriggers_().forEach(function (t) { ScriptApp.deleteTrigger(t); });
}
