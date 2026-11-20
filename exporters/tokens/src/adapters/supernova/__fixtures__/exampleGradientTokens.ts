import { GradientToken, GradientTokenValue, GradientType, Token, TokenType, Unit } from '@supernovaio/sdk-exporters';

const gradientValue: GradientTokenValue = {
  aspectRatio: 0,
  to: {
    x: 0.999999947627349,
    y: 0.4999999728606128,
  },
  from: {
    x: 0.2058823534702224,
    y: 0.4999999778582067,
  },
  type: GradientType.linear,
  stops: [
    {
      position: 0,
      color: {
        color: {
          r: 255,
          g: 255,
          b: 255,
          referencedTokenId: null,
        },
        opacity: {
          unit: Unit.raw,
          measure: 1,
          referencedTokenId: null,
        },
        referencedTokenId: null,
      },
    },
    {
      position: 1,
      color: {
        color: {
          r: 255,
          g: 255,
          b: 255,
          referencedTokenId: null,
        },
        opacity: {
          unit: Unit.raw,
          measure: 0,
          referencedTokenId: null,
        },
        referencedTokenId: null,
      },
    },
  ],
  referencedTokenId: null,
};

export const exampleGradientTokens = new Map<string, Token>();
exampleGradientTokens.set('gradientRef', {
  id: 'gradientRef',
  name: 'basic-overlay',
  tokenType: TokenType.gradient,
  parentGroupId: '9',
  origin: {
    name: 'Gradient/basic-overlay',
  },
  value: [gradientValue],
} as GradientToken);
