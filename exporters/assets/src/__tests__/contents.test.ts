import { ROOT_CONFIG_FILE } from '../constants';
import { GITHUB_API_URL, GITHUB_API_VERSION, readRepositoryConfigFile } from '../providers/github/contents';
import type { ListedRepository } from '../providers/github';

const repository: ListedRepository = {
  archived: false,
  disabled: false,
  name: 'spirit-design-system',
  owner: 'alma-oss',
  token: 'token',
};

describe('readRepositoryConfigFile', () => {
  it('returns raw file contents from the GitHub Contents API', async () => {
    const fetchImplementation = jest.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      expect(String(input)).toBe(`${GITHUB_API_URL}/repos/alma-oss/spirit-design-system/contents/${ROOT_CONFIG_FILE}`);
      expect(init?.headers).toEqual({
        Accept: 'application/vnd.github.raw',
        Authorization: 'Bearer token',
        'User-Agent': 'spirit-assets-exporter',
        'X-GitHub-Api-Version': GITHUB_API_VERSION,
      });

      return new Response('{"assets":{}}', { status: 200 });
    }) as unknown as typeof fetch;

    await expect(readRepositoryConfigFile(repository, fetchImplementation)).resolves.toBe('{"assets":{}}');
  });

  it('returns null when the config file is missing', async () => {
    const fetchImplementation = jest.fn(async () => new Response('', { status: 404 })) as unknown as typeof fetch;

    await expect(readRepositoryConfigFile(repository, fetchImplementation)).resolves.toBeNull();
  });

  it('throws when the Contents API returns another error', async () => {
    const fetchImplementation = jest.fn(async () => new Response('', { status: 500 })) as unknown as typeof fetch;

    await expect(readRepositoryConfigFile(repository, fetchImplementation)).rejects.toThrow(
      `Unable to read ${ROOT_CONFIG_FILE} from alma-oss/spirit-design-system (500).`,
    );
  });

  it('uses global fetch by default', async () => {
    const originalFetch = global.fetch;
    global.fetch = jest.fn(async () => new Response('{"assets":{}}', { status: 200 })) as unknown as typeof fetch;

    try {
      await expect(readRepositoryConfigFile(repository)).resolves.toBe('{"assets":{}}');
    } finally {
      global.fetch = originalFetch;
    }
  });
});
