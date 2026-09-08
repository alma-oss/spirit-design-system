import { execFile } from 'node:child_process';
import { access, mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

import { App } from 'octokit';

import { ROOT_CONFIG_FILE } from './constants';
import { ConfigError } from './errors';
import { toTargetSlug } from './paths';
import type { AssetsConfig, AssetType } from './types';

const execFileAsync = promisify(execFile);

export interface DiscoverTarget {
  brand: string;
  fileKey: string;
  out: string;
  owner: string;
  repo: string;
  slug: string;
}

export interface DiscoverMatrix {
  include: DiscoverTarget[];
}

export interface ListedRepository {
  archived: boolean;
  disabled: boolean;
  name: string;
  owner: string;
  token: string;
}

export interface GitHubAppLike {
  eachRepository: {
    iterator: () => AsyncIterable<{
      octokit: { auth: () => Promise<unknown> };
      repository: {
        archived?: boolean;
        disabled?: boolean;
        name: string;
        owner: { login: string };
      };
    }>;
  };
}

export interface DiscoverSyncTargetsOptions {
  appId?: string;
  checkoutRepository?: (repository: ListedRepository, directory: string) => Promise<void>;
  createApp?: (appId: string, privateKey: string) => GitHubAppLike;
  fileKey?: string;
  listRepositories?: () => AsyncIterable<ListedRepository>;
  log?: (message: string) => void;
  privateKey?: string;
}

export const createGitHubApp = (appId: string, privateKey: string, AppConstructor: typeof App = App): GitHubAppLike =>
  new AppConstructor({ appId, privateKey });

export const listAppRepositories = async function* (app: GitHubAppLike): AsyncIterable<ListedRepository> {
  for await (const { octokit, repository } of app.eachRepository.iterator()) {
    const authentication = await octokit.auth();
    const token =
      typeof authentication === 'object' && authentication && 'token' in authentication
        ? String(authentication.token)
        : '';

    yield {
      archived: Boolean(repository.archived),
      disabled: Boolean(repository.disabled),
      name: repository.name,
      owner: repository.owner.login,
      token,
    };
  }
};

export const sparseCheckoutRepository = async (
  repository: ListedRepository,
  directory: string,
  exec: typeof execFileAsync = execFileAsync,
): Promise<void> => {
  try {
    await exec(
      'git',
      [
        'clone',
        '--depth',
        '1',
        '--filter=blob:none',
        '--sparse',
        `https://x-access-token:${repository.token}@github.com/${repository.owner}/${repository.name}.git`,
        directory,
      ],
      { env: { ...process.env, GIT_TERMINAL_PROMPT: '0' }, timeout: 15_000 },
    );
    await exec('git', ['sparse-checkout', 'set', '--cone', ROOT_CONFIG_FILE], { cwd: directory });
  } catch {
    throw new Error(`Unable to checkout ${repository.owner}/${repository.name}.`);
  }
};

const isOptInConfig = (value: unknown): value is AssetsConfig => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<AssetsConfig>;

  return typeof candidate.fileKey === 'string' && Array.isArray(candidate.targets);
};

export const discoverSyncTargets = async ({
  appId,
  checkoutRepository = sparseCheckoutRepository,
  createApp = createGitHubApp,
  fileKey,
  listRepositories,
  log = () => undefined,
  privateKey,
}: DiscoverSyncTargetsOptions = {}): Promise<DiscoverMatrix> => {
  const repositories =
    listRepositories ??
    (() => {
      if (!appId?.trim() || !privateKey?.trim()) {
        throw new ConfigError('GH_APP_CLIENT_ID and GH_APP_PRIVATE_KEY are required.');
      }

      return listAppRepositories(createApp(appId, privateKey));
    });

  const include: DiscoverTarget[] = [];

  for await (const repository of repositories()) {
    if (repository.archived || repository.disabled) {
      log(`Skipping ${repository.owner}/${repository.name}: repository is archived or disabled.`);
      continue;
    }

    if (!repository.token) {
      log(`Skipping ${repository.owner}/${repository.name}: installation token was not available.`);
      continue;
    }

    const directory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-discover-'));

    try {
      await checkoutRepository(repository, directory);
      const configPath = path.join(directory, ROOT_CONFIG_FILE);

      try {
        await access(configPath);
      } catch {
        log(`Skipping ${repository.owner}/${repository.name}: no ${ROOT_CONFIG_FILE}.`);
        continue;
      }

      let parsedConfig: unknown;

      try {
        parsedConfig = JSON.parse(await readFile(configPath, 'utf8')) as unknown;
      } catch (error) {
        log(`Skipping ${repository.owner}/${repository.name}: unable to read ${ROOT_CONFIG_FILE}: ${String(error)}`);
        continue;
      }

      if (!isOptInConfig(parsedConfig)) {
        log(`Skipping ${repository.owner}/${repository.name}: ${ROOT_CONFIG_FILE} is invalid.`);
        continue;
      }

      const trimmedFileKey = parsedConfig.fileKey.trim();

      if (fileKey && trimmedFileKey !== fileKey) {
        log(`Skipping ${repository.owner}/${repository.name}: fileKey does not match the published Figma file.`);
        continue;
      }

      parsedConfig.targets.forEach((target, index) => {
        if (!target || typeof target !== 'object') {
          log(`Skipping ${repository.owner}/${repository.name} target ${index}: target is invalid.`);

          return;
        }

        const brand = typeof target.brand === 'string' ? target.brand.trim() : '';
        const out = typeof target.out === 'string' ? target.out.trim() : '';
        const assets = Array.isArray(target.assets) ? (target.assets as AssetType[]) : [];

        if (!brand || !out || assets.length === 0) {
          log(`Skipping ${repository.owner}/${repository.name} target ${index}: target is incomplete.`);

          return;
        }

        include.push({
          brand,
          fileKey: trimmedFileKey,
          out,
          owner: repository.owner,
          repo: repository.name,
          slug: toTargetSlug(`${repository.name}-${out}`),
        });
      });
    } catch (error) {
      log(`Skipping ${repository.owner}/${repository.name}: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }

  return { include };
};
