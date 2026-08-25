import { FigmaApiError } from '../../../errors';
import { FIGMA_API_URL, NODE_BATCH_SIZE, REQUEST_TIMEOUT_MS } from '../../../constants';

export { FIGMA_API_URL, NODE_BATCH_SIZE };

export const chunk = <Item>(items: Item[], size: number): Item[][] =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) => items.slice(index * size, (index + 1) * size));

const fetchWithTimeout = (
  fetchImplementation: typeof fetch,
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> =>
  fetchImplementation(input, {
    ...init,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

export const requestJson = async <ResponseBody>(
  fetchImplementation: typeof fetch,
  url: string,
  token: string,
): Promise<ResponseBody> => {
  const response = await fetchWithTimeout(fetchImplementation, url, {
    headers: {
      'X-Figma-Token': token,
    },
  });

  if (!response.ok) {
    throw new FigmaApiError(`Figma API request failed (${response.status} ${response.statusText}): ${url}`);
  }

  const body = (await response.json()) as ResponseBody & { err?: string | boolean; message?: string };

  if (body.err) {
    throw new FigmaApiError(
      `Figma API request failed: ${typeof body.err === 'string' ? body.err : body.message || url}`,
    );
  }

  return body;
};

export const figmaFileUrl = (fileKey: string, suffix = ''): string =>
  `${FIGMA_API_URL}/files/${encodeURIComponent(fileKey)}${suffix}`;
