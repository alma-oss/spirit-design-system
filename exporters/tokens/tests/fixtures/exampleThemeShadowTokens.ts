import {
  DimensionToken,
  ShadowToken,
  StringToken,
  Token,
  TokenGroup,
  TokenType,
  Unit,
} from '@supernovaio/sdk-exporters';
import { groupFunctions } from './exampleGroups';

const collectionProperties = [
  {
    name: 'Collection',
    options: [
      { id: 'theme-tokens-id', name: 'Theme tokens' },
      { id: 'global-tokens-id', name: 'Global tokens' },
    ],
  },
];

const createGroup = (id: string, name: string, path: string[]): TokenGroup =>
  ({
    ...groupFunctions,
    id,
    idInVersion: id,
    brandId: 'brandIdValue',
    designSystemVersionId: 'designSystemVersionIdValue',
    name,
    description: '',
    isRoot: false,
    tokenType: TokenType.dimension,
    childrenIds: [],
    path,
    tokenIds: [],
    subgroupIds: [],
    parentGroupId: null,
    sortOrder: -1,
    createdAt: null,
    updatedAt: null,
  }) as unknown as TokenGroup;

export const exampleThemeShadowGroups: TokenGroup[] = [
  createGroup('shadowGroup', 'Shadow', []),
  createGroup('shadow100Group', 'shadow-100', ['Shadow']),
  createGroup('focusGroup', 'Focus', []),
  createGroup('focusRingGroup', 'focus-ring', ['Focus']),
  createGroup('elevationGroup', 'Elevation', []),
  createGroup('elevation100Group', 'elevation-100', ['Elevation']),
  createGroup('spacingGroup', 'Spacing', []),
];

const createShadowToken = (id: string, originName: string): ShadowToken =>
  ({
    id,
    name: originName.split('/').pop(),
    tokenType: TokenType.shadow,
    parentGroupId: 'shadowTokensGroup',
    origin: { name: originName },
    value: [],
    properties: collectionProperties,
    propertyValues: { collection: 'global-tokens-id' },
  }) as unknown as ShadowToken;

const createDimensionToken = (
  id: string,
  originName: string,
  parentGroupId: string,
  measure: number,
  collection: string,
): DimensionToken =>
  ({
    id,
    name: originName.split('/').pop(),
    tokenType: TokenType.dimension,
    parentGroupId,
    origin: { name: originName },
    value: { measure, unit: Unit.pixels, referencedTokenId: null },
    properties: collectionProperties,
    propertyValues: { collection },
  }) as unknown as DimensionToken;

export const exampleThemeShadowTokens: Token[] = [
  createDimensionToken('shadow100OffsetY', 'Shadow/shadow-100/offset-y', 'shadow100Group', 2, 'theme-tokens-id'),
  createDimensionToken('shadow100OffsetY02', 'Shadow/shadow-100/offset-y-02', 'shadow100Group', 4, 'theme-tokens-id'),
  createDimensionToken(
    'shadow100BlurRadius01',
    'Shadow/shadow-100/blur-radius-01',
    'shadow100Group',
    8,
    'theme-tokens-id',
  ),
  createDimensionToken(
    'focusRingSpreadRadius01',
    'Focus/focus-ring/spread-radius-01',
    'focusRingGroup',
    2,
    'theme-tokens-id',
  ),
  createDimensionToken(
    'elevation100OffsetY01',
    'Elevation/elevation-100/offset-y-01',
    'elevation100Group',
    4,
    'theme-tokens-id',
  ),
  createDimensionToken('globalShadowLength', 'Shadow/shadow-100/global', 'shadow100Group', 4, 'global-tokens-id'),
  createDimensionToken('themeSpacing', 'Spacing/space-100', 'spacingGroup', 4, 'theme-tokens-id'),
  createShadowToken('shadow100', 'Shadow/shadow-100'),
  createShadowToken('focusRing', 'Focus/focus-ring'),
  createShadowToken('elevation100', 'Elevation/elevation-100'),
  {
    id: 'prefixRef',
    name: 'css-variable-prefix',
    tokenType: TokenType.string,
    parentGroupId: 'prefixGroup',
    origin: null,
    value: { text: 'spirit-', referencedTokenId: null },
    properties: collectionProperties,
    propertyValues: { collection: 'global-tokens-id' },
  } as unknown as StringToken,
];
