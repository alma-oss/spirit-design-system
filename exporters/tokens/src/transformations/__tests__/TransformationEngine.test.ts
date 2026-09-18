import { type DesignToken, TokenTypeEnum } from '../../core/types';
import { TransformationEngine } from '../TransformationEngine';
import { type TransformationRule } from '../TransformationRule';

const createToken = (overrides: Partial<DesignToken> = {}): DesignToken => ({
  id: 'token-1',
  name: 'token-1',
  type: TokenTypeEnum.Dimension,
  value: { type: 'number', value: 16, unit: 'px' },
  metadata: { groupPath: [] },
  source: { adapter: 'test', originalId: 'token-1' },
  ...overrides,
});

describe('TransformationEngine', () => {
  it('applies a matching rule to the token value', () => {
    const doubleRule: TransformationRule<{ factor: number }> = {
      name: 'double',
      tokenTypes: [TokenTypeEnum.Dimension],
      shouldApply: () => true,
      transformers: [
        {
          name: 'double',
          transform: (value, ctx) => {
            if (value.type !== 'number') return value;

            return { ...value, value: value.value * ctx.params.factor };
          },
        },
      ],
    };

    const engine = new TransformationEngine([doubleRule]);
    const result = engine.transformToken(createToken(), { token: createToken(), params: { factor: 2 } });

    expect(result.value).toEqual({ type: 'number', value: 32, unit: 'px' });
  });

  it('skips a rule whose tokenTypes do not include the token type', () => {
    const colorOnlyRule: TransformationRule = {
      name: 'color-only',
      tokenTypes: [TokenTypeEnum.Color],
      shouldApply: () => true,
      transformers: [{ name: 'noop', transform: () => ({ type: 'string', value: 'changed' }) }],
    };

    const engine = new TransformationEngine([colorOnlyRule]);
    const token = createToken();
    const result = engine.transformToken(token, { token, params: undefined });

    expect(result.value).toEqual(token.value);
  });

  it('skips a rule whose shouldApply returns false', () => {
    const neverRule: TransformationRule = {
      name: 'never',
      tokenTypes: [TokenTypeEnum.Dimension],
      shouldApply: () => false,
      transformers: [{ name: 'noop', transform: () => ({ type: 'string', value: 'changed' }) }],
    };

    const engine = new TransformationEngine([neverRule]);
    const token = createToken();
    const result = engine.transformToken(token, { token, params: undefined });

    expect(result.value).toEqual(token.value);
  });

  it('applies multiple transformers within a rule in order', () => {
    const addThenDoubleRule: TransformationRule<{ addend: number; factor: number }> = {
      name: 'add-then-double',
      tokenTypes: [TokenTypeEnum.Dimension],
      shouldApply: () => true,
      transformers: [
        {
          name: 'add',
          transform: (value, ctx) =>
            value.type === 'number' ? { ...value, value: value.value + ctx.params.addend } : value,
        },
        {
          name: 'double',
          transform: (value, ctx) =>
            value.type === 'number' ? { ...value, value: value.value * ctx.params.factor } : value,
        },
      ],
    };

    const engine = new TransformationEngine([addThenDoubleRule]);
    const token = createToken();
    const result = engine.transformToken(token, { token, params: { addend: 4, factor: 2 } });

    expect(result.value).toEqual({ type: 'number', value: 40, unit: 'px' });
  });

  it('does not mutate the original token', () => {
    const doubleRule: TransformationRule<{ factor: number }> = {
      name: 'double',
      tokenTypes: [TokenTypeEnum.Dimension],
      shouldApply: () => true,
      transformers: [
        {
          name: 'double',
          transform: (value, ctx) =>
            value.type === 'number' ? { ...value, value: value.value * ctx.params.factor } : value,
        },
      ],
    };

    const engine = new TransformationEngine([doubleRule]);
    const token = createToken();
    engine.transformToken(token, { token, params: { factor: 2 } });

    expect(token.value).toEqual({ type: 'number', value: 16, unit: 'px' });
  });
});
