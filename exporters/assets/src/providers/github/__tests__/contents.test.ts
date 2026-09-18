import { ROOT_CONFIG_FILE, ROOT_CONFIG_FILES } from '../../../constants';
import type { ListedRepository } from '../app';
import { GITHUB_API_URL, GITHUB_API_VERSION, readRepositoryConfigFile } from '../contents';

const repository: ListedRepository = {
  archived: false,
  defaultBranch: 'main',
  disabled: false,
  name: 'spirit-design-system',
  owner: 'alma-oss',
  token: 'token',
};
const ref = 'a'.repeat(40);

describe('readRepositoryConfigFile', () => {
  it('pins raw file contents to the resolved default-branch commit', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ sha: ref }), { status: 200 }))
      .mockResolvedValueOnce(new Response('{"assets":{}}', { status: 200 }));
    const fetchImplementation = fetchMock as unknown as typeof fetch;

    await expect(readRepositoryConfigFile(repository, fetchImplementation)).resolves.toEqual({
      contents: '{"assets":{}}',
      path: ROOT_CONFIG_FILE,
      ref,
    });
    expect(fetchMock.mock.calls).toEqual([
      [
        `${GITHUB_API_URL}/repos/alma-oss/spirit-design-system/commits/main`,
        expect.objectContaining({
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: 'Bearer token',
            'User-Agent': 'spirit-assets-exporter',
            'X-GitHub-Api-Version': GITHUB_API_VERSION,
          },
        }),
      ],
      [
        `${GITHUB_API_URL}/repos/alma-oss/spirit-design-system/contents/${ROOT_CONFIG_FILE}?ref=${ref}`,
        expect.objectContaining({
          headers: {
            Accept: 'application/vnd.github.raw',
            Authorization: 'Bearer token',
            'User-Agent': 'spirit-assets-exporter',
            'X-GitHub-Api-Version': GITHUB_API_VERSION,
          },
        }),
      ],
    ]);
  });

  it('returns null when the config file is missing', async () => {
    const fetchImplementation = jest
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ sha: ref }), { status: 200 }))
      .mockResolvedValue(new Response('', { status: 404 })) as unknown as typeof fetch;

    await expect(readRepositoryConfigFile(repository, fetchImplementation)).resolves.toBeNull();
    expect(fetchImplementation).toHaveBeenCalledTimes(ROOT_CONFIG_FILES.length + 1);
  });

  it('uses the first supported config file found at the pinned revision', async () => {
    const configFile: (typeof ROOT_CONFIG_FILES)[number] = 'spirit.config.ts';
    const configIndex = ROOT_CONFIG_FILES.indexOf(configFile);
    const fetchMock = jest.fn().mockResolvedValueOnce(new Response(JSON.stringify({ sha: ref }), { status: 200 }));

    ROOT_CONFIG_FILES.slice(0, configIndex).forEach(() => {
      fetchMock.mockResolvedValueOnce(new Response('', { status: 404 }));
    });
    fetchMock.mockResolvedValueOnce(new Response('export default { assets: {} };', { status: 200 }));

    const fetchImplementation = fetchMock as unknown as typeof fetch;

    await expect(readRepositoryConfigFile(repository, fetchImplementation)).resolves.toEqual({
      contents: 'export default { assets: {} };',
      path: configFile,
      ref,
    });
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${GITHUB_API_URL}/repos/alma-oss/spirit-design-system/contents/${configFile}?ref=${ref}`,
      expect.anything(),
    );
  });

  it('throws when the default branch or Contents API cannot be read', async () => {
    const branchFailure = jest.fn(async () => new Response('', { status: 500 })) as unknown as typeof fetch;
    const contentsFailure = jest
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ sha: ref }), { status: 200 }))
      .mockResolvedValueOnce(new Response('', { status: 500 })) as unknown as typeof fetch;

    await expect(readRepositoryConfigFile(repository, branchFailure)).rejects.toThrow(
      'Unable to resolve the repository default branch (500).',
    );
    await expect(readRepositoryConfigFile(repository, contentsFailure)).rejects.toThrow(
      `Unable to read ${ROOT_CONFIG_FILE} from the repository (500).`,
    );
  });

  it('rejects an invalid default-branch commit response', async () => {
    const fetchImplementation = jest.fn(
      async () => new Response(JSON.stringify({ sha: 'invalid' }), { status: 200 }),
    ) as unknown as typeof fetch;

    await expect(readRepositoryConfigFile(repository, fetchImplementation)).rejects.toThrow(
      'Unable to resolve the repository default branch commit.',
    );
  });

  it('redacts network errors while resolving the revision or reading config', async () => {
    const networkError = new Error('private-owner/private-repository');
    const branchFailure = jest.fn(async () => {
      throw networkError;
    }) as unknown as typeof fetch;
    const contentsFailure = jest
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ sha: ref }), { status: 200 }))
      .mockRejectedValueOnce(networkError) as unknown as typeof fetch;

    await expect(readRepositoryConfigFile(repository, branchFailure)).rejects.toMatchObject({
      cause: networkError,
      message: 'Unable to resolve the repository default branch.',
    });
    await expect(readRepositoryConfigFile(repository, contentsFailure)).rejects.toMatchObject({
      cause: networkError,
      message: `Unable to read ${ROOT_CONFIG_FILE} from the repository.`,
    });
  });

  it('rejects malformed default-branch commit JSON', async () => {
    const fetchImplementation = jest.fn(async () => new Response('{', { status: 200 })) as unknown as typeof fetch;

    await expect(readRepositoryConfigFile(repository, fetchImplementation)).rejects.toThrow(
      'Unable to resolve the repository default branch commit.',
    );
  });

  it('uses global fetch by default', async () => {
    const originalFetch = global.fetch;
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ sha: ref }), { status: 200 }))
      .mockResolvedValueOnce(new Response('{"assets":{}}', { status: 200 })) as unknown as typeof fetch;

    try {
      await expect(readRepositoryConfigFile(repository)).resolves.toEqual({
        contents: '{"assets":{}}',
        path: ROOT_CONFIG_FILE,
        ref,
      });
    } finally {
      global.fetch = originalFetch;
    }
  });
});
