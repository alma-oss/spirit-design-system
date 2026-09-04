import { ASSET_TYPES, CHANGE_TYPES } from './constants';

export type AssetType = (typeof ASSET_TYPES)[number];

export type ChangeType = (typeof CHANGE_TYPES)[keyof typeof CHANGE_TYPES];

export interface SyncTarget {
  brand: string;
  out: string;
  assets: AssetType[];
}

export interface AssetsConfig {
  fileKey: string;
  targets: SyncTarget[];
}

export interface ResolvedSyncTarget extends SyncTarget {
  out: string;
}

export interface ResolvedAssetsConfig extends AssetsConfig {
  targets: ResolvedSyncTarget[];
}

export interface SyncChange {
  file: string;
  type: ChangeType;
}

export interface TargetSyncResult {
  brand: string;
  out: string;
  exported: number;
  changes: SyncChange[];
}

export interface SyncResult {
  targets: TargetSyncResult[];
}

export interface ExportedAsset {
  name: string;
  svg: string;
}

export type AssetExporter = (
  fileKey: string,
  brand: string,
  assets: AssetType[],
  token: string,
  fetchImplementation?: typeof fetch,
) => Promise<ExportedAsset[]>;

export interface SyncOptions {
  config: ResolvedAssetsConfig;
  token: string;
  fetch?: typeof fetch;
  exportAssets?: AssetExporter;
}
