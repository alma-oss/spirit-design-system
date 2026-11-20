import { ColorToken, StringToken, Token, TokenType } from '@supernovaio/sdk-exporters';

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
    ],
  },
];
export const exampleCollectionTokens = new Map<string, Token>();
exampleCollectionTokens.set('colorCollectionRef1', {
  id: 'colorCollectionRef1',
  name: 'Theme Color',
  tokenType: TokenType.color,
  properties: testProperties,
  propertyValues: { collection: 'theme-tokens-id' },
} as unknown as ColorToken);

exampleCollectionTokens.set('colorCollectionRef2', {
  id: 'colorCollectionRef2',
  name: 'Primitive Color',
  tokenType: TokenType.color,
  properties: testProperties,
  propertyValues: { collection: 'primitives-id' },
} as unknown as ColorToken);

exampleCollectionTokens.set('colorCollectionRef3', {
  id: 'colorCollectionRef3',
  name: 'Global Color',
  tokenType: TokenType.color,
  properties: testProperties,
  propertyValues: { collection: 'global-tokens-id' },
} as unknown as ColorToken);

exampleCollectionTokens.set('stringRef', {
  id: 'stringRef',
  name: 'Columns',
  tokenType: TokenType.string,
  parentGroupId: '2',
  origin: {
    name: 'Grid/Columns',
  },
  value: 'value',
  properties: testProperties,
  propertyValues: { collection: 'global-tokens-id' },
} as unknown as StringToken);

export const expectedCollectionValue = [
  {
    id: 'colorCollectionRef1',
    name: 'Theme Color',
    properties: testProperties,
    propertyValues: { collection: 'theme-tokens-id' },
    tokenType: 'Color',
  },
  {
    id: 'stringRef',
    name: 'Columns',
    origin: { name: 'Grid/Columns' },
    parentGroupId: '2',
    tokenType: 'String',
    value: 'value',
    properties: testProperties,
    propertyValues: { collection: 'global-tokens-id' },
  },
];

export const expectedCollectionFilteredValue = [exampleCollectionTokens.get('colorCollectionRef2') as ColorToken];

export const expectedCollectionFilteredExcludedValue = [
  exampleCollectionTokens.get('colorCollectionRef1') as ColorToken,
  exampleCollectionTokens.get('colorCollectionRef3') as ColorToken,
  exampleCollectionTokens.get('stringRef') as StringToken,
];
