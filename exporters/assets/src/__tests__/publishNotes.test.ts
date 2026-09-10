import {
  extractPublishNotesFromDispatch,
  extractPublishNotesFromVersions,
  resolvePublishNotes,
} from '../sync/adapters/figma/publishNotes';
import { FIGMA_API_URL } from '../sync/adapters/figma/client';

describe('extractPublishNotesFromDispatch', () => {
  it('reads the library publish description from the repository_dispatch payload', () => {
    expect(extractPublishNotesFromDispatch({ description: 'Update', file_key: 'abc' })).toBe('Update');
  });

  it.each([undefined, null, '', '   ', 1, {}, []])('ignores missing or invalid payload notes: %p', (payload) => {
    expect(extractPublishNotesFromDispatch(payload)).toBe('');
    expect(extractPublishNotesFromDispatch({ description: payload })).toBe('');
  });
});

describe('extractPublishNotesFromVersions', () => {
  it('uses the first version with a description or label', () => {
    expect(
      extractPublishNotesFromVersions({
        versions: [
          { created_at: '2026-09-08T07:58:00Z', description: '', label: null },
          { created_at: '2026-09-08T07:57:00Z', description: 'Update', label: 'Autosave' },
        ],
      }),
    ).toBe('Update');
  });

  it('falls back to the version label when description is empty', () => {
    expect(extractPublishNotesFromVersions({ versions: [{ description: ' ', label: 'Update' }] })).toBe('Update');
  });

  it('returns nothing when the versions payload is missing or empty', () => {
    expect(extractPublishNotesFromVersions({ versions: [] })).toBe('');
    expect(extractPublishNotesFromVersions({ err: 'Invalid token' })).toBe('');
  });

  it.each([undefined, null, '', '   ', 1, {}, []])('ignores missing or invalid versions payloads: %p', (payload) => {
    expect(extractPublishNotesFromVersions(payload)).toBe('');
  });

  it('skips version entries that are not objects', () => {
    expect(
      extractPublishNotesFromVersions({
        versions: [null, 'skip', [], { description: 'Update' }],
      }),
    ).toBe('Update');
  });
});

describe('resolvePublishNotes', () => {
  it('prefers the dispatch description over the Figma versions API', async () => {
    const fetchImplementation = jest.fn() as unknown as typeof fetch;

    await expect(
      resolvePublishNotes({
        description: 'From dispatch',
        fetch: fetchImplementation,
        fileKey: 'figma-file',
        token: 'token',
      }),
    ).resolves.toBe('From dispatch');
    expect(fetchImplementation).not.toHaveBeenCalled();
  });

  it('returns nothing without a file key or token', async () => {
    await expect(resolvePublishNotes({ description: ' ', fileKey: 'figma-file' })).resolves.toBe('');
    await expect(resolvePublishNotes({ token: 'token' })).resolves.toBe('');
  });

  it('reads notes from the Figma versions API', async () => {
    const fetchImplementation = jest.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(`${FIGMA_API_URL}/files/figma-file/versions`);

      return new Response(JSON.stringify({ versions: [{ description: 'Published icons' }] }), { status: 200 });
    }) as unknown as typeof fetch;

    await expect(
      resolvePublishNotes({
        fetch: fetchImplementation,
        fileKey: 'figma-file',
        token: 'token',
      }),
    ).resolves.toBe('Published icons');
  });

  it('logs a warning when the versions API fails', async () => {
    const errors: string[] = [];

    await expect(
      resolvePublishNotes({
        fetch: jest.fn(
          async () => new Response('', { status: 403, statusText: 'Forbidden' }),
        ) as unknown as typeof fetch,
        fileKey: 'figma-file',
        logError: (message) => errors.push(message),
        token: 'token',
      }),
    ).resolves.toBe('');
    expect(errors.join('\n')).toContain('Figma versions API request failed');
    expect(errors.join('\n')).toContain('file_versions:read');
  });

  it('swallows versions API failures when no logger is provided', async () => {
    await expect(
      resolvePublishNotes({
        fetch: jest.fn(async () => {
          // eslint-disable-next-line no-throw-literal -- cover non-Error skip logging
          throw 'boom';
        }) as unknown as typeof fetch,
        fileKey: 'figma-file',
        token: 'token',
      }),
    ).resolves.toBe('');
  });
});
