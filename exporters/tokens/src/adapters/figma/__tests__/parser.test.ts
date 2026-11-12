import { FigmaExportError } from '../FigmaExportError';
import { FILE, NO_VARIABLES, textMeta, textNode } from '../__fixtures__/figma';
import { toFigmaSource } from '../parser';
import type { FigmaTextStyle } from '../types';

const textStyle = (style: Record<string, unknown>, extra: Record<string, unknown> = {}): FigmaTextStyle => {
  const { styles } = toFigmaSource(FILE, NO_VARIABLES, [textMeta('n1')], {
    n1: { document: textNode('n1', style, extra) },
  });

  return styles[0] as FigmaTextStyle;
};

describe('toFigmaSource', () => {
  it.each([
    ['pixels', { lineHeightUnit: 'PIXELS', lineHeightPx: 20 }, { unit: 'PIXELS', value: 20 }],
    ['percent', { lineHeightUnit: 'INTRINSIC_%', lineHeightPercentFontSize: 120 }, { unit: 'PERCENT', value: 120 }],
    ['auto', { lineHeightUnit: 'INTRINSIC_%' }, { unit: 'AUTO' }],
    ['intrinsic 100%', { lineHeightUnit: 'INTRINSIC_%', lineHeightPercent: 100 }, { unit: 'AUTO' }],
    [
      'intrinsic percent of the font size',
      { lineHeightUnit: 'INTRINSIC_%', lineHeightPercent: 120, lineHeightPercentFontSize: 150 },
      { unit: 'PERCENT', value: 150 },
    ],
  ])('should read %s line height of a text style', (_name, style, expected) => {
    expect(textStyle(style).lineHeight).toEqual(expected);
  });

  it('should read variable bindings given as a single alias or as a list', () => {
    const alias = { type: 'VARIABLE_ALIAS', id: 'v1' };

    expect(textStyle({}, { boundVariables: { fontSize: alias } }).boundVariables).toEqual({ fontSize: alias });
    expect(textStyle({}, { boundVariables: { fontSize: [alias] } }).boundVariables).toEqual({ fontSize: alias });
  });

  it('should report every style the nodes response does not cover in one error', () => {
    const styles = [textMeta('n1'), textMeta('n2'), textMeta('n3')];
    const nodes = { n1: { document: textNode('n1') }, n2: null };

    expect(() => toFigmaSource(FILE, NO_VARIABLES, styles, nodes)).toThrow(FigmaExportError);
    expect(() => toFigmaSource(FILE, NO_VARIABLES, styles, nodes)).toThrow(/n2.*\n.*n3/);
  });

  it('should report a text style without font properties', () => {
    const nodes = { n1: { document: { id: 'n1', name: 'Typography/n1', type: 'TEXT', style: {} } } };

    expect(() => toFigmaSource(FILE, NO_VARIABLES, [textMeta('n1')], nodes)).toThrow(/did not include text properties/);
  });
});
