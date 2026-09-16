import { type DesignToken, TokenTypeEnum } from '../../../core/types';
import { TransformationEngine } from '../../TransformationEngine';
import { pxToRemRule } from '../pxToRemRule';

const createToken = (overrides: Partial<DesignToken> = {}): DesignToken => ({
  id: 'token-1',
  name: 'token-1',
  type: TokenTypeEnum.Dimension,
  value: { type: 'number', value: 32, unit: 'px' },
  metadata: { groupPath: [] },
  source: { adapter: 'test', originalId: 'token-1' },
  ...overrides,
});

describe('pxToRemRule', () => {
  const engine = new TransformationEngine([pxToRemRule]);

  it('converts px to rem, matching pxToRemValue directly', () => {
    const token = createToken();

    const result = engine.transformToken(token, {
      token,
      params: { baseFontSize: 16, isFontSizeBaseToken: false },
    });

    expect(result.value).toEqual({ type: 'number', value: 2, unit: 'rem' });
  });

  it('does not convert the font-size-base token itself', () => {
    const token = createToken({ type: TokenTypeEnum.FontSize });

    const result = engine.transformToken(token, {
      token,
      params: { baseFontSize: 16, isFontSizeBaseToken: true },
    });

    expect(result.value).toEqual(token.value);
  });

  it('does not convert when there is no valid base font size', () => {
    const token = createToken();

    const result = engine.transformToken(token, {
      token,
      params: { baseFontSize: 0, isFontSizeBaseToken: false },
    });

    expect(result.value).toEqual(token.value);
  });

  it('leaves non-px units untouched', () => {
    const token = createToken({ value: { type: 'number', value: 50, unit: '%' } });

    const result = engine.transformToken(token, {
      token,
      params: { baseFontSize: 16, isFontSizeBaseToken: false },
    });

    expect(result.value).toEqual({ type: 'number', value: 50, unit: '%' });
  });

  it('applies to every dimension-family token type', () => {
    const types = [
      TokenTypeEnum.Dimension,
      TokenTypeEnum.Radius,
      TokenTypeEnum.Space,
      TokenTypeEnum.Size,
      TokenTypeEnum.FontSize,
      TokenTypeEnum.LineHeight,
      TokenTypeEnum.LetterSpacing,
    ];

    types.forEach((type) => {
      const token = createToken({ type });
      const result = engine.transformToken(token, {
        token,
        params: { baseFontSize: 16, isFontSizeBaseToken: false },
      });

      expect(result.value).toEqual({ type: 'number', value: 2, unit: 'rem' });
    });
  });

  it('does not apply to border or borderWidth, matching processBorderToken having no rem conversion', () => {
    const borderToken = createToken({ type: TokenTypeEnum.Border });

    const result = engine.transformToken(borderToken, {
      token: borderToken,
      params: { baseFontSize: 16, isFontSizeBaseToken: false },
    });

    expect(result.value).toEqual(borderToken.value);
  });
});
