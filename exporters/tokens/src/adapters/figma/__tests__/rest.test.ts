import { FigmaExportError } from '../FigmaExportError';
import { NODE_BATCH_SIZE } from '../constants';
import { readFigmaSource, toFigmaSource } from '../rest';
import type { FigmaTextStyle } from '../types';

const FILE = { key: 'FILE', name: 'SPIRIT (Config)' };
const NO_VARIABLES = { meta: { variableCollections: {}, variables: {} } };

const textMeta = (id: string) => ({ key: `key-${id}`, name: `Typography/${id}`, node_id: id, style_type: 'TEXT' });

const textNode = (id: string, style: Record<string, unknown> = {}, extra: Record<string, unknown> = {}) => ({
  id,
  name: `Typography/${id}`,
  type: 'TEXT',
  style: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'Bold', ...style },
  ...extra,
});

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

describe('readFigmaSource', () => {
  it('should request the style nodes in batches', async () => {
    const styleCount = NODE_BATCH_SIZE + 1;
    const styles = Array.from({ length: styleCount }, (_, index) => textMeta(`n${index}`));
    const respond = (body: unknown) => Promise.resolve({ ok: true, json: async () => body });
    const fetchMock = jest.fn((url: string) => {
      if (url.includes('/variables/local')) {
        return respond(NO_VARIABLES);
      }

      if (url.includes('/styles')) {
        return respond({ meta: { styles } });
      }

      if (url.includes('/nodes')) {
        const ids = new URL(url).searchParams.get('ids')?.split(',') ?? [];

        return respond({ nodes: Object.fromEntries(ids.map((id) => [id, { document: textNode(id) }])) });
      }

      return respond({ name: FILE.name });
    });

    const source = await readFigmaSource(FILE.key, 'token', fetchMock as unknown as typeof fetch);
    const nodeRequests = fetchMock.mock.calls.filter(([url]) => url.includes('/nodes'));

    expect(nodeRequests).toHaveLength(2);
    expect(source.styles).toHaveLength(styleCount);
  });
});
