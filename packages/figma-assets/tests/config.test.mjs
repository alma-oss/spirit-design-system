import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { loadConfig, resolveConfig } from '../src/index.ts';

test('resolveConfig resolves output directories relative to the config file', () => {
  const config = resolveConfig(
    {
      fileKey: 'figma-file',
      targets: [{ brand: 'Spirit', out: 'src/svg', assets: ['icons', 'benefit-icons'] }],
    },
    '/repo/packages/icons/figma-assets.config.json',
  );

  assert.equal(config.targets[0].out, '/repo/packages/icons/src/svg');
  assert.deepEqual(config.targets[0].assets, ['icons', 'benefit-icons']);
});

test('resolveConfig rejects invalid files and targets', () => {
  const configPath = '/repo/figma-assets.config.json';

  assert.throws(() => resolveConfig({ fileKey: '', targets: [] }, configPath), /non-empty "fileKey"/);
  assert.throws(() => resolveConfig({ fileKey: 'file', targets: [] }, configPath), /at least one sync target/);
  assert.throws(
    () => resolveConfig({ fileKey: 'file', targets: [null] }, configPath),
    /target at index 0 must be an object/,
  );
  assert.throws(
    () => resolveConfig({ fileKey: 'file', targets: [1] }, configPath),
    /target at index 0 must be an object/,
  );
  assert.throws(() => resolveConfig({ fileKey: 'file', targets: null }, configPath), /at least one sync target/);
  assert.throws(
    () => resolveConfig({ fileKey: 'file', targets: [{ brand: 1, out: 'svg' }] }, configPath),
    /non-empty "brand"/,
  );
  assert.throws(
    () => resolveConfig({ fileKey: 'file', targets: [{ brand: 'Spirit', out: ' ' }] }, configPath),
    /non-empty "out"/,
  );
  assert.throws(
    () => resolveConfig({ fileKey: 'file', targets: [{ brand: 'Spirit', out: 'svg' }] }, configPath),
    /at least one asset type/,
  );
  assert.throws(
    () => resolveConfig({ fileKey: 'file', targets: [{ brand: 'Spirit', out: 'svg', assets: [] }] }, configPath),
    /at least one asset type/,
  );
  assert.throws(
    () =>
      resolveConfig(
        { fileKey: 'file', targets: [{ brand: 'Spirit', out: 'svg', assets: ['icons', 'unknown'] }] },
        configPath,
      ),
    /unsupported asset type/,
  );
  assert.throws(
    () =>
      resolveConfig(
        { fileKey: 'file', targets: [{ brand: 'Spirit', out: 'svg', assets: ['icons', 'icons'] }] },
        configPath,
      ),
    /duplicate asset types/,
  );
  assert.throws(
    () =>
      resolveConfig(
        {
          fileKey: ' file ',
          targets: [
            { brand: ' Spirit ', out: 'svg', assets: ['icons'] },
            { brand: 'Jobs', out: './svg', assets: ['icons'] },
          ],
        },
        configPath,
      ),
    /same output directory/,
  );
});

test('loadConfig reads valid JSON and reports invalid configuration files', async () => {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'figma-assets-config-'));

  try {
    const validPath = path.join(temporaryDirectory, 'valid.json');
    const invalidJsonPath = path.join(temporaryDirectory, 'invalid.json');
    const invalidValuePath = path.join(temporaryDirectory, 'value.json');

    await writeFile(
      validPath,
      '{"fileKey":" file ","targets":[{"brand":" Spirit ","out":"svg","assets":["icons"]}]}',
    );
    await writeFile(invalidJsonPath, '{');
    await writeFile(invalidValuePath, 'null');

    const config = await loadConfig(validPath);

    assert.equal(config.fileKey, 'file');
    assert.equal(config.targets[0].brand, 'Spirit');
    assert.equal(config.targets[0].out, path.join(temporaryDirectory, 'svg'));
    assert.deepEqual(config.targets[0].assets, ['icons']);
    await assert.rejects(loadConfig(invalidJsonPath), /Unable to read Figma assets config/);
    await assert.rejects(loadConfig(path.join(temporaryDirectory, 'missing.json')), /Unable to read Figma assets config/);
    await assert.rejects(loadConfig(invalidValuePath), /must contain a JSON object/);
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});
