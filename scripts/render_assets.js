'use strict';
/**
 * Renders the Marketplace assets with headless Chromium (Playwright):
 * icons, the card banner and 1280x800 screenshots of the real sidebar HTML
 * inside a mock Google Sheets frame. Run with `npm run assets`.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'marketplace');
const LOGO_SVG = fs.readFileSync(path.join(ROOT, 'marketplace', 'src', 'logo.svg'), 'utf8');

function loadPlaywright() {
  try { return require('playwright'); } catch (e) { /* fall through */ }
  const { execSync } = require('child_process');
  const globalRoot = execSync('npm root -g').toString().trim();
  return require(path.join(globalRoot, 'playwright'));
}

/** The sidebar as Apps Script would serve it, with includes and the tab template resolved. */
function sidebarHtml(initialTab) {
  let html = fs.readFileSync(path.join(SRC, 'Sidebar.html'), 'utf8');
  html = html.replace(/<\?!= include\('(\w+)'\); \?>/g, (_, name) => fs.readFileSync(path.join(SRC, name + '.html'), 'utf8'));
  html = html.replace('<?= initialTab ?>', initialTab);
  return html;
}

/** Catalog data the way getSidebarData() returns it, straight from the Apps Script sources. */
function sidebarData() {
  const { createEnv } = require(path.join(ROOT, 'test', 'helpers', 'gas-env.js'));
  const env = createEnv();
  env.setApiKey('ak_live_demo_key_1234');
  const data = env.fn('getSidebarData')();
  data.activeCell = 'Mentions!A1';
  const hour = 3600 * 1000;
  data.schedules = [
    { id: 's1', name: 'LinkedIn – "series A" fintech', endpoint: 'linkedin/posts', endpointLabel: 'LinkedIn · Search Posts', params: { query: 'series A fintech', sort_by: 'most_recent' }, sheetName: 'LinkedIn mentions', mode: 'append', intervalHours: 6, nextRunAt: new Date(Date.now() + 4 * hour).toISOString(), lastRunAt: new Date(Date.now() - 2 * hour).toISOString(), lastStatus: 'ok', lastMessage: '', lastRows: 14, totalRows: 212, triggerActive: true },
    { id: 's2', name: 'Trustpilot reviews – acme.com', endpoint: 'trustpilot/company/reviews', endpointLabel: 'Trustpilot · Company Reviews', params: { domain: 'acme.com', rating: '1,2' }, sheetName: 'Bad reviews', mode: 'append', intervalHours: 24, nextRunAt: new Date(Date.now() + 20 * hour).toISOString(), lastRunAt: new Date(Date.now() - 4 * hour).toISOString(), lastStatus: 'ok', lastMessage: '', lastRows: 3, totalRows: 41, triggerActive: true },
    { id: 's3', name: 'YouTube – competitor channels', endpoint: 'youtube/channels', endpointLabel: 'YouTube · Search Channels', params: { query: 'project management software' }, sheetName: 'Channels', mode: 'replace', intervalHours: 168, nextRunAt: new Date(Date.now() + 100 * hour).toISOString(), lastRunAt: new Date(Date.now() - 68 * hour).toISOString(), lastStatus: 'ok', lastMessage: '', lastRows: 20, totalRows: 60, triggerActive: true },
  ];
  return data;
}

const GRID_COLS = 'ABCDEFGHIJKLMN'.split('');

function sheetsFrame({ title, formula, headers, rows, sidebar, activeCell, sheetTabs }) {
  const colWidths = headers.map((h, i) => (i === 0 ? 46 : h.width || 150));
  const header = headers.map((h, i) => `<th style="width:${colWidths[i]}px">${i === 0 ? '' : GRID_COLS[i - 1]}</th>`).join('');
  const headRow = `<tr><td class="rn">1</td>${headers.slice(1).map((h) => `<td class="hd">${h.label}</td>`).join('')}</tr>`;
  const body = rows.map((r, i) => `<tr><td class="rn">${i + 2}</td>${r.map((c, j) => `<td class="${headers[j + 1].num ? 'num' : ''}">${c}</td>`).join('')}</tr>`).join('');
  const blank = Array.from({ length: Math.max(0, 24 - rows.length) }, (_, i) => `<tr><td class="rn">${rows.length + i + 2}</td>${headers.slice(1).map(() => '<td></td>').join('')}</tr>`).join('');
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    body { margin: 0; width: 1280px; height: 800px; overflow: hidden; font-family: Roboto, Arial, sans-serif; background: #fff; color: #202124; }
    .top { height: 64px; display: flex; align-items: center; padding: 0 16px; gap: 12px; }
    .top .icon { width: 28px; height: 36px; background: #0f9d58; border-radius: 3px; position: relative; }
    .top .icon:after { content: ''; position: absolute; left: 6px; right: 6px; top: 10px; bottom: 8px; border: 2px solid #fff; border-radius: 1px; background: linear-gradient(#fff 0 2px, transparent 2px) 0 50%/100% 2px no-repeat; }
    .top .doc { font-size: 18px; }
    .top .menu { font-size: 13px; color: #5f6368; margin-top: 2px; }
    .top .menu span { margin-right: 14px; }
    .top .menu span.ext { color: #202124; border-bottom: 2px solid #000; padding-bottom: 2px; }
    .toolbar { height: 40px; margin: 0 16px; background: #edf2fa; border-radius: 24px; display: flex; align-items: center; padding: 0 16px; gap: 14px; font-size: 13px; color: #444746; }
    .toolbar i { display: inline-block; width: 18px; height: 18px; border-radius: 3px; background: #c4c7c5; opacity: .6; }
    .fx { height: 30px; display: flex; align-items: center; border-bottom: 1px solid #c0c0c0; margin-top: 6px; font-size: 13px; }
    .fx .cell { width: 100px; padding: 0 10px; border-right: 1px solid #c0c0c0; height: 100%; display: flex; align-items: center; }
    .fx .f { padding: 0 10px; font-family: Consolas, Menlo, monospace; font-size: 12px; color: #202124; }
    .fx .f b { color: #5f6368; font-weight: normal; margin-right: 6px; font-style: italic; }
    .main { display: flex; height: calc(800px - 64px - 40px - 36px - 36px); }
    .grid { flex: 1; overflow: hidden; }
    table { border-collapse: collapse; table-layout: fixed; font-size: 12px; }
    th { background: #f8f9fa; border: 1px solid #c0c0c0; height: 22px; font-weight: normal; color: #5f6368; }
    td { border: 1px solid #e2e3e3; height: 21px; padding: 0 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 0; }
    td.rn { background: #f8f9fa; border-color: #c0c0c0; color: #5f6368; text-align: center; max-width: none; }
    td.hd { font-weight: bold; background: #f1f3f4; }
    td.num { text-align: right; }
    td.sel { outline: 2px solid #1a73e8; outline-offset: -1px; }
    .sidebar { width: 300px; border-left: 1px solid #dadce0; display: flex; flex-direction: column; background: #fff; }
    .sidebar .head { height: 48px; display: flex; align-items: center; justify-content: space-between; padding: 0 12px 0 16px; font-size: 16px; border-bottom: 1px solid #dadce0; }
    .sidebar .head span.x { color: #5f6368; font-size: 20px; }
    .sidebar iframe { border: 0; flex: 1; width: 100%; }
    .tabs-bar { height: 36px; display: flex; align-items: center; gap: 2px; padding: 0 16px; border-top: 1px solid #dadce0; font-size: 13px; }
    .tabs-bar .t { padding: 8px 16px; color: #5f6368; }
    .tabs-bar .t.on { color: #137333; background: #e6f4ea; border-radius: 6px 6px 0 0; font-weight: bold; }
  </style></head><body>
  <div class="top"><div class="icon"></div><div><div class="doc">${title}</div><div class="menu"><span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span><span>Data</span><span>Tools</span><span class="ext">Extensions</span><span>Help</span></div></div></div>
  <div class="toolbar"><i></i><i></i><i></i> <span>100%</span> <span>$</span> <span>%</span> <span>.0</span> <span>123</span> <span>Default (Arial)</span> <span>10</span> <b>B</b> <i>I</i> <i></i><i></i><i></i></div>
  <div class="fx"><div class="cell">${activeCell}</div><div class="f"><b>fx</b>${formula}</div></div>
  <div class="main">
    <div class="grid"><table><thead><tr>${header}</tr></thead><tbody>${headRow}${body}${blank}</tbody></table></div>
    ${sidebar ? `<div class="sidebar"><div class="head">API Direct <span class="x">×</span></div><iframe id="sb" srcdoc="${sidebar.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"></iframe></div>` : ''}
  </div>
  <div class="tabs-bar">${sheetTabs.map((t, i) => `<span class="t ${i === 0 ? 'on' : ''}">${t}</span>`).join('')}</div>
  </body></html>`;
}

function shimmedSidebar(initialTab, data, setup) {
  const shim = `<script>
    window.__DATA__ = ${JSON.stringify(data)};
    window.google = { script: { run: new Proxy({}, { get(target, name) {
      if (typeof name !== 'string' || name in target) return target[name];
      if (name === 'withSuccessHandler') return function (ok) { this.__ok = ok; return this; };
      if (name === 'withFailureHandler') return function (fail) { this.__fail = fail; return this; };
      return function () {
        var ok = this.__ok || function () {};
        var d = window.__DATA__;
        var result = name === 'getSidebarData' ? d : name === 'listSchedules' ? d.schedules : name === 'getActiveCellA1' ? d.activeCell : name === 'getSettings' ? d.settings : {};
        setTimeout(function () { ok(result); }, 0);
      };
    } }) } };
    window.__SETUP__ = ${setup || 'null'};
  </script>`;
  return sidebarHtml(initialTab).replace('</head>', shim + '</head>');
}

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

async function main() {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const data = sidebarData();
  fs.mkdirSync(path.join(OUT, 'icons'), { recursive: true });
  fs.mkdirSync(path.join(OUT, 'screenshots'), { recursive: true });

  // Icons: the logo on white with a little breathing room.
  for (const size of [32, 48, 96, 120, 128]) {
    const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    const pad = Math.round(size * 0.1);
    await page.setContent(`<html><body style="margin:0;background:#fff"><div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center"><div style="width:${size - 2 * pad}px;height:${size - 2 * pad}px">${LOGO_SVG.replace('<svg ', '<svg width="100%" height="100%" ')}</div></div></body></html>`);
    const file = size === 120 ? 'oauth-logo-120.png' : `icon-${size}.png`;
    await page.screenshot({ path: path.join(OUT, 'icons', file), omitBackground: false });
    await page.close();
  }

  // Card banner 220x140.
  {
    const page = await browser.newPage({ viewport: { width: 220, height: 140 }, deviceScaleFactor: 1 });
    await page.setContent(`<html><body style="margin:0;background:#fff;font-family:Arial,sans-serif"><div style="width:220px;height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;border:1px solid #e0e0e0;box-sizing:border-box"><div style="width:52px;height:52px">${LOGO_SVG.replace('<svg ', '<svg width="100%" height="100%" ')}</div><div style="font-size:17px;font-weight:bold;color:#111">API Direct</div><div style="font-size:11px;color:#5f6368">Social, news &amp; web data for Sheets</div></div></body></html>`);
    await page.screenshot({ path: path.join(OUT, 'banner-220x140.png') });
    await page.close();
  }

  const li = [
    ['Sarah Chen', 'Head of Growth at Finlo', '2026-10-04 09:12:00', 184, 23, 'We just closed our Series A…', 'https://www.linkedin.com/posts/sarahchen_fintech-seriesa-activity-7380'],
    ['Marcus Webb', 'Partner at Northline Ventures', '2026-10-04 08:40:00', 96, 11, 'Excited to lead the Series A in Ledgerly…', 'https://www.linkedin.com/posts/marcuswebb_seriesa-activity-7380'],
    ['Priya Natarajan', 'CEO at Clearpay Labs', '2026-10-03 17:05:00', 412, 58, 'Thread: what we learned raising a $14M Series A…', 'https://www.linkedin.com/posts/priyanatarajan_fundraising-activity-7379'],
    ['Daniel Okafor', 'Fintech reporter, The Ledger', '2026-10-03 15:30:00', 61, 4, 'New: Kiln raises $22M Series A for treasury…', 'https://www.linkedin.com/posts/danielokafor_fintech-activity-7379'],
    ['Elena Rossi', 'Founder at Paylane', '2026-10-03 12:10:00', 233, 31, 'Why we chose a Series A over revenue-based…', 'https://www.linkedin.com/posts/elenarossi-paylane-activity-7379'],
    ['Tom Harrington', 'VP Sales at Brightcash', '2026-10-03 10:02:00', 48, 6, 'Hiring 10 AEs after our Series A…', 'https://www.linkedin.com/posts/tomharrington_hiring-activity-7379'],
    ['Aiko Tanaka', 'Investor at Meridian Capital', '2026-10-02 19:45:00', 120, 14, 'Series A benchmarks for fintech in 2026…', 'https://www.linkedin.com/posts/aikotanaka_benchmarks-activity-7378'],
    ['Luis Fernández', 'CTO at Cuentix', '2026-10-02 16:20:00', 77, 9, 'Post-Series A: rebuilding our ledger service…', 'https://www.linkedin.com/posts/luisfernandez_engineering-activity-7378'],
  ];
  const liHeaders = [{ label: '' }, { label: 'author', width: 130 }, { label: 'author_description', width: 190 }, { label: 'date', width: 135 }, { label: 'likes', width: 60, num: true }, { label: 'comments', width: 80, num: true }, { label: 'title', width: 250 }, { label: 'url', width: 300 }];

  // 01: sidebar Run tab on LinkedIn · Search Posts, with results in the grid.
  {
    const setup = `function (doc) {
      doc.getElementById('platform').value = 'linkedin'; doc.getElementById('platform').dispatchEvent(new Event('change'));
      doc.getElementById('endpoint').value = 'linkedin/posts'; doc.getElementById('endpoint').dispatchEvent(new Event('change'));
      doc.getElementById('param-query').value = 'series A fintech';
      doc.getElementById('toggle-optional').click();
      doc.getElementById('param-sort_by').value = 'most_recent';
      doc.getElementById('param-posted_ago').value = '7d';
      doc.getElementById('output-details').open = true;
      var status = doc.getElementById('run-status'); status.hidden = false; status.className = 'status ok'; status.textContent = 'Wrote 20 rows × 25 columns to Mentions!A1:Y21.';
    }`;
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
    await page.setContent(sheetsFrame({ title: 'Brand monitoring', formula: 'Sarah Chen', headers: liHeaders, rows: li.map((r) => r.map(esc)), sidebar: shimmedSidebar('run', data, setup), activeCell: 'A2', sheetTabs: ['Mentions', 'LinkedIn mentions', 'Bad reviews', 'Channels'] }), { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    await page.evaluate(() => { const f = document.getElementById('sb'); const d = f.contentDocument; const fn = f.contentWindow.__SETUP__; if (fn) fn(d); });
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT, 'screenshots', '01-sidebar.png') });
    await page.close();
  }

  // 02: custom function in the formula bar, no sidebar.
  {
    const tw = [
      ['@acmecorp', '2026-10-05 08:14:00', 1320, 212, 44, 'Introducing Acme Flow: automate your…', 'https://x.com/acmecorp/status/1974'],
      ['@devrel_jess', '2026-10-05 07:50:00', 418, 37, 9, 'Been using Acme Flow for a week and…', 'https://x.com/devrel_jess/status/1974'],
      ['@ops_mike', '2026-10-04 22:31:00', 96, 8, 3, 'Anyone compared Acme vs Zapier for…', 'https://x.com/ops_mike/status/1974'],
      ['@startupdigest', '2026-10-04 18:02:00', 2210, 540, 120, 'Acme raises $40M to take on…', 'https://x.com/startupdigest/status/1974'],
      ['@sarah_builds', '2026-10-04 16:45:00', 310, 21, 5, 'Hot take: Acme’s new pricing is…', 'https://x.com/sarah_builds/status/1974'],
      ['@nocode_nate', '2026-10-04 15:10:00', 150, 12, 2, 'Tutorial: connect Acme to Sheets in…', 'https://x.com/nocode_nate/status/1974'],
      ['@cfo_insights', '2026-10-04 11:00:00', 88, 5, 1, 'Acme’s Q3 numbers suggest…', 'https://x.com/cfo_insights/status/1974'],
      ['@techcrunch', '2026-10-04 09:30:00', 5400, 1210, 310, 'Acme acquires Flowbase in a deal…', 'https://x.com/techcrunch/status/1974'],
      ['@acme_support', '2026-10-04 08:12:00', 40, 2, 0, 'Scheduled maintenance tonight 02:00…', 'https://x.com/acme_support/status/1974'],
      ['@growthgal', '2026-10-03 21:05:00', 265, 19, 7, 'Switched from Competitor X to Acme…', 'https://x.com/growthgal/status/1974'],
    ];
    const headers = [{ label: '' }, { label: 'author', width: 130 }, { label: 'date', width: 140 }, { label: 'likes', width: 70, num: true }, { label: 'retweets', width: 80, num: true }, { label: 'replies', width: 70, num: true }, { label: 'title', width: 420 }, { label: 'url', width: 330 }];
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
    await page.setContent(sheetsFrame({ title: 'Brand monitoring', formula: '=APIDIRECT_SEARCH("twitter", "Acme", 50, "author,date,likes,retweets,replies,title,url", "sort_by=most_recent&amp;posted_ago=7d")', headers, rows: tw.map((r) => r.map(esc)), sidebar: null, activeCell: 'A1', sheetTabs: ['Mentions', 'LinkedIn mentions', 'Bad reviews', 'Channels'] }));
    await page.evaluate(() => { const td = document.querySelector('td.hd'); td.classList.add('sel'); });
    await page.screenshot({ path: path.join(OUT, 'screenshots', '02-custom-function.png') });
    await page.close();
  }

  // 03: Schedules tab.
  {
    const rows = [
      ['Sarah Chen', 'Head of Growth at Finlo', '2026-10-04 09:12:00', 184, 23, 'We just closed our Series A…', '2026-10-05T10:00:03Z'],
      ['Marcus Webb', 'Partner at Northline Ventures', '2026-10-04 08:40:00', 96, 11, 'Excited to lead the Series A in Ledgerly…', '2026-10-05T10:00:03Z'],
      ['Priya Natarajan', 'CEO at Clearpay Labs', '2026-10-03 17:05:00', 412, 58, 'Thread: what we learned raising…', '2026-10-05T04:00:02Z'],
      ['Daniel Okafor', 'Fintech reporter, The Ledger', '2026-10-03 15:30:00', 61, 4, 'New: Kiln raises $22M Series A…', '2026-10-05T04:00:02Z'],
      ['Elena Rossi', 'Founder at Paylane', '2026-10-03 12:10:00', 233, 31, 'Why we chose a Series A over…', '2026-10-04T22:00:05Z'],
      ['Tom Harrington', 'VP Sales at Brightcash', '2026-10-03 10:02:00', 48, 6, 'Hiring 10 AEs after our Series A…', '2026-10-04T22:00:05Z'],
    ];
    const headers = [{ label: '' }, { label: 'author', width: 130 }, { label: 'author_description', width: 190 }, { label: 'date', width: 135 }, { label: 'likes', width: 60, num: true }, { label: 'comments', width: 80, num: true }, { label: 'title', width: 250 }, { label: 'fetched_at', width: 160 }];
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
    await page.setContent(sheetsFrame({ title: 'Brand monitoring', formula: 'Sarah Chen', headers, rows: rows.map((r) => r.map(esc)), sidebar: shimmedSidebar('schedules', data, null), activeCell: 'A2', sheetTabs: ['LinkedIn mentions', 'Mentions', 'Bad reviews', 'Channels'] }), { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT, 'screenshots', '03-schedules.png') });
    await page.close();
  }

  // 04: =APIDIRECT_ENDPOINTS() output.
  {
    const { createEnv } = require(path.join(ROOT, 'test', 'helpers', 'gas-env.js'));
    const table = createEnv().fn('APIDIRECT_ENDPOINTS')();
    const headers = [{ label: '' }, { label: table[0][0], width: 90 }, { label: table[0][1], width: 190 }, { label: table[0][2], width: 150 }, { label: table[0][3], width: 150 }, { label: table[0][4], width: 110 }, { label: table[0][5], width: 330 }, { label: table[0][6], width: 300 }];
    const rows = table.slice(1, 60).map((r) => r.map(esc));
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
    await page.setContent(sheetsFrame({ title: 'Brand monitoring', formula: '=APIDIRECT_ENDPOINTS()', headers, rows, sidebar: null, activeCell: 'A1', sheetTabs: ['Endpoints', 'Mentions', 'LinkedIn mentions'] }));
    await page.evaluate(() => { const td = document.querySelector('td.hd'); td.classList.add('sel'); });
    await page.screenshot({ path: path.join(OUT, 'screenshots', '04-endpoints.png') });
    await page.close();
  }

  await browser.close();
  console.log('assets written to', OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
