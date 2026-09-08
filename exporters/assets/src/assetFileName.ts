import { SVG_EXTENSION } from './constants';
import { AssetDiscoveryError } from './errors';

export const toAssetFileName = (sourceName: string, prefix: string): string => {
  const trimmedName = sourceName.slice(prefix.length).trim();
  const name = trimmedName.toLowerCase().endsWith(SVG_EXTENSION)
    ? trimmedName.slice(0, -SVG_EXTENSION.length)
    : trimmedName;
  const normalizedName = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  if (!normalizedName) {
    throw new AssetDiscoveryError(`Asset "${sourceName}" does not produce a valid filename.`);
  }

  return normalizedName;
};
