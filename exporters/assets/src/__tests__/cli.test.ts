import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { confineConfig, loadConfig, resolveConfig, runCli } from '..';
import { filterTargets } from '../config';

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
    await expect(runCli(['sync', '--config'], { log: jest.fn() })).rejects.toThrow(/--config requires a value/);
    await expect(runCli(['sync', '-c'], { log: jest.fn() })).rejects.toThrow(/-c requires a value/);
  });

  it('reports a missing default configuration file', async () => {
    await expect(runCli(['sync'], { log: jest.fn() })).rejects.toThrow(/Unable to find a Spirit configuration file/);
  });

  it('synchronizes configured targets and reports changes', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-cli-'));
    const configPath = path.join(temporaryDirectory, 'spirit.config.json');
    const messages: string[] = [];
    const expectedFetch = async () => new Response();
    let receivedOptions: { token?: string; fetch?: typeof fetch } | undefined;

    try {
      await writeFile(
        configPath,
        '{"assets":{"fileKey":"figma-file","targets":[{"brand":"Spirit","out":"svg","assets":["icons"]}]}}',
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
    const configPath = path.join(temporaryDirectory, 'spirit.config.json');
    const originalLog = console.log;
    const messages: string[] = [];

    try {
      console.log = (message: string) => messages.push(message);
      await runCli(['--help']);
      await writeFile(
        configPath,
        '{"assets":{"fileKey":"figma-file","targets":[{"brand":"Spirit","out":"svg","assets":["icons"]}]}}',
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

  it('passes repository-root, brand, and out through to configuration loading', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-cli-root-'));
    const configPath = path.join(temporaryDirectory, 'spirit.config.json');
    let receivedConfig: { repositoryRoot?: string; targets: { brand: string }[] } | undefined;

    try {
      await writeFile(
        configPath,
        '{"assets":{"fileKey":"figma-file","targets":[{"brand":"Spirit","out":"packages/icons/src/svg","assets":["icons"]},{"brand":"Jobs","out":"packages/jobs/src/svg","assets":["icons"]}]}}',
      );

      await runCli(
        [
          'sync',
          '--config',
          configPath,
          '--repository-root',
          temporaryDirectory,
          '--brand',
          'Spirit',
          '--out',
          'packages/icons/src/svg',
        ],
        {
          log: jest.fn(),
          sync: async (options) => {
            receivedConfig = options.config;

            return { targets: [] };
          },
          token: 'token',
        },
      );

      expect(receivedConfig?.repositoryRoot).toBe(temporaryDirectory);
      expect(receivedConfig?.targets).toHaveLength(1);
      expect(receivedConfig?.targets[0].brand).toBe('Spirit');
    } finally {
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });

  it('requires values for repository-root, brand, and out flags', async () => {
    await expect(runCli(['sync', '--repository-root'], { log: jest.fn() })).rejects.toThrow(
      /--repository-root requires a value/,
    );
    await expect(runCli(['sync', '--brand'], { log: jest.fn() })).rejects.toThrow(/--brand requires a value/);
    await expect(runCli(['sync', '--out'], { log: jest.fn() })).rejects.toThrow(/--out requires a value/);
  });

  it('discovers opted-in repositories and writes GitHub output', async () => {
    const originalClientId = process.env.GH_APP_CLIENT_ID;
    const originalPrivateKey = process.env.GH_APP_PRIVATE_KEY;
    const originalDispatch = process.env.DISPATCH_FILE_KEY;
    const originalOutput = process.env.GITHUB_OUTPUT;
    const outputPath = path.join(os.tmpdir(), `spirit-assets-output-${Date.now()}`);
    const messages: string[] = [];
    const errors: string[] = [];
    let written = '';

    process.env.GH_APP_CLIENT_ID = 'client';
    process.env.GH_APP_PRIVATE_KEY = 'key';
    process.env.DISPATCH_FILE_KEY = 'dispatch-key';
    process.env.GITHUB_OUTPUT = outputPath;

    try {
      await runCli(['discover'], {
        discover: async (options = {}) => {
          options.log?.('skipped');

          return {
            include: [
              {
                branch: 'chore/figma-icons-sync-spirit-design-system-packages-icons-src-svg',
                brand: 'Spirit',
                commitMessage: 'chore(icons): sync Spirit icons from Figma',
                fileKey: options.fileKey ?? '',
                out: 'packages/icons/src/svg',
                owner: 'alma-oss',
                repo: 'spirit-design-system',
                slug: 'spirit-design-system-packages-icons-src-svg',
                title: 'Chore(icons): Sync Spirit icons from Figma',
              },
            ],
          };
        },
        log: (message) => messages.push(message),
        logError: (message) => errors.push(message),
        writeOutput: async (_path, contents) => {
          written = contents;
        },
      });

      expect(messages[0]).toContain('"owner":"alma-oss"');
      expect(written).toContain('has-targets=true');
      expect(JSON.parse(messages[0] ?? '{}').include[0].fileKey).toBe('dispatch-key');
    } finally {
      process.env.GH_APP_CLIENT_ID = originalClientId;
      process.env.GH_APP_PRIVATE_KEY = originalPrivateKey;
      process.env.DISPATCH_FILE_KEY = originalDispatch;
      process.env.GITHUB_OUTPUT = originalOutput;
    }
  });

  it('requires a value for --file-key and writes empty GitHub output', async () => {
    const originalOutput = process.env.GITHUB_OUTPUT;
    const originalDispatch = process.env.DISPATCH_FILE_KEY;
    process.env.GITHUB_OUTPUT = '/tmp/spirit-assets-empty-output';
    delete process.env.DISPATCH_FILE_KEY;
    const written: string[] = [];
    let receivedFileKey: string | undefined;

    try {
      await expect(runCli(['discover', '--file-key'], { log: jest.fn() })).rejects.toThrow(
        /--file-key requires a value/,
      );

      await runCli(['discover', '--file-key', 'abc'], {
        discover: async (options = {}) => {
          receivedFileKey = options.fileKey;

          return { include: [] };
        },
        log: jest.fn(),
        writeOutput: async (_path, contents) => {
          written.push(contents);
        },
      });

      expect(written[0]).toContain('has-targets=false');
      expect(receivedFileKey).toBe('abc');
    } finally {
      process.env.GITHUB_OUTPUT = originalOutput;
      process.env.DISPATCH_FILE_KEY = originalDispatch;
    }
  });

  it('writes GitHub output with the default writer', async () => {
    const originalOutput = process.env.GITHUB_OUTPUT;
    const outputDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-gh-output-'));
    const outputPath = path.join(outputDirectory, 'github-output');
    process.env.GITHUB_OUTPUT = outputPath;

    try {
      await runCli(['discover'], {
        discover: async () => ({ include: [] }),
        log: jest.fn(),
      });
      const { readFile } = await import('node:fs/promises');

      expect(await readFile(outputPath, 'utf8')).toContain('has-targets=false');
    } finally {
      process.env.GITHUB_OUTPUT = originalOutput;
      await rm(outputDirectory, { recursive: true, force: true });
    }
  });

  it('uses the default discoverer when GitHub App credentials are missing', async () => {
    const originalClientId = process.env.GH_APP_CLIENT_ID;
    const originalPrivateKey = process.env.GH_APP_PRIVATE_KEY;
    delete process.env.GH_APP_CLIENT_ID;
    delete process.env.GH_APP_PRIVATE_KEY;

    try {
      await expect(runCli(['discover'], { log: jest.fn() })).rejects.toThrow(
        /GH_APP_CLIENT_ID and GH_APP_PRIVATE_KEY are required/,
      );
    } finally {
      process.env.GH_APP_CLIENT_ID = originalClientId;
      process.env.GH_APP_PRIVATE_KEY = originalPrivateKey;
    }
  });

  it('prints discovery results without GitHub output', async () => {
    const originalOutput = process.env.GITHUB_OUTPUT;
    const originalDispatch = process.env.DISPATCH_FILE_KEY;
    delete process.env.GITHUB_OUTPUT;
    process.env.DISPATCH_FILE_KEY = '';
    const messages: string[] = [];
    let receivedFileKey: string | undefined;

    try {
      await runCli(['discover'], {
        discover: async (options = {}) => {
          receivedFileKey = options.fileKey;

          return { include: [] };
        },
        log: (message) => messages.push(message),
      });

      expect(messages[0]).toBe('{"include":[]}');
      expect(receivedFileKey).toBeUndefined();
    } finally {
      process.env.GITHUB_OUTPUT = originalOutput;
      process.env.DISPATCH_FILE_KEY = originalDispatch;
    }
  });

  it('writes Figma publish notes for GitHub Actions', async () => {
    const originalNotes = process.env.GITHUB_PUBLISH_NOTES_PATH;
    const originalDescription = process.env.DISPATCH_DESCRIPTION;
    process.env.GITHUB_PUBLISH_NOTES_PATH = '/tmp/figma-publish-notes.txt';
    process.env.DISPATCH_DESCRIPTION = 'Library update';
    const written: Array<{ contents: string; path: string }> = [];

    try {
      await runCli(['discover'], {
        discover: async () => ({ include: [] }),
        log: jest.fn(),
        writeFile: async (notesPath, contents) => {
          written.push({ contents, path: notesPath });
        },
      });

      expect(written).toEqual([{ contents: 'Library update', path: '/tmp/figma-publish-notes.txt' }]);
    } finally {
      process.env.GITHUB_PUBLISH_NOTES_PATH = originalNotes;
      process.env.DISPATCH_DESCRIPTION = originalDescription;
    }
  });

  it('writes publish notes with the default writer', async () => {
    const originalNotes = process.env.GITHUB_PUBLISH_NOTES_PATH;
    const originalDescription = process.env.DISPATCH_DESCRIPTION;
    const directory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-notes-'));
    const notesPath = path.join(directory, 'notes.txt');
    process.env.GITHUB_PUBLISH_NOTES_PATH = notesPath;
    process.env.DISPATCH_DESCRIPTION = 'From disk';

    try {
      await runCli(['discover'], {
        discover: async () => ({ include: [] }),
        log: jest.fn(),
      });
      const { readFile } = await import('node:fs/promises');

      expect(await readFile(notesPath, 'utf8')).toBe('From disk');
    } finally {
      process.env.GITHUB_PUBLISH_NOTES_PATH = originalNotes;
      process.env.DISPATCH_DESCRIPTION = originalDescription;
      await rm(directory, { recursive: true, force: true });
    }
  });

  it('uses a unique discovered file key when writing publish notes', async () => {
    const originalNotes = process.env.GITHUB_PUBLISH_NOTES_PATH;
    const originalDispatch = process.env.DISPATCH_FILE_KEY;
    process.env.GITHUB_PUBLISH_NOTES_PATH = '/tmp/figma-publish-notes.txt';
    delete process.env.DISPATCH_FILE_KEY;
    let receivedFileKey: string | undefined;

    try {
      await runCli(['discover'], {
        discover: async () => ({
          include: [
            {
              branch: 'a',
              brand: 'Spirit',
              commitMessage: 'commit',
              fileKey: 'shared-file',
              out: 'svg',
              owner: 'alma-oss',
              repo: 'one',
              slug: 'one-svg',
              title: 'title',
            },
            {
              branch: 'b',
              brand: 'Jobs',
              commitMessage: 'commit',
              fileKey: 'shared-file',
              out: 'svg',
              owner: 'alma-oss',
              repo: 'two',
              slug: 'two-svg',
              title: 'title',
            },
          ],
        }),
        log: jest.fn(),
        resolveNotes: async (options) => {
          receivedFileKey = options.fileKey;

          return 'From versions';
        },
        writeFile: jest.fn(),
      });

      expect(receivedFileKey).toBe('shared-file');
    } finally {
      process.env.GITHUB_PUBLISH_NOTES_PATH = originalNotes;
      process.env.DISPATCH_FILE_KEY = originalDispatch;
    }
  });

  it('does not guess a file key when discovered targets use different Figma files', async () => {
    const originalNotes = process.env.GITHUB_PUBLISH_NOTES_PATH;
    const originalDispatch = process.env.DISPATCH_FILE_KEY;
    process.env.GITHUB_PUBLISH_NOTES_PATH = '/tmp/figma-publish-notes.txt';
    delete process.env.DISPATCH_FILE_KEY;
    let receivedFileKey: string | undefined;

    try {
      await runCli(['discover'], {
        discover: async () => ({
          include: [
            {
              branch: 'a',
              brand: 'Spirit',
              commitMessage: 'commit',
              fileKey: 'file-a',
              out: 'svg',
              owner: 'alma-oss',
              repo: 'one',
              slug: 'one-svg',
              title: 'title',
            },
            {
              branch: 'b',
              brand: 'Jobs',
              commitMessage: 'commit',
              fileKey: 'file-b',
              out: 'svg',
              owner: 'alma-oss',
              repo: 'two',
              slug: 'two-svg',
              title: 'title',
            },
          ],
        }),
        log: jest.fn(),
        resolveNotes: async (options) => {
          receivedFileKey = options.fileKey;

          return '';
        },
        writeFile: jest.fn(),
      });

      expect(receivedFileKey).toBeUndefined();
    } finally {
      process.env.GITHUB_PUBLISH_NOTES_PATH = originalNotes;
      process.env.DISPATCH_FILE_KEY = originalDispatch;
    }
  });
});

describe('resolveConfig', () => {
  it('resolves output directories relative to the config file', () => {
    const config = resolveConfig(
      {
        assets: {
          fileKey: 'figma-file',
          targets: [{ brand: 'Spirit', out: 'src/svg', assets: ['icons', 'benefit-icons'] }],
        },
      },
      '/repo/packages/icons/spirit.config.json',
    );

    expect(config.targets[0].out).toBe('/repo/packages/icons/src/svg');
    expect(config.targets[0].assets).toEqual(['icons', 'benefit-icons']);
  });

  it('requires a shared Spirit config with an assets object', () => {
    expect(() => resolveConfig({}, '/repo/spirit.config.json')).toThrow(/"assets" object/);
    expect(() => resolveConfig({ tokens: { out: 'src/scss' } }, '/repo/spirit.config.json')).toThrow(/"assets" object/);
    expect(() => resolveConfig(null, '/repo/spirit.config.json')).toThrow(/JSON object/);
  });

  it('ignores sibling tool keys on the shared Spirit config', () => {
    const config = resolveConfig(
      {
        tokens: { out: 'src/scss' },
        assets: {
          fileKey: 'figma-file',
          targets: [{ brand: 'Spirit', out: 'src/svg', assets: ['icons'] }],
        },
      },
      '/repo/spirit.config.json',
    );

    expect(config.fileKey).toBe('figma-file');
    expect(config.targets[0].out).toBe('/repo/src/svg');
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
    {
      config: { fileKey: '../etc', targets: [{ brand: 'Spirit', out: 'svg', assets: ['icons'] }] },
      expectedError: /valid Figma "fileKey"/,
    },
    {
      config: { fileKey: 'file', branch: ' ', targets: [{ brand: 'Spirit', out: 'svg', assets: ['icons'] }] },
      expectedError: /non-empty "branch"/,
    },
    {
      config: {
        fileKey: 'file',
        pullRequestTitle: 'Chore({token})',
        targets: [{ brand: 'Spirit', out: 'svg', assets: ['icons'] }],
      },
      expectedError: /unknown placeholder/,
    },
    {
      config: { fileKey: 'file', branch: 1, targets: [{ brand: 'Spirit', out: 'svg', assets: ['icons'] }] },
      expectedError: /non-empty "branch"/,
    },
    {
      config: {
        fileKey: 'file',
        targets: [{ brand: 'Spirit', out: 'svg', assets: ['icons'], branch: '{unknown}' }],
      },
      expectedError: /unknown placeholder/,
    },
    {
      config: {
        fileKey: 'file',
        targets: [{ brand: 'Spirit', out: 'svg', assets: ['icons'], commitMessage: ' ' }],
      },
      expectedError: /non-empty "commitMessage"/,
    },
    {
      config: {
        fileKey: 'file',
        targets: [{ brand: 'Spirit', out: 'svg', assets: ['icons'], pullRequestTitle: 'Chore({token})' }],
      },
      expectedError: /unknown placeholder/,
    },
  ])('rejects invalid config: $expectedError', ({ config, expectedError }) => {
    const configPath = '/repo/spirit.config.json';

    expect(() => resolveConfig({ assets: config }, configPath)).toThrow(expectedError);
  });

  it('rejects targets that resolve to the same output directory', () => {
    const configPath = '/repo/spirit.config.json';

    expect(() =>
      resolveConfig(
        {
          assets: {
            fileKey: ' file ',
            targets: [
              { brand: ' Spirit ', out: 'svg', assets: ['icons'] },
              { brand: 'Jobs', out: './svg', assets: ['icons'] },
            ],
          },
        },
        configPath,
      ),
    ).toThrow(/same output directory/);
  });

  it('rejects absolute output paths', () => {
    expect(() =>
      resolveConfig(
        { assets: { fileKey: 'file', targets: [{ brand: 'Spirit', out: '/tmp/svg', assets: ['icons'] }] } },
        '/repo/spirit.config.json',
      ),
    ).toThrow(/relative path/);
    expect(() =>
      resolveConfig(
        { assets: { fileKey: 'file', targets: [{ brand: 'Spirit', out: 'C:\\Windows\\Temp', assets: ['icons'] }] } },
        '/repo/spirit.config.json',
      ),
    ).toThrow(/relative path/);
  });

  it('rejects parent-directory output paths', () => {
    expect(() =>
      resolveConfig(
        { assets: { fileKey: 'file', targets: [{ brand: 'Spirit', out: '../escape', assets: ['icons'] }] } },
        '/repo/spirit.config.json',
      ),
    ).toThrow(/\.\./);
  });

  it('confines repository-owned configs to the repository root file', () => {
    expect(() =>
      confineConfig(
        resolveConfig(
          { assets: { fileKey: 'file', targets: [{ brand: 'Spirit', out: 'src/svg', assets: ['icons'] }] } },
          '/repo/packages/icons/spirit.config.json',
        ),
        '/repo',
      ),
    ).toThrow(/must be \/repo\/spirit.config.json/);
  });
});

describe('loadConfig', () => {
  it('reads valid JSON and reports invalid configuration files', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-config-'));

    try {
      const validPath = path.join(temporaryDirectory, 'spirit.config.json');
      const invalidJsonPath = path.join(temporaryDirectory, 'invalid.json');
      const invalidValuePath = path.join(temporaryDirectory, 'value.json');

      await writeFile(
        validPath,
        '{"assets":{"fileKey":" file ","targets":[{"brand":" Spirit ","out":"svg","assets":["icons"]}]}}',
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
        path.join(temporaryDirectory, 'spirit.config.json'),
        '{"assets":{"fileKey":"discovered","targets":[{"brand":"Spirit","out":"svg","assets":["icons"]}]}}',
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
      await writeFile(path.join(temporaryDirectory, 'spirit.config.json'), '{');
      process.chdir(temporaryDirectory);

      await expect(loadConfig()).rejects.toThrow(/Unable to read assets config/);
    } finally {
      process.chdir(originalCwd);
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });
});

describe('filterTargets', () => {
  const config = resolveConfig(
    {
      assets: {
        fileKey: 'figma-file',
        targets: [
          { brand: 'Spirit', out: 'packages/icons/src/svg', assets: ['icons'] },
          { brand: 'Jobs', out: 'packages/jobs/src/svg', assets: ['icons'] },
        ],
      },
    },
    '/repo/spirit.config.json',
  );

  it('returns the original config when no filter is provided', () => {
    expect(filterTargets(config)).toBe(config);
  });

  it('requires brand and out together', () => {
    expect(() => filterTargets(config, 'Spirit')).toThrow(/must be used together/);
    expect(() => filterTargets(config, undefined, 'packages/icons/src/svg')).toThrow(/must be used together/);
  });

  it('requires a configuration path to match output directories', () => {
    expect(() =>
      filterTargets({ fileKey: 'figma-file', targets: config.targets }, 'Spirit', 'packages/icons/src/svg'),
    ).toThrow(/without a configuration path/);
  });

  it('selects a single matching target', () => {
    const filtered = filterTargets(config, 'Spirit', 'packages/icons/src/svg');

    expect(filtered.targets).toHaveLength(1);
    expect(filtered.targets[0].brand).toBe('Spirit');
  });

  it('rejects unknown brand and output combinations', () => {
    expect(() => filterTargets(config, 'Spirit', 'missing/svg')).toThrow(/Unable to find a sync target/);
  });
});
