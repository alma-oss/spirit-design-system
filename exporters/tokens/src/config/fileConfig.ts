import { Token, TokenType } from '@supernovaio/sdk-exporters';
import { TOKEN_COLLECTION_THEMES_NAME } from '../constants';
import { getShadowLengthTokens } from '../filters/shadowLengthTokens';

export type FileData = {
  fileName: string;
  tokenTypes: TokenType[];
  collectionName?: string;
  prepareTokens?: (tokens: Token[]) => Token[];
  groupNames?: string[];
  excludeGroupNames?: string[] | null;
  hasMixin?: boolean;
  mixinName?: string;
  cssVariablePrefix?: string;
  // Outputs tokens as references to their CSS variables, e.g. `$name: var(--{tokenPrefix}{cssVariablePrefix}name);`
  hasCssVariableReferences?: boolean;
  hasStylesObject?: boolean;
  hasParentPrefix?: boolean;
  // Drops the top-level group from parent-prefixed names, e.g. `Shadow/shadow-100/offset-x` -> `shadow-100-offset-x`
  hasTopLevelGroupPrefix?: boolean;
  sortByNumValue?: boolean;
};

export const nonThemedFilesData: FileData[] = [
  {
    fileName: 'borders',
    tokenTypes: [TokenType.dimension, TokenType.borderWidth],
    groupNames: ['Border'],
    hasStylesObject: false,
    sortByNumValue: true,
  },
  {
    fileName: 'other',
    tokenTypes: [
      TokenType.dimension,
      TokenType.string,
      TokenType.space,
      TokenType.radius,
      TokenType.border,
      TokenType.borderWidth,
      TokenType.size,
    ],
    excludeGroupNames: ['Border', 'Radius', 'Spacing'],
    sortByNumValue: true,
  },
  {
    fileName: 'radii',
    tokenTypes: [TokenType.dimension, TokenType.radius],
    groupNames: ['Radius'],
    hasParentPrefix: false,
    sortByNumValue: true,
  },
  {
    fileName: 'spacing',
    tokenTypes: [TokenType.dimension, TokenType.space],
    groupNames: ['Spacing'],
    hasParentPrefix: false,
    sortByNumValue: true,
  },
  {
    fileName: 'shadows',
    tokenTypes: [TokenType.shadow],
    hasParentPrefix: false,
  },
  {
    fileName: 'gradients',
    tokenTypes: [TokenType.gradient],
    hasParentPrefix: true,
  },
  {
    fileName: 'typography',
    tokenTypes: [TokenType.typography],
  },
];

export const themedFilesData: FileData[] = [
  {
    fileName: 'colors',
    tokenTypes: [TokenType.color],
    hasMixin: true,
    mixinName: 'color-css-variables',
    cssVariablePrefix: 'color-',
    hasStylesObject: false,
  },
  {
    fileName: 'shadows',
    tokenTypes: [TokenType.dimension],
    collectionName: TOKEN_COLLECTION_THEMES_NAME,
    prepareTokens: getShadowLengthTokens,
    hasMixin: true,
    mixinName: 'shadow-css-variables',
    cssVariablePrefix: '',
    hasStylesObject: false,
    hasTopLevelGroupPrefix: false,
  },
];

export const devicesFilesData: FileData[] = [
  {
    fileName: 'devices',
    tokenTypes: [
      TokenType.dimension,
      TokenType.fontSize,
      TokenType.letterSpacing,
      TokenType.lineHeight,
      TokenType.radius,
      TokenType.size,
      TokenType.string,
    ],
    sortByNumValue: true,
  },
];

export const commonThemedFilesData: FileData[] = [
  { fileName: 'color-tokens', tokenTypes: [TokenType.color] },
  {
    fileName: 'shadow-tokens',
    tokenTypes: [TokenType.dimension],
    collectionName: TOKEN_COLLECTION_THEMES_NAME,
    prepareTokens: getShadowLengthTokens,
    hasCssVariableReferences: true,
    cssVariablePrefix: '',
    hasStylesObject: false,
    hasTopLevelGroupPrefix: false,
  },
];
