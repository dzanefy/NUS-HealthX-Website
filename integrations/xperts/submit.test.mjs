import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { mentors } from '../../src/data/mentors.ts';
import validate from '../../shared/xperts-validation.mjs';
import handler from '../../server/xperts.ts';

const names = Object.fromEntries(mentors.map(m => [m.id, m.name]));
const fixture = (hasProject = 'no', count = 1) => ({
  id: '9facd9f6-b75f-4bd7-ad21-0545d3a22e6e', name: '=1+1', email: 'test@example.com',
  school: 'NUS', year: 'Year 2', major: 'Medicine', hasProject,
  projectTitle: 'Test project', projectDescription: 'Test project description', motivation: 'Explore healthcare careers',
  choices: mentors.slice(0, count).map(m => ({ id: m.id, reason: 'Learn about their experience' })),
});

test('accepts both project paths and one to three ranked choices; clears irrelevant answers', () => {
  for (const path of ['yes', 'no']) for (const count of [1, 2, 3]) {
    const result = validate(fixture(path, count), names);
    assert.equal(result.choices.length, count);
    assert.deepEqual(result.choices.map(c => c.name), mentors.slice(0, count).map(m => m.name));
    assert.equal(path === 'yes' ? result.motivation : result.projectDescription, '');
  }
});

test('rejects duplicate, unknown, zero or excess mentors and missing choice reasons', () => {
  const a = fixture();
  for (const choices of [[], fixture('no', 4).choices, [a.choices[0], a.choices[0]],
    [{ id: 'not-a-mentor', reason: 'Test' }], [{ id: mentors[0].id, reason: '  ' }]]) {
    assert.throws(() => validate({ ...a, choices }, names));
  }
});

test('requires project details or motivation and validates student fields', () => {
  for (const patch of [{ name: ' ' }, { email: 'invalid' }, { school: '' }, { year: '' },
    { hasProject: '' }, { motivation: '' }, { website: 'bot' },
    { hasProject: 'yes', projectTitle: '' }, { hasProject: 'yes', projectDescription: '' }]) {
    assert.throws(() => validate({ ...fixture(), ...patch }, names));
  }
});

test('optional resumes accept PDFs and reject Word files, disguised files and oversized payloads', () => {
  const resume = { name: 'resume.pdf', base64: Buffer.from('%PDF-1.4 test').toString('base64') };
  assert.equal(validate(fixture(), names).resume, null);
  assert.deepEqual(validate({ ...fixture(), resume }, names).resume, resume);
  for (const bad of [{ ...resume, name: 'resume.doc' }, { ...resume, name: 'resume.docx' },
    { ...resume, base64: Buffer.from('not a pdf').toString('base64') },
    { ...resume, base64: resume.base64 + 'A'.repeat(2796204) }]) {
    assert.throws(() => validate({ ...fixture(), resume: bad }, names));
  }
});

const generated = readFileSync(new URL('../xcelerate/XpertsValidation.gs', import.meta.url), 'utf8');
test('deployed Google validation matches the current mentor directory and shared validator', () => {
  const context = vm.createContext({});
  vm.runInContext(generated, context);
  assert.equal(JSON.stringify(vm.runInContext('XPERTS_MENTOR_NAMES', context)), JSON.stringify(names));
  const source = readFileSync(new URL('../../shared/xperts-validation.mjs', import.meta.url), 'utf8');
  assert.ok(generated.endsWith(source.replace('export default function', 'function')));
});

test('Google writer preserves all ranked choices, escapes formulas and deduplicates retry', () => {
  const rows = []; const files = []; let headers;
  const sheet = { getLastRow: () => rows.length + 1, appendRow: row => rows.push(row),
    getRange: () => ({ getValues: () => [headers], setNumberFormat() {},
      createTextFinder: id => ({ matchEntireCell: () => ({ findNext: () => rows.some(r => r[0] === id) }) }) }) };
  const context = vm.createContext({
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => 'test-sheet' }) },
    SpreadsheetApp: { openById: () => ({ getSheetByName: () => sheet }), flush() {} },
    LockService: { getScriptLock: () => ({ tryLock: () => true, releaseLock() {} }) },
    Utilities: { base64Decode: value => [...Buffer.from(value, 'base64')], newBlob: bytes => bytes },
    DriveApp: { getFolderById: () => ({ getFilesByName: () => ({ hasNext: () => false }), createFile: bytes => { files.push(bytes); return { getUrl: () => 'https://drive.google.com/file/d/test-pdf/view' }; } }) },
  });
  vm.runInContext(generated + '\n' + readFileSync(new URL('../xcelerate/Xperts.gs', import.meta.url), 'utf8'), context);
  headers = vm.runInContext('XPERTS_HEADERS', context);
  const data = fixture('yes', 3);
  assert.equal(context.saveXpertsApplication(data).ok, true);
  assert.equal(context.saveXpertsApplication(data).ok, true);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].length, headers.length);
  assert.equal(rows[0][2], "'=1+1");
  assert.equal(rows[0][11], "'" + mentors[0].name);
  assert.equal(rows[0][15], "'" + mentors[2].name);
  assert.equal(rows[0][17], '');
  const withResume = { ...data, id: '19fac9f6-b75f-4bd7-ad21-0545d3a22e6e', resume: { name: 'sample.pdf', base64: Buffer.from('%PDF-1.4 test').toString('base64') } };
  assert.equal(context.saveXpertsApplication(withResume).ok, true);
  assert.equal(context.saveXpertsApplication(withResume).ok, true);
  assert.equal(rows.length, 2);
  assert.match(rows[1][17], /test-pdf/);
  assert.equal(files.length, 1);
  assert.equal(context.saveXpertsApplication({ ...data, choices: [] }).invalid, true);
});

async function request(body, env = {}, method = 'POST') {
  let result;
  const res = { setHeader() {}, end: text => { result = JSON.parse(text); } };
  await handler({ method, body }, res, env);
  return { status: res.statusCode, result };
}
test('API validates before contacting Google and requires a matching acknowledgement', async t => {
  assert.equal((await request({}, {}, 'GET')).status, 405);
  assert.equal((await request({})).status, 400);
  assert.equal((await request(fixture())).status, 503);
  const env = { XCELERATE_SCRIPT_URL: 'https://example.test', XCELERATE_SCRIPT_SECRET: 'test-secret' };
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    const data = JSON.parse(options.body);
    assert.equal(data.program, 'xperts');
    assert.equal(data.secret, 'test-secret');
    return { ok: true, json: async () => ({ ok: true, id: data.id }) };
  });
  assert.equal((await request(fixture(), env)).status, 200);
  globalThis.fetch.mock.mockImplementation(async () => ({ ok: true, json: async () => ({ ok: true, id: 'wrong' }) }));
  assert.equal((await request(fixture(), env)).status, 502);
});
