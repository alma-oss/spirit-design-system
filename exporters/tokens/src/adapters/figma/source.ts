import { chunk, figmaFileUrl, requestJson } from './client';
import { NODE_BATCH_SIZE } from './constants';
import {
  STYLE_TYPES,
  toFigmaSource,
  type FileResponse,
  type NodesResponse,
  type StylesResponse,
  type VariablesResponse,
} from './parser';
import type { FigmaSource } from './types';

const fetchNodes = async (
  fileKey: string,
  ids: string[],
  token: string,
  fetchImplementation: typeof fetch,
): Promise<NodesResponse['nodes']> => {
  const nodes: NodesResponse['nodes'] = {};

  // One request after another, so a large file does not hit the API's rate limit in one burst
  for (const batch of chunk(ids, NODE_BATCH_SIZE)) {
    const searchParams = new URLSearchParams({ ids: batch.join(',') });
    // eslint-disable-next-line no-await-in-loop -- the batches are requested one after another on purpose
    const response = await requestJson<NodesResponse>(
      fetchImplementation,
      `${figmaFileUrl(fileKey, '/nodes')}?${searchParams}`,
      token,
    );

    Object.assign(nodes, response.nodes);
  }

  return nodes;
};

export const readFigmaSource = async (
  fileKey: string,
  token: string,
  fetchImplementation: typeof fetch = fetch,
): Promise<FigmaSource> => {
  const [file, variablesResponse, stylesResponse] = await Promise.all([
    requestJson<FileResponse>(fetchImplementation, `${figmaFileUrl(fileKey)}?depth=1`, token),
    requestJson<VariablesResponse>(fetchImplementation, figmaFileUrl(fileKey, '/variables/local'), token),
    requestJson<StylesResponse>(fetchImplementation, figmaFileUrl(fileKey, '/styles'), token),
  ]);
  const styles = stylesResponse.meta.styles ?? [];
  const nodes = await fetchNodes(
    fileKey,
    styles.filter((style) => STYLE_TYPES.has(style.style_type)).map((style) => style.node_id),
    token,
    fetchImplementation,
  );

  return toFigmaSource({ key: fileKey, name: file.name }, variablesResponse, styles, nodes);
};
