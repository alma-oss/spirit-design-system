import { mkdir, mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import {
  assertContainedInRoot,
  assertNoSymlinkComponents,
  assertRelativeOutputPath,
  isContainedInRoot,
  toTargetSlug,
} from '..';

describe('path helpers', () => {
  it('treats nested paths as contained and escaped paths as outside', () => {
    expect(isContainedInRoot('/repo/packages/icons/src/svg', '/repo')).toBe(true);
    expect(isContainedInRoot('/repo', '/repo')).toBe(true);
    expect(isContainedInRoot('/other/svg', '/repo')).toBe(false);
    expect(() => assertContainedInRoot('/other/svg', '/repo', 'Output')).toThrow(/outside the repository/);
  });

  it('rejects absolute and parent-directory output paths', () => {
    expect(() => assertRelativeOutputPath('/tmp/svg')).toThrow(/relative path/);
    expect(() => assertRelativeOutputPath('C:\\Windows\\Temp')).toThrow(/relative path/);
    expect(() => assertRelativeOutputPath('../escape')).toThrow(/\.\./);
    expect(() => assertRelativeOutputPath('packages/icons/src/svg')).not.toThrow();
  });

  it('builds a stable slug from an output path', () => {
    expect(toTargetSlug('packages/icons/src/svg')).toBe('packages-icons-src-svg');
    expect(toTargetSlug('???')).toBe('assets');
  });

  it('ignores missing nested output directories when checking for symlinks', async () => {
    const repositoryRoot = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-paths-'));

    try {
      await mkdir(path.join(repositoryRoot, 'packages'));

      await expect(assertNoSymlinkComponents(repositoryRoot, repositoryRoot)).resolves.toBeUndefined();
      await expect(
        assertNoSymlinkComponents(repositoryRoot, path.join(repositoryRoot, 'packages/icons/src/svg')),
      ).resolves.toBeUndefined();
    } finally {
      await rm(repositoryRoot, { recursive: true, force: true });
    }
  });
});
