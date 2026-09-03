import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { loadConfig, resolveConfig, runCli } from '../src';

describe('runCli', () => {
  const originalExit = process.exit;

  afterEach(() => {
    process.exit = originalExit;
    delete process.env.FIGMA_ACCESS_TOKEN;
  });

  it('prints help for --help and -h', async () => {
    const messages: string[] = [];
    const log = (message: string) => messages.push(message);

    await runCli(['--help'], { log });
    await runCli(['-h'], { log });

    expect(messages.length).toBeGreaterThan(0);
    expect(messages.join('\n')).toContain('spirit-assets');
    expect(messages.join('\n')).toContain('sync');
  });

  it('rejects an unknown command', async () => {
    const messages: string[] = [];
    const log = (message: string) => messages.push(message);
    const exitMock = jest.fn((code?: number) => {
      throw new Error(`exit ${code}`);
    }) as unknown as typeof process.exit;

    process.exit = exitMock;

    await expect(runCli(['unknown'], { log })).rejects.toThrow(/exit 1/);
  });

  it('rejects a missing command', async () => {
    const exitMock = jest.fn((code?: number) => {
      throw new Error(`exit ${code}`);
    }) as unknown as typeof process.exit;

    process.exit = exitMock;

    await expect(runCli([], { log: jest.fn() })).rejects.toThrow(/exit 1/);
  });

  it('requires a path for --config', async () => {
    await expect(runCli(['sync', '--config'], { log: jest.fn() })).rejects.toThrow(/--config requires a path/);
  });

  it('reports a missing default configuration file', async () => {
    await expect(runCli(['sync'], { log: jest.fn() })).rejects.toThrow(
      /Unable to find a spirit-assets configuration file/,
    );
  });

  it('synchronizes configured targets and reports changes', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-cli-'));
    const configPath = path.join(temporaryDirectory, 'spirit-assets.config.json');
    const messages: string[] = [];
    const expectedFetch = async () => new Response();
    let receivedOptions: { token?: string; fetch?: typeof fetch } | undefined;

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

      expect(receivedOptions?.token).toBe('environment-token');
      expect(receivedOptions?.fetch).toBe(expectedFetch);
      expect(messages[0]).toBe('Spirit: exported 3 assets to /svg (1 added, 1 updated, 1 deleted)');
    } finally {
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });

  it('uses default logging and synchronization', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-cli-'));
    const configPath = path.join(temporaryDirectory, 'spirit-assets.config.json');
    const originalLog = console.log;
    const messages: string[] = [];

    try {
      console.log = (message: string) => messages.push(message);
      await runCli(['--help']);
      await writeFile(
        configPath,
        '{"fileKey":"figma-file","targets":[{"brand":"Spirit","out":"svg","assets":["icons"]}]}',
      );

      await expect(runCli(['sync', '--config', configPath], { token: '' })).rejects.toThrow(
        /FIGMA_ACCESS_TOKEN is required/,
      );
      await expect(runCli(['sync', '--config', configPath])).rejects.toThrow(/FIGMA_ACCESS_TOKEN is required/);
      expect(messages.length).toBeGreaterThan(0);
    } finally {
      console.log = originalLog;
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });
});

describe('resolveConfig', () => {
  it('resolves output directories relative to the config file', () => {
    const config = resolveConfig(
      {
        fileKey: 'figma-file',
        targets: [{ brand: 'Spirit', out: 'src/svg', assets: ['icons', 'benefit-icons'] }],
      },
      '/repo/packages/icons/spirit-assets.config.json',
    );

    expect(config.targets[0].out).toBe('/repo/packages/icons/src/svg');
    expect(config.targets[0].assets).toEqual(['icons', 'benefit-icons']);
  });

  it.each([
    {
      config: { fileKey: '', targets: [] },
      expectedError: /non-empty "fileKey"/,
    },
    {
      config: { fileKey: 'file', targets: [] },
      expectedError: /at least one sync target/,
    },
    {
      config: { fileKey: 'file', targets: [null] },
      expectedError: /target at index 0 must be an object/,
    },
    {
      config: { fileKey: 'file', targets: [1] },
      expectedError: /target at index 0 must be an object/,
    },
    {
      config: { fileKey: 'file', targets: null },
      expectedError: /must contain a JSON object/,
    },
    {
      config: { fileKey: 'file', targets: [{ brand: 1, out: 'svg' }] },
      expectedError: /non-empty "brand"/,
    },
    {
      config: { fileKey: 'file', targets: [{ brand: 'Spirit', out: ' ' }] },
      expectedError: /non-empty "out"/,
    },
    {
      config: { fileKey: 'file', targets: [{ brand: 'Spirit', out: 'svg' }] },
      expectedError: /at least one asset type/,
    },
    {
      config: { fileKey: 'file', targets: [{ brand: 'Spirit', out: 'svg', assets: [] }] },
      expectedError: /at least one asset type/,
    },
    {
      config: { fileKey: 'file', targets: [{ brand: 'Spirit', out: 'svg', assets: ['icons', 'unknown'] }] },
      expectedError: /unsupported asset type/,
    },
    {
      config: { fileKey: 'file', targets: [{ brand: 'Spirit', out: 'svg', assets: ['icons', 'icons'] }] },
      expectedError: /duplicate asset types/,
    },
  ])('rejects invalid config: $expectedError', ({ config, expectedError }) => {
    const configPath = '/repo/spirit-assets.config.json';

    expect(() => resolveConfig(config, configPath)).toThrow(expectedError);
  });

  it('rejects targets that resolve to the same output directory', () => {
    const configPath = '/repo/spirit-assets.config.json';

    expect(() =>
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
    ).toThrow(/same output directory/);
  });
});

describe('loadConfig', () => {
  it('reads valid JSON and reports invalid configuration files', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-config-'));

    try {
      const validPath = path.join(temporaryDirectory, 'spirit-assets.config.json');
      const invalidJsonPath = path.join(temporaryDirectory, 'invalid.json');
      const invalidValuePath = path.join(temporaryDirectory, 'value.json');

      await writeFile(
        validPath,
        '{"fileKey":" file ","targets":[{"brand":" Spirit ","out":"svg","assets":["icons"]}]}',
      );
      await writeFile(invalidJsonPath, '{');
      await writeFile(invalidValuePath, '[]');

      const config = await loadConfig(validPath);

      expect(config.fileKey).toBe('file');
      expect(config.targets[0].brand).toBe('Spirit');
      expect(config.targets[0].out).toBe(path.join(temporaryDirectory, 'svg'));
      expect(config.targets[0].assets).toEqual(['icons']);
      await expect(loadConfig(invalidJsonPath)).rejects.toThrow(/Unable to read assets config/);
      await expect(loadConfig(path.join(temporaryDirectory, 'missing.json'))).rejects.toThrow(
        /Unable to read assets config/,
      );
      await expect(loadConfig(invalidValuePath)).rejects.toThrow(/must contain a JSON object/);
    } finally {
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });

  it('discovers a spirit-assets config from the working directory', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-search-'));
    const originalCwd = process.cwd();

    try {
      await writeFile(
        path.join(temporaryDirectory, 'spirit-assets.config.json'),
        '{"fileKey":"discovered","targets":[{"brand":"Spirit","out":"svg","assets":["icons"]}]}',
      );
      process.chdir(temporaryDirectory);

      const config = await loadConfig();

      expect(config.fileKey).toBe('discovered');
    } finally {
      process.chdir(originalCwd);
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });

  it('wraps unexpected loader errors when searching for a config', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-search-error-'));
    const originalCwd = process.cwd();

    try {
      await writeFile(path.join(temporaryDirectory, 'spirit-assets.config.json'), '{');
      process.chdir(temporaryDirectory);

      await expect(loadConfig()).rejects.toThrow(/Unable to read assets config/);
    } finally {
      process.chdir(originalCwd);
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });
});
