import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('./Code.gs', import.meta.url), 'utf8');
function harness() {
  const properties = new Map([
    ['SUPABASE_URL', 'https://example.supabase.co'], ['SUPABASE_SECRET_KEY', 'sb_secret_test'], ['SPREADSHEET_ID', 'test'],
  ]);
  let calls = 0;
  const context = vm.createContext({ console,
    PropertiesService: { getScriptProperties: () => ({ getProperty: k => properties.get(k), setProperty: (k, v) => properties.set(k, v), deleteProperty: k => properties.delete(k) }) },
    LockService: { getScriptLock: () => ({ tryLock: () => true, releaseLock() {} }) },
    SpreadsheetApp: { openById: () => ({ getSheetByName: () => ({ getDataRange: () => ({ getDisplayValues: () => context.values }) }) }) },
    UrlFetchApp: { fetch: (url, options) => { calls++; context.url = url; context.payload = JSON.parse(options.payload).rows; return { getResponseCode: () => context.httpStatus || 201 }; } },
  });
  vm.runInContext(source, context);
  context.headers = vm.runInContext('HEADERS', context);
  context.values = [context.headers, ['EVT-001', 'Xeminar', 'Summary', 'Paragraph one\n\nParagraph two', '2026-09-09', '4–6pm', 'NUS', '', '', 'FALSE', 'Published', 'Dr Example | Researcher | NUS', 'Partners']];
  return { context, properties, calls: () => calls };
}
test('sync maps article fields and retries with the same stable ID', () => {
  const h = harness(); h.context.syncEvents(); h.context.syncEvents();
  assert.equal(h.calls(), 2);
  assert.equal(h.context.payload[0].sheet_event_id, 'EVT-001');
  assert.equal(h.context.payload[0].speakers[0].name, 'Dr Example');
  assert.equal(h.context.payload[0].is_upcoming, false);
  assert.ok(h.properties.get('LAST_SUCCESS'));
});
test('duplicate IDs, malformed dates, URLs and incomplete published rows stop all writes', () => {
  for (const mutate of [v => v.push([...v[1]]), v => v[1][4] = '2026-02-30', v => v[1][7] = 'javascript:alert(1)', v => v[1][2] = '', v => v[0] = ['Wrong headers']]) {
    const h = harness(); mutate(h.context.values);
    assert.throws(() => h.context.syncEvents()); assert.equal(h.calls(), 0);
  }
});
test('Draft and Archived are sent to unpublish existing rows', () => {
  for (const status of ['Draft', 'Archived']) {
    const h = harness(); h.context.values[1][10] = status; h.context.syncEvents();
    assert.equal(h.context.payload[0].status, status);
  }
});
test('failed responses record an error without a false success', () => {
  const h = harness(); h.context.httpStatus = 403;
  assert.throws(() => h.context.syncEvents());
  assert.equal(h.properties.has('LAST_SUCCESS'), false);
  assert.match(h.properties.get('LAST_ERROR'), /403/);
});
test('valid header-only sheet sends an empty snapshot to hide sheet events', () => {
  const h = harness(); h.context.values = [h.context.headers];
  h.context.syncEvents(); assert.equal(h.calls(), 1);
  assert.equal(h.context.payload.length, 0);
  assert.match(h.context.url, /\/rpc\/sync_event_sheet$/);
});

test('missing headers cannot archive events', () => {
  const h = harness(); h.context.values = [];
  assert.throws(() => h.context.syncEvents()); assert.equal(h.calls(), 0);
});

test('category, sub-pillar and audience are synced and can be cleared', () => {
  const h = harness();
  h.context.values[1][14] = 'Masterclasses';
  h.context.values[1][15] = 'Coding for Medicine';
  h.context.values[1][16] = 'All students';
  h.context.syncEvents();
  assert.equal(h.context.payload[0].category, 'Masterclasses');
  assert.equal(h.context.payload[0].sub_pillar, 'Coding for Medicine');
  assert.equal(h.context.payload[0].audience, 'All students');
  h.context.values[1][14] = ''; h.context.values[1][15] = ''; h.context.values[1][16] = '';
  h.context.syncEvents();
  assert.equal(h.context.payload[0].category, 'Other');
  assert.equal(h.context.payload[0].sub_pillar, '');
  assert.equal(h.context.payload[0].audience, '');
});

test('invalid categories and incompatible sub-pillars stop all writes', () => {
  for (const [category, sub] of [['Unknown', ''], ['Xeminars', 'Coding for Medicine'], ['Masterclasses', 'Invalid']]) {
    const h = harness(); h.context.values[1][14] = category; h.context.values[1][15] = sub;
    assert.throws(() => h.context.syncEvents()); assert.equal(h.calls(), 0);
  }
});

test('all five requested event types are accepted', () => {
  for (const category of ['Fireside Chats', 'Xeminars', 'Masterclasses', 'Case Study Fellowship', 'Research Fellowship']) {
    const h = harness(); h.context.values[1][14] = category; h.context.syncEvents();
    assert.equal(h.context.payload[0].category, category);
  }
});

test('card and article URLs remain independent; blank article URL clears the photo', () => {
  const h = harness();
  h.context.values[1][7] = 'https://example.com/poster.jpg';
  h.context.values[1][13] = 'https://example.com/photo.jpg';
  h.context.syncEvents();
  assert.equal(h.context.payload[0].image_url, 'https://example.com/poster.jpg');
  assert.equal(h.context.payload[0].article_image_url, 'https://example.com/photo.jpg');
  h.context.values[1][13] = '';
  h.context.syncEvents();
  assert.equal(h.context.payload[0].article_image_url, null);
  assert.equal(h.context.payload[0].image_url, 'https://example.com/poster.jpg');
});

test('invalid article image stops sync', () => {
  const h = harness(); h.context.values[1][13] = 'file:///photo.jpg';
  assert.throws(() => h.context.syncEvents()); assert.equal(h.calls(), 0);
});
