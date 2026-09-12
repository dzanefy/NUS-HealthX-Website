// Install as a PRIVATE standalone project at script.google.com, not bound to
// the shared spreadsheet. Only its trusted maintainer should access this script.
const HEADERS = ['Event ID', 'Title', 'Summary', 'Article', 'Event date',
  'Event time', 'Location', 'Image URL', 'Registration URL', 'Upcoming',
  'Status', 'Speakers', 'Acknowledgements', 'Article Image URL'];

function eventSheet() {
  const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!id) throw new Error('Set SPREADSHEET_ID in Script Properties first.');
  const book = SpreadsheetApp.openById(id);
  return book.getSheetByName('Events') || book.insertSheet('Events');
}

function setupSheet() {
  const sheet = eventSheet();
  if (sheet.getLastRow() > 0) throw new Error('Events tab must be empty for setup. Existing content was not changed.');
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setBackground('#0d2e6e').setFontColor('#ffffff').setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.getRange('A2:N1000').setNumberFormat('@').setWrap(true);
  sheet.setColumnWidths(1, HEADERS.length, 180);
  sheet.setColumnWidths(3, 2, 320);
  sheet.getRange('K2:K1000').setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInList(['Draft', 'Published', 'Archived'], true).setAllowInvalid(false).build());
  sheet.getRange('J2:J1000').setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInList(['TRUE', 'FALSE'], true).setAllowInvalid(false).build());
  sheet.getRange('A1').setNote('Use a unique ID such as EVT-001. Never change it after syncing.');
  sheet.getRange('E1').setNote('Use YYYY-MM-DD, e.g. 2026-09-09.');
  sheet.getRange('L1').setNote('One speaker per line: Name | Job title | Organisation');
  sheet.getRange('K1').setNote('Only Published is visible. Archive instead of deleting rows.');
}

// Validate the whole batch before sending any changes. Missing/deleted rows
// do not delete database records: use Archived to explicitly remove an event.
function parseEvents(values) {
  if (!values.length || HEADERS.some((h, i) => values[0][i] !== h)) {
    throw new Error('Headers changed. Restore the original column names and order.');
  }
  const seen = new Set();
  return values.slice(1).flatMap((cells, i) => {
    if (cells.every(v => !String(v).trim())) return [];
    const v = HEADERS.map((_, j) => String(cells[j] || '').trim());
    const [id, title, summary, article, date, time, location, image, registration, upcoming, rawStatus, speakerText, acknowledgements, articleImage] = v;
    const fail = message => { throw new Error('Row ' + (i + 2) + ': ' + message); };
    if (!/^[A-Za-z0-9_-]{1,80}$/.test(id)) fail('Enter an Event ID using letters, numbers, - or _.');
    if (seen.has(id)) fail('Duplicate Event ID: ' + id);
    seen.add(id);
    const status = rawStatus || 'Draft';
    if (!['Draft', 'Published', 'Archived'].includes(status)) fail('Invalid Status.');
    if (status === 'Published' && (!title || !date || !summary)) fail('Published events need a title, date and summary.');
    if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date)) fail('Use a valid date in YYYY-MM-DD format.');
    if (upcoming && !['TRUE', 'FALSE'].includes(upcoming.toUpperCase())) fail('Upcoming must be TRUE or FALSE.');
    if (status === 'Published' && !upcoming) fail('Select TRUE or FALSE for Upcoming.');
    for (const url of [image, registration, articleImage]) {
      if (url && !/^https:\/\/[^\s/]+(?:\/[^\s]*)?$/.test(url)) fail('Image and registration links must be full HTTPS URLs.');
    }
    const speakers = speakerText ? speakerText.split('\n').filter(Boolean).map(line => {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length !== 3 || !parts[0]) fail('Speakers: use Name | Job title | Organisation, one per line.');
      return { name: parts[0], title: parts[1], affiliation: parts[2] };
    }) : [];
    return [{ sheet_event_id: id, title: title || 'Untitled event', summary,
      description: article, event_date: date || null, event_time: time,
      location, image_url: image || null, article_image_url: articleImage || null, registration_url: registration || null,
      is_upcoming: upcoming.toUpperCase() === 'TRUE', status, speakers, acknowledgements }];
  });
}

function syncEvents() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return;
  const props = PropertiesService.getScriptProperties();
  try {
    const url = (props.getProperty('SUPABASE_URL') || '').replace(/\/$/, '');
    const key = props.getProperty('SUPABASE_SECRET_KEY') || '';
    if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url) || !key.startsWith('sb_secret_')) {
      throw new Error('Set SUPABASE_URL and an sb_secret_ key in this private script’s properties.');
    }
    const rows = parseEvents(eventSheet().getDataRange().getDisplayValues());
    if (!rows.length) throw new Error('No event rows. Existing website events have been left unchanged.');
    const response = UrlFetchApp.fetch(url + '/rest/v1/events?on_conflict=sheet_event_id', {
      method: 'post', contentType: 'application/json',
      headers: { apikey: key, Prefer: 'resolution=merge-duplicates,return=minimal' },
      payload: JSON.stringify(rows), muteHttpExceptions: true,
    });
    if (response.getResponseCode() >= 300) {
      throw new Error('Supabase rejected sync (HTTP ' + response.getResponseCode() + '). Check the migration and script credentials.');
    }
    props.setProperty('LAST_SUCCESS', new Date().toISOString());
    props.deleteProperty('LAST_ERROR');
    console.log('Synced ' + rows.length + ' events.');
  } catch (error) {
    props.setProperty('LAST_ERROR', String(error.message));
    throw error;
  } finally { lock.releaseLock(); }
}

function enableAutoSync() {
  // Confirm configuration works before scheduling anything.
  syncEvents();
  if (!ScriptApp.getProjectTriggers().some(t => t.getHandlerFunction() === 'syncEvents')) {
    ScriptApp.newTrigger('syncEvents').timeBased().everyMinutes(5).create();
  }
}
