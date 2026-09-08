export { exportAssets, exportIcons } from './adapters/figma';
export { runCli } from './cli';
export { filterTargets, loadConfig, resolveConfig } from './config';
export { ASSET_DISCOVERY, ASSET_TYPES, CHANGE_TYPES, CONFIG_MODULE_NAME, ROOT_CONFIG_FILE } from './constants';
export { createGitHubApp, discoverSyncTargets, listAppRepositories, sparseCheckoutRepository } from './discover';
export type { DiscoverMatrix, DiscoverTarget, ListedRepository } from './discover';
export { AssetDiscoveryError, ConfigError, FigmaApiError } from './errors';
export {
  assertContainedInRoot,
  assertNoSymlinkComponents,
  assertRelativeOutputPath,
  isContainedInRoot,
  toTargetSlug,
} from './paths';
export { mirrorAssets, syncAssets } from './sync';
export type {
  AssetExporter,
  AssetType,
  AssetsConfig,
  ChangeType,
  ExportedAsset,
  ResolvedAssetsConfig,
  SyncChange,
  SyncOptions,
  SyncResult,
  SyncTarget,
  TargetSyncResult,
} from './types';
