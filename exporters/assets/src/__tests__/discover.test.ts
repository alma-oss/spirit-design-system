import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import {
  createGitHubApp,
  discoverSyncTargets,
  listAppRepositories,
  ROOT_CONFIG_FILE,
  sparseCheckoutRepository,
} from '..';
import type { GitHubAppLike, ListedRepository } from '../providers/github';

const createRepository = (overrides: Partial<ListedRepository> = {}): ListedRepository => ({
  archived: false,
  disabled: false,
  name: 'spirit-design-system',
  owner: 'alma-oss',
  token: 'token',
  ...overrides,
});

describe('discoverSyncTargets', () => {
  it('emits one matrix entry per opted-in target', async () => {
    const messages: string[] = [];

    const result = await discoverSyncTargets({
      checkoutRepository: async (_repository, directory) => {
        await writeFile(
          path.join(directory, ROOT_CONFIG_FILE),
          JSON.stringify({
            assets: {
              fileKey: 'figma-file',
              targets: [
                { brand: 'Spirit', out: 'packages/icons/src/svg', assets: ['icons'] },
                { brand: 'Jobs', out: 'libs/design-icons/jobs.cz/svg', assets: ['icons', 'benefit-icons'] },
              ],
            },
          }),
        );
      },
      listRepositories: async function* listRepositories() {
        yield createRepository();
      },
      log: (message) => messages.push(message),
    });

    expect(result.include).toEqual([
      {
        branch: 'chore/figma-icons-sync-spirit-design-system-packages-icons-src-svg',
        brand: 'Spirit',
        commitMessage: 'chore(icons): sync Spirit icons from Figma',
        fileKey: 'figma-file',
        out: 'packages/icons/src/svg',
        owner: 'alma-oss',
        repo: 'spirit-design-system',
        slug: 'spirit-design-system-packages-icons-src-svg',
        title: 'Chore(icons): Sync Spirit icons from Figma',
      },
      {
        branch: 'chore/figma-icons-sync-spirit-design-system-libs-design-icons-jobs-cz-svg',
        brand: 'Jobs',
        commitMessage: 'chore(icons): sync Jobs icons from Figma',
        fileKey: 'figma-file',
        out: 'libs/design-icons/jobs.cz/svg',
        owner: 'alma-oss',
        repo: 'spirit-design-system',
        slug: 'spirit-design-system-libs-design-icons-jobs-cz-svg',
        title: 'Chore(icons): Sync Jobs icons from Figma',
      },
    ]);
    expect(messages).toEqual([]);
  });

  it('skips archived, disabled, unauthenticated, unmatched, and invalid repositories', async () => {
    const messages: string[] = [];
    const checkedOut: string[] = [];

    const result = await discoverSyncTargets({
      checkoutRepository: async (repository, directory) => {
        checkedOut.push(repository.name);

        if (repository.name === 'missing') {
          return;
        }

        if (repository.name === 'invalid-json') {
          await writeFile(path.join(directory, ROOT_CONFIG_FILE), '{');

          return;
        }

        if (repository.name === 'invalid-shape') {
          await writeFile(path.join(directory, ROOT_CONFIG_FILE), '[]');

          return;
        }

        if (repository.name === 'invalid-primitive') {
          await writeFile(path.join(directory, ROOT_CONFIG_FILE), '"not-an-object"');

          return;
        }

        if (repository.name === 'tokens-only') {
          await writeFile(path.join(directory, ROOT_CONFIG_FILE), '{"tokens":{"out":"src/scss"}}');

          return;
        }

        if (repository.name === 'other-file') {
          await writeFile(
            path.join(directory, ROOT_CONFIG_FILE),
            '{"assets":{"fileKey":"other","targets":[{"brand":"Jobs","out":"svg","assets":["icons"]}]}}',
          );

          return;
        }

        if (repository.name === 'incomplete') {
          await writeFile(
            path.join(directory, ROOT_CONFIG_FILE),
            JSON.stringify({
              assets: {
                fileKey: 'figma-file',
                targets: [
                  null,
                  1,
                  { brand: 1, out: 2, assets: 'icons' },
                  { brand: ' ', out: 'svg', assets: ['icons'] },
                  { brand: 'Jobs', out: 'svg', assets: [] },
                ],
              },
            }),
          );

          return;
        }

        if (repository.name === 'string-error') {
          // eslint-disable-next-line no-throw-literal -- cover non-Error skip logging
          throw 'boom';
        }

        throw new Error('clone failed');
      },
      fileKey: 'figma-file',
      listRepositories: async function* listRepositories() {
        yield createRepository({ name: 'archived', archived: true });
        yield createRepository({ name: 'disabled', disabled: true });
        yield createRepository({ name: 'no-token', token: '' });
        yield createRepository({ name: 'missing' });
        yield createRepository({ name: 'invalid-json' });
        yield createRepository({ name: 'invalid-shape' });
        yield createRepository({ name: 'invalid-primitive' });
        yield createRepository({ name: 'tokens-only' });
        yield createRepository({ name: 'other-file' });
        yield createRepository({ name: 'incomplete' });
        yield createRepository({ name: 'broken' });
        yield createRepository({ name: 'string-error' });
      },
      log: (message) => messages.push(message),
    });

    expect(result.include).toEqual([]);
    expect(checkedOut).toEqual([
      'missing',
      'invalid-json',
      'invalid-shape',
      'invalid-primitive',
      'tokens-only',
      'other-file',
      'incomplete',
      'broken',
      'string-error',
    ]);
    expect(messages.join('\n')).toContain('archived or disabled');
    expect(messages.join('\n')).toContain('installation token was not available');
    expect(messages.join('\n')).toContain(`no ${ROOT_CONFIG_FILE}`);
    expect(messages.join('\n')).toContain('unable to read');
    expect(messages.join('\n')).toContain('must contain a JSON object');
    expect(messages.join('\n')).toContain('must be an object');
    expect(messages.join('\n')).toContain('no assets configuration');
    expect(messages.join('\n')).toContain('fileKey does not match');
    expect(messages.join('\n')).toContain('clone failed');
    expect(messages.join('\n')).toContain('boom');
  });

  it('requires GitHub App credentials when listing repositories by default', async () => {
    await expect(discoverSyncTargets()).rejects.toThrow(/GH_APP_CLIENT_ID and GH_APP_PRIVATE_KEY are required/);
    await expect(discoverSyncTargets({ appId: ' ', privateKey: 'key' })).rejects.toThrow(
      /GH_APP_CLIENT_ID and GH_APP_PRIVATE_KEY are required/,
    );
  });

  it('lists repositories from a GitHub App and checks them out', async () => {
    const app: GitHubAppLike = {
      eachRepository: {
        iterator: async function* iterator() {
          yield {
            octokit: {
              auth: async () => ({ token: 'installation-token' }),
            },
            repository: {
              archived: false,
              name: 'icons-consumer',
              owner: { login: 'almacareer' },
            },
          };
          yield {
            octokit: {
              auth: async () => ({}),
            },
            repository: {
              disabled: true,
              name: 'disabled-repo',
              owner: { login: 'almacareer' },
            },
          };
          yield {
            octokit: {
              auth: async () => 'token',
            },
            repository: {
              name: 'string-auth',
              owner: { login: 'almacareer' },
            },
          };
        },
      },
    };
    const repositories: ListedRepository[] = [];

    for await (const repository of listAppRepositories(app)) {
      repositories.push(repository);
    }

    expect(repositories).toEqual([
      {
        archived: false,
        disabled: false,
        name: 'icons-consumer',
        owner: 'almacareer',
        token: 'installation-token',
      },
      {
        archived: false,
        disabled: true,
        name: 'disabled-repo',
        owner: 'almacareer',
        token: '',
      },
      {
        archived: false,
        disabled: false,
        name: 'string-auth',
        owner: 'almacareer',
        token: '',
      },
    ]);

    const result = await discoverSyncTargets({
      appId: 'client-id',
      checkoutRepository: async (_repository, directory) => {
        await writeFile(
          path.join(directory, ROOT_CONFIG_FILE),
          '{"assets":{"fileKey":"figma-file","targets":[{"brand":"Jobs","out":"svg","assets":["icons"]}]}}',
        );
      },
      createApp: (appId, privateKey) => {
        expect(appId).toBe('client-id');
        expect(privateKey).toBe('private-key');

        return app;
      },
      privateKey: 'private-key',
    });

    expect(result.include).toHaveLength(1);
    expect(result.include[0].repo).toBe('icons-consumer');
  });

  it('resolves assets-level templates and per-target overrides', async () => {
    const result = await discoverSyncTargets({
      checkoutRepository: async (_repository, directory) => {
        await writeFile(
          path.join(directory, ROOT_CONFIG_FILE),
          JSON.stringify({
            assets: {
              fileKey: 'figma-file',
              branch: 'chore/figma-icons-sync-{slug}',
              commitMessage: 'chore(icons): sync {brand} icons from Figma',
              pullRequestTitle: 'Chore(icons): Sync {brand} icons from Figma',
              targets: [
                {
                  brand: 'Práce',
                  out: 'libs/design-icons/prace.cz/svg',
                  assets: ['icons'],
                },
                {
                  brand: 'Jobs',
                  out: 'libs/design-icons/jobs.cz/svg',
                  assets: ['icons'],
                  commitMessage: 'chore(jobs-icons): sync icons from Figma',
                },
              ],
            },
          }),
        );
      },
      listRepositories: async function* listRepositories() {
        yield createRepository({ name: 'platform-frontends', owner: 'almacareer' });
      },
    });

    expect(result.include).toEqual([
      {
        branch: 'chore/figma-icons-sync-platform-frontends-libs-design-icons-prace-cz-svg',
        brand: 'Práce',
        commitMessage: 'chore(icons): sync Práce icons from Figma',
        fileKey: 'figma-file',
        out: 'libs/design-icons/prace.cz/svg',
        owner: 'almacareer',
        repo: 'platform-frontends',
        slug: 'platform-frontends-libs-design-icons-prace-cz-svg',
        title: 'Chore(icons): Sync Práce icons from Figma',
      },
      {
        branch: 'chore/figma-icons-sync-platform-frontends-libs-design-icons-jobs-cz-svg',
        brand: 'Jobs',
        commitMessage: 'chore(jobs-icons): sync icons from Figma',
        fileKey: 'figma-file',
        out: 'libs/design-icons/jobs.cz/svg',
        owner: 'almacareer',
        repo: 'platform-frontends',
        slug: 'platform-frontends-libs-design-icons-jobs-cz-svg',
        title: 'Chore(icons): Sync Jobs icons from Figma',
      },
    ]);
  });

  it('slugifies interpolated brand and out values in resolved branches', async () => {
    const result = await discoverSyncTargets({
      checkoutRepository: async (_repository, directory) => {
        await writeFile(
          path.join(directory, ROOT_CONFIG_FILE),
          JSON.stringify({
            assets: {
              fileKey: 'figma-file',
              branch: 'sync/{brand}/{out}',
              targets: [{ brand: 'Práce', out: 'libs/design-icons/prace.cz/svg', assets: ['icons'] }],
            },
          }),
        );
      },
      listRepositories: async function* listRepositories() {
        yield createRepository();
      },
    });

    expect(result.include[0]?.branch).toBe('sync/Pr-ce/libs-design-icons-prace-cz-svg');
  });

  it('skips a repository when a resolved branch is not a safe git ref', async () => {
    const messages: string[] = [];

    const result = await discoverSyncTargets({
      checkoutRepository: async (_repository, directory) => {
        await writeFile(
          path.join(directory, ROOT_CONFIG_FILE),
          JSON.stringify({
            assets: {
              fileKey: 'figma-file',
              branch: '../{slug}',
              targets: [{ brand: 'Spirit', out: 'svg', assets: ['icons'] }],
            },
          }),
        );
      },
      listRepositories: async function* listRepositories() {
        yield createRepository();
      },
      log: (message) => messages.push(message),
    });

    expect(result.include).toEqual([]);
    expect(messages.join('\n')).toContain('not a safe git ref');
  });

  it('skips a repository when resolved branches are not unique', async () => {
    const messages: string[] = [];

    const result = await discoverSyncTargets({
      checkoutRepository: async (_repository, directory) => {
        await writeFile(
          path.join(directory, ROOT_CONFIG_FILE),
          JSON.stringify({
            assets: {
              fileKey: 'figma-file',
              branch: 'chore/figma-icons-sync',
              targets: [
                { brand: 'Spirit', out: 'packages/icons/src/svg', assets: ['icons'] },
                { brand: 'Jobs', out: 'libs/design-icons/jobs.cz/svg', assets: ['icons'] },
              ],
            },
          }),
        );
      },
      listRepositories: async function* listRepositories() {
        yield createRepository();
      },
      log: (message) => messages.push(message),
    });

    expect(result.include).toEqual([]);
    expect(messages.join('\n')).toContain('resolved git branches are not unique');
  });

  it('uses an empty repository list without checking out', async () => {
    await expect(
      discoverSyncTargets({
        listRepositories: async function* listRepositories() {
          yield* [];
        },
      }),
    ).resolves.toEqual({ include: [] });
  });

  it('creates a GitHub App with the provided constructor', () => {
    const AppMock = jest.fn().mockImplementation(() => ({
      eachRepository: {
        iterator: async function* iterator() {
          yield* [];
        },
      },
    }));

    createGitHubApp('id', 'key', AppMock as never);

    expect(AppMock).toHaveBeenCalledWith({ appId: 'id', privateKey: 'key' });

    try {
      createGitHubApp('id', '-----BEGIN PRIVATE KEY-----\n-----END PRIVATE KEY-----');
    } catch {
      // Invalid keys are still enough to cover the default App constructor.
    }
  });

  it('clones a repository with a sparse checkout of the opt-in config', async () => {
    const commands: { command: string; args: string[]; cwd?: string }[] = [];
    const exec = (async (command: string, args: string[], options?: { cwd?: string }) => {
      commands.push({ args, command, cwd: options?.cwd });

      return { stderr: '', stdout: '' };
    }) as unknown as Parameters<typeof sparseCheckoutRepository>[2];

    await sparseCheckoutRepository(createRepository(), '/tmp/checkout', exec);

    expect(commands[0]?.args).toContain('--sparse');
    expect(commands[0]?.args.at(-2)).toContain('x-access-token:token@github.com/alma-oss/spirit-design-system.git');
    expect(commands[1]?.args).toEqual(['sparse-checkout', 'set', '--cone', ROOT_CONFIG_FILE]);
    expect(commands[1]?.cwd).toBe('/tmp/checkout');
  });

  it('hides git clone failures behind a generic checkout error', async () => {
    const exec = (async () => {
      throw new Error('fatal: Authentication failed for https://x-access-token:token@github.com/org/repo.git');
    }) as unknown as Parameters<typeof sparseCheckoutRepository>[2];

    await expect(sparseCheckoutRepository(createRepository(), '/tmp/checkout', exec)).rejects.toThrow(
      'Unable to checkout alma-oss/spirit-design-system.',
    );
  });

  it('uses git when no executor is provided', async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-git-'));

    try {
      await expect(
        sparseCheckoutRepository(
          createRepository({
            name: 'this-repo-does-not-exist',
            owner: 'this-org-does-not-exist-spirit-assets',
            token: 'invalid',
          }),
          directory,
        ),
      ).rejects.toThrow('Unable to checkout this-org-does-not-exist-spirit-assets/this-repo-does-not-exist.');
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
