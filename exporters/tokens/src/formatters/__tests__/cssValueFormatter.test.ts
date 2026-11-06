import { createTokenIndex } from '../../core/tokenIndex';
import { type CompositeValue, type DesignToken, type TokenValue, TokenTypeEnum } from '../../core/types';
import { formatColorValue, formatGradientValue, formatShadowValue } from '../cssValueFormatter';

const hex = (value: string, format = 'hex'): TokenValue => ({ type: 'color', format, value });
const num = (value: number, unit?: string): TokenValue => ({ type: 'number', value, unit });
const composite = (value: Record<string, TokenValue>): CompositeValue => ({ type: 'composite', value });

const createToken = (id: string, type: TokenTypeEnum, value: TokenValue): DesignToken => ({
  id,
  name: id,
  type,
  value,
  metadata: { groupPath: [] },
  source: { adapter: 'test', originalId: id },
});

const shadowLayer = (color: TokenValue, overrides: Record<string, TokenValue> = {}): TokenValue =>
  composite({
    inset: { type: 'boolean', value: false },
    x: num(0, 'px'),
    y: num(2, 'px'),
    blur: num(8, 'px'),
    spread: num(0, 'px'),
    color,
    ...overrides,
  });

const gradientLayer = (type: string, stops: TokenValue[], from = { x: 0, y: 0.5 }, to = { x: 1, y: 0.5 }) =>
  composite({
    type: { type: 'string', value: type },
    from: composite({ x: num(from.x), y: num(from.y) }),
    to: composite({ x: num(to.x), y: num(to.y) }),
    stops: composite(Object.fromEntries(stops.map((stop, stopIndex) => [String(stopIndex), stop]))),
  });

const stop = (position: number, color: TokenValue): TokenValue => composite({ position: num(position), color });

const emptyIndex = createTokenIndex([]);

describe('cssValueFormatter', () => {
  describe('formatColorValue', () => {
    it.each([
      ['#ca2026ff', '#ca2026ff'],
      ['#CA2026', '#ca2026ff'],
      ['ca2026', '#ca2026ff'],
      ['#fff', '#ffffffff'],
      ['#0008', '#00000088'],
    ])('should normalize %s to 8 lowercase digits', (value, expected) => {
      expect(formatColorValue(hex(value), emptyIndex)).toBe(expected);
    });

    it('should reject a color format it does not know', () => {
      expect(() => formatColorValue(hex('oklch(0.5 0.1 200)', 'oklch'), emptyIndex)).toThrow('Unsupported color');
    });

    it('should reject a value that is not a color', () => {
      expect(() => formatColorValue(num(1), emptyIndex)).toThrow('Expected a "color" value, got a "number" value');
    });

    it('should resolve an alias through the index, like a Figma variable alias carries no value', () => {
      const index = createTokenIndex([
        createToken('brand', TokenTypeEnum.Color, { type: 'reference', tokenId: 'red' }),
        createToken('red', TokenTypeEnum.Color, hex('#ff0000ff')),
      ]);

      expect(formatColorValue({ type: 'reference', tokenId: 'brand' }, index)).toBe('#ff0000ff');
    });
  });

  describe('formatShadowValue', () => {
    it('should render layers separated by comma, with inset', () => {
      const value = composite({
        '0': shadowLayer(hex('#00000026')),
        '1': shadowLayer(hex('#ffffff80'), { inset: { type: 'boolean', value: true }, x: num(-1.5, 'px') }),
      });

      expect(formatShadowValue(value, emptyIndex)).toBe(
        '0px 2px 8px 0px #00000026, inset -1.5px 2px 8px 0px #ffffff80',
      );
    });

    it('should default the length unit to px', () => {
      expect(formatShadowValue(composite({ '0': shadowLayer(hex('#000'), { x: num(1) }) }), emptyIndex)).toBe(
        '1px 2px 8px 0px #000000ff',
      );
    });

    it('should resolve the color of a layer through the index', () => {
      const index = createTokenIndex([createToken('shadow-color', TokenTypeEnum.Color, hex('#112233ff'))]);
      const value = composite({ '0': shadowLayer({ type: 'reference', tokenId: 'shadow-color' }) });

      expect(formatShadowValue(value, index)).toBe('0px 2px 8px 0px #112233ff');
    });

    it('should resolve a whole layer, or the whole shadow, through the index', () => {
      const layer = shadowLayer(hex('#112233ff'));
      const index = createTokenIndex([
        createToken('layer', TokenTypeEnum.Shadow, layer),
        createToken('shadow', TokenTypeEnum.Shadow, composite({ '0': layer })),
      ]);

      expect(formatShadowValue(composite({ '0': { type: 'reference', tokenId: 'layer' } }), index)).toBe(
        '0px 2px 8px 0px #112233ff',
      );
      expect(formatShadowValue({ type: 'reference', tokenId: 'shadow' }, index)).toBe('0px 2px 8px 0px #112233ff');
    });

    it('should throw when a layer lacks a field', () => {
      const fields = { ...(shadowLayer(hex('#000')) as CompositeValue).value };
      delete fields.x;

      expect(() => formatShadowValue(composite({ '0': composite(fields) }), emptyIndex)).toThrow('Missing "x"');
    });
  });

  describe('formatGradientValue', () => {
    const white = hex('#ffffffff');
    const transparent = hex('#ffffff00');

    it.each([
      ['left to right', { x: 0, y: 0.5 }, { x: 1, y: 0.5 }, 90],
      ['top to bottom', { x: 0.5, y: 0 }, { x: 0.5, y: 1 }, 180],
      ['bottom to top', { x: 0.5, y: 1 }, { x: 0.5, y: 0 }, 0],
      ['right to left', { x: 1, y: 0.5 }, { x: 0, y: 0.5 }, -90],
    ])('should render a linear gradient %s', (_, from, to, angle) => {
      const value = composite({ '0': gradientLayer('linear', [stop(0, white), stop(1, transparent)], from, to) });

      expect(formatGradientValue(value, emptyIndex)).toBe(`linear-gradient(${angle}deg, #ffffffff 0%, #ffffff00 100%)`);
    });

    it('should render radial and angular layers, rounding stop positions', () => {
      const value = composite({
        '0': gradientLayer('radial', [stop(0, white), stop(0.3333333, transparent)]),
        '1': gradientLayer('angular', [stop(0.5, white)]),
      });

      expect(formatGradientValue(value, emptyIndex)).toBe(
        'radial-gradient(circle, #ffffffff 0%, #ffffff00 33.333%), conic-gradient(#ffffffff 50%)',
      );
    });

    it('should render an unknown type as linear', () => {
      const value = composite({ '0': gradientLayer('diamond', [stop(0, white)]) });

      expect(formatGradientValue(value, emptyIndex)).toBe('linear-gradient(90deg, #ffffffff 0%)');
    });

    it('should resolve the color of a stop through the index', () => {
      const index = createTokenIndex([createToken('overlay', TokenTypeEnum.Color, hex('#112233ff'))]);
      const value = composite({
        '0': gradientLayer('linear', [stop(0, { type: 'reference', tokenId: 'overlay' }), stop(1, transparent)]),
      });

      expect(formatGradientValue(value, index)).toBe('linear-gradient(90deg, #112233ff 0%, #ffffff00 100%)');
    });
  });
});
