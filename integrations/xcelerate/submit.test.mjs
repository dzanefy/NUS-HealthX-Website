import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import handler from '../../server/xcelerate.mjs';

const source = readFileSync(new URL('./Code.gs', import.meta.url), 'utf8');
const application = () => ({ id: '12345678-1234-1234-1234-123456789abc', secret: 'test-secret',
  name: '=1+1', email: 'test@example.com', school: '', year: '', major: 'Medicine',
  company: 'No preference', sectors: ['MedTech'], availability: '', website: '',
  resume: { name: 'sample.pdf', base64: Buffer.from('%PDF-1.4 sample').toString('base64') } });

function script() {
  const rows = [], files = [];
  const headers = ['Application ID', 'Submitted at', 'Full name', 'Email address', 'School or institution', 'Year of study', 'Major or area of study', 'Preferred company', 'Interested sectors', 'Resume', 'Interview availability'];
  const sheet = {
    getLastRow: () => rows.length + 1,
    appendRow: row => rows.push(row),
    getRange: () => ({ getValues: () => [headers], setNumberFormat() {},
      createTextFinder: id => ({ matchEntireCell: () => ({ findNext: () => rows.some(row => row[0] === id) }) }) }),
  };
  const context = vm.createContext({
    PropertiesService: { getScriptProperties: () => ({ getProperty: key => key === 'APPLICATIONS_SECRET' ? 'test-secret' : 'id' }) },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: text => ({ setMimeType: () => JSON.parse(text) }) },
    LockService: { getScriptLock: () => ({ tryLock: () => true, releaseLock() {} }) },
    SpreadsheetApp: { openById: () => ({ getSheetByName: () => sheet }), flush() {} },
    Utilities: { base64Decode: value => [...Buffer.from(value, 'base64')], newBlob: bytes => bytes },
    DriveApp: { getFolderById: () => ({ getFilesByName: () => ({ hasNext: () => false }), createFile: bytes => { files.push(bytes); return { getUrl: () => 'https://drive.google.com/file/d/test/view' }; } }) },
  });
  vm.runInContext(source, context);
  return { rows, files, post: value => context.doPost({ postData: { contents: JSON.stringify(value) } }) };
}

test('saves text safely, links private file, and deduplicates retries', () => {
  const s = script(), data = application();
  assert.equal(s.post(data).ok, true);
  assert.equal(s.rows[0][2], "'=1+1");
  assert.match(s.rows[0][9], /^https:\/\/drive.google.com/);
  assert.equal(s.post(data).ok, true);
  assert.equal(s.rows.length, 1);
  assert.equal(s.files.length, 1);
});

test('rejects missing secret, null data, invalid fields and disguised files', () => {
  const s = script();
  assert.equal(s.post(null).ok, false);
  assert.equal(s.post({ ...application(), secret: '' }).ok, false);
  assert.equal(s.post({ ...application(), email: 'invalid' }).invalid, true);
  assert.equal(s.post({ ...application(), resume: { name: 'fake.pdf', base64: 'YWJj' } }).invalid, true);
  assert.equal(s.rows.length, 0);
  assert.equal(s.files.length, 0);
});

async function request(req, env = {}) {
  let text;
  const res = { setHeader() {}, end: value => { text = value; } };
  await handler(req, res, env);
  return { status: res.statusCode, body: JSON.parse(text) };
}

test('API rejects GET and missing configuration without reporting success', async () => {
  assert.equal((await request({ method: 'GET' })).status, 405);
  assert.equal((await request({ method: 'POST', body: application() })).status, 503);
});

test('API requires matching save acknowledgement and handles upstream failures', async t => {
  const env = { XCELERATE_SCRIPT_URL: 'https://example.test', XCELERATE_SCRIPT_SECRET: 'server-secret' };
  t.mock.method(globalThis, 'fetch', async (_url, init) => {
    assert.equal(JSON.parse(init.body).secret, 'server-secret');
    return { ok: true, json: async () => ({ ok: true, id: application().id }) };
  });
  assert.equal((await request({ method: 'POST', body: application() }, env)).status, 200);
  globalThis.fetch.mock.mockImplementation(async () => ({ ok: true, json: async () => ({ ok: true, id: 'wrong' }) }));
  assert.equal((await request({ method: 'POST', body: application() }, env)).status, 502);
  globalThis.fetch.mock.mockImplementation(async () => { throw new Error('timeout'); });
  assert.equal((await request({ method: 'POST', body: application() }, env)).status, 502);
});
