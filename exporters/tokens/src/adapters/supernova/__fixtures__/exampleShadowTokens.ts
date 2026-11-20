import { ShadowToken, Token, TokenType } from '@supernovaio/sdk-exporters';

export const exampleShadowTokens = new Map<string, Token>();
exampleShadowTokens.set('shadowRef', {
  id: 'shadowRef',
  name: 'shadow-100',
  tokenType: TokenType.shadow,
  parentGroupId: '8',
  origin: {
    name: 'Shadows/shadow-100',
  },
  value: [
    {
      color: {
        color: {
          r: 0,
          g: 0,
          b: 0,
          referencedTokenId: null,
        },
        opacity: {
          unit: 'Raw',
          measure: 1,
          referencedTokenId: null,
        },
        referencedTokenId: null,
      },
      x: 0,
      y: 2,
      radius: 8,
      spread: 0,
      opacity: {
        unit: 'Raw',
        measure: 0.1500000059604645,
        referencedTokenId: null,
      },
      type: 'Drop',
      referencedTokenId: null,
    },
  ],
} as ShadowToken);
