import { CollectionKind, type DesignToken, TokenTypeEnum } from '../../core/types';
import { createDesignToken } from '../../../tests/helpers/createDesignToken';
import { getShadowLengthTokens } from '../shadowLengthTokens';

const createToken = (type: TokenTypeEnum, originName: string, value: Parameters<typeof createDesignToken>[1]) =>
  createDesignToken(type, value, {
    id: originName,
    name: originName.split('/').pop(),
    metadata: { groupPath: [], groupId: 'groupId', originName, collection: CollectionKind.Color },
  });
const shadow = (originName: string) => createToken(TokenTypeEnum.Shadow, originName, { type: 'composite', value: {} });
const dimension = (originName: string) =>
  createToken(TokenTypeEnum.Dimension, originName, { type: 'number', value: 2, unit: 'px' });

describe('getShadowLengthTokens', () => {
  const dataProvider: Array<{ description: string; tokens: DesignToken[]; expectedNames: string[] }> = [
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
