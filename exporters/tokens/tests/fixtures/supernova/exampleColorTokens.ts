import { ColorToken, Token, TokenType } from '@supernovaio/sdk-exporters';

export const exampleColorsTokens = new Map<string, Token>();
exampleColorsTokens.set('actionColorRef', {
  id: 'actionColorRef',
  name: 'active',
  tokenType: TokenType.color,
  parentGroupId: '4',
  origin: {
    name: 'action/button/primary/default',
  },
  value: {
    color: {
      r: 202,
      g: 32,
      b: 38,
      referencedTokenId: null,
    },
    opacity: {
      unit: 'Raw',
      measure: 1,
      referencedTokenId: null,
    },
    referencedTokenId: null,
  },
  properties: [
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
  ],
  propertyValues: { collection: 'theme-tokens-id' },
} as unknown as ColorToken);
exampleColorsTokens.set('backgroundColorRef', {
  id: 'backgroundColorRef',
  name: 'primary',
  tokenType: TokenType.color,
  parentGroupId: '5',
  origin: {
    name: 'background/primary',
  },
  value: {
    color: {
      r: 255,
      g: 255,
      b: 255,
      referencedTokenId: null,
    },
    opacity: {
      unit: 'Raw',
      measure: 1,
      referencedTokenId: null,
    },
    referencedTokenId: null,
  },
  properties: [
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
  ],
  propertyValues: { collection: 'theme-tokens-id' },
} as unknown as ColorToken);
