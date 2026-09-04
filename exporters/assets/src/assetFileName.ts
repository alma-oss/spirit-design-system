import { AssetDiscoveryError } from './errors';

export const toAssetFileName = (sourceName: string, prefix: string): string => {
  const name = sourceName
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
    throw new AssetDiscoveryError(`Asset "${sourceName}" does not produce a valid filename.`);
  }

  return normalizedName;
};
