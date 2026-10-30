import { StringToken, Token, TokenGroup, TokenType, Unit } from '@supernovaio/sdk-exporters';
import { createGroup } from './exampleGroups';

const collectionProperties = [
  {
    name: 'Collection',
    options: [
      { id: 'theme-tokens-id', name: 'Theme tokens' },
      { id: 'global-tokens-id', name: 'Global tokens' },
    ],
  },
];

export const exampleThemeShadowGroups: TokenGroup[] = [
  createGroup('shadowGroup', 'Shadow', []),
  createGroup('shadow100Group', 'shadow-100', ['Shadow']),
  createGroup('focusGroup', 'Focus', []),
  createGroup('focusRingGroup', 'focus-ring', ['Focus']),
  createGroup('elevationGroup', 'Elevation', []),
  createGroup('elevation100Group', 'elevation-100', ['Elevation']),
  createGroup('spacingGroup', 'Spacing', []),
];

type CreateTokenOptions = {
  parentGroupId: string;
  collection: string;
  value: unknown;
};

export const createToken = (
  tokenType: TokenType,
  id: string,
  originName: string,
  { parentGroupId, collection, value }: CreateTokenOptions,
): Token =>
  ({
    id,
    name: originName.split('/').pop(),
    tokenType,
    parentGroupId,
    origin: { name: originName },
    value,
    properties: collectionProperties,
    propertyValues: { collection },
  }) as unknown as Token;

const createShadowToken = (id: string, originName: string) =>
  createToken(TokenType.shadow, id, originName, {
    parentGroupId: 'shadowTokensGroup',
    collection: 'global-tokens-id',
    value: [],
  });

const createDimensionToken = (
  id: string,
  originName: string,
  parentGroupId: string,
  measure: number,
  collection: string = 'theme-tokens-id',
) =>
  createToken(TokenType.dimension, id, originName, {
    parentGroupId,
    collection,
    value: { measure, unit: Unit.pixels, referencedTokenId: null },
  });

export const exampleThemeShadowTokens: Token[] = [
  createDimensionToken('shadow100OffsetY', 'Shadow/shadow-100/offset-y', 'shadow100Group', 2),
  createDimensionToken('shadow100OffsetY02', 'Shadow/shadow-100/offset-y-02', 'shadow100Group', 4),
  createDimensionToken('shadow100BlurRadius01', 'Shadow/shadow-100/blur-radius-01', 'shadow100Group', 8),
  createDimensionToken('focusRingSpreadRadius01', 'Focus/focus-ring/spread-radius-01', 'focusRingGroup', 2),
  createDimensionToken('elevation100OffsetY01', 'Elevation/elevation-100/offset-y-01', 'elevation100Group', 4),
  createDimensionToken('globalShadowLength', 'Shadow/shadow-100/global', 'shadow100Group', 4, 'global-tokens-id'),
  createDimensionToken('themeSpacing', 'Spacing/space-100', 'spacingGroup', 4),
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
