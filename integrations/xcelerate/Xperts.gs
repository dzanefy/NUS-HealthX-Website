// Separate spreadsheet, using the existing private intake project's authorization.
const XPERTS_HEADERS = ['Application ID', 'Submitted at', 'Full name', 'Email address',
  'School or institution', 'Year of study', 'Major or area of study', 'Has a project',
  'Project title', 'Project description', 'Reason for seeking mentorship',
  'Mentor choice 1', 'Reason for choice 1', 'Mentor choice 2', 'Reason for choice 2',
  'Mentor choice 3', 'Reason for choice 3', 'Resume'];

function setupXpertsApplications() {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const props = PropertiesService.getScriptProperties();
    let id = props.getProperty('XPERTS_SHEET_ID');
    if (!id) {
      const book = SpreadsheetApp.create('HealthX Xperts Applications');
      id = book.getId();
      props.setProperty('XPERTS_SHEET_ID', id);
    }
    const book = SpreadsheetApp.openById(id);
    book.setSpreadsheetTimeZone('Asia/Singapore');
    const sheet = book.getSheetByName('Applications') || book.insertSheet('Applications');
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, XPERTS_HEADERS.length).setValues([XPERTS_HEADERS])
        .setBackground('#0d2e6e').setFontColor('#ffffff').setFontWeight('bold');
      sheet.setFrozenRows(1);
      sheet.setColumnWidths(1, XPERTS_HEADERS.length, 200);
      sheet.setColumnWidths(10, 8, 320);
      sheet.getRange(1, 1, sheet.getMaxRows(), XPERTS_HEADERS.length).setWrap(true);
    }
    // Upgrade existing sheets by appending the résumé column; preserve all rows.
    const headers = sheet.getRange(1, 1, 1, XPERTS_HEADERS.length).getValues()[0];
    if (XPERTS_HEADERS.slice(0, -1).some((h, i) => headers[i] !== h)) throw new Error('Restore Xperts headers');
    if (!headers[17]) sheet.getRange(1, 18).setValue('Resume').setBackground('#0d2e6e').setFontColor('#ffffff').setFontWeight('bold');
    else if (headers[17] !== 'Resume') throw new Error('Column R must be Resume');
    if (!props.getProperty('XPERTS_RESUME_FOLDER_ID')) props.setProperty('XPERTS_RESUME_FOLDER_ID', DriveApp.createFolder('HealthX Xperts Resumes').getId());
    return { ok: true, sheetUrl: book.getUrl() + '#gid=' + sheet.getSheetId() };
  } finally { lock.releaseLock(); }
}

function saveXpertsApplication(data) {
  let application;
  try { application = validateXperts(data, XPERTS_MENTOR_NAMES); }
  catch { return { invalid: true }; }
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return { ok: false };
  try {
    const props = PropertiesService.getScriptProperties();
    const sheet = SpreadsheetApp.openById(props.getProperty('XPERTS_SHEET_ID')).getSheetByName('Applications');
    const headers = sheet.getRange(1, 1, 1, XPERTS_HEADERS.length).getValues()[0];
    if (XPERTS_HEADERS.some((h, i) => headers[i] !== h)) throw new Error('Restore Xperts headers');
    if (sheet.getLastRow() > 1 && sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(application.id).matchEntireCell(true).findNext()) return { ok: true, id: application.id };
    const literal = value => "'" + value;
    const choices = [0, 1, 2].flatMap(i => {
      const choice = application.choices[i];
      return choice ? [literal(choice.name), literal(choice.reason)] : ['', ''];
    });
    let resumeUrl = '';
    if (application.resume) {
      const bytes = Utilities.base64Decode(application.resume.base64);
      if (!bytes.length || bytes.length > 2 * 1024 * 1024 || bytes.slice(0, 5).map(b => b & 255).join(',') !== '37,80,68,70,45') return { invalid: true };
      const folder = DriveApp.getFolderById(props.getProperty('XPERTS_RESUME_FOLDER_ID'));
      const filename = application.id + '.pdf';
      const existing = folder.getFilesByName(filename);
      const file = existing.hasNext() ? existing.next() : folder.createFile(Utilities.newBlob(bytes, 'application/pdf', filename));
      resumeUrl = file.getUrl();
    }
    sheet.appendRow([application.id, new Date(), ...[
      application.name, application.email, application.school, application.year, application.major,
      application.hasProject === 'yes' ? 'Yes' : 'No', application.projectTitle,
      application.projectDescription, application.motivation,
    ].map(literal), ...choices, resumeUrl]);
    sheet.getRange(sheet.getLastRow(), 2).setNumberFormat('dd mmm yyyy hh:mm');
    SpreadsheetApp.flush();
    return { ok: true, id: application.id };
  } catch { return { ok: false }; }
  finally { lock.releaseLock(); }
}
