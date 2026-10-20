import { type Token, TokenType, Unit } from '@supernovaio/sdk-exporters';
import { createToken } from '../../../tests/fixtures/exampleThemeShadowTokens';
import { sampleConfigurationDefault } from '../../../tests/fixtures/sampleConfiguration';
import { getShadowLengthTokens } from '../shadowLengthTokens';

jest.mock('../../../config', () => ({
  exportConfiguration: sampleConfigurationDefault,
}));

const tokenOptions = { parentGroupId: 'groupId', collection: 'theme-tokens-id' };
const shadow = (originName: string) =>
  createToken(TokenType.shadow, originName, originName, { ...tokenOptions, value: [] });
const dimension = (originName: string) =>
  createToken(TokenType.dimension, originName, originName, {
    ...tokenOptions,
    value: { measure: 2, unit: Unit.pixels, referencedTokenId: null },
  });

describe('getShadowLengthTokens', () => {
  const dataProvider: Array<{ description: string; tokens: Token[]; expectedNames: string[] }> = [
    {
      description: 'should add the first layer suffix to a length without a layer number',
      tokens: [shadow('Shadow/shadow-100'), dimension('Shadow/shadow-100/offset-x')],
      expectedNames: ['offset-x-01'],
    },
    {
      description: 'should keep the layer number of a length',
      tokens: [shadow('Shadow/shadow-100'), dimension('Shadow/shadow-100/offset-x-02')],
      expectedNames: ['offset-x-02'],
    },
    {
      description: 'should exclude a dimension under a non-shadow parent',
      tokens: [shadow('Shadow/shadow-100'), dimension('Spacing/space-100/offset-x')],
      expectedNames: [],
    },
    {
      description: 'should return no tokens for a shadow without dimension children',
      tokens: [shadow('Shadow/shadow-100')],
      expectedNames: [],
    },
    {
      description: 'should match origin names regardless of their casing',
      tokens: [shadow('Shadow/Shadow-100'), dimension('shadow/shadow-100/blur-radius')],
      expectedNames: ['blur-radius-01'],
    },
  ];

  it.each(dataProvider)('$description', ({ tokens, expectedNames }) => {
    expect(getShadowLengthTokens(tokens).map((token) => token.name)).toStrictEqual(expectedNames);
  });
});
