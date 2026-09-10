import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { deleteStaleOwnedPaths, removeStagingDump, writeOwnedPaths } from '../ownedPaths';

describe('deleteStaleOwnedPaths', () => {
  it('deletes previously owned files that are no longer extracted and leaves unowned files', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'owned-paths-'));

    await fs.mkdir(path.join(root, 'components', 'file-uploader'), { recursive: true });
    await fs.writeFile(path.join(root, 'components', 'file-uploader', 'overview.md'), 'owned-old', 'utf8');
    await fs.writeFile(path.join(root, 'hand-authored.md'), 'keep-me', 'utf8');

    const deleted = await deleteStaleOwnedPaths(
      root,
      ['components/file-uploader/overview.md'],
      new Set(['components/file-upload/overview.md']),
    );

    expect(deleted).toEqual(['components/file-uploader/overview.md']);
    await expect(fs.readFile(path.join(root, 'hand-authored.md'), 'utf8')).resolves.toBe('keep-me');
    await expect(fs.access(path.join(root, 'components', 'file-uploader', 'overview.md'))).rejects.toThrow();

    await writeOwnedPaths(path.join(root, 'owned-paths.json'), ['components/file-upload/overview.md']);
    const sidecar = JSON.parse(await fs.readFile(path.join(root, 'owned-paths.json'), 'utf8')) as { paths: string[] };

    expect(sidecar.paths).toEqual(['components/file-upload/overview.md']);
  });
});

describe('removeStagingDump', () => {
  it('deletes leftover content/supernova trees', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'staging-dump-'));

    await fs.mkdir(path.join(root, 'supernova', 'components'), { recursive: true });
    await fs.writeFile(path.join(root, 'supernova', 'components', 'button.md'), 'old', 'utf8');

    await removeStagingDump(root);

    await expect(fs.access(path.join(root, 'supernova'))).rejects.toThrow();
  });
});
