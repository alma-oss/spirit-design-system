import { execFileSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { deliverPullRequest, type GitCommand } from './deliver';

const OLD_SHA = 'a'.repeat(40);
const NEW_SHA = 'b'.repeat(40);

const response = (body: unknown, status = 200) =>
  new Response(body === undefined ? undefined : JSON.stringify(body), { status });

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
      .mockResolvedValueOnce(response({ number: 42 }));
    const fetchImplementation = fetchMock as unknown as typeof fetch;
    const git = jest.fn(async (args: string[]) => {
      if (args[0] === 'status') {
        return ' M svg/icon.svg\n';
      }

      if (args[0] === 'rev-parse') {
        return NEW_SHA;
      }

      return '';
    });

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git,
        readBody: async () => 'body',
      }),
    ).resolves.toEqual({ changed: true, pullRequestNumber: 42 });

    const createRequest = fetchMock.mock.calls[3]?.[1] as RequestInit;

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
            number: 17,
            state: 'open',
            user: { login: 'spirit-assets[bot]' },
          },
        ]),
      )
      .mockResolvedValueOnce(response({ number: 17 }));
    const fetchImplementation = fetchMock as unknown as typeof fetch;
    const git = jest.fn(async (args: string[]) => {
      if (args[0] === 'status') {
        return ' M svg/icon.svg\n';
      }

      if (args[0] === 'rev-parse') {
        return `${NEW_SHA}\n`;
      }

      return '';
    });
    const body = 'Release notes\nEOF\n::warning::still text\n';

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git,
        readBody: async () => body,
      }),
    ).resolves.toEqual({ changed: true, pullRequestNumber: 17 });

    expect(git).toHaveBeenCalledWith(
      [
        'push',
        '--force-with-lease=refs/heads/chore/figma-icons-sync:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'origin',
        'HEAD:refs/heads/chore/figma-icons-sync',
      ],
      expect.objectContaining({
        GIT_CONFIG_VALUE_0: expect.stringMatching(/^AUTHORIZATION: basic /),
      }),
    );

    const updateRequest = fetchMock.mock.calls[2]?.[1] as RequestInit;

    expect(JSON.parse(String(updateRequest.body))).toEqual({ body, title: 'Sync icons' });
  });

  it('deletes an obsolete owned branch with a lease before closing its pull request', async () => {
    const events: string[] = [];
    const fetchImplementation = jest
      .fn()
      .mockImplementationOnce(async () => response({ object: { sha: OLD_SHA } }))
      .mockImplementationOnce(async () =>
        response([
          {
            head: { sha: OLD_SHA },
            number: 17,
            state: 'open',
            user: { login: 'spirit-assets[bot]' },
          },
        ]),
      )
      .mockImplementationOnce(async () => {
        events.push('close');

        return response({ number: 17 });
      }) as unknown as typeof fetch;
    const git = jest.fn(async (args: string[]) => {
      if (args.includes('push')) {
        events.push('delete');
      }

      return '';
    });

    await expect(deliverPullRequest(createOptions(), { fetch: fetchImplementation, git })).resolves.toEqual({
      changed: false,
    });
    expect(events).toEqual(['delete', 'close']);
    expect(git).toHaveBeenCalledWith(
      [
        'push',
        '--force-with-lease=refs/heads/chore/figma-icons-sync:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'origin',
        ':refs/heads/chore/figma-icons-sync',
      ],
      expect.objectContaining({
        GIT_CONFIG_VALUE_0: expect.stringMatching(/^AUTHORIZATION: basic /),
      }),
    );
  });

  it('deletes an obsolete owned branch without trying to close an already closed pull request', async () => {
    const fetchImplementation = jest
      .fn()
      .mockResolvedValueOnce(response({ object: { sha: OLD_SHA } }))
      .mockResolvedValueOnce(
        response([
          {
            head: { sha: OLD_SHA },
            number: 17,
            state: 'closed',
            user: { login: 'spirit-assets[bot]' },
          },
        ]),
      ) as unknown as typeof fetch;
    const git = jest.fn(async () => '');

    await expect(deliverPullRequest(createOptions(), { fetch: fetchImplementation, git })).resolves.toEqual({
      changed: false,
    });
    expect(fetchImplementation).toHaveBeenCalledTimes(2);
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

      expect(git).toHaveBeenCalledWith(
        [
          'push',
          '--force-with-lease=refs/heads/chore/figma-icons-sync:',
          'origin',
          'HEAD:refs/heads/chore/figma-icons-sync',
        ],
        expect.objectContaining({ GIT_CONFIG_COUNT: '1' }),
      );
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
      .mockResolvedValueOnce(updateResponse) as unknown as typeof fetch;
    const git = jest.fn(async (args: string[]) => {
      if (args[0] === 'status') {
        return ' M svg/icon.svg\n';
      }

      return args[0] === 'rev-parse' ? NEW_SHA : '';
    });

    await expect(
      deliverPullRequest(createOptions(), {
        fetch: fetchImplementation,
        git,
        readBody: async () => 'body',
      }),
    ).rejects.toThrow(expectedError);
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
