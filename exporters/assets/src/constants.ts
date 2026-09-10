export const ASSET_TYPES = ['benefit-icons', 'icons', 'illustrations'] as const;

export const CHANGE_TYPES = {
  ADDED: 'added',
  DELETED: 'deleted',
  UPDATED: 'updated',
} as const;

export const CONFIG_MODULE_NAME = 'spirit';

export const ROOT_CONFIG_FILE = `${CONFIG_MODULE_NAME}.config.json`;

export const GIT_TEMPLATE_PLACEHOLDERS = ['brand', 'out', 'owner', 'repo', 'slug'] as const;

export const DEFAULT_GIT_TEMPLATES = {
  branch: 'chore/figma-icons-sync-{slug}',
  commitMessage: 'chore(icons): sync {brand} icons from Figma',
  pullRequestTitle: 'Chore(icons): Sync {brand} icons from Figma',
} as const;

export const SVG_EXTENSION = '.svg';

export const ASSET_DISCOVERY = {
  'benefit-icons': {
    branded: false,
    matchPrefix: 'Icons/benefit-',
    missingError: (_brand: string) => 'No Icons/benefit-* components were found in the Figma file.',
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
} as const;
