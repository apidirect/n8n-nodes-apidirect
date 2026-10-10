'use strict';
/**
 * Loads src/*.js into a sandbox that fakes the Apps Script services the
 * add-on uses, so the pure logic can be exercised with node --test.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const SRC = path.join(__dirname, '..', '..', 'src');

function makeStore() {
  const store = new Map();
  return {
    getProperty: (k) => (store.has(k) ? store.get(k) : null),
    setProperty(k, v) { store.set(k, String(v)); return this; },
    deleteProperty(k) { store.delete(k); return this; },
    getProperties: () => Object.fromEntries(store),
    getKeys: () => Array.from(store.keys()),
    deleteAllProperties() { store.clear(); return this; },
    _store: store,
  };
}

function makeCache() {
  const store = new Map();
  return {
    get: (k) => (store.has(k) ? store.get(k) : null),
    put(k, v) { store.set(k, String(v)); },
    putAll(values) { Object.keys(values).forEach((k) => store.set(k, String(values[k]))); },
    getAll(keys) { const out = {}; keys.forEach((k) => { if (store.has(k)) out[k] = store.get(k); }); return out; },
    remove(k) { store.delete(k); },
    removeAll(keys) { keys.forEach((k) => store.delete(k)); },
    _store: store,
  };
}

function colLetters(index) {
  let s = '';
  let n = index;
  while (n > 0) { const rem = (n - 1) % 26; s = String.fromCharCode(65 + rem) + s; n = Math.floor((n - 1) / 26); }
  return s;
}

class FakeSheet {
  constructor(ss, name) {
    this.ss = ss;
    this.name = name;
    this.cells = new Map(); // "r,c" -> value
    this.maxRows = 1000;
    this.maxCols = 26;
    this.notes = new Map();
    this.formats = new Map();
    this.frozenRows = 0;
    this.lastRowUsed = 0;
    this.lastColUsed = 0;
  }
  getName() { return this.name; }
  getParent() { return this.ss; }
  getMaxRows() { return this.maxRows; }
  getMaxColumns() { return this.maxCols; }
  insertRowsAfter(after, n) { this.maxRows += n; return this; }
  insertColumnsAfter(after, n) { this.maxCols += n; return this; }
  setFrozenRows(n) { this.frozenRows = n; return this; }
  _recompute() {
    let r = 0; let c = 0;
    for (const [key, value] of this.cells) {
      if (value === '' || value === null || value === undefined) continue;
      const [row, col] = key.split(',').map(Number);
      if (row > r) r = row;
      if (col > c) c = col;
    }
    this.lastRowUsed = r; this.lastColUsed = c;
  }
  getLastRow() { this._recompute(); return this.lastRowUsed; }
  getLastColumn() { this._recompute(); return this.lastColUsed; }
  clearContents() { this.cells.clear(); this.notes.clear(); return this; }
  getRange(row, col, numRows, numCols) {
    if (typeof row === 'string') {
      const m = /^([A-Z]+)(\d+)$/.exec(row);
      return this.getRange(parseInt(m[2], 10), m[1].split('').reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0), 1, 1);
    }
    return new FakeRange(this, row, col, numRows || 1, numCols || 1);
  }
  getValues() {
    this._recompute();
    const out = [];
    for (let r = 1; r <= this.lastRowUsed; r++) {
      const line = [];
      for (let c = 1; c <= this.lastColUsed; c++) line.push(this.cells.has(`${r},${c}`) ? this.cells.get(`${r},${c}`) : '');
      out.push(line);
    }
    return out;
  }
}

class FakeRange {
  constructor(sheet, row, col, numRows, numCols) {
    Object.assign(this, { sheet, row, col, numRows, numCols });
  }
  getSheet() { return this.sheet; }
  getRow() { return this.row; }
  getColumn() { return this.col; }
  getCell(r, c) { return new FakeRange(this.sheet, this.row + r - 1, this.col + c - 1, 1, 1); }
  getA1Notation() {
    const a = colLetters(this.col) + this.row;
    if (this.numRows === 1 && this.numCols === 1) return a;
    return a + ':' + colLetters(this.col + this.numCols - 1) + (this.row + this.numRows - 1);
  }
  setValues(values) {
    if (values.length !== this.numRows || values.some((r) => r.length !== this.numCols)) {
      throw new Error(`setValues shape mismatch: range ${this.numRows}x${this.numCols}, data ${values.length}x${values[0] && values[0].length}`);
    }
    if (this.row + this.numRows - 1 > this.sheet.maxRows || this.col + this.numCols - 1 > this.sheet.maxCols) {
      throw new Error('range exceeds sheet dimensions');
    }
    values.forEach((line, r) => line.forEach((v, c) => this.sheet.cells.set(`${this.row + r},${this.col + c}`, v)));
    return this;
  }
  getValues() {
    const out = [];
    for (let r = 0; r < this.numRows; r++) {
      const line = [];
      for (let c = 0; c < this.numCols; c++) {
        const k = `${this.row + r},${this.col + c}`;
        line.push(this.sheet.cells.has(k) ? this.sheet.cells.get(k) : '');
      }
      out.push(line);
    }
    return out;
  }
  clearContent() {
    for (let r = 0; r < this.numRows; r++) for (let c = 0; c < this.numCols; c++) this.sheet.cells.delete(`${this.row + r},${this.col + c}`);
    return this;
  }
  setNote(note) { this.sheet.notes.set(`${this.row},${this.col}`, note); return this; }
  setNumberFormat(format) { this.sheet.formats.set(`${this.row},${this.col}`, format); return this; }
  getNumberFormat() { return this.sheet.formats.get(`${this.row},${this.col}`) || '0.###############'; }
  getNote() { return this.sheet.notes.get(`${this.row},${this.col}`) || ''; }
}

class FakeSpreadsheet {
  constructor(id) {
    this.id = id || 'ss-test';
    this.sheets = [new FakeSheet(this, 'Sheet1')];
    this.activeRange = this.sheets[0].getRange(1, 1, 1, 1);
  }
  getId() { return this.id; }
  getSheets() { return this.sheets; }
  getSheetByName(name) { return this.sheets.find((s) => s.name === name) || null; }
  insertSheet(name) { const s = new FakeSheet(this, name); this.sheets.push(s); return s; }
  getActiveSheet() { return this.activeRange.getSheet(); }
  getActiveRange() { return this.activeRange; }
  setActive(sheetName, row, col) { this.activeRange = this.getSheetByName(sheetName).getRange(row, col, 1, 1); }
}

function toHost(value) {
  if (value === null || typeof value !== 'object') return value;
  return JSON.parse(JSON.stringify(value));
}

function createEnv(options = {}) {
  const fetchLog = [];
  let fetchHandler = options.fetchHandler || (() => ({ code: 200, body: {} }));
  const triggers = [];
  const spreadsheet = new FakeSpreadsheet(options.spreadsheetId);
  const userProps = makeStore();
  const scriptProps = makeStore();
  const docProps = makeStore();
  const scriptCache = makeCache();
  const sleeps = [];

  const sandbox = {
    console,
    Date,
    JSON,
    Math,
    Object,
    Array,
    String,
    Number,
    Boolean,
    Error,
    RegExp,
    isFinite,
    isNaN,
    parseInt,
    parseFloat,
    encodeURIComponent,
    decodeURIComponent,
    UrlFetchApp: {
      fetch(url, opts) {
        fetchLog.push({ url, options: opts });
        const res = fetchHandler(url, opts, fetchLog.length);
        const body = typeof res.body === 'string' ? res.body : JSON.stringify(res.body);
        return {
          getResponseCode: () => res.code,
          getContentText: () => body,
          getHeaders: () => res.headers || {},
        };
      },
    },
    PropertiesService: {
      getUserProperties: () => userProps,
      getScriptProperties: () => scriptProps,
      getDocumentProperties: () => docProps,
    },
    CacheService: {
      getScriptCache: () => scriptCache,
      getUserCache: () => scriptCache,
      getDocumentCache: () => scriptCache,
    },
    Utilities: {
      sleep: (ms) => { sleeps.push(ms); },
      computeDigest: (algo, text) => Array.from(crypto.createHash('sha256').update(text, 'utf8').digest()).map((b) => (b > 127 ? b - 256 : b)),
      DigestAlgorithm: { SHA_256: 'SHA_256' },
      Charset: { UTF_8: 'UTF_8' },
      base64Encode: (s) => Buffer.from(s).toString('base64'),
      formatDate: (d) => d.toISOString(),
    },
    SpreadsheetApp: {
      getActiveSpreadsheet: () => spreadsheet,
      getActive: () => spreadsheet,
      getUi: () => ({
        createAddonMenu: () => ({ addItem() { return this; }, addSeparator() { return this; }, addToUi() {} }),
        showSidebar() {},
        showModalDialog() {},
      }),
    },
    ScriptApp: {
      getUserTriggers: () => triggers.slice(),
      getProjectTriggers: () => triggers.slice(),
      deleteTrigger(t) { const i = triggers.indexOf(t); if (i >= 0) triggers.splice(i, 1); },
      newTrigger(handler) {
        return {
          timeBased() {
            return {
              everyHours(h) { this.hours = h; return this; },
              create() {
                const t = { getHandlerFunction: () => handler, getUniqueId: () => 't' + triggers.length, hours: this.hours };
                triggers.push(t);
                return t;
              },
            };
          },
        };
      },
    },
    LockService: {
      getUserLock: () => ({ tryLock: () => true, releaseLock() {}, waitLock() {} }),
      getScriptLock: () => ({ tryLock: () => true, releaseLock() {}, waitLock() {} }),
    },
    HtmlService: {
      createTemplateFromFile: () => ({ evaluate: () => ({ setTitle() { return this; } }) }),
      createHtmlOutput: () => ({ setWidth() { return this; }, setHeight() { return this; } }),
      createHtmlOutputFromFile: () => ({ getContent: () => '' }),
    },
    Logger: { log() {} },
  };
  const context = vm.createContext(sandbox);
  fs.readdirSync(SRC).filter((f) => f.endsWith('.js')).sort().forEach((file) => {
    const code = fs.readFileSync(path.join(SRC, file), 'utf8');
    vm.runInContext(code, context, { filename: file });
  });
  return {
    context,
    fetchLog,
    sleeps,
    triggers,
    spreadsheet,
    userProps,
    scriptCache,
    setFetchHandler(fn) { fetchHandler = fn; },
    setApiKey(key) { userProps.setProperty('apidirect.apiKey', key); },
    // Values made inside the vm have their own prototypes, which deepStrictEqual
    // rejects, so results are copied into this realm (they are plain JSON).
    fn(name) {
      return (...args) => toHost(context[name](...args));
    },
    get(name) { return toHost(context[name]); },
  };
}

module.exports = { createEnv, FakeSpreadsheet, FakeSheet };
