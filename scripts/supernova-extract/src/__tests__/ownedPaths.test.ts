import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import {
  deleteStaleOwnedPaths,
  removeStagingDump,
  resolveOwnedPath,
  selectNextOwnedPaths,
  writeOwnedPaths,
} from '../ownedPaths';
import type { ManifestPageEntry } from '../types';

describe('selectNextOwnedPaths', () => {
  const page = (outFile: string, status: ManifestPageEntry['status']): ManifestPageEntry => ({
    sourceUrl: `https://spirit.supernova-docs.io/latest/${outFile}`,
    sourcePath: outFile,
    outFile,
    status,
  });

  it('keeps previously owned pages whose extraction failed', () => {
    const written = 'docs/design/index.md';
    const failedOwned = 'docs/design/visual-hierarchy.md';
    const failedNew = 'docs/design/rules-and-principles.md';
    const dropped = 'docs/design/removed.md';

    expect(
      selectNextOwnedPaths(
        [page(written, 'ok'), page(failedOwned, 'error'), page(failedNew, 'error'), page('', 'skipped')],
        [written, failedOwned, dropped],
      ),
    ).toEqual([written, failedOwned]);
  });
});

describe('deleteStaleOwnedPaths', () => {
  it('deletes previously owned files that are no longer extracted and leaves unowned files', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'owned-paths-'));

    const oldPath = 'packages/web-react/src/components/FileUpload/docs/overview.md';
    const nextPath = 'packages/web-react/src/components/FileUpload/docs/design.md';

    await fs.mkdir(path.dirname(path.join(root, oldPath)), { recursive: true });
    await fs.writeFile(path.join(root, oldPath), 'owned-old', 'utf8');
    await fs.writeFile(path.join(root, 'hand-authored.md'), 'keep-me', 'utf8');

    const deleted = await deleteStaleOwnedPaths(root, [oldPath], new Set([nextPath]));

    expect(deleted).toEqual([oldPath]);
    await expect(fs.readFile(path.join(root, 'hand-authored.md'), 'utf8')).resolves.toBe('keep-me');
    await expect(fs.access(path.join(root, oldPath))).rejects.toThrow();

    await writeOwnedPaths(path.join(root, 'owned-paths.json'), [nextPath]);
    const sidecar = JSON.parse(await fs.readFile(path.join(root, 'owned-paths.json'), 'utf8')) as { paths: string[] };

    expect(sidecar.paths).toEqual([nextPath]);
  });

  it('rejects paths outside the Canonical Page destinations', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'owned-paths-'));

    expect(() => resolveOwnedPath(root, 'docs/design/index.md')).not.toThrow();
    expect(() => resolveOwnedPath(root, 'docs/migrations/index.md')).not.toThrow();
    expect(() => resolveOwnedPath(root, '../../README.md')).toThrow('Refusing path');
    expect(() => resolveOwnedPath(root, 'docs/migrations/web/migration-v5.md')).toThrow('Refusing path');
  });
});

describe('removeStagingDump', () => {
  it('deletes leftover content/supernova trees', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'staging-dump-'));

    const stagingRoot = path.join(root, 'apps/docsite/content/supernova');

    await fs.mkdir(path.join(stagingRoot, 'components'), { recursive: true });
    await fs.writeFile(path.join(stagingRoot, 'components', 'button.md'), 'old', 'utf8');

    await removeStagingDump(root);

    await expect(fs.access(stagingRoot)).rejects.toThrow();
  });
});
