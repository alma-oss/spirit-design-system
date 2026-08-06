export type AssetType = 'icons' | 'benefit-icons' | 'illustrations';

export interface SyncTarget {
  brand: string;
  out: string;
  assets: AssetType[];
}

export interface FigmaAssetsConfig {
  fileKey: string;
  targets: SyncTarget[];
}

export interface ResolvedSyncTarget extends SyncTarget {
  out: string;
}

export interface ResolvedFigmaAssetsConfig extends FigmaAssetsConfig {
  targets: ResolvedSyncTarget[];
}

export interface SyncChange {
  file: string;
  type: 'added' | 'updated' | 'deleted';
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

export interface SyncOptions {
  config: ResolvedFigmaAssetsConfig;
  token: string;
  fetch?: typeof fetch;
}
