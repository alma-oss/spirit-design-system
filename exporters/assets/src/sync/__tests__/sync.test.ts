import { chmod, mkdir, mkdtemp, readFile, readdir, rm, symlink, unlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { createFigmaFetch } from '../../__fixtures__/figma';
import { syncAssets } from '../sync';

describe('syncAssets', () => {
  it('adds, updates, and deletes SVG files', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-'));
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

      expect(result.targets[0].changes.map(({ file, type }) => [path.basename(file), type])).toEqual([
        ['add-item.svg', 'updated'],
        ['benefit-health.svg', 'added'],
        ['logo-colored.svg', 'added'],
        ['removed.svg', 'deleted'],
      ]);
      expect(await readdir(outputDirectory)).toEqual([
        'README.txt',
        'add-item.svg',
        'benefit-health.svg',
        'logo-colored.svg',
        'nested',
      ]);
      expect(await readFile(path.join(outputDirectory, 'logo-colored.svg'), 'utf8')).toBe(
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

      expect(repeatedResult.targets[0].changes).toEqual([]);
    } finally {
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });

  it('writes inside a repository root after rechecking containment', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-contained-'));
    const outputDirectory = path.join(temporaryDirectory, 'svg');

    try {
      const result = await syncAssets({
        config: {
          fileKey: 'figma-file',
          repositoryRoot: temporaryDirectory,
          targets: [{ brand: 'Spirit', out: outputDirectory, assets: ['icons'] }],
        },
        token: 'test-token',
        exportAssets: async () => [{ name: 'contained', svg: '<svg />\n' }],
      });

      expect(result.targets[0].exported).toBe(1);
      expect(await readFile(path.join(outputDirectory, 'contained.svg'), 'utf8')).toBe('<svg />\n');
    } finally {
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });

  it('uses an injected asset exporter', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-export-'));
    const outputDirectory = path.join(temporaryDirectory, 'svg');

    try {
      const result = await syncAssets({
        config: {
          fileKey: 'figma-file',
          targets: [{ brand: 'Spirit', out: outputDirectory, assets: ['icons'] }],
        },
        token: 'test-token',
        exportAssets: async () => [{ name: 'custom', svg: '<svg />\n' }],
      });

      expect(result.targets[0].exported).toBe(1);
      expect(await readFile(path.join(outputDirectory, 'custom.svg'), 'utf8')).toBe('<svg />\n');
    } finally {
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });

  it('requires a token', async () => {
    await expect(
      syncAssets({
        config: {
          fileKey: 'figma-file',
          targets: [{ brand: 'Spirit', out: '/unused', assets: ['icons'] }],
        },
        token: ' ',
        fetch: createFigmaFetch(),
      }),
    ).rejects.toThrow(/FIGMA_ACCESS_TOKEN is required/);
  });

  it('propagates unexpected filesystem errors', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-permissions-'));
    const outputDirectory = path.join(temporaryDirectory, 'svg');
    const protectedFile = path.join(outputDirectory, 'add-item.svg');

    try {
      await mkdir(outputDirectory);
      await writeFile(protectedFile, '<svg />\n');
      await chmod(protectedFile, 0o000);

      await expect(
        syncAssets({
          config: {
            fileKey: 'figma-file',
            targets: [{ brand: 'Spirit', out: outputDirectory, assets: ['icons'] }],
          },
          token: 'test-token',
          fetch: createFigmaFetch(),
        }),
      ).rejects.toThrow();
    } finally {
      await chmod(protectedFile, 0o600);
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });

  it('refuses to delete files when the selected brand has no icons', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-'));
    const outputDirectory = path.join(temporaryDirectory, 'svg');

    try {
      await mkdir(outputDirectory);
      await writeFile(path.join(outputDirectory, 'existing.svg'), '<svg />\n');

      await expect(
        syncAssets({
          config: {
            fileKey: 'figma-file',
            targets: [{ brand: 'Práce', out: outputDirectory, assets: ['icons'] }],
          },
          token: 'test-token',
          fetch: createFigmaFetch(),
        }),
      ).rejects.toThrow(/Brand=Práce/);
      expect(await readdir(outputDirectory)).toEqual(['existing.svg']);
    } finally {
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });

  it('refuses to write outside the repository root', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-escape-'));

    try {
      await expect(
        syncAssets({
          config: {
            fileKey: 'figma-file',
            repositoryRoot: temporaryDirectory,
            targets: [{ brand: 'Spirit', out: path.join(os.tmpdir(), 'spirit-assets-outside'), assets: ['icons'] }],
          },
          token: 'test-token',
          fetch: createFigmaFetch(),
        }),
      ).rejects.toThrow(/outside the repository/);
    } finally {
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });

  it('refuses to follow output path symlinks', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-sync-link-'));

    try {
      const outside = path.join(temporaryDirectory, 'outside');
      const linked = path.join(temporaryDirectory, 'svg');
      await mkdir(outside);
      await symlink(outside, linked);

      await expect(
        syncAssets({
          config: {
            fileKey: 'figma-file',
            repositoryRoot: temporaryDirectory,
            targets: [{ brand: 'Spirit', out: linked, assets: ['icons'] }],
          },
          token: 'test-token',
          fetch: createFigmaFetch(),
        }),
      ).rejects.toThrow(/symlink/);
    } finally {
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });

  it.each([
    ['matching', 'icon'],
    ['orphan', 'orphan'],
  ])('refuses to follow a %s SVG file symlink', async (_scenario, symlinkName) => {
    const repositoryRoot = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-sync-file-link-'));
    const outputDirectory = path.join(repositoryRoot, 'svg');
    const victimPath = path.join(os.tmpdir(), `spirit-assets-victim-${crypto.randomUUID()}.svg`);

    try {
      await mkdir(outputDirectory);
      await writeFile(victimPath, '<svg>private</svg>\n');
      await symlink(victimPath, path.join(outputDirectory, `${symlinkName}.svg`));

      await expect(
        syncAssets({
          config: {
            fileKey: 'figma-file',
            repositoryRoot,
            targets: [{ brand: 'Spirit', out: outputDirectory, assets: ['icons'] }],
          },
          token: 'test-token',
          exportAssets: async () => [{ name: 'icon', svg: '<svg>updated</svg>\n' }],
        }),
      ).rejects.toThrow(/symlink/);
      await expect(readFile(victimPath, 'utf8')).resolves.toBe('<svg>private</svg>\n');
    } finally {
      await rm(repositoryRoot, { recursive: true, force: true });
      await unlink(victimPath).catch(() => undefined);
    }
  });
});
