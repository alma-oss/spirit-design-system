import { createTokenIndex } from '../../../core/tokenIndex';
import { type DesignToken, type TokenValue, TokenTypeEnum } from '../../../core/types';
import { TransformationEngine } from '../../TransformationEngine';
import { resolveReferencesRule } from '../resolveReferencesRule';

const color = (value: string): TokenValue => ({ type: 'color', format: 'hex', value });
const reference = (tokenId: string): TokenValue => ({ type: 'reference', tokenId });
const composite = (value: Record<string, TokenValue>): TokenValue => ({ type: 'composite', value });

const createToken = (id: string, type: TokenTypeEnum, value: TokenValue): DesignToken => ({
  id,
  name: id,
  type,
  value,
  metadata: { groupPath: [] },
  source: { adapter: 'test', originalId: id },
});

describe('resolveReferencesRule', () => {
  const engine = new TransformationEngine([resolveReferencesRule]);
  const tokenIndex = createTokenIndex([
    createToken('red', TokenTypeEnum.Color, color('#ff0000ff')),
    createToken('brand', TokenTypeEnum.Color, reference('red')),
    createToken('layer', TokenTypeEnum.Shadow, composite({ color: reference('brand') })),
  ]);

  const transform = (token: DesignToken) => engine.transformToken(token, { token, params: { tokenIndex } });

  it('should resolve an alias of a color token through the index', () => {
    const token = createToken('primary', TokenTypeEnum.Color, reference('brand'));

    expect(transform(token).value).toEqual(color('#ff0000ff'));
  });

  it('should resolve the references of a shadow, in its layers and as a layer on its own', () => {
    const token = createToken(
      'shadow',
      TokenTypeEnum.Shadow,
      composite({ 0: composite({ color: reference('red') }), 1: reference('layer') }),
    );

    expect(transform(token).value).toEqual(
      composite({ 0: composite({ color: color('#ff0000ff') }), 1: composite({ color: color('#ff0000ff') }) }),
    );
  });

  it('should resolve the stop colors of a gradient', () => {
    const token = createToken(
      'gradient',
      TokenTypeEnum.Gradient,
      composite({ 0: composite({ stops: composite({ 0: composite({ color: reference('red') }) }) }) }),
    );

    expect(transform(token).value).toEqual(
      composite({ 0: composite({ stops: composite({ 0: composite({ color: color('#ff0000ff') }) }) }) }),
    );
  });

  it('should keep the rest of the token as it is', () => {
    const token = createToken('primary', TokenTypeEnum.Color, reference('red'));

    expect(transform(token)).toEqual({ ...token, value: color('#ff0000ff') });
  });

  it('should not touch the types it does not apply to', () => {
    const token = createToken('space', TokenTypeEnum.Space, reference('missing'));

    expect(transform(token)).toBe(token);
  });

  it('should throw for a reference to an unknown token', () => {
    const token = createToken('primary', TokenTypeEnum.Color, reference('missing'));

    expect(() => transform(token)).toThrow('Trying to retrieve unknown referenced token missing');
  });
});
