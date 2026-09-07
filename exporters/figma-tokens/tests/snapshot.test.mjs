import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { captureSnapshot, extractPluginSnapshot, validateSnapshot } from '../src/index.ts';
import { createCaptureApi, createSnapshot } from './fixtures.mjs';

test('validateSnapshot accepts a versioned snapshot and rejects malformed payloads', () => {
  const snapshot = createSnapshot();

  assert.equal(validateSnapshot(snapshot).schemaVersion, 1);
  assert.throws(() => extractPluginSnapshot(null), /JSON object/);
  assert.throws(() => validateSnapshot({ ...snapshot, schemaVersion: 2 }), /schemaVersion/);
  assert.throws(() => validateSnapshot({ ...snapshot, capturedAt: 'not-a-date' }), /ISO timestamp/);
  assert.throws(() => validateSnapshot({ ...snapshot, file: { key: 'x', name: '' } }), /file.name/);
  assert.equal(validateSnapshot({ ...snapshot, file: { key: '', name: 'SPIRIT (Config)' } }).file.key, '');
});

test('captureSnapshot serializes local data and follows alias closure', async () => {
  const snapshot = await captureSnapshot(createCaptureApi());

  assert.equal(snapshot.variables.length, createSnapshot().variables.length);
  assert.equal(snapshot.dependencies[0].id, 'remote-color');
  assert.equal(snapshot.styles.length, 7);
  assert.equal(snapshot.file.key, 'BXRF3VABXQm2TGkL0nwS4i');
});

test('captureSnapshot records unresolved aliases without dropping local data', async () => {
  const api = createCaptureApi();
  api.getVariableByIdAsync = async () => null;

  const snapshot = await captureSnapshot(api);

  assert.equal(snapshot.dependencies.length, 0);
  assert.match(snapshot.diagnostics[0].message, /Unable to resolve variable remote-color/);
});

test('plugin manifest main stays next to the manifest so Figma can load it', async () => {
  const manifestUrl = new URL('../plugin/manifest.json', import.meta.url);
  const manifest = JSON.parse(await readFile(manifestUrl, 'utf8'));
  const mainPath = path.normalize(manifest.main);

  assert.equal(path.isAbsolute(mainPath), false);
  assert.doesNotMatch(mainPath, /(^|[\\/])\.\.([\\/]|$)/);
  await access(new URL(manifest.main, manifestUrl));
});
