import type { CHANGE_TYPES } from './constants';

export interface TokenSourceConfig {
  brand: string;
  fileKey: string;
  fontStacks: Record<string, string>;
  out: string;
}

export interface TokensConfig {
  sources: TokenSourceConfig[];
}

export interface ResolvedTokenSource extends TokenSourceConfig {
  out: string;
}

export interface ResolvedTokensConfig {
  configPath: string;
  sources: ResolvedTokenSource[];
}

export type ChangeType = (typeof CHANGE_TYPES)[keyof typeof CHANGE_TYPES];

export interface SyncChange {
  file: string;
  type: ChangeType;
}

export interface SourceSyncResult {
  brand: string;
  changes: SyncChange[];
  exported: number;
  out: string;
  warnings: string[];
}

export interface SyncResult {
  sources: SourceSyncResult[];
}
