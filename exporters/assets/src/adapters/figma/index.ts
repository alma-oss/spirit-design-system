import { AssetDiscoveryError, FigmaApiError } from '../../errors';
import type { AssetType, ExportedAsset } from '../../types';
import { chunk, DOWNLOAD_BATCH_SIZE, downloadSvg, EXPORT_BATCH_SIZE, FIGMA_API_URL, requestJson } from './client';
import { discoverAssetNodes, type FigmaFileResponse, type FigmaImagesResponse } from './parser';

export const exportAssets = async (
  fileKey: string,
  brand: string,
  assets: AssetType[],
  token: string,
  fetchImplementation: typeof fetch = fetch,
): Promise<ExportedAsset[]> => {
  const file = await requestJson<FigmaFileResponse>(
    fetchImplementation,
    `${FIGMA_API_URL}/files/${encodeURIComponent(fileKey)}?depth=3`,
    token,
  );

  if (file.err) {
    throw new FigmaApiError(`Figma file request failed: ${file.err}`);
  }

  if (!file.document) {
    throw new FigmaApiError('Figma file response did not contain a document.');
  }

  const variants = discoverAssetNodes(file.document, brand, assets);
  const exportUrls = new Map<string, string>();

  for (const batch of chunk(variants, EXPORT_BATCH_SIZE)) {
    const searchParams = new URLSearchParams({
      ids: batch.map(({ id }) => id).join(','),
      format: 'svg',
    });
    const images = await requestJson<FigmaImagesResponse>(
      fetchImplementation,
      `${FIGMA_API_URL}/images/${encodeURIComponent(fileKey)}?${searchParams}`,
      token,
    );

    if (images.err) {
      throw new FigmaApiError(`Figma SVG export failed: ${images.err}`);
    }

    batch.forEach((variant) => {
      const url = images.images?.[variant.id];

      if (!url) {
        throw new FigmaApiError(`Figma did not return an SVG export URL for "${variant.name}".`);
      }

      exportUrls.set(variant.id, url);
    });
  }

  const downloadedAssets: ExportedAsset[] = [];

  for (const batch of chunk(variants, DOWNLOAD_BATCH_SIZE)) {
    downloadedAssets.push(
      ...(await Promise.all(
        batch.map(async (variant) => ({
          name: variant.name,
          svg: await downloadSvg(fetchImplementation, exportUrls.get(variant.id) as string, variant.name),
        })),
      )),
    );
  }

  const uniqueAssets = new Map<string, ExportedAsset>();

  downloadedAssets.forEach((asset) => {
    const duplicate = uniqueAssets.get(asset.name);

    if (duplicate && duplicate.svg !== asset.svg) {
      throw new AssetDiscoveryError(`Multiple Figma assets resolve to "${asset.name}.svg" with different content.`);
    }

    uniqueAssets.set(asset.name, asset);
  });

  return [...uniqueAssets.values()].sort((first, second) => first.name.localeCompare(second.name));
};

export const exportIcons = (
  fileKey: string,
  brand: string,
  token: string,
  fetchImplementation: typeof fetch = fetch,
): Promise<ExportedAsset[]> => exportAssets(fileKey, brand, ['icons'], token, fetchImplementation);
