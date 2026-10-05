/**
 * Menu, dialogs and sidebar entry points.
 */

function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  // In AuthMode.NONE only the menu may be built; nothing here reads properties.
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Open sidebar', 'showSidebar')
    .addItem('Set API key', 'showSettings')
    .addSeparator()
    .addItem('Scheduled refreshes', 'showSchedules')
    .addItem('Help', 'showHelp')
    .addToUi();
}

function showSidebar() {
  openSidebar_('run');
}

function showSettings() {
  openSidebar_('settings');
}

function showSchedules() {
  openSidebar_('schedules');
}

function openSidebar_(tab) {
  var template = HtmlService.createTemplateFromFile('Sidebar');
  template.initialTab = tab || 'run';
  var html = template.evaluate().setTitle('API Direct');
  SpreadsheetApp.getUi().showSidebar(html);
}

function showHelp() {
  var html = HtmlService.createHtmlOutput(
    '<div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.5;padding:4px 8px">' +
    '<p><b>Custom functions</b><br>' +
    '<code>=APIDIRECT_SEARCH("twitter", "Acme", 50)</code><br>' +
    '<code>=APIDIRECT("linkedin/company", "url=https://www.linkedin.com/company/acme", , "employees")</code><br>' +
    '<code>=APIDIRECT_AI("What is the best CRM for a startup?")</code><br>' +
    '<code>=APIDIRECT_ENDPOINTS()</code> lists every endpoint and <code>=APIDIRECT_FIELDS("reddit")</code> its columns.</p>' +
    '<p><b>Sidebar</b>: pick a platform and endpoint, fill in the parameters and write the results into the sheet. ' +
    '"Schedule" keeps a sheet updated every hour, day or week.</p>' +
    '<p><a href="' + DOCS_URL + '" target="_blank">Documentation</a> · ' +
    '<a href="' + PRICING_URL + '" target="_blank">Pricing</a> · ' +
    '<a href="mailto:support@apidirect.io">support@apidirect.io</a></p></div>')
    .setWidth(520).setHeight(260);
  SpreadsheetApp.getUi().showModalDialog(html, 'API Direct help');
}

/** Lets templates pull in other HTML files. */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
