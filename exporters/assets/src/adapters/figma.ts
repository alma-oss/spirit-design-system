import { ASSET_DISCOVERY } from '../constants';
import { AssetDiscoveryError, FigmaApiError } from '../errors';
import type { AssetType, ExportedAsset } from '../types';

const FIGMA_API_URL = 'https://api.figma.com/v1';
const EXPORT_BATCH_SIZE = 100;

interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  componentProperties?: Record<string, { value?: string }>;
}

interface FigmaFileResponse {
  document?: FigmaNode;
  err?: string;
}

interface FigmaImagesResponse {
  err?: string | null;
  images?: Record<string, string | null>;
}

interface IconVariant {
  id: string;
  name: string;
}

const requestJson = async <Response>(
  fetchImplementation: typeof fetch,
  url: string,
  token: string,
): Promise<Response> => {
  const response = await fetchImplementation(url, {
    headers: {
      'X-Figma-Token': token,
    },
  });

  if (!response.ok) {
    throw new FigmaApiError(`Figma API request failed (${response.status} ${response.statusText}): ${url}`);
  }

  return (await response.json()) as Response;
};

const walkNodes = (node: FigmaNode, visit: (current: FigmaNode) => void): void => {
  visit(node);
  node.children?.forEach((child) => walkNodes(child, visit));
};

const isBrandVariant = (node: FigmaNode, brand: string): boolean => {
  const brandProperty = node.componentProperties?.Brand?.value;

  if (brandProperty) {
    return brandProperty === brand;
  }

  return node.name
    .split(',')
    .map((property) => property.trim())
    .some((property) => property === `Brand=${brand}`);
};

const toAssetFileName = (nodeName: string, prefix: string): string => {
  const name = nodeName
    .slice(prefix.length)
    .trim()
    .replace(/\.svg$/i, '');
  const normalizedName = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  if (!normalizedName) {
    throw new AssetDiscoveryError(`Figma asset "${nodeName}" does not produce a valid filename.`);
  }

  return normalizedName;
};

const matchesDiscoveryRule = (node: FigmaNode, assetType: AssetType): boolean => {
  const rule = ASSET_DISCOVERY[assetType];

  if (node.type !== rule.nodeType || !node.name.startsWith(rule.matchPrefix)) {
    return false;
  }

  return !(assetType === 'icons' && node.name.startsWith(ASSET_DISCOVERY['benefit-icons'].matchPrefix));
};

const discoverAssetNodes = (document: FigmaNode, brand: string, assets: AssetType[]): IconVariant[] => {
  const variants: IconVariant[] = [];
  const counts = Object.fromEntries(assets.map((assetType) => [assetType, 0])) as Record<AssetType, number>;

  walkNodes(document, (node) => {
    const assetType = assets.find((candidate) => matchesDiscoveryRule(node, candidate));

    if (!assetType) {
      return;
    }

    const rule = ASSET_DISCOVERY[assetType];

    if (rule.branded) {
      if (!node.children?.length) {
        return;
      }

      const variant = node.children.find((child) => isBrandVariant(child, brand));

      if (!variant) {
        throw new AssetDiscoveryError(`Icon component set "${node.name}" does not contain Brand=${brand}.`);
      }

      variants.push({
        id: variant.id,
        name: toAssetFileName(node.name, rule.namePrefix),
      });
    } else {
      variants.push({
        id: node.id,
        name: toAssetFileName(node.name, rule.namePrefix),
      });
    }

    counts[assetType] += 1;
  });

  assets.forEach((assetType) => {
    if (counts[assetType] === 0) {
      throw new AssetDiscoveryError(ASSET_DISCOVERY[assetType].missingError(brand));
    }
  });

  return variants.sort((first, second) => first.name.localeCompare(second.name));
};

const chunk = <Item>(items: Item[], size: number): Item[][] =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) => items.slice(index * size, (index + 1) * size));

const downloadSvg = async (fetchImplementation: typeof fetch, url: string, iconName: string): Promise<string> => {
  const response = await fetchImplementation(url);

  if (!response.ok) {
    throw new FigmaApiError(`Unable to download SVG for "${iconName}" (${response.status} ${response.statusText}).`);
  }

  const svg = (await response.text()).trim();

  if (!svg.startsWith('<svg')) {
    throw new FigmaApiError(`Figma returned invalid SVG content for "${iconName}".`);
  }

  return `${svg}\n`;
};

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

  const downloadedAssets = await Promise.all(
    variants.map(async (variant) => ({
      name: variant.name,
      svg: await downloadSvg(fetchImplementation, exportUrls.get(variant.id) as string, variant.name),
    })),
  );
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
