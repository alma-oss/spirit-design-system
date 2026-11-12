import { FIGMA_API_URL, REQUEST_TIMEOUT_MS } from './constants';
import { FigmaApiError } from './FigmaApiError';

export const chunk = <Item>(items: Item[], size: number): Item[][] =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) => items.slice(index * size, (index + 1) * size));

export const figmaFileUrl = (fileKey: string, suffix = ''): string =>
  `${FIGMA_API_URL}/files/${encodeURIComponent(fileKey)}${suffix}`;

export const requestJson = async <ResponseBody>(
  fetchImplementation: typeof fetch,
  url: string,
  token: string,
): Promise<ResponseBody> => {
  const response = await fetchImplementation(url, {
    headers: { 'X-Figma-Token': token },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
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
