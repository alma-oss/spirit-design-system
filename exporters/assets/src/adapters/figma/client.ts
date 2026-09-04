import { FigmaApiError } from '../../errors';

export const FIGMA_API_URL = 'https://api.figma.com/v1';
export const EXPORT_BATCH_SIZE = 100;
export const DOWNLOAD_BATCH_SIZE = 20;
export const REQUEST_TIMEOUT_MS = 30_000;

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

export const requestJson = async <Response>(
  fetchImplementation: typeof fetch,
  url: string,
  token: string,
): Promise<Response> => {
  const response = await fetchWithTimeout(fetchImplementation, url, {
    headers: {
      'X-Figma-Token': token,
    },
  });

  if (!response.ok) {
    throw new FigmaApiError(`Figma API request failed (${response.status} ${response.statusText}): ${url}`);
  }

  return (await response.json()) as Response;
};

export const downloadSvg = async (
  fetchImplementation: typeof fetch,
  url: string,
  assetName: string,
): Promise<string> => {
  const response = await fetchWithTimeout(fetchImplementation, url);

  if (!response.ok) {
    throw new FigmaApiError(`Unable to download SVG for "${assetName}" (${response.status} ${response.statusText}).`);
  }

  const svg = (await response.text()).trim();

  if (!svg.startsWith('<svg')) {
    throw new FigmaApiError(`Figma returned invalid SVG content for "${assetName}".`);
  }

  return `${svg}\n`;
};
