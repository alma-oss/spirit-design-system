import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { deleteStaleOwnedPaths, removeStagingDump, resolveOwnedPath, writeOwnedPaths } from '../ownedPaths';

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
