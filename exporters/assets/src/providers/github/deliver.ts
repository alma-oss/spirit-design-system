import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';

import { assertRelativeOutputPath } from '../../config/paths';
import { ConfigError } from '../../errors';
import { GITHUB_API_URL } from './contents';
import { assertSafeGitBranch } from './templates';

const GITHUB_API_VERSION = '2022-11-28';
const SHA_PATTERN = /^[a-f0-9]{40,64}$/i;
const FIXUP_SUBJECT_PATTERN = /^(?:amend|fixup|squash)!/;
const CANNOT_REOPEN_STATUSES = new Set([405, 422]);

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

type PullRequestState = 'closed' | 'merged' | 'open';

interface ExistingPullRequest {
  number: number;
  state: PullRequestState;
}

interface ExistingBranch {
  pullRequest?: ExistingPullRequest;
  sha?: string;
}

interface PullRequestSummary {
  head?: { sha?: unknown };
  merged_at?: unknown;
  number?: unknown;
  state?: unknown;
  user?: { login?: unknown };
}

interface CompareCommit {
  commit?: { author?: { name?: unknown }; message?: unknown };
  sha?: unknown;
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

const classifyOwnedPullRequest = (
  pullRequest: PullRequestSummary,
  appSlug: string,
): ExistingPullRequest | undefined => {
  if (pullRequest.user?.login !== `${appSlug}[bot]` || typeof pullRequest.number !== 'number') {
    return undefined;
  }

  if (typeof pullRequest.merged_at === 'string' && pullRequest.merged_at.trim()) {
    return { number: pullRequest.number, state: 'merged' };
  }

  if (pullRequest.state === 'open' || pullRequest.state === 'closed') {
    return { number: pullRequest.number, state: pullRequest.state };
  }

  return undefined;
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

  const ownedPullRequests = (pullsPayload as PullRequestSummary[]).flatMap((pullRequest) => {
    const classified = classifyOwnedPullRequest(pullRequest, appSlug);

    return classified ? [classified] : [];
  });
  const pullRequest = (['open', 'closed', 'merged'] as const)
    .map((state) => ownedPullRequests.find((candidate) => candidate.state === state))
    .find((candidate): candidate is ExistingPullRequest => candidate !== undefined);

  if (pullRequest) {
    return { pullRequest, sha };
  }

  if (!(await isCommitAuthoredByApp(options, sha, fetchImplementation))) {
    throw new ConfigError('Existing automation branch is not owned by this GitHub App.');
  }

  return { sha };
};

const commitSubject = (message: unknown): string => {
  if (typeof message !== 'string') {
    return '';
  }

  const [subject] = message.split('\n');

  return subject;
};

const originalSyncCommit = (commits: CompareCommit[], appSlug: string): string | undefined => {
  const botCommits = commits.filter(
    (commit): commit is CompareCommit & { sha: string } =>
      typeof commit.sha === 'string' &&
      SHA_PATTERN.test(commit.sha) &&
      commit.commit?.author?.name === `${appSlug}[bot]`,
  );
  const original = botCommits.find((commit) => !FIXUP_SUBJECT_PATTERN.test(commitSubject(commit.commit?.message)));

  return (original ?? botCommits[0])?.sha;
};

const resolveOriginalSyncCommit = async (
  options: PullRequestDeliveryOptions,
  fetchImplementation: typeof fetch,
): Promise<string> => {
  const { appSlug, base, branch, owner, repo, token } = options;
  const repositoryUrl = `${GITHUB_API_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const compareUrl = `${repositoryUrl}/compare/${encodeURIComponent(base)}...${encodeURIComponent(branch)}`;
  const compareResponse = await fetchImplementation(compareUrl, { headers: createHeaders(token) });

  if (!compareResponse.ok) {
    throw new ConfigError(`Unable to compare the automation branch (${compareResponse.status}).`);
  }

  const comparePayload = (await parseJson(compareResponse, 'comparing the automation branch')) as {
    commits?: unknown;
    total_commits?: unknown;
  };

  if (!Array.isArray(comparePayload.commits)) {
    throw new ConfigError('GitHub returned an invalid automation comparison.');
  }

  const historyIsTruncated =
    typeof comparePayload.total_commits === 'number' && comparePayload.total_commits > comparePayload.commits.length;

  if (historyIsTruncated) {
    throw new ConfigError('Automation branch history is too large to identify the original sync commit.');
  }

  const syncCommit = originalSyncCommit(comparePayload.commits as CompareCommit[], appSlug);

  if (!syncCommit) {
    throw new ConfigError('Unable to find the original asset sync commit.');
  }

  return syncCommit;
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

const commitExists = async (git: (args: string[]) => Promise<string>, sha: string): Promise<boolean> => {
  try {
    await git(['cat-file', '-e', `${sha}^{commit}`]);

    return true;
  } catch {
    return false;
  }
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
  const runGit =
    dependencies.git ??
    ((args: string[], environment?: NodeJS.ProcessEnv) => runGitCommand(repositoryRoot, args, environment));
  const existingBranch = await inspectExistingBranch(options, fetchImplementation);
  const branchRef = `refs/heads/${branch}`;
  const repositoryUrl = `${GITHUB_API_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const authenticatedHeader = Buffer.from(`x-access-token:${token}`).toString('base64');
  const authenticatedEnvironment = {
    GIT_CONFIG_COUNT: '1',
    GIT_CONFIG_KEY_0: 'http.https://github.com/.extraheader',
    GIT_CONFIG_VALUE_0: `AUTHORIZATION: basic ${authenticatedHeader}`,
  };
  // Sparse checkouts are promisor clones, so any Git command may fetch missing objects.
  // Keep the ephemeral App credential on every subprocess without persisting it.
  const git = (args: string[]) => runGit(args, authenticatedEnvironment);

  if (existingBranch.sha) {
    await git(['add', '--all', '--', out]);
    const desiredTree = (await git(['write-tree'])).trim();

    if (!SHA_PATTERN.test(desiredTree)) {
      throw new ConfigError('Git returned an invalid desired tree revision.');
    }

    await git(['fetch', '--no-tags', '--depth=1', 'origin', branchRef]);
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
  const changed = Boolean(status.trim());
  const readBody = dependencies.readBody ?? ((filePath: string) => readFile(filePath, 'utf8'));
  const publishPullRequest = async (): Promise<number> => {
    const body = await readBody(bodyPath);
    const { pullRequest } = existingBranch;

    if (pullRequest?.state === 'open') {
      const payload = await requestGitHub(
        fetchImplementation,
        `${repositoryUrl}/pulls/${pullRequest.number}`,
        token,
        'PATCH',
        { body, title },
        'update the pull request',
      );

      return requirePullRequestNumber(payload);
    }

    if (pullRequest?.state === 'closed') {
      const response = await fetchImplementation(`${repositoryUrl}/pulls/${pullRequest.number}`, {
        body: JSON.stringify({ body, state: 'open', title }),
        headers: createHeaders(token),
        method: 'PATCH',
      });

      if (response.ok) {
        return requirePullRequestNumber(await parseJson(response, 'reopening the pull request'));
      }

      if (!(changed && CANNOT_REOPEN_STATUSES.has(response.status))) {
        throw new ConfigError(`Unable to reopen the pull request (${response.status}).`);
      }
    }

    const payload = await requestGitHub(
      fetchImplementation,
      `${repositoryUrl}/pulls`,
      token,
      'POST',
      { base, body, head: branch, title },
      'create the pull request',
    );

    return requirePullRequestNumber(payload);
  };

  if (!changed) {
    if (!existingBranch.pullRequest || existingBranch.pullRequest.state === 'merged') {
      return { changed: false };
    }

    return { changed: false, pullRequestNumber: await publishPullRequest() };
  }

  await git(['config', 'user.name', `${appSlug}[bot]`]);
  await git(['config', 'user.email', `${appSlug}[bot]@users.noreply.github.com`]);

  if (existingBranch.sha) {
    const syncCommit = await resolveOriginalSyncCommit(options, fetchImplementation);

    if (!(await commitExists(git, syncCommit))) {
      await git(['fetch', '--no-tags', '--depth=1', 'origin', syncCommit]);
    }

    await git(['add', '--all', '--', out]);
    await git(['commit', `--fixup=${syncCommit}`]);
  } else {
    await git(['switch', '-C', branch]);
    await git(['add', '--all', '--', out]);
    await git(['commit', '-m', commitMessage]);
  }

  const localSha = (await git(['rev-parse', 'HEAD'])).trim();

  if (!SHA_PATTERN.test(localSha)) {
    throw new ConfigError('Git returned an invalid commit revision.');
  }

  await git(['push', 'origin', `HEAD:${branchRef}`]);

  return { changed: true, pullRequestNumber: await publishPullRequest() };
};
