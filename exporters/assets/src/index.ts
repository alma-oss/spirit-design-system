export { exportAssets, exportIcons } from './sync/adapters/figma';
export { runCli } from './cli';
export { assertRelativeOutputPath, filterTargets, loadConfig, resolveConfig } from './config';
export { ASSET_DISCOVERY, ASSET_TYPES, CHANGE_TYPES, CONFIG_MODULE_NAME, ROOT_CONFIG_FILE } from './constants';
export { AssetDiscoveryError, ConfigError, FigmaApiError } from './errors';
export {
  createGitHubApp,
  discoverSyncTargets,
  formatGitHubActionsOutput,
  listAppRepositories,
  readRepositoryConfigFile,
} from './providers/github';
export type { DiscoverMatrix, DiscoverTarget, ListedRepository } from './providers/github';
export {
  assertContainedInRoot,
  assertNoSymlinkComponents,
  confineConfig,
  isContainedInRoot,
  toTargetSlug,
} from './repository';
export { mirrorAssets, syncAssets } from './sync';
export type {
  AssetExporter,
  AssetType,
  AssetsConfig,
  ChangeType,
  ExportedAsset,
  GitTemplates,
  ResolvedAssetsConfig,
  SyncChange,
  SyncOptions,
  SyncResult,
  SyncTarget,
  TargetSyncResult,
} from './types';
