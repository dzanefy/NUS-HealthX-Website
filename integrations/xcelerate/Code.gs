// PRIVATE standalone project, separate from the event sync.
const APPLICATION_HEADERS = ['Application ID', 'Submitted at', 'Full name', 'Email address',
  'School or institution', 'Year of study', 'Major or area of study', 'Preferred company',
  'Interested sectors', 'Resume', 'Interview availability'];

function setupApplications() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('APPLICATIONS_SHEET_ID');
  if (!id) {
    const book = SpreadsheetApp.create('HealthX Xcelerate Applications');
    id = book.getId();
    props.setProperty('APPLICATIONS_SHEET_ID', id);
  }
  const book = SpreadsheetApp.openById(id);
  const sheet = book.getSheetByName('Applications') || book.insertSheet('Applications');
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, APPLICATION_HEADERS.length).setValues([APPLICATION_HEADERS])
      .setBackground('#0d2e6e').setFontColor('#ffffff').setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, APPLICATION_HEADERS.length, 200);
    sheet.setColumnWidths(9, 3, 320);
    sheet.getRange(1, 1, sheet.getMaxRows(), APPLICATION_HEADERS.length).setWrap(true);
  }
  if (!props.getProperty('RESUME_FOLDER_ID')) {
    props.setProperty('RESUME_FOLDER_ID', DriveApp.createFolder('HealthX Xcelerate Resumes').getId());
  }
  if (!props.getProperty('APPLICATIONS_SECRET')) {
    props.setProperty('APPLICATIONS_SECRET', Utilities.getUuid() + Utilities.getUuid());
  }
  console.log('Applications: ' + book.getUrl());
  console.log('Resume folder: https://drive.google.com/drive/folders/' + props.getProperty('RESUME_FOLDER_ID'));
}

function validateApplication(data) {
  if (!data || typeof data !== 'object' || !/^[a-f0-9-]{36}$/i.test(data.id || '') || data.website) throw new Error('Invalid application');
  const limits = { name: 200, email: 254, school: 200, year: 100, major: 200, company: 200, availability: 3000 };
  Object.keys(limits).forEach(key => {
    if (typeof data[key] !== 'string' || data[key].length > limits[key]) throw new Error('Invalid field');
    data[key] = data[key].trim();
  });
  if (!data.name || !data.major || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new Error('Required fields');
  const companies = ['No preference', 'A*STAR', 'Abbott', 'Biofourmis', 'Boston Scientific', 'GE HealthCare', 'National University Hospital', 'Philips', 'SingHealth', 'Synapxe'];
  const sectors = ['MedTech', 'Digital health', 'Biotech and life sciences', 'Healthcare services', 'Clinical research', 'Health innovation'];
  if (!companies.includes(data.company) || !Array.isArray(data.sectors) || data.sectors.length > sectors.length || data.sectors.some(s => !sectors.includes(s))) throw new Error('Invalid choices');
  const resume = data.resume;
  if (!resume || typeof resume.name !== 'string' || resume.name.length > 200 || !/\.(pdf|doc|docx)$/i.test(resume.name) || typeof resume.base64 !== 'string' || !/^[A-Za-z0-9+/]+={0,2}$/.test(resume.base64) || resume.base64.length > 2796204) throw new Error('Invalid resume');
  return data;
}

function doPost(e) {
  const json = value => ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
  const props = PropertiesService.getScriptProperties();
  let data;
  try { data = JSON.parse(e.postData.contents); } catch { return json({ invalid: true }); }
  if (!data || !props.getProperty('APPLICATIONS_SECRET') || data.secret !== props.getProperty('APPLICATIONS_SECRET')) return json({ ok: false });
  try { validateApplication(data); } catch { return json({ invalid: true }); }
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return json({ ok: false });
  try {
    const sheet = SpreadsheetApp.openById(props.getProperty('APPLICATIONS_SHEET_ID')).getSheetByName('Applications');
    const headers = sheet.getRange(1, 1, 1, APPLICATION_HEADERS.length).getValues()[0];
    if (APPLICATION_HEADERS.some((h, i) => headers[i] !== h)) throw new Error('Restore application headers');
    // A lost response or double click must not create a second application.
    if (sheet.getLastRow() > 1 && sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(data.id).matchEntireCell(true).findNext()) return json({ ok: true, id: data.id });
    const bytes = Utilities.base64Decode(data.resume.base64);
    if (!bytes.length || bytes.length > 2 * 1024 * 1024) return json({ invalid: true });
    const ext = data.resume.name.split('.').pop().toLowerCase();
    const magic = bytes.slice(0, 4).map(b => b & 255).join(',');
    if ((ext === 'pdf' && magic !== '37,80,68,70') ||
        (ext === 'doc' && magic !== '208,207,17,224') ||
        (ext === 'docx' && magic !== '80,75,3,4')) return json({ invalid: true });
    const types = { pdf: 'application/pdf', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
    const folder = DriveApp.getFolderById(props.getProperty('RESUME_FOLDER_ID'));
    const filename = data.id + '.' + ext;
    const existing = folder.getFilesByName(filename);
    const file = existing.hasNext() ? existing.next() : folder.createFile(Utilities.newBlob(bytes, types[ext], filename));
    // Prefix user values so Sheets cannot execute spreadsheet formulas.
    const literal = value => "'" + value;
    sheet.appendRow([data.id, new Date(), literal(data.name), literal(data.email), literal(data.school),
      literal(data.year), literal(data.major), literal(data.company), literal(data.sectors.join(', ')),
      file.getUrl(), literal(data.availability)]);
    sheet.getRange(sheet.getLastRow(), 2).setNumberFormat('dd mmm yyyy hh:mm');
    SpreadsheetApp.flush();
    return json({ ok: true, id: data.id });
  } catch {
    return json({ ok: false });
  } finally { lock.releaseLock(); }
}
