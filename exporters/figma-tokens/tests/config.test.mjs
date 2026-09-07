import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { loadConfig, resolveConfig } from '../src/index.ts';

const validConfig = {
  fileKey: 'BXRF3VABXQm2TGkL0nwS4i',
  brand: 'Spirit',
  out: 'src',
  snapshot: '.snapshots/spirit.figma-tokens.snapshot.json',
  fontStacks: { Inter: "'Inter', sans-serif" },
};

test('resolveConfig resolves paths relative to the config file', () => {
  const config = resolveConfig(validConfig, '/repo/packages/design-tokens/figma-tokens.config.json');

  assert.equal(config.out, '/repo/packages/design-tokens/src');
  assert.equal(config.snapshot, '/repo/packages/design-tokens/.snapshots/spirit.figma-tokens.snapshot.json');
  assert.equal(config.brand, 'Spirit');
});

test('resolveConfig rejects invalid configuration', () => {
  const configPath = '/repo/figma-tokens.config.json';

  assert.throws(() => resolveConfig({ ...validConfig, fileKey: '' }, configPath), /fileKey/);
  assert.throws(() => resolveConfig({ ...validConfig, brand: ' ' }, configPath), /brand/);
  assert.throws(() => resolveConfig({ ...validConfig, out: '' }, configPath), /out/);
  assert.throws(() => resolveConfig({ ...validConfig, snapshot: '' }, configPath), /snapshot/);
  assert.throws(() => resolveConfig({ ...validConfig, fontStacks: {} }, configPath), /fontStacks/);
  assert.throws(() => resolveConfig({ ...validConfig, fontStacks: { Inter: '' } }, configPath), /fontStacks/);
});

test('loadConfig reads valid JSON and reports invalid files', async () => {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'figma-tokens-config-'));

  try {
    const validPath = path.join(temporaryDirectory, 'valid.json');
    const invalidJsonPath = path.join(temporaryDirectory, 'invalid.json');
    const invalidValuePath = path.join(temporaryDirectory, 'value.json');

    await writeFile(validPath, JSON.stringify(validConfig));
    await writeFile(invalidJsonPath, '{');
    await writeFile(invalidValuePath, 'null');

    const config = await loadConfig(validPath);

    assert.equal(config.fileKey, validConfig.fileKey);
    assert.equal(config.out, path.join(temporaryDirectory, 'src'));
    await assert.rejects(loadConfig(invalidJsonPath), /Unable to read Figma tokens config/);
    await assert.rejects(loadConfig(path.join(temporaryDirectory, 'missing.json')), /Unable to read Figma tokens config/);
    await assert.rejects(loadConfig(invalidValuePath), /must contain a JSON object/);
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});
