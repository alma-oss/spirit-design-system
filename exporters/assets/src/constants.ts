export const ASSET_TYPES = ['benefit-icons', 'icons', 'illustrations'] as const;

export const CHANGE_TYPES = ['added', 'deleted', 'updated'] as const;

export const CONFIG_MODULE_NAME = 'spirit-assets';

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
