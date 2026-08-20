import assert from 'node:assert/strict';
import { chmod, mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { syncAssets } from '../src/index.ts';
import { createFigmaFetch } from './fixtures.mjs';

test('syncAssets adds, updates, and deletes SVG files', async () => {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'figma-assets-'));
  const outputDirectory = path.join(temporaryDirectory, 'svg');

  try {
    await mkdir(outputDirectory);
    await mkdir(path.join(outputDirectory, 'nested'));
    await writeFile(path.join(outputDirectory, 'add-item.svg'), '<svg>old</svg>\n');
    await writeFile(path.join(outputDirectory, 'README.txt'), 'keep me');
    await writeFile(path.join(outputDirectory, 'removed.svg'), '<svg />\n');

    const result = await syncAssets({
      config: {
        fileKey: 'figma-file',
        targets: [{ brand: 'Spirit', out: outputDirectory, assets: ['icons', 'benefit-icons'] }],
      },
      token: 'test-token',
      fetch: createFigmaFetch(),
    });

    assert.deepEqual(
      result.targets[0].changes.map(({ file, type }) => [path.basename(file), type]),
      [
        ['add-item.svg', 'updated'],
        ['benefit-health.svg', 'added'],
        ['logo-colored.svg', 'added'],
        ['removed.svg', 'deleted'],
      ],
    );
    assert.deepEqual(await readdir(outputDirectory), [
      'README.txt',
      'add-item.svg',
      'benefit-health.svg',
      'logo-colored.svg',
      'nested',
    ]);
    assert.equal(
      await readFile(path.join(outputDirectory, 'logo-colored.svg'), 'utf8'),
      '<svg viewBox="0 0 24 24"><path fill="#123456" /></svg>\n',
    );

    const repeatedResult = await syncAssets({
      config: {
        fileKey: 'figma-file',
        targets: [{ brand: 'Spirit', out: outputDirectory, assets: ['icons', 'benefit-icons'] }],
      },
      token: 'test-token',
      fetch: createFigmaFetch(),
    });

    assert.deepEqual(repeatedResult.targets[0].changes, []);
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});

test('syncAssets requires a token', async () => {
  await assert.rejects(
    syncAssets({
      config: {
        fileKey: 'figma-file',
        targets: [{ brand: 'Spirit', out: '/unused', assets: ['icons'] }],
      },
      token: ' ',
      fetch: createFigmaFetch(),
    }),
    /FIGMA_ACCESS_TOKEN is required/,
  );
});

test('syncAssets propagates unexpected filesystem errors', async () => {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'figma-assets-permissions-'));
  const outputDirectory = path.join(temporaryDirectory, 'svg');
  const protectedFile = path.join(outputDirectory, 'add-item.svg');

  try {
    await mkdir(outputDirectory);
    await writeFile(protectedFile, '<svg />\n');
    await chmod(protectedFile, 0o000);

    await assert.rejects(
      syncAssets({
        config: {
          fileKey: 'figma-file',
          targets: [{ brand: 'Spirit', out: outputDirectory, assets: ['icons'] }],
        },
        token: 'test-token',
        fetch: createFigmaFetch(),
      }),
    );
  } finally {
    await chmod(protectedFile, 0o600);
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});

test('syncAssets refuses to delete files when the selected brand has no icons', async () => {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'figma-assets-'));
  const outputDirectory = path.join(temporaryDirectory, 'svg');

  try {
    await mkdir(outputDirectory);
    await writeFile(path.join(outputDirectory, 'existing.svg'), '<svg />\n');

    await assert.rejects(
      syncAssets({
        config: {
          fileKey: 'figma-file',
          targets: [{ brand: 'Práce', out: outputDirectory, assets: ['icons'] }],
        },
        token: 'test-token',
        fetch: createFigmaFetch(),
      }),
      /Brand=Práce/,
    );
    assert.deepEqual(await readdir(outputDirectory), ['existing.svg']);
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});
