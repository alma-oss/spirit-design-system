import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { runSyncCli } from '../syncCli';

const DELIVER_ARGV = [
  'deliver',
  '--app-slug',
  'spirit-assets',
  '--base',
  'main',
  '--body-path',
  '/tmp/body.md',
  '--branch',
  'chore/sync',
  '--commit-message',
  'Sync 123',
  '--out',
  '123',
  '--owner',
  'alma-oss',
  '--repo',
  '123',
  '--repository-root',
  '/tmp/repository',
  '--title',
  'Sync 123',
];

describe('runSyncCli', () => {
  const originalDescription = process.env.DISPATCH_DESCRIPTION;
  const originalFigmaToken = process.env.FIGMA_ACCESS_TOKEN;
  const originalGitHubToken = process.env.GH_TOKEN;

  afterEach(() => {
    [
      ['DISPATCH_DESCRIPTION', originalDescription],
      ['FIGMA_ACCESS_TOKEN', originalFigmaToken],
      ['GH_TOKEN', originalGitHubToken],
    ].forEach(([name, value]) => {
      if (value === undefined) {
        delete process.env[name as string];
      } else {
        process.env[name as string] = value;
      }
    });
  });

  it('prints help with the default logger', async () => {
    const originalLog = console.log;
    const messages: string[] = [];
    console.log = (message: string) => messages.push(message);

    try {
      await runSyncCli(['--help']);

      expect(messages.join('\n')).toContain('sync');
    } finally {
      console.log = originalLog;
    }
  });

  it('requires a repository root', async () => {
    await expect(runSyncCli(['sync'], { log: jest.fn() })).rejects.toThrow('--repository-root is required.');
  });

  it('synchronizes one repository target through the shared command', async () => {
    const repositoryRoot = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-sync-cli-'));
    const messages: string[] = [];
    let receivedOut: string | undefined;

    try {
      await writeFile(
        path.join(repositoryRoot, 'spirit.config.json'),
        '{"assets":{"fileKey":"figma-file","targets":[{"brand":"Spirit","out":"svg","assets":["icons"]}]}}',
      );

      await runSyncCli(['sync', '--repository-root', repositoryRoot, '--brand', 'Spirit', '--out', 'svg'], {
        log: (message) => messages.push(message),
        sync: async ({ config }) => {
          receivedOut = config.targets[0]?.out;

          return {
            targets: [{ brand: 'Spirit', changes: [], exported: 1, out: receivedOut ?? '' }],
          };
        },
        token: 'token',
      });

      expect(receivedOut).toBe(path.join(repositoryRoot, 'svg'));
      expect(messages).toEqual([
        `Spirit: exported 1 assets to ${path.join(repositoryRoot, 'svg')} (0 added, 0 updated, 0 deleted)`,
      ]);
    } finally {
      await rm(repositoryRoot, { recursive: true, force: true });
    }
  });

  it('writes multiline Figma publish notes inside the target job', async () => {
    const repositoryRoot = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-sync-notes-'));
    const notesPath = path.join(repositoryRoot, 'notes.md');
    const notes = 'Release notes\nEOF\n::warning::plain text\n';
    let writtenNotes = '';

    try {
      await writeFile(
        path.join(repositoryRoot, 'spirit.config.json'),
        '{"assets":{"fileKey":"figma-file","targets":[{"brand":"Spirit","out":"svg","assets":["icons"]}]}}',
      );

      await runSyncCli(['sync', '--repository-root', repositoryRoot, '--publish-notes-path', notesPath], {
        log: jest.fn(),
        resolveNotes: async ({ fileKey }) => {
          expect(fileKey).toBe('figma-file');

          return notes;
        },
        sync: async () => ({ targets: [] }),
        token: 'token',
        writeFile: async (_path, contents) => {
          writtenNotes = contents;
        },
      });

      expect(writtenNotes).toBe(notes);
    } finally {
      await rm(repositoryRoot, { recursive: true, force: true });
    }
  });

  it('uses the default publish-notes resolver', async () => {
    const repositoryRoot = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-sync-notes-default-'));
    const notesPath = path.join(repositoryRoot, 'notes.md');
    process.env.DISPATCH_DESCRIPTION = 'Published from Figma';
    delete process.env.FIGMA_ACCESS_TOKEN;

    try {
      await writeFile(
        path.join(repositoryRoot, 'spirit.config.json'),
        '{"assets":{"fileKey":"figma-file","targets":[{"brand":"Spirit","out":"svg","assets":["icons"]}]}}',
      );

      await runSyncCli(['sync', '--repository-root', repositoryRoot, '--publish-notes-path', notesPath], {
        log: jest.fn(),
        sync: async () => ({ targets: [] }),
      });

      await expect(readFile(notesPath, 'utf8')).resolves.toBe('Published from Figma');
    } finally {
      await rm(repositoryRoot, { recursive: true, force: true });
    }
  });

  it('delivers a target using string-preserved matrix values', async () => {
    const received: unknown[] = [];

    await runSyncCli(DELIVER_ARGV, {
      deliver: async (options) => {
        received.push(options);

        return { changed: true, pullRequestNumber: 17 };
      },
      githubToken: 'github-token',
      log: jest.fn(),
    });

    expect(received).toEqual([
      expect.objectContaining({
        out: '123',
        repo: '123',
        token: 'github-token',
      }),
    ]);
  });

  it('requires every delivery option', async () => {
    await expect(runSyncCli(['deliver'], { log: jest.fn() })).rejects.toThrow('--app-slug is required.');
  });

  it('reads a GitHub token from the environment and reports no changes', async () => {
    process.env.GH_TOKEN = 'environment-token';
    const tokens: string[] = [];
    const messages: string[] = [];

    await runSyncCli(DELIVER_ARGV, {
      deliver: async ({ token }) => {
        tokens.push(token);

        return { changed: false };
      },
      log: (message) => messages.push(message),
    });

    delete process.env.GH_TOKEN;
    await runSyncCli(DELIVER_ARGV, {
      deliver: async ({ token }) => {
        tokens.push(token);

        return { changed: false };
      },
      log: jest.fn(),
    });

    expect(tokens).toEqual(['environment-token', '']);
    expect(messages).toEqual(['No asset changes to deliver.']);
  });
});
