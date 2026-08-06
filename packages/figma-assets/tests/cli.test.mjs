import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { runCli } from '../src/index.ts';

test('runCli prints help and validates commands and config arguments', async () => {
  const messages = [];
  const log = (message) => messages.push(message);

  await runCli(['--help'], { log });
  await runCli(['-h'], { log });
  await assert.rejects(runCli(['unknown'], { log }), /Unknown command: unknown/);
  await assert.rejects(runCli([], { log }), /A command is required/);
  await assert.rejects(runCli(['sync'], { log }), /Unable to read Figma assets config/);
  await assert.rejects(runCli(['sync', '--config'], { log }), /--config requires a path/);
  await assert.rejects(runCli(['sync', '--config', '--other'], { log }), /--config requires a path/);

  assert.equal(messages.length, 4);
  assert.ok(messages.every((message) => message.startsWith('Usage: figma-assets sync')));
});

test('runCli synchronizes configured targets and reports changes', async () => {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'figma-assets-cli-'));
  const configPath = path.join(temporaryDirectory, 'figma-assets.config.json');
  const messages = [];
  const expectedFetch = async () => new Response();
  let receivedOptions;

  try {
    await writeFile(
      configPath,
      '{"fileKey":"figma-file","targets":[{"brand":"Spirit","out":"svg","assets":["icons"]}]}',
    );
    process.env.FIGMA_ACCESS_TOKEN = 'environment-token';

    await runCli(['sync', '--config', configPath], {
      fetch: expectedFetch,
      log: (message) => messages.push(message),
      sync: async (options) => {
        receivedOptions = options;

        return {
          targets: [
            {
              brand: 'Spirit',
              out: '/svg',
              exported: 3,
              changes: [
                { file: '/svg/added.svg', type: 'added' },
                { file: '/svg/updated.svg', type: 'updated' },
                { file: '/svg/deleted.svg', type: 'deleted' },
              ],
            },
          ],
        };
      },
    });

    assert.equal(receivedOptions.token, 'environment-token');
    assert.equal(receivedOptions.fetch, expectedFetch);
    assert.equal(messages[0], 'Spirit: exported 3 assets to /svg (1 added, 1 updated, 1 deleted)');
  } finally {
    delete process.env.FIGMA_ACCESS_TOKEN;
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});

test('runCli uses default logging and synchronization', async () => {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'figma-assets-cli-'));
  const configPath = path.join(temporaryDirectory, 'figma-assets.config.json');
  const originalLog = console.log;
  const messages = [];

  try {
    console.log = (message) => messages.push(message);
    await runCli(['--help']);
    await writeFile(
      configPath,
      '{"fileKey":"figma-file","targets":[{"brand":"Spirit","out":"svg","assets":["icons"]}]}',
    );
    await assert.rejects(runCli(['sync', '--config', configPath], { token: '' }), /FIGMA_ACCESS_TOKEN is required/);
    await assert.rejects(runCli(['sync', '--config', configPath]), /FIGMA_ACCESS_TOKEN is required/);
    assert.equal(messages.length, 1);
  } finally {
    console.log = originalLog;
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});
