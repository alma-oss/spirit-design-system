import { ROOT_CONFIG_FILE } from '../../constants';
import type { ListedRepository } from './app';

export const GITHUB_API_URL = 'https://api.github.com';
export const GITHUB_API_VERSION = '2022-11-28';
export const GITHUB_REQUEST_TIMEOUT_MS = 15_000;

export type ReadConfigFile = (repository: ListedRepository) => Promise<string | null>;

export const readRepositoryConfigFile = async (
  repository: ListedRepository,
  fetchImplementation: typeof fetch = fetch,
): Promise<string | null> => {
  const response = await fetchImplementation(
    `${GITHUB_API_URL}/repos/${encodeURIComponent(repository.owner)}/${encodeURIComponent(repository.name)}/contents/${ROOT_CONFIG_FILE}`,
    {
      headers: {
        Accept: 'application/vnd.github.raw',
        Authorization: `Bearer ${repository.token}`,
        'User-Agent': 'spirit-assets-exporter',
        'X-GitHub-Api-Version': GITHUB_API_VERSION,
      },
      signal: AbortSignal.timeout(GITHUB_REQUEST_TIMEOUT_MS),
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Unable to read ${ROOT_CONFIG_FILE} from ${repository.owner}/${repository.name} (${response.status}).`,
    );
  }

  return response.text();
};
