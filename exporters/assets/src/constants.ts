export const ASSET_TYPES = ['benefit-icons', 'flag-icons', 'icons', 'illustrations'] as const;

// Sub-groups such as benefit-icons or flag-icons live under the generic `Icons/` prefix, so the
// generic `icons` type must not also claim their nodes.
export const ICONS_EXCLUDED_ASSET_TYPES = [
  'benefit-icons',
  'flag-icons',
] as const satisfies readonly (typeof ASSET_TYPES)[number][];

export const CHANGE_TYPES = {
  ADDED: 'added',
  DELETED: 'deleted',
  UPDATED: 'updated',
} as const;

export const CONFIG_MODULE_NAME = 'spirit';

export const ROOT_CONFIG_FILE = `${CONFIG_MODULE_NAME}.config.json`;
export const ROOT_CONFIG_FILES = [
  ROOT_CONFIG_FILE,
  `.${CONFIG_MODULE_NAME}rc.json`,
  `${CONFIG_MODULE_NAME}.config.js`,
  `${CONFIG_MODULE_NAME}.config.mjs`,
  `${CONFIG_MODULE_NAME}.config.cjs`,
  `${CONFIG_MODULE_NAME}.config.ts`,
  `${CONFIG_MODULE_NAME}.config.cts`,
  `${CONFIG_MODULE_NAME}.config.mts`,
] as const;

export const DISCOVERY_CONCURRENCY = 8;
export const DISCOVERY_TARGET_LIMIT = 128;

export const GIT_TEMPLATE_PLACEHOLDERS = ['brand', 'out', 'owner', 'repo', 'slug'] as const;

export const DEFAULT_GIT_TEMPLATES = {
  branch: 'chore/figma-icons-sync-{slug}',
  commitMessage: 'chore(icons): sync {brand} icons from Figma',
  pullRequestTitle: 'Chore(icons): Sync {brand} icons from Figma',
} as const;

export const SVG_EXTENSION = '.svg';

type DiscoveryAssetType = (typeof ASSET_TYPES)[number];

interface AssetDiscoveryRule {
  branded: boolean;
  matchPrefix: string;
  missingError: (brand: string) => string;
  namePrefix: string;
  nodeType: 'COMPONENT' | 'COMPONENT_SET';
}

export const ASSET_DISCOVERY: Record<DiscoveryAssetType, AssetDiscoveryRule> = {
  'benefit-icons': {
    branded: false,
    matchPrefix: 'Icons/benefit-',
    missingError: (_brand: string) => 'No Icons/benefit-* components were found in the Figma file.',
    namePrefix: 'Icons/',
    nodeType: 'COMPONENT',
  },
  'flag-icons': {
    branded: false,
    matchPrefix: 'Icons/flag-',
    missingError: (_brand: string) => 'No Icons/flag-* components were found in the Figma file.',
    namePrefix: 'Icons/',
    nodeType: 'COMPONENT',
  },
  icons: {
    branded: true,
    matchPrefix: 'Icons/',
    missingError: (brand: string) => `No Icons/* component sets with Brand=${brand} were found in the Figma file.`,
    namePrefix: 'Icons/',
    nodeType: 'COMPONENT_SET',
  },
  illustrations: {
    branded: true,
    matchPrefix: 'Illustration/',
    missingError: (brand: string) =>
      `No Illustration/* component sets with Brand=${brand} were found in the Figma file.`,
    namePrefix: 'Illustration/',
    nodeType: 'COMPONENT_SET',
  },
};
