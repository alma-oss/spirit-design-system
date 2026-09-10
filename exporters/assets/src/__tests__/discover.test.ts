import { createGitHubApp, discoverSyncTargets, listAppRepositories, ROOT_CONFIG_FILE } from '..';
import type { GitHubAppLike, ListedRepository } from '../providers/github';

const createRepository = (overrides: Partial<ListedRepository> = {}): ListedRepository => ({
  archived: false,
  disabled: false,
  name: 'spirit-design-system',
  owner: 'alma-oss',
  token: 'token',
  ...overrides,
});

const optedInConfig = JSON.stringify({
  assets: {
    fileKey: 'figma-file',
    targets: [
      { brand: 'Spirit', out: 'packages/icons/src/svg', assets: ['icons'] },
      { brand: 'Jobs', out: 'libs/design-icons/jobs.cz/svg', assets: ['icons', 'benefit-icons'] },
    ],
  },
});

describe('discoverSyncTargets', () => {
  it('emits one matrix entry per opted-in target', async () => {
    const messages: string[] = [];

    const result = await discoverSyncTargets({
      listRepositories: async function* listRepositories() {
        yield createRepository();
      },
      log: (message) => messages.push(message),
      readConfigFile: async () => optedInConfig,
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
    const read: string[] = [];

    const result = await discoverSyncTargets({
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
      readConfigFile: async (repository) => {
        read.push(repository.name);

        if (repository.name === 'missing') {
          return null;
        }

        if (repository.name === 'invalid-json') {
          return '{';
        }

        if (repository.name === 'invalid-shape') {
          return '[]';
        }

        if (repository.name === 'invalid-primitive') {
          return '"not-an-object"';
        }

        if (repository.name === 'tokens-only') {
          return '{"tokens":{"out":"src/scss"}}';
        }

        if (repository.name === 'other-file') {
          return '{"assets":{"fileKey":"other","targets":[{"brand":"Jobs","out":"svg","assets":["icons"]}]}}';
        }

        if (repository.name === 'incomplete') {
          return JSON.stringify({
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
          });
        }

        if (repository.name === 'string-error') {
          // eslint-disable-next-line no-throw-literal -- cover non-Error skip logging
          throw 'boom';
        }

        throw new Error('Unable to read spirit.config.json from alma-oss/broken (500).');
      },
    });

    expect(result.include).toEqual([]);
    expect(read).toEqual([
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
    expect(messages.join('\n')).toContain('Unable to read spirit.config.json from alma-oss/broken (500).');
    expect(messages.join('\n')).toContain('boom');
  });

  it('requires GitHub App credentials when listing repositories by default', async () => {
    await expect(discoverSyncTargets()).rejects.toThrow(/GH_APP_CLIENT_ID and GH_APP_PRIVATE_KEY are required/);
    await expect(discoverSyncTargets({ appId: ' ', privateKey: 'key' })).rejects.toThrow(
      /GH_APP_CLIENT_ID and GH_APP_PRIVATE_KEY are required/,
    );
  });

  it('lists repositories from a GitHub App and reads their configs', async () => {
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
      createApp: (appId, privateKey) => {
        expect(appId).toBe('client-id');
        expect(privateKey).toBe('private-key');

        return app;
      },
      privateKey: 'private-key',
      readConfigFile: async () =>
        '{"assets":{"fileKey":"figma-file","targets":[{"brand":"Jobs","out":"svg","assets":["icons"]}]}}',
    });

    expect(result.include).toHaveLength(1);
    expect(result.include[0].repo).toBe('icons-consumer');
  });

  it('resolves assets-level templates and per-target overrides', async () => {
    const result = await discoverSyncTargets({
      listRepositories: async function* listRepositories() {
        yield createRepository({ name: 'platform-frontends', owner: 'almacareer' });
      },
      readConfigFile: async () =>
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
      listRepositories: async function* listRepositories() {
        yield createRepository();
      },
      readConfigFile: async () =>
        JSON.stringify({
          assets: {
            fileKey: 'figma-file',
            branch: 'sync/{brand}/{out}',
            targets: [{ brand: 'Práce', out: 'libs/design-icons/prace.cz/svg', assets: ['icons'] }],
          },
        }),
    });

    expect(result.include[0]?.branch).toBe('sync/Pr-ce/libs-design-icons-prace-cz-svg');
  });

  it('skips a repository when a resolved branch is not a safe git ref', async () => {
    const messages: string[] = [];

    const result = await discoverSyncTargets({
      listRepositories: async function* listRepositories() {
        yield createRepository();
      },
      log: (message) => messages.push(message),
      readConfigFile: async () =>
        JSON.stringify({
          assets: {
            fileKey: 'figma-file',
            branch: '../{slug}',
            targets: [{ brand: 'Spirit', out: 'svg', assets: ['icons'] }],
          },
        }),
    });

    expect(result.include).toEqual([]);
    expect(messages.join('\n')).toContain('not a safe git ref');
  });

  it('skips a repository when resolved branches are not unique', async () => {
    const messages: string[] = [];

    const result = await discoverSyncTargets({
      listRepositories: async function* listRepositories() {
        yield createRepository();
      },
      log: (message) => messages.push(message),
      readConfigFile: async () =>
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
    });

    expect(result.include).toEqual([]);
    expect(messages.join('\n')).toContain('resolved git branches are not unique');
  });

  it('uses an empty repository list without reading configs', async () => {
    await expect(
      discoverSyncTargets({
        listRepositories: async function* listRepositories() {
          yield* [];
        },
      }),
    ).resolves.toEqual({ include: [] });
  });

  it('reads multiple repositories concurrently and keeps listing order', async () => {
    let inFlight = 0;
    let maxInFlight = 0;
    const names = ['repo-a', 'repo-b', 'repo-c', 'repo-d', 'repo-e'];

    const result = await discoverSyncTargets({
      concurrency: 3,
      listRepositories: async function* listRepositories() {
        for (const name of names) {
          yield createRepository({ name });
        }
      },
      readConfigFile: async (repository) => {
        inFlight += 1;
        maxInFlight = Math.max(maxInFlight, inFlight);
        await new Promise((resolve) => {
          setTimeout(resolve, 20);
        });
        inFlight -= 1;

        return JSON.stringify({
          assets: {
            fileKey: 'figma-file',
            targets: [{ brand: repository.name, out: 'svg', assets: ['icons'] }],
          },
        });
      },
    });

    expect(maxInFlight).toBe(3);
    expect(result.include.map((target) => target.repo)).toEqual(names);
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
});
