import { ROOT_CONFIG_FILE } from '../../constants';
import type { ListedRepository } from './app';

export const GITHUB_API_URL = 'https://api.github.com';
export const GITHUB_API_VERSION = '2022-11-28';
export const GITHUB_REQUEST_TIMEOUT_MS = 15_000;

export interface RepositoryConfigFile {
  contents: string;
  ref: string;
}

export type ReadConfigFile = (repository: ListedRepository) => Promise<RepositoryConfigFile | null>;

const requestHeaders = (repository: ListedRepository, accept: string): Record<string, string> => ({
  Accept: accept,
  Authorization: `Bearer ${repository.token}`,
  'User-Agent': 'spirit-assets-exporter',
  'X-GitHub-Api-Version': GITHUB_API_VERSION,
});

const requestGitHub = async (
  fetchImplementation: typeof fetch,
  url: string,
  init: RequestInit,
  errorMessage: string,
): Promise<Response> => {
  try {
    return await fetchImplementation(url, init);
  } catch (error) {
    throw new Error(errorMessage, { cause: error });
  }
};

export const readRepositoryConfigFile = async (
  repository: ListedRepository,
  fetchImplementation: typeof fetch = fetch,
): Promise<RepositoryConfigFile | null> => {
  const commitResponse = await requestGitHub(
    fetchImplementation,
    `${GITHUB_API_URL}/repos/${encodeURIComponent(repository.owner)}/${encodeURIComponent(repository.name)}/commits/${encodeURIComponent(repository.defaultBranch)}`,
    {
      headers: requestHeaders(repository, 'application/vnd.github+json'),
      signal: AbortSignal.timeout(GITHUB_REQUEST_TIMEOUT_MS),
    },
    'Unable to resolve the repository default branch.',
  );

  if (!commitResponse.ok) {
    throw new Error(`Unable to resolve the repository default branch (${commitResponse.status}).`);
  }

  let commit: { sha?: unknown };

  try {
    commit = (await commitResponse.json()) as { sha?: unknown };
  } catch {
    throw new Error('Unable to resolve the repository default branch commit.');
  }

  if (typeof commit.sha !== 'string' || !/^[a-f0-9]{40,64}$/i.test(commit.sha)) {
    throw new Error('Unable to resolve the repository default branch commit.');
  }

  const response = await requestGitHub(
    fetchImplementation,
    `${GITHUB_API_URL}/repos/${encodeURIComponent(repository.owner)}/${encodeURIComponent(repository.name)}/contents/${ROOT_CONFIG_FILE}?ref=${encodeURIComponent(commit.sha)}`,
    {
      headers: requestHeaders(repository, 'application/vnd.github.raw'),
      signal: AbortSignal.timeout(GITHUB_REQUEST_TIMEOUT_MS),
    },
    `Unable to read ${ROOT_CONFIG_FILE} from the repository.`,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Unable to read ${ROOT_CONFIG_FILE} from the repository (${response.status}).`);
  }

  return {
    contents: await response.text(),
    ref: commit.sha,
  };
};
