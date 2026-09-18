import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';

import { assertRelativeOutputPath } from '../../config/paths';
import { ConfigError } from '../../errors';
import { GITHUB_API_URL } from './contents';
import { assertSafeGitBranch } from './templates';

const GITHUB_API_VERSION = '2022-11-28';
const SHA_PATTERN = /^[a-f0-9]{40,64}$/i;

export interface PullRequestDeliveryOptions {
  appSlug: string;
  base: string;
  bodyPath: string;
  branch: string;
  commitMessage: string;
  out: string;
  owner: string;
  repo: string;
  repositoryRoot: string;
  title: string;
  token: string;
}

export interface PullRequestDeliveryResult {
  changed: boolean;
  pullRequestNumber?: number;
}

export type GitCommand = (args: string[], environment?: NodeJS.ProcessEnv) => Promise<string>;

interface PullRequestDeliveryDependencies {
  fetch?: typeof fetch;
  git?: GitCommand;
  readBody?: (path: string) => Promise<string>;
}

interface ExistingBranch {
  headAuthoredByApp?: boolean;
  openPullRequestNumber?: number;
  sha?: string;
}

interface PullRequestSummary {
  head?: { sha?: unknown };
  number?: unknown;
  state?: unknown;
  user?: { login?: unknown };
}

const runGitCommand = (repositoryRoot: string, args: string[], environment?: NodeJS.ProcessEnv): Promise<string> =>
  new Promise((resolve, reject) => {
    execFile(
      'git',
      args,
      { cwd: repositoryRoot, encoding: 'utf8', env: { ...process.env, ...environment } },
      (error, stdout) => {
        if (error) {
          reject(error);

          return;
        }

        resolve(stdout);
      },
    );
  });

const createHeaders = (token: string): Record<string, string> => ({
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
  'User-Agent': 'spirit-assets-exporter',
  'X-GitHub-Api-Version': GITHUB_API_VERSION,
});

const parseJson = async (response: Response, operation: string): Promise<unknown> => {
  try {
    return await response.json();
  } catch {
    throw new ConfigError(`GitHub returned an invalid response while ${operation}.`);
  }
};

const isCommitAuthoredByApp = async (
  options: PullRequestDeliveryOptions,
  sha: string,
  fetchImplementation: typeof fetch,
): Promise<boolean> => {
  const { appSlug, owner, repo, token } = options;
  const repositoryUrl = `${GITHUB_API_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const commitResponse = await fetchImplementation(`${repositoryUrl}/git/commits/${encodeURIComponent(sha)}`, {
    headers: createHeaders(token),
  });

  if (!commitResponse.ok) {
    throw new ConfigError(`Unable to inspect the automation commit (${commitResponse.status}).`);
  }

  const commitPayload = (await parseJson(commitResponse, 'inspecting the automation commit')) as {
    author?: { name?: unknown };
  };

  return commitPayload.author?.name === `${appSlug}[bot]`;
};

const inspectExistingBranch = async (
  options: PullRequestDeliveryOptions,
  fetchImplementation: typeof fetch,
): Promise<ExistingBranch> => {
  const { appSlug, branch, owner, repo, token } = options;
  const repositoryUrl = `${GITHUB_API_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const encodedBranch = branch
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  const branchResponse = await fetchImplementation(`${repositoryUrl}/git/ref/heads/${encodedBranch}`, {
    headers: createHeaders(token),
  });

  if (branchResponse.status === 404) {
    return {};
  }

  if (!branchResponse.ok) {
    throw new ConfigError(`Unable to inspect the automation branch (${branchResponse.status}).`);
  }

  const branchPayload = (await parseJson(branchResponse, 'inspecting the automation branch')) as {
    object?: { sha?: unknown };
  };
  const sha = branchPayload.object?.sha;

  if (typeof sha !== 'string' || !SHA_PATTERN.test(sha)) {
    throw new ConfigError('GitHub returned an invalid automation branch revision.');
  }

  const pullsUrl = new URL(`${repositoryUrl}/pulls`);
  pullsUrl.searchParams.set('direction', 'desc');
  pullsUrl.searchParams.set('head', `${owner}:${branch}`);
  pullsUrl.searchParams.set('per_page', '100');
  pullsUrl.searchParams.set('sort', 'updated');
  pullsUrl.searchParams.set('state', 'all');
  const pullsResponse = await fetchImplementation(pullsUrl, { headers: createHeaders(token) });

  if (!pullsResponse.ok) {
    throw new ConfigError(`Unable to inspect automation pull requests (${pullsResponse.status}).`);
  }

  const pullsPayload = await parseJson(pullsResponse, 'inspecting automation pull requests');

  if (!Array.isArray(pullsPayload)) {
    throw new ConfigError('GitHub returned an invalid automation pull request list.');
  }

  const ownedPullRequest = (pullsPayload as PullRequestSummary[]).find(
    (pullRequest) =>
      pullRequest.user?.login === `${appSlug}[bot]` &&
      pullRequest.head?.sha === sha &&
      typeof pullRequest.number === 'number',
  );

  if (ownedPullRequest) {
    return {
      openPullRequestNumber: ownedPullRequest.state === 'open' ? (ownedPullRequest.number as number) : undefined,
      sha,
    };
  }

  if (!(await isCommitAuthoredByApp(options, sha, fetchImplementation))) {
    throw new ConfigError('Existing automation branch is not owned by this GitHub App.');
  }

  return { headAuthoredByApp: true, sha };
};

const requestGitHub = async (
  fetchImplementation: typeof fetch,
  url: string,
  token: string,
  method: 'PATCH' | 'POST',
  body: Record<string, unknown>,
  operation: string,
): Promise<unknown> => {
  const response = await fetchImplementation(url, {
    body: JSON.stringify(body),
    headers: createHeaders(token),
    method,
  });

  if (!response.ok) {
    throw new ConfigError(`Unable to ${operation} (${response.status}).`);
  }

  return parseJson(response, operation);
};

const requirePullRequestNumber = (payload: unknown): number => {
  const number = (payload as { number?: unknown } | null)?.number;

  if (typeof number !== 'number') {
    throw new ConfigError('GitHub returned an invalid pull request response.');
  }

  return number;
};

export const deliverPullRequest = async (
  options: PullRequestDeliveryOptions,
  dependencies: PullRequestDeliveryDependencies = {},
): Promise<PullRequestDeliveryResult> => {
  const { appSlug, base, bodyPath, branch, commitMessage, out, owner, repo, repositoryRoot, title, token } = options;

  assertSafeGitBranch(branch);
  assertRelativeOutputPath(out);

  if (!token.trim()) {
    throw new ConfigError('GH_TOKEN is required to deliver asset changes.');
  }

  const fetchImplementation = dependencies.fetch ?? fetch;
  const git =
    dependencies.git ??
    ((args: string[], environment?: NodeJS.ProcessEnv) => runGitCommand(repositoryRoot, args, environment));
  const existingBranch = await inspectExistingBranch(options, fetchImplementation);
  const branchRef = `refs/heads/${branch}`;
  const expectedSha = existingBranch.sha ?? '';
  const repositoryUrl = `${GITHUB_API_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const authenticatedHeader = Buffer.from(`x-access-token:${token}`).toString('base64');
  const authenticatedEnvironment = {
    GIT_CONFIG_COUNT: '1',
    GIT_CONFIG_KEY_0: 'http.https://github.com/.extraheader',
    GIT_CONFIG_VALUE_0: `AUTHORIZATION: basic ${authenticatedHeader}`,
  };
  const push = (refspec: string) =>
    git(['push', `--force-with-lease=${branchRef}:${expectedSha}`, 'origin', refspec], authenticatedEnvironment);

  if (existingBranch.sha) {
    await git(['add', '--all', '--', out]);
    const desiredTree = (await git(['write-tree'])).trim();

    if (!SHA_PATTERN.test(desiredTree)) {
      throw new ConfigError('Git returned an invalid desired tree revision.');
    }

    await git(['fetch', '--no-tags', '--depth=1', 'origin', branchRef], authenticatedEnvironment);
    const fetchedSha = (await git(['rev-parse', 'FETCH_HEAD'])).trim();

    if (fetchedSha !== existingBranch.sha) {
      throw new ConfigError('Automation branch changed during delivery.');
    }

    await git(['switch', '--discard-changes', '--force-create', branch, 'FETCH_HEAD']);
    await git(['rm', '-r', '--ignore-unmatch', '--', out]);

    if ((await git(['ls-tree', '--name-only', '-r', desiredTree, '--', out])).trim()) {
      await git(['restore', `--source=${desiredTree}`, '--staged', '--worktree', '--', out]);
    }
  }

  const status = await git(['status', '--porcelain=v1', '--untracked-files=all', '--', out]);

  if (!status.trim()) {
    if (!existingBranch.sha) {
      return { changed: false };
    }

    const headAuthoredByApp =
      existingBranch.headAuthoredByApp ??
      (await isCommitAuthoredByApp(options, existingBranch.sha, fetchImplementation));

    if (!headAuthoredByApp) {
      return { changed: false };
    }

    await push(`:${branchRef}`);

    if (existingBranch.openPullRequestNumber) {
      await requestGitHub(
        fetchImplementation,
        `${repositoryUrl}/pulls/${existingBranch.openPullRequestNumber}`,
        token,
        'PATCH',
        { state: 'closed' },
        'close the obsolete pull request',
      );
    }

    return { changed: false };
  }

  await git(['config', 'user.name', `${appSlug}[bot]`]);
  await git(['config', 'user.email', `${appSlug}[bot]@users.noreply.github.com`]);

  if (!existingBranch.sha) {
    await git(['switch', '-C', branch]);
  }

  await git(['add', '--all', '--', out]);
  await git(['commit', '-m', commitMessage]);
  const localSha = (await git(['rev-parse', 'HEAD'])).trim();

  if (!SHA_PATTERN.test(localSha)) {
    throw new ConfigError('Git returned an invalid commit revision.');
  }

  await push(`HEAD:${branchRef}`);

  const body = await (dependencies.readBody ?? ((path: string) => readFile(path, 'utf8')))(bodyPath);
  let pullRequestNumber: number;

  if (existingBranch.openPullRequestNumber) {
    const payload = await requestGitHub(
      fetchImplementation,
      `${repositoryUrl}/pulls/${existingBranch.openPullRequestNumber}`,
      token,
      'PATCH',
      { body, title },
      'update the pull request',
    );
    pullRequestNumber = requirePullRequestNumber(payload);
  } else {
    const payload = await requestGitHub(
      fetchImplementation,
      `${repositoryUrl}/pulls`,
      token,
      'POST',
      { base, body, head: branch, title },
      'create the pull request',
    );
    pullRequestNumber = requirePullRequestNumber(payload);
  }

  return { changed: true, pullRequestNumber };
};
