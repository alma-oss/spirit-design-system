import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { runCli } from '../src/index.ts';
import { createSnapshot, fontStacks } from './fixtures.mjs';

test('runCli prints help and validates commands and config arguments', async () => {
  const messages = [];
  const log = (message) => messages.push(message);

  await runCli(['--help'], { log });
  await runCli(['-h'], { log });
  await assert.rejects(runCli(['unknown'], { log }), /Unknown command: unknown/);
  await assert.rejects(runCli([], { log }), /A command is required/);
  await assert.rejects(runCli(['generate'], { log }), /Unable to read Figma tokens config/);
  await assert.rejects(runCli(['generate', '--config'], { log }), /--config requires a path/);
  await assert.rejects(runCli(['generate', '--snapshot'], { log }), /--snapshot requires a path/);

  assert.equal(messages.length, 4);
  assert.ok(messages.every((message) => message.startsWith('Usage: figma-tokens')));
});

test('runCli generate and check pass snapshot and dry-run flags', async () => {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'figma-tokens-cli-'));
  const configPath = path.join(temporaryDirectory, 'figma-tokens.config.json');
  const snapshotPath = path.join(temporaryDirectory, 'snapshot.json');
  const messages = [];
  const received = [];

  try {
    await writeFile(
      configPath,
      JSON.stringify({
        fileKey: 'BXRF3VABXQm2TGkL0nwS4i',
        brand: 'Spirit',
        out: 'src',
        snapshot: 'snapshot.json',
        fontStacks,
      }),
    );
    await writeFile(snapshotPath, JSON.stringify(createSnapshot()));

    await runCli(['generate', '--config', configPath, '--snapshot', snapshotPath, '--dry-run'], {
      log: (message) => messages.push(message),
      sync: async (options) => {
        received.push(options);

        return {
          brand: 'Spirit',
          out: '/src',
          exported: 2,
          warnings: ['unused style'],
          changes: [
            { file: '/src/a.scss', type: 'added' },
            { file: '/src/b.scss', type: 'updated' },
            { file: '/src/c.scss', type: 'deleted' },
          ],
        };
      },
    });

    await runCli(['check', '--config', configPath], {
      log: () => undefined,
      sync: async (options) => {
        received.push(options);

        return { brand: 'Spirit', out: '/src', exported: 0, warnings: [], changes: [] };
      },
    });

    assert.equal(received[0].dryRun, true);
    assert.equal(received[0].check, false);
    assert.equal(received[0].config.snapshot, snapshotPath);
    assert.equal(received[1].check, true);
    assert.equal(messages[0], 'Spirit: would export 2 files to /src (1 added, 1 updated, 1 deleted)');
    assert.equal(messages[1], 'warning: unused style');
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});

test('runCli uses default logging', async () => {
  const originalLog = console.log;
  const messages = [];

  try {
    console.log = (message) => messages.push(message);
    await runCli(['--help']);
    assert.equal(messages.length, 1);
  } finally {
    console.log = originalLog;
  }
});
