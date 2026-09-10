import { lstat, mkdir, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { confineConfig, loadConfig, resolveConfig } from '..';
import { expectedRepositoryConfigPath } from '../repository';

describe('repository-owned assets config', () => {
  it('loads JSON from the repository root and resolves nested output paths', async () => {
    const repositoryRoot = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-root-'));

    try {
      await writeFile(
        path.join(repositoryRoot, 'spirit.config.json'),
        '{"fileKey":"figma-file","targets":[{"brand":"Spirit","out":"packages/icons/src/svg","assets":["icons"]}]}',
      );

      const config = await loadConfig(undefined, { repositoryRoot });

      expect(config.fileKey).toBe('figma-file');
      expect(config.repositoryRoot).toBe(path.resolve(repositoryRoot));
      expect(config.targets[0].out).toBe(path.join(repositoryRoot, 'packages/icons/src/svg'));
    } finally {
      await rm(repositoryRoot, { recursive: true, force: true });
    }
  });

  it('rejects a config path that is not the repository root file', async () => {
    const repositoryRoot = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-wrong-path-'));

    try {
      await expect(loadConfig(path.join(repositoryRoot, 'nested.json'), { repositoryRoot })).rejects.toThrow(/must be/);
    } finally {
      await rm(repositoryRoot, { recursive: true, force: true });
    }
  });

  it('rejects missing, invalid, and symlink configs', async () => {
    const repositoryRoot = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-invalid-root-'));

    try {
      await expect(loadConfig(undefined, { repositoryRoot })).rejects.toThrow(/Unable to read assets config/);

      const configPath = path.join(repositoryRoot, 'spirit.config.json');
      await writeFile(configPath, '{');

      await expect(loadConfig(configPath, { repositoryRoot })).rejects.toThrow(/Unable to read assets config/);

      await rm(configPath);
      await writeFile(path.join(repositoryRoot, 'real-config.json'), '{}');
      await symlink(path.join(repositoryRoot, 'real-config.json'), configPath);

      await expect(loadConfig(configPath, { repositoryRoot })).rejects.toThrow(/must not be a symlink/);
    } finally {
      await rm(repositoryRoot, { recursive: true, force: true });
    }
  });

  it('rejects output paths whose existing components are symlinks', async () => {
    const repositoryRoot = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-symlink-out-'));

    try {
      const outside = path.join(repositoryRoot, 'outside');
      const linked = path.join(repositoryRoot, 'packages');
      await mkdir(outside);
      await symlink(outside, linked);
      await writeFile(
        path.join(repositoryRoot, 'spirit.config.json'),
        '{"fileKey":"figma-file","targets":[{"brand":"Spirit","out":"packages/icons/src/svg","assets":["icons"]}]}',
      );

      await expect(loadConfig(undefined, { repositoryRoot })).rejects.toThrow(/symlink/);
    } finally {
      await rm(repositoryRoot, { recursive: true, force: true });
    }
  });

  it('rejects configs that resolve outside the repository root', () => {
    expect(() =>
      confineConfig(
        resolveConfig(
          { fileKey: 'file', targets: [{ brand: 'Spirit', out: 'src/svg', assets: ['icons'] }] },
          '/other/spirit.config.json',
        ),
        '/repo',
      ),
    ).toThrow(/outside the repository/);
  });

  it('requires a configuration path before confining outputs', () => {
    expect(() =>
      confineConfig({ fileKey: 'file', targets: [{ brand: 'Spirit', out: '/repo/svg', assets: ['icons'] }] }, '/repo'),
    ).toThrow(/without a configuration path/);
  });

  it('reports the expected repository config path', () => {
    expect(expectedRepositoryConfigPath('/repo')).toBe(path.join(path.resolve('/repo'), 'spirit.config.json'));
  });

  it('does not treat ordinary files as symlinks', async () => {
    const repositoryRoot = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-lstat-'));
    const configPath = path.join(repositoryRoot, 'spirit.config.json');

    try {
      await writeFile(
        configPath,
        '{"fileKey":"figma-file","targets":[{"brand":"Spirit","out":"src/svg","assets":["icons"]}]}',
      );

      expect((await lstat(configPath)).isSymbolicLink()).toBe(false);

      const config = await loadConfig(configPath, { repositoryRoot });

      expect(config.targets[0].out).toBe(path.join(repositoryRoot, 'src/svg'));
    } finally {
      await rm(repositoryRoot, { recursive: true, force: true });
    }
  });
});
