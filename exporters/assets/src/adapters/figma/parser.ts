import { toAssetFileName } from '../../assetFileName';
import { ASSET_DISCOVERY } from '../../constants';
import { AssetDiscoveryError } from '../../errors';
import type { AssetType } from '../../types';

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  componentProperties?: Record<string, { value?: string }>;
}

export interface FigmaFileResponse {
  document?: FigmaNode;
  err?: string;
}

export interface FigmaImagesResponse {
  err?: string | null;
  images?: Record<string, string | null>;
}

export interface AssetVariant {
  id: string;
  name: string;
}

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

const matchesDiscoveryRule = (node: FigmaNode, assetType: AssetType): boolean => {
  const rule = ASSET_DISCOVERY[assetType];

  if (node.type !== rule.nodeType || !node.name.startsWith(rule.matchPrefix)) {
    return false;
  }

  return !(assetType === 'icons' && node.name.startsWith(ASSET_DISCOVERY['benefit-icons'].matchPrefix));
};

export const discoverAssetNodes = (document: FigmaNode, brand: string, assets: AssetType[]): AssetVariant[] => {
  const variants: AssetVariant[] = [];
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
