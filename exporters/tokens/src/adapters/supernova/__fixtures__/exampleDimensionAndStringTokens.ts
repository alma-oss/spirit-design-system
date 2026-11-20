import {
  DimensionToken,
  DimensionTokenValue,
  StringToken,
  StringTokenValue,
  Token,
  TokenType,
  Unit,
} from '@supernovaio/sdk-exporters';

const testDimension: DimensionTokenValue = {
  measure: 32,
  unit: Unit.pixels,
  referencedTokenId: null,
};

const testString: StringTokenValue = {
  text: '12',
  referencedTokenId: null,
};

const testProperties = [
  {
    name: 'Collection',
    options: [
      {
        id: 'theme-tokens-id',
        name: 'Theme tokens',
      },
      {
        id: 'primitives-id',
        name: 'Primitives',
      },
      {
        id: 'global-tokens-id',
        name: 'Global tokens',
      },
      {
        id: 'device-tokens-id',
        name: 'Device',
      },
    ],
  },
];

export const exampleDimensionAndStringTokens = new Map<string, Token>();
exampleDimensionAndStringTokens.set('dimensionRef', {
  id: 'dimensionRef',
  name: 'desktop',
  tokenType: TokenType.dimension,
  parentGroupId: '1',
  origin: {
    name: 'Grid/spacing/desktop',
  },
  value: testDimension,
  properties: testProperties,
  propertyValues: { collection: 'global-tokens-id' },
} as unknown as DimensionToken);

exampleDimensionAndStringTokens.set('stringRef', {
  id: 'stringRef',
  name: 'Columns',
  tokenType: TokenType.string,
  parentGroupId: '2',
  origin: {
    name: 'Grid/Columns',
  },
  value: testString,
  properties: testProperties,
  propertyValues: { collection: 'global-tokens-id' },
} as unknown as StringToken);

exampleDimensionAndStringTokens.set('figmaTokenRef', {
  id: 'figmaTokenRef',
  name: 'figma-internal-token',
  tokenType: TokenType.dimension,
  parentGroupId: '3',
  origin: {
    name: 'Grid/spacing/figma-internal-token',
  },
  value: testDimension,
  properties: testProperties,
  propertyValues: { collection: 'global-tokens-id' },
} as unknown as DimensionToken);

export const exampleInvariantTokens = new Map<string, Token>();
exampleInvariantTokens.set('radiiRef', {
  id: 'radiiRef',
  name: 'radius-full',
  tokenType: TokenType.dimension,
  parentGroupId: '1',
  origin: {
    name: 'Radius/radius-full',
  },
  value: {
    unit: 'Pixels',
    measure: 9999,
    referencedTokenId: null,
  },
  properties: testProperties,
  propertyValues: { collection: 'global-tokens-id' },
} as unknown as DimensionToken);
