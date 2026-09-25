import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { deliverPullRequest, type GitCommand } from '../deliver';

const OLD_SHA = 'a'.repeat(40);
const NEW_SHA = 'b'.repeat(40);
const TREE_SHA = 'c'.repeat(40);
const SYNC_SHA = 'd'.repeat(40);
const BRANCH_REF = 'refs/heads/chore/figma-icons-sync';

const response = (body: unknown, status = 200) =>
  new Response(body === undefined ? undefined : JSON.stringify(body), { status });

const compareResponse = (
  commits: Array<{ message: string; name?: string; sha: string }> = [
    { message: 'chore(icons): sync icons\n', sha: SYNC_SHA },
  ],
) =>
  response({
    commits: commits.map(({ message, name = 'spirit-assets[bot]', sha }) => ({
      commit: { author: { name }, message },
      sha,
    })),
    total_commits: commits.length,
  });

const pushArgs = ['push', 'origin', `HEAD:${BRANCH_REF}`];

const createOptions = () => ({
  appSlug: 'spirit-assets',
  base: 'main',
  bodyPath: '/tmp/body.md',
  branch: 'chore/figma-icons-sync',
  commitMessage: 'chore(icons): sync icons',
  out: 'svg',
  owner: 'alma-oss',
  repo: 'private-icons',
  repositoryRoot: '/tmp/repository',
  title: 'Sync icons',
  token: 'token',
});

const createChangedExistingBranchGit = () =>
  jest.fn(async (args: string[]) => {
    if (args[0] === 'write-tree') {
      return TREE_SHA;
    }

    if (args[0] === 'ls-tree') {
      return 'svg/icon.svg\n';
    }

    if (args[0] === 'status') {
      return ' M svg/icon.svg\n';
    }

    if (args[0] === 'rev-parse') {
      return args[1] === 'FETCH_HEAD' ? OLD_SHA : NEW_SHA;
    }

    return '';
  });

describe('deliverPullRequest', () => {
  it('uses the default Git and fetch adapters', async () => {
    const repositoryRoot = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-delivery-'));
    const originalFetch = global.fetch;
    global.fetch = jest.fn(async () => response(undefined, 404)) as unknown as typeof fetch;

    try {
      execFileSync('git', ['init'], { cwd: repositoryRoot, stdio: 'ignore' });

      await expect(deliverPullRequest({ ...createOptions(), repositoryRoot })).resolves.toEqual({ changed: false });
    } finally {
      global.fetch = originalFetch;
      await rm(repositoryRoot, { recursive: true, force: true });
    }
  });

  it('propagates errors from the default Git adapter', async () => {
    const fetchImplementation = jest.fn(async () => response(undefined, 404)) as unknown as typeof fetch;

    await expect(
      deliverPullRequest(
        { ...createOptions(), repositoryRoot: '/path/that/does/not/exist' },
        { fetch: fetchImplementation },
      ),
    ).rejects.toThrow();
  });

  it('does nothing when no automation branch or synchronized changes exist', async () => {
    const fetchImplementation = jest.fn(async () => response(undefined, 404)) as unknown as typeof fetch;
    const git = jest.fn(async () => '');

    await expect(deliverPullRequest(createOptions(), { fetch: fetchImplementation, git })).resolves.toEqual({
      changed: false,
    });
    expect(git).toHaveBeenCalledTimes(1);
  });

  it('authenticates a lazy promisor fetch triggered by Git status', async () => {
    const fetchImplementation = jest.fn(async () => response(undefined, 404)) as unknown as typeof fetch;
    const git = jest.fn(async (args: string[], environment?: NodeJS.ProcessEnv) => {
      if (args[0] === 'status' && !environment?.GIT_CONFIG_VALUE_0?.startsWith('AUTHORIZATION: basic ')) {
        throw new Error(
          "fatal: could not read Username for 'https://github.com'\nfatal: could not fetch object from promisor remote",
        );
      }

      return '';
    });

    await expect(deliverPullRequest(createOptions(), { fetch: fetchImplementation, git })).resolves.toEqual({
      changed: false,
    });
    expect(git).toHaveBeenCalledWith(
      ['status', '--porcelain=v1', '--untracked-files=all', '--', 'svg'],
      expect.objectContaining({
        GIT_CONFIG_VALUE_0: expect.stringMatching(/^AUTHORIZATION: basic /),
      }),
    );
  });

  it('authenticates a lazy promisor fetch triggered by Git add on an existing branch', async () => {
    const fetchImplementation = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response({ author: { name: 'spirit-assets[bot]' } })) as unknown as typeof fetch;
    const git = jest.fn(async (args: string[], environment?: NodeJS.ProcessEnv) => {
      if (args[0] === 'add' && !environment?.GIT_CONFIG_VALUE_0?.startsWith('AUTHORIZATION: basic ')) {
        throw new Error(
          "fatal: could not read Username for 'https://github.com'\nfatal: could not fetch object from promisor remote",
        );
      }

      if (args[0] === 'write-tree') {
        return TREE_SHA;
      }

      if (args[0] === 'ls-tree') {
        return '';
      }

      return args[0] === 'rev-parse' ? OLD_SHA : '';
    });

    await expect(deliverPullRequest(createOptions(), { fetch: fetchImplementation, git })).resolves.toEqual({
      changed: false,
    });
    expect(git).toHaveBeenCalledWith(
      ['add', '--all', '--', 'svg'],
      expect.objectContaining({
        GIT_CONFIG_VALUE_0: expect.stringMatching(/^AUTHORIZATION: basic /),
      }),
    );
  });

  it.each([
    ['an untrusted commit author', { author: { name: 'untrusted-user' } }],
    ['a missing commit author', {}],
  ])('rejects an existing branch with %s and no App pull request', async (_scenario, commitPayload) => {
    const fetchImplementation = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(
        response([{ head: { sha: OLD_SHA }, number: 17, state: 'open', user: { login: 'untrusted-user' } }]),
      )
      .mockResolvedValueOnce(response(commitPayload)) as unknown as typeof fetch;
    const git = jest.fn<ReturnType<GitCommand>, Parameters<GitCommand>>();

    await expect(deliverPullRequest(createOptions(), { fetch: fetchImplementation, git })).rejects.toThrow(
      'Existing automation branch is not owned by this GitHub App.',
    );
    expect(git).not.toHaveBeenCalled();
  });

  it('creates a pull request for an existing App-authored branch without a pull request', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response({ author: { name: 'spirit-assets[bot]' } }))
      .mockResolvedValueOnce(compareResponse())
      .mockResolvedValueOnce(response({ number: 42 }));
    const fetchImplementation = fetchMock as unknown as typeof fetch;
    const git = createChangedExistingBranchGit();

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git,
        readBody: async () => 'body',
      }),
    ).resolves.toEqual({ changed: true, pullRequestNumber: 42 });
    expect(git).toHaveBeenCalledWith(['commit', `--fixup=${SYNC_SHA}`], expect.any(Object));

    const createRequest = fetchMock.mock.calls[4]?.[1] as RequestInit;

    expect(JSON.parse(String(createRequest.body))).toEqual({
      base: 'main',
      body: 'body',
      head: 'chore/figma-icons-sync',
      title: 'Sync icons',
    });
  });

  it.each([
    [
      'commit request failure',
      [response({ object: { sha: OLD_SHA } }), response([]), response(undefined, 500)],
      'Unable to inspect the automation commit (500).',
    ],
    [
      'invalid commit response',
      [response({ object: { sha: OLD_SHA } }), response([]), new Response('{', { status: 200 })],
      'GitHub returned an invalid response while inspecting the automation commit.',
    ],
  ])('rejects a %s for an existing branch without a pull request', async (_scenario, responses, expectedError) => {
    const fetchImplementation = jest.fn().mockImplementation(async () => responses.shift()) as unknown as typeof fetch;
    const git = jest.fn<ReturnType<GitCommand>, Parameters<GitCommand>>();

    await expect(deliverPullRequest(createOptions(), { fetch: fetchImplementation, git })).rejects.toThrow(
      expectedError as string,
    );
    expect(git).not.toHaveBeenCalled();
  });

  it.each([
    ['branch request failure', [response(undefined, 500)], 'Unable to inspect the automation branch (500).'],
    [
      'invalid branch response',
      [new Response('{', { status: 200 })],
      'GitHub returned an invalid response while inspecting the automation branch.',
    ],
    [
      'invalid branch revision',
      [response({ object: { sha: 'invalid' } })],
      'GitHub returned an invalid automation branch revision.',
    ],
    [
      'pull request lookup failure',
      [response({ object: { sha: OLD_SHA } }), response(undefined, 500)],
      'Unable to inspect automation pull requests (500).',
    ],
    [
      'invalid pull request response',
      [response({ object: { sha: OLD_SHA } }), response({ pulls: [] })],
      'GitHub returned an invalid automation pull request list.',
    ],
  ])('rejects a %s', async (_scenario, responses, expectedError) => {
    const fetchImplementation = jest.fn().mockImplementation(async () => responses.shift()) as unknown as typeof fetch;
    const git = jest.fn<ReturnType<GitCommand>, Parameters<GitCommand>>();

    await expect(deliverPullRequest(createOptions(), { fetch: fetchImplementation, git })).rejects.toThrow(
      expectedError as string,
    );
    expect(git).not.toHaveBeenCalled();
  });

  it('updates an owned branch atomically and preserves multiline PR body text', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(
        response([
          {
            head: { sha: OLD_SHA },
            merged_at: '2026-09-01T00:00:00Z',
            number: 11,
            state: 'closed',
            user: { login: 'spirit-assets[bot]' },
          },
          {
            head: { sha: OLD_SHA },
            number: 17,
            state: 'open',
            user: { login: 'spirit-assets[bot]' },
          },
        ]),
      )
      .mockResolvedValueOnce(
        compareResponse([
          { message: 'fixup! chore(icons): sync icons\n', sha: OLD_SHA },
          { message: 'chore(icons): sync icons\n', sha: SYNC_SHA },
        ]),
      )
      .mockResolvedValueOnce(response({ number: 17 }));
    const fetchImplementation = fetchMock as unknown as typeof fetch;
    const git = createChangedExistingBranchGit();
    const body = 'Release notes\nEOF\n::warning::still text\n';

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git,
        readBody: async () => body,
      }),
    ).resolves.toEqual({ changed: true, pullRequestNumber: 17 });
    expect(git).toHaveBeenCalledWith(['commit', `--fixup=${SYNC_SHA}`], expect.any(Object));
    expect(git).toHaveBeenCalledWith(
      pushArgs,
      expect.objectContaining({
        GIT_CONFIG_VALUE_0: expect.stringMatching(/^AUTHORIZATION: basic /),
      }),
    );
    expect(git.mock.calls.some(([args]) => args[0] === 'push' && args.some((arg) => arg.includes('--force')))).toBe(
      false,
    );
    expect(git).toHaveBeenCalledWith(
      ['switch', '--discard-changes', '--force-create', 'chore/figma-icons-sync', 'FETCH_HEAD'],
      expect.objectContaining({
        GIT_CONFIG_VALUE_0: expect.stringMatching(/^AUTHORIZATION: basic /),
      }),
    );
    expect(git).not.toHaveBeenCalledWith(['switch', '-C', 'chore/figma-icons-sync']);

    const updateRequest = fetchMock.mock.calls[3]?.[1] as RequestInit;

    expect(JSON.parse(String(updateRequest.body))).toEqual({ body, title: 'Sync icons' });
  });

  it('commits assets on top of human follow-up commits on the automation branch', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-delivery-preserve-'));
    const seedRepository = path.join(temporaryDirectory, 'seed');
    const remoteRepository = path.join(temporaryDirectory, 'remote.git');
    const runnerRepository = path.join(temporaryDirectory, 'runner');
    const branch = 'chore/figma-icons-sync';

    try {
      await mkdir(seedRepository);
      execFileSync('git', ['init', '--initial-branch=main'], { cwd: seedRepository, stdio: 'ignore' });
      execFileSync('git', ['config', 'user.name', 'Base Author'], { cwd: seedRepository });
      execFileSync('git', ['config', 'user.email', 'base@example.com'], { cwd: seedRepository });
      await mkdir(path.join(seedRepository, 'svg'));
      await writeFile(path.join(seedRepository, 'svg/icon.svg'), 'base');
      execFileSync('git', ['add', '.'], { cwd: seedRepository });
      execFileSync('git', ['commit', '-m', 'base'], { cwd: seedRepository, stdio: 'ignore' });
      execFileSync('git', ['switch', '-c', branch], { cwd: seedRepository, stdio: 'ignore' });
      execFileSync('git', ['config', 'user.name', 'spirit-assets[bot]'], { cwd: seedRepository });
      execFileSync('git', ['config', 'user.email', 'spirit-assets[bot]@users.noreply.github.com'], {
        cwd: seedRepository,
      });
      await writeFile(path.join(seedRepository, 'svg/icon.svg'), 'previous sync');
      await writeFile(path.join(seedRepository, 'svg/stale.svg'), 'stale');
      execFileSync('git', ['add', '.'], { cwd: seedRepository });
      execFileSync('git', ['commit', '-m', 'chore(icons): sync icons'], { cwd: seedRepository, stdio: 'ignore' });
      const syncSha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: seedRepository, encoding: 'utf8' }).trim();
      execFileSync('git', ['config', 'user.name', 'Reviewer'], { cwd: seedRepository });
      execFileSync('git', ['config', 'user.email', 'reviewer@example.com'], { cwd: seedRepository });
      await writeFile(path.join(seedRepository, 'e2e.snap'), 'visual fix');
      execFileSync('git', ['add', '.'], { cwd: seedRepository });
      execFileSync('git', ['commit', '-m', 'fix snapshots'], { cwd: seedRepository, stdio: 'ignore' });
      const existingSha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: seedRepository, encoding: 'utf8' }).trim();
      execFileSync('git', ['switch', 'main'], { cwd: seedRepository, stdio: 'ignore' });
      execFileSync('git', ['clone', '--bare', seedRepository, remoteRepository], { stdio: 'ignore' });
      execFileSync('git', ['config', 'uploadpack.allowReachableSHA1InWant', 'true'], { cwd: remoteRepository });
      execFileSync(
        'git',
        ['clone', '--depth=1', '--branch=main', pathToFileURL(remoteRepository).href, runnerRepository],
        { stdio: 'ignore' },
      );
      execFileSync('git', ['sparse-checkout', 'set', '--no-cone', '/svg/'], {
        cwd: runnerRepository,
        stdio: 'ignore',
      });
      await writeFile(path.join(runnerRepository, 'svg/icon.svg'), 'new from Figma');
      const bodyPath = path.join(temporaryDirectory, 'body.md');
      await writeFile(bodyPath, 'body');

      const fetchImplementation = jest
        .fn()
        .mockResolvedValueOnce(response({ object: { sha: existingSha } }))
        .mockResolvedValueOnce(
          response([
            {
              head: { sha: existingSha },
              number: 17,
              state: 'open',
              user: { login: 'spirit-assets[bot]' },
            },
          ]),
        )
        .mockResolvedValueOnce(
          compareResponse([
            { message: 'chore(icons): sync icons\n', sha: syncSha },
            { message: 'fix snapshots\n', name: 'Reviewer', sha: existingSha },
          ]),
        )
        .mockResolvedValueOnce(response({ number: 17 })) as unknown as typeof fetch;

      await expect(
        deliverPullRequest(
          {
            ...createOptions(),
            bodyPath,
            branch,
            repositoryRoot: runnerRepository,
          },
          { fetch: fetchImplementation },
        ),
      ).resolves.toEqual({ changed: true, pullRequestNumber: 17 });

      expect(
        execFileSync('git', ['--git-dir', remoteRepository, 'show', `${branch}:e2e.snap`], { encoding: 'utf8' }),
      ).toBe('visual fix');
      expect(
        execFileSync('git', ['--git-dir', remoteRepository, 'show', `${branch}:svg/icon.svg`], { encoding: 'utf8' }),
      ).toBe('new from Figma');
      expect(() =>
        execFileSync('git', ['--git-dir', remoteRepository, 'cat-file', '-e', `${branch}:svg/stale.svg`], {
          stdio: 'ignore',
        }),
      ).toThrow();
      expect(
        execFileSync('git', ['--git-dir', remoteRepository, 'log', '-1', '--format=%s', branch], {
          encoding: 'utf8',
        }).trim(),
      ).toBe('fixup! chore(icons): sync icons');
      expect(
        execFileSync('git', ['--git-dir', remoteRepository, 'log', '--format=%an', '-2', branch], {
          encoding: 'utf8',
        }).trim(),
      ).toBe('spirit-assets[bot]\nReviewer');
    } finally {
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  }, 15_000);

  it('refreshes an open pull request without a commit when assets are unchanged', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(
        response([
          {
            head: { sha: OLD_SHA },
            number: 17,
            state: 'open',
            user: { login: 'spirit-assets[bot]' },
          },
        ]),
      )
      .mockResolvedValueOnce(response({ number: 17 }));
    const fetchImplementation = fetchMock as unknown as typeof fetch;
    const git = jest.fn(async (args: string[]) => {
      if (args[0] === 'write-tree') {
        return TREE_SHA;
      }

      if (args[0] === 'ls-tree') {
        return '';
      }

      return args[0] === 'rev-parse' ? OLD_SHA : '';
    });

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git,
        readBody: async () => 'updated body',
      }),
    ).resolves.toEqual({ changed: false, pullRequestNumber: 17 });
    expect(git.mock.calls.some(([args]) => args[0] === 'push' || args[0] === 'commit')).toBe(false);
    expect(JSON.parse(String((fetchMock.mock.calls[2]?.[1] as RequestInit).body))).toEqual({
      body: 'updated body',
      title: 'Sync icons',
    });
  });

  it('reopens a closed pull request without a commit when assets are unchanged', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(
        response([
          {
            head: { sha: OLD_SHA },
            merged_at: null,
            number: 17,
            state: 'closed',
            user: { login: 'spirit-assets[bot]' },
          },
        ]),
      )
      .mockResolvedValueOnce(response({ number: 17 }));
    const fetchImplementation = fetchMock as unknown as typeof fetch;
    const git = jest.fn(async (args: string[]) => {
      if (args[0] === 'write-tree') {
        return TREE_SHA;
      }

      if (args[0] === 'ls-tree') {
        return 'svg/icon.svg\n';
      }

      return args[0] === 'rev-parse' ? OLD_SHA : '';
    });

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git,
        readBody: async () => 'updated body',
      }),
    ).resolves.toEqual({ changed: false, pullRequestNumber: 17 });
    expect(git.mock.calls.some(([args]) => args[0] === 'push' || args[0] === 'commit')).toBe(false);
    expect(JSON.parse(String((fetchMock.mock.calls[2]?.[1] as RequestInit).body))).toEqual({
      body: 'updated body',
      state: 'open',
      title: 'Sync icons',
    });
  });

  it('keeps a merged pull request unchanged when a rerun has no asset changes', async () => {
    const fetchImplementation = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(
        response([
          {
            head: { sha: OLD_SHA },
            merged_at: '2026-09-01T00:00:00Z',
            number: 17,
            state: 'closed',
            user: { login: 'spirit-assets[bot]' },
          },
        ]),
      ) as unknown as typeof fetch;
    const git = jest.fn(async (args: string[]) => {
      if (args[0] === 'write-tree') {
        return TREE_SHA;
      }

      if (args[0] === 'ls-tree') {
        return 'svg/icon.svg\n';
      }

      return args[0] === 'rev-parse' ? OLD_SHA : '';
    });

    await expect(deliverPullRequest(createOptions(), { fetch: fetchImplementation, git })).resolves.toEqual({
      changed: false,
    });
    expect(fetchImplementation).toHaveBeenCalledTimes(2);
    expect(git.mock.calls.some(([args]) => args[0] === 'push' || args[0] === 'commit')).toBe(false);
  });

  it('rejects an automation branch that changes while it is being prepared', async () => {
    const fetchImplementation = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(
        response([
          {
            head: { sha: OLD_SHA },
            number: 17,
            state: 'open',
            user: { login: 'spirit-assets[bot]' },
          },
        ]),
      ) as unknown as typeof fetch;
    const git = jest.fn(async (args: string[]) => {
      if (args[0] === 'write-tree') {
        return TREE_SHA;
      }

      return args[0] === 'rev-parse' ? NEW_SHA : '';
    });

    await expect(deliverPullRequest(createOptions(), { fetch: fetchImplementation, git })).rejects.toThrow(
      'Automation branch changed during delivery.',
    );
  });

  it('rejects an invalid desired tree revision', async () => {
    const fetchImplementation = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(
        response([
          {
            head: { sha: OLD_SHA },
            number: 17,
            state: 'open',
            user: { login: 'spirit-assets[bot]' },
          },
        ]),
      ) as unknown as typeof fetch;
    const git = jest.fn(async () => '');

    await expect(deliverPullRequest(createOptions(), { fetch: fetchImplementation, git })).rejects.toThrow(
      'Git returned an invalid desired tree revision.',
    );
  });

  it('creates a pull request for a new automation branch using a body file', async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-delivery-body-'));
    const bodyPath = path.join(temporaryDirectory, 'body.md');
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(response(undefined, 404))
      .mockResolvedValueOnce(response({ number: 23 }));
    const fetchImplementation = fetchMock as unknown as typeof fetch;
    const git = jest.fn(async (args: string[]) => {
      if (args[0] === 'status') {
        return '?? svg/icon.svg\n';
      }

      if (args[0] === 'rev-parse') {
        return NEW_SHA;
      }

      return '';
    });

    try {
      await writeFile(bodyPath, 'Multiline\nbody\n');

      await expect(
        deliverPullRequest({ ...createOptions(), bodyPath }, { fetch: fetchImplementation, git }),
      ).resolves.toEqual({ changed: true, pullRequestNumber: 23 });

      expect(git).toHaveBeenCalledWith(pushArgs, expect.objectContaining({ GIT_CONFIG_COUNT: '1' }));
      expect(git).toHaveBeenCalledWith(['commit', '-m', 'chore(icons): sync icons'], expect.any(Object));
    } finally {
      await rm(temporaryDirectory, { recursive: true, force: true });
    }

    const createRequest = fetchMock.mock.calls[1]?.[1] as RequestInit;

    expect(JSON.parse(String(createRequest.body))).toEqual({
      base: 'main',
      body: 'Multiline\nbody\n',
      head: 'chore/figma-icons-sync',
      title: 'Sync icons',
    });
  });

  it('rejects an invalid local revision before pushing', async () => {
    const fetchImplementation = jest.fn(async () => response(undefined, 404)) as unknown as typeof fetch;
    const git = jest.fn(async (args: string[]) => {
      if (args[0] === 'status') {
        return ' M svg/icon.svg\n';
      }

      return args[0] === 'rev-parse' ? 'invalid' : '';
    });

    await expect(deliverPullRequest(createOptions(), { fetch: fetchImplementation, git })).rejects.toThrow(
      'Git returned an invalid commit revision.',
    );
  });

  it.each([
    [response(undefined, 500), 'Unable to update the pull request (500).'],
    [response({}), 'GitHub returned an invalid pull request response.'],
  ])('rejects an invalid pull request update', async (updateResponse, expectedError) => {
    const fetchImplementation = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(
        response([
          {
            head: { sha: OLD_SHA },
            number: 17,
            state: 'open',
            user: { login: 'spirit-assets[bot]' },
          },
        ]),
      )
      .mockResolvedValueOnce(compareResponse())
      .mockResolvedValueOnce(updateResponse) as unknown as typeof fetch;
    const git = createChangedExistingBranchGit();

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git,
        readBody: async () => 'body',
      }),
    ).rejects.toThrow(expectedError);
  });

  it('reopens a closed pull request when the rerun has asset changes', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(
        response([{ head: { sha: OLD_SHA }, number: 17, state: 'closed', user: { login: 'spirit-assets[bot]' } }]),
      )
      .mockResolvedValueOnce(compareResponse())
      .mockResolvedValueOnce(response({ number: 17 }));
    const fetchImplementation = fetchMock as unknown as typeof fetch;

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git: createChangedExistingBranchGit(),
        readBody: async () => 'body',
      }),
    ).resolves.toEqual({ changed: true, pullRequestNumber: 17 });
    expect(JSON.parse(String((fetchMock.mock.calls[3]?.[1] as RequestInit).body))).toEqual({
      body: 'body',
      state: 'open',
      title: 'Sync icons',
    });
  });

  it('opens a new pull request when a closed pull request cannot be reopened', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(
        response([{ merged_at: null, number: 17, state: 'closed', user: { login: 'spirit-assets[bot]' } }]),
      )
      .mockResolvedValueOnce(compareResponse([{ message: 'fixup! chore(icons): sync icons\n', sha: SYNC_SHA }]))
      .mockResolvedValueOnce(response(undefined, 422))
      .mockResolvedValueOnce(response({ number: 29 }));
    const fetchImplementation = fetchMock as unknown as typeof fetch;
    const git = createChangedExistingBranchGit();

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git,
        readBody: async () => 'body',
      }),
    ).resolves.toEqual({ changed: true, pullRequestNumber: 29 });
    expect(git).toHaveBeenCalledWith(['commit', `--fixup=${SYNC_SHA}`], expect.any(Object));
    expect(JSON.parse(String((fetchMock.mock.calls[4]?.[1] as RequestInit).body))).toEqual({
      base: 'main',
      body: 'body',
      head: 'chore/figma-icons-sync',
      title: 'Sync icons',
    });
  });

  it('opens a new pull request when the previous pull request was merged', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(
        response([
          {
            merged_at: '2026-09-01T00:00:00Z',
            number: 17,
            state: 'closed',
            user: { login: 'spirit-assets[bot]' },
          },
        ]),
      )
      .mockResolvedValueOnce(compareResponse())
      .mockResolvedValueOnce(response({ number: 31 }));
    const fetchImplementation = fetchMock as unknown as typeof fetch;

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git: createChangedExistingBranchGit(),
        readBody: async () => 'body',
      }),
    ).resolves.toEqual({ changed: true, pullRequestNumber: 31 });
    expect((fetchMock.mock.calls[3]?.[1] as RequestInit).method).toBe('POST');
  });

  it('rejects a non-fast-forward push without forcing the branch or updating the pull request', async () => {
    const fetchImplementation = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(response([{ number: 17, state: 'open', user: { login: 'spirit-assets[bot]' } }]))
      .mockResolvedValueOnce(compareResponse()) as unknown as typeof fetch;
    const git = jest.fn(async (args: string[]) => {
      if (args[0] === 'push') {
        throw new Error('non-fast-forward');
      }

      if (args[0] === 'write-tree') {
        return TREE_SHA;
      }

      if (args[0] === 'status') {
        return ' M svg/icon.svg\n';
      }

      if (args[0] !== 'rev-parse') {
        return '';
      }

      return args[1] === 'FETCH_HEAD' ? OLD_SHA : NEW_SHA;
    });

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git,
        readBody: async () => 'body',
      }),
    ).rejects.toThrow('non-fast-forward');
    expect(git.mock.calls.filter(([args]) => args[0] === 'push').map(([args]) => args)).toEqual([pushArgs]);
    expect(fetchImplementation).toHaveBeenCalledTimes(3);
  });

  it('fetches the original sync commit when the shallow clone does not contain it', async () => {
    const fetchImplementation = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(response([{ number: 17, state: 'open', user: { login: 'spirit-assets[bot]' } }]))
      .mockResolvedValueOnce(
        response({
          commits: [{ commit: { author: { name: 'spirit-assets[bot]' } }, sha: SYNC_SHA }],
          total_commits: 1,
        }),
      )
      .mockResolvedValueOnce(response({ number: 17 })) as unknown as typeof fetch;
    const git = jest.fn(async (args: string[]) => {
      if (args[0] === 'cat-file') {
        throw new Error('missing');
      }

      if (args[0] === 'write-tree') {
        return TREE_SHA;
      }

      if (args[0] === 'status') {
        return ' D svg/stale.svg\n';
      }

      if (args[0] !== 'rev-parse') {
        return '';
      }

      return args[1] === 'FETCH_HEAD' ? OLD_SHA : NEW_SHA;
    });

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git,
        readBody: async () => 'body',
      }),
    ).resolves.toEqual({ changed: true, pullRequestNumber: 17 });
    expect(git).toHaveBeenCalledWith(
      ['fetch', '--no-tags', '--depth=1', 'origin', SYNC_SHA],
      expect.objectContaining({
        GIT_CONFIG_VALUE_0: expect.stringMatching(/^AUTHORIZATION: basic /),
      }),
    );
  });

  it.each([
    ['request failure', response(undefined, 500), 'Unable to compare the automation branch (500).'],
    ['invalid payload', response({ commits: {} }), 'GitHub returned an invalid automation comparison.'],
    [
      'truncated history',
      response({ commits: [], total_commits: 1 }),
      'Automation branch history is too large to identify the original sync commit.',
    ],
    [
      'missing App commit',
      response({
        commits: [
          { commit: { author: { name: 'Reviewer' }, message: 'fix snapshots' }, sha: OLD_SHA },
          { commit: { author: { name: 'spirit-assets[bot]' }, message: 12 }, sha: 'invalid' },
        ],
        total_commits: 2,
      }),
      'Unable to find the original asset sync commit.',
    ],
    [
      'invalid JSON',
      new Response('{', { status: 200 }),
      'GitHub returned an invalid response while comparing the automation branch.',
    ],
  ])('rejects a comparison %s', async (_scenario, comparePayload, expectedError) => {
    const fetchImplementation = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(response([{ number: 17, state: 'open', user: { login: 'spirit-assets[bot]' } }]))
      .mockResolvedValueOnce(comparePayload) as unknown as typeof fetch;

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git: createChangedExistingBranchGit(),
        readBody: async () => 'body',
      }),
    ).rejects.toThrow(expectedError);
  });

  it('rejects a reopen failure when the rerun has asset changes', async () => {
    const fetchImplementation = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(response([{ number: 17, state: 'closed', user: { login: 'spirit-assets[bot]' } }]))
      .mockResolvedValueOnce(compareResponse())
      .mockResolvedValueOnce(response(undefined, 500)) as unknown as typeof fetch;

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git: createChangedExistingBranchGit(),
        readBody: async () => 'body',
      }),
    ).rejects.toThrow('Unable to reopen the pull request (500).');
  });

  it('rejects a pull request that cannot be reopened when there are no new asset changes', async () => {
    const fetchImplementation = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(response([{ number: 17, state: 'closed', user: { login: 'spirit-assets[bot]' } }]))
      .mockResolvedValueOnce(response(undefined, 405)) as unknown as typeof fetch;
    const git = jest.fn(async (args: string[]) => {
      if (args[0] === 'write-tree') {
        return TREE_SHA;
      }

      return args[0] === 'rev-parse' ? OLD_SHA : '';
    });

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git,
        readBody: async () => 'body',
      }),
    ).rejects.toThrow('Unable to reopen the pull request (405).');
  });

  it('rejects an owned pull request whose state cannot be classified when the branch is not App-authored', async () => {
    const fetchImplementation = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(response([{ number: 17, state: 'unknown', user: { login: 'spirit-assets[bot]' } }]))
      .mockResolvedValueOnce(response({ author: { name: 'reviewer' } })) as unknown as typeof fetch;

    await expect(deliverPullRequest(createOptions(), { fetch: fetchImplementation, git: jest.fn() })).rejects.toThrow(
      'Existing automation branch is not owned by this GitHub App.',
    );
  });

  it('rejects missing credentials and unsafe output paths before contacting GitHub', async () => {
    await expect(deliverPullRequest({ ...createOptions(), token: ' ' })).rejects.toThrow(
      'GH_TOKEN is required to deliver asset changes.',
    );
    await expect(deliverPullRequest({ ...createOptions(), out: '../private' })).rejects.toThrow(
      'Config target "out" must not contain "..".',
    );
  });
});
