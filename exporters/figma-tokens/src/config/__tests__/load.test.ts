import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { ConfigError } from '../../errors';
import { loadConfig } from '../load';

const writeConfig = async (contents: unknown): Promise<string> => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'figma-tokens-config-'));
  const configPath = path.join(directory, 'spirit.config.json');

  await writeFile(configPath, JSON.stringify(contents));

  return configPath;
};

describe('loadConfig', () => {
  const directories: string[] = [];

  afterEach(async () => {
    await Promise.all(directories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
  });

  it('resolves token sources from the spirit config', async () => {
    const configPath = await writeConfig({
      tokens: {
        sources: [
          {
            fileKey: 'BXRF3VABXQm2TGkL0nwS4i',
            brand: 'Spirit',
            out: 'packages/design-tokens/src',
            fontStacks: { Inter: "'Inter', sans-serif" },
          },
        ],
      },
    });
    directories.push(path.dirname(configPath));

    const config = await loadConfig(configPath);

    expect(config.sources[0].brand).toBe('Spirit');
    expect(config.sources[0].out).toBe(path.resolve(path.dirname(configPath), 'packages/design-tokens/src'));
  });

  it.each([
    [{}, /must contain a "tokens" object/],
    [{ tokens: { sources: [] } }, /at least one token source/],
    [
      {
        tokens: { sources: [{ fileKey: 'bad key', brand: 'Spirit', out: 'src', fontStacks: { Inter: 'sans-serif' } }] },
      },
      /valid Figma/,
    ],
    [
      {
        tokens: { sources: [{ fileKey: 'file', brand: 'Spirit', out: '../src', fontStacks: { Inter: 'sans-serif' } }] },
      },
      /must not contain "\.\."/,
    ],
  ])('rejects invalid config %#', async (contents, message) => {
    const configPath = await writeConfig(contents);
    directories.push(path.dirname(configPath));

    await expect(loadConfig(configPath)).rejects.toThrow(message);
    await expect(loadConfig(configPath)).rejects.toBeInstanceOf(ConfigError);
  });

  it('reads the config file that was written', async () => {
    const configPath = await writeConfig({ tokens: { sources: [] } });
    directories.push(path.dirname(configPath));

    expect(JSON.parse(await readFile(configPath, 'utf8'))).toEqual({ tokens: { sources: [] } });
  });
});
