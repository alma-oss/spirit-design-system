import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { runCli } from '../cli';
import { ConfigError } from '../errors';

describe('runCli', () => {
  const originalToken = process.env.FIGMA_ACCESS_TOKEN;

  afterEach(() => {
    if (originalToken === undefined) {
      delete process.env.FIGMA_ACCESS_TOKEN;
    } else {
      process.env.FIGMA_ACCESS_TOKEN = originalToken;
    }
  });

  it('prints usage for help', async () => {
    const lines: string[] = [];

    await runCli(['--help'], { log: (message) => lines.push(message) });

    expect(lines.join('\n')).toContain('figma-tokens');
  });

  it('requires a Figma token', async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), 'figma-tokens-cli-'));
    const configPath = path.join(directory, 'spirit.config.json');

    await writeFile(
      configPath,
      JSON.stringify({
        tokens: {
          sources: [{ fileKey: 'filekey', brand: 'Spirit', out: 'src', fontStacks: { Inter: 'sans-serif' } }],
        },
      }),
    );
    delete process.env.FIGMA_ACCESS_TOKEN;

    await expect(runCli(['sync', '--config', configPath], { token: '' })).rejects.toThrow(
      /FIGMA_ACCESS_TOKEN is required/,
    );

    await rm(directory, { recursive: true, force: true });
  });

  it('rejects a brand flag without a value', async () => {
    await expect(runCli(['sync', '--brand'])).rejects.toBeInstanceOf(ConfigError);
  });

  it('forwards dry-run without writing', async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), 'figma-tokens-cli-'));
    const configPath = path.join(directory, 'spirit.config.json');

    await writeFile(
      configPath,
      JSON.stringify({
        tokens: {
          sources: [{ fileKey: 'filekey', brand: 'Spirit', out: 'src', fontStacks: { Inter: 'sans-serif' } }],
        },
      }),
    );

    const sync = jest.fn().mockResolvedValue({ sources: [] });

    await runCli(['sync', '--config', configPath, '--dry-run'], { sync, token: 'token' });

    expect(sync).toHaveBeenCalledWith(expect.objectContaining({ dryRun: true }));

    await rm(directory, { recursive: true, force: true });
  });
});
