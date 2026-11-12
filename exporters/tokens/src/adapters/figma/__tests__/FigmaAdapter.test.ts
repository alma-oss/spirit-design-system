import { createTokenIndex } from '../../../core/tokenIndex';
import { resolveValueDeep } from '../../../core/resolveValue';
import { readTypography } from '../../../core/typography';
import { TokenTypeEnum, type DesignToken } from '../../../core/types';
import { FigmaAdapter } from '../FigmaAdapter';
import { FigmaApiError } from '../FigmaApiError';
import { FigmaExportError } from '../FigmaExportError';

const WHITE = { r: 1, g: 1, b: 1, a: 1 };
const BLACK = { r: 0, g: 0, b: 0, a: 1 };

type RestVariable = {
  id: string;
  name: string;
  resolvedType: 'COLOR' | 'FLOAT' | 'STRING';
  variableCollectionId: string;
  valuesByMode: Record<string, unknown>;
  scopes?: string[];
  remote?: boolean;
  deletedButReferenced?: boolean;
};

const variable = (overrides: RestVariable) => ({ key: `key-${overrides.id}`, scopes: [], ...overrides });

const createVariables = (): RestVariable[] => [
  variable({
    id: 'v-prefix',
    name: 'Config/css-variable-prefix',
    resolvedType: 'STRING',
    variableCollectionId: 'c-global',
    valuesByMode: { g1: 'spirit-' },
    scopes: ['ALL_SCOPES'],
  }),
  variable({
    id: 'v-space',
    name: 'Spacing/100',
    resolvedType: 'FLOAT',
    variableCollectionId: 'c-global',
    valuesByMode: { g1: 8 },
    scopes: ['GAP'],
  }),
  variable({
    id: 'v-radius',
    name: 'Radius/200',
    resolvedType: 'FLOAT',
    variableCollectionId: 'c-global',
    valuesByMode: { g1: { type: 'VARIABLE_ALIAS', id: 'v-radius-base' } },
    scopes: ['CORNER_RADIUS'],
  }),
  variable({
    id: 'v-radius-base',
    name: 'Radius/base',
    resolvedType: 'FLOAT',
    variableCollectionId: 'c-primitives',
    valuesByMode: { p1: 4 },
  }),
  variable({
    id: 'v-color',
    name: 'Color/Primary',
    resolvedType: 'COLOR',
    variableCollectionId: 'c-theme',
    valuesByMode: { t1: WHITE, t2: BLACK },
    scopes: ['ALL_FILLS'],
  }),
  variable({
    id: 'v-prim-color',
    name: 'Red/500',
    resolvedType: 'COLOR',
    variableCollectionId: 'c-primitives',
    valuesByMode: { p1: { r: 1, g: 0, b: 0, a: 1 } },
  }),
  variable({
    id: 'v-accent',
    name: 'Color/Accent',
    resolvedType: 'COLOR',
    variableCollectionId: 'c-theme',
    valuesByMode: {
      t1: { type: 'VARIABLE_ALIAS', id: 'v-prim-color' },
      t2: { type: 'VARIABLE_ALIAS', id: 'v-color' },
    },
    scopes: ['ALL_FILLS'],
  }),
  variable({
    id: 'v-font-size',
    name: 'Font size/Body',
    resolvedType: 'FLOAT',
    variableCollectionId: 'c-device',
    valuesByMode: { d1: 14, d2: 16 },
    scopes: ['FONT_SIZE'],
  }),
  variable({
    id: 'v-internal',
    name: 'figma-helper/offset',
    resolvedType: 'FLOAT',
    variableCollectionId: 'c-global',
    valuesByMode: { g1: 1 },
  }),
];

const collection = (id: string, name: string, modes: Array<[string, string]>) => ({
  id,
  key: `key-${id}`,
  name,
  defaultModeId: modes[0][0],
  modes: modes.map(([modeId, modeName]) => ({ modeId, name: modeName })),
});

const createCollections = () => [
  collection('c-global', 'Global tokens', [['g1', 'Mode 1']]),
  collection('c-theme', 'Theme tokens', [
    ['t1', 'Light'],
    ['t2', 'Dark'],
  ]),
  collection('c-device', 'Device', [
    ['d1', 'Mobile'],
    ['d2', 'Desktop'],
  ]),
  collection('c-primitives', 'Primitives', [['p1', 'Mode 1']]),
];

const STYLES = [
  { key: 's1', name: 'Typography/Body', node_id: 'n1', style_type: 'TEXT' },
  { key: 's2', name: 'Typography/Body Link', node_id: 'n2', style_type: 'TEXT' },
  { key: 's3', name: 'Shadow/Small', node_id: 'n3', style_type: 'EFFECT' },
  { key: 's4', name: 'Gradient/Brand', node_id: 'n4', style_type: 'FILL' },
  { key: 's5', name: 'Shadow/Unused', node_id: 'n5', style_type: 'EFFECT' },
];

const textNode = (id: string, name: string, extra = {}) => ({
  id,
  name,
  type: 'TEXT',
  style: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'Bold',
    fontWeight: 700,
    letterSpacing: 0,
    lineHeightUnit: 'PIXELS',
    lineHeightPx: 20,
  },
  ...extra,
});

const NODES = {
  n1: {
    document: textNode('n1', 'Typography/Body', {
      boundVariables: { fontSize: { type: 'VARIABLE_ALIAS', id: 'v-font-size' } },
    }),
  },
  n2: { document: textNode('n2', 'Typography/Body Link') },
  n3: {
    document: {
      id: 'n3',
      name: 'Shadow/Small',
      type: 'RECTANGLE',
      effects: [
        { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.2 }, offset: { x: 0, y: 2 }, radius: 4, spread: 1 },
        { type: 'INNER_SHADOW', visible: false, color: BLACK, offset: { x: 0, y: 0 }, radius: 1 },
      ],
    },
  },
  n4: {
    document: {
      id: 'n4',
      name: 'Gradient/Brand',
      type: 'RECTANGLE',
      fills: [
        {
          type: 'GRADIENT_LINEAR',
          gradientHandlePositions: [
            { x: 0, y: 0.5 },
            { x: 1, y: 0.5 },
          ],
          gradientStops: [
            { position: 0, color: WHITE },
            { position: 1, color: BLACK },
          ],
        },
      ],
    },
  },
  n5: { document: { id: 'n5', name: 'Shadow/Unused', type: 'RECTANGLE', effects: [] } },
};

const toRecord = <Item extends { id: string }>(items: Item[]) =>
  Object.fromEntries(items.map((item) => [item.id, item]));

const createFetch = ({
  variables = createVariables(),
  failOn,
}: { variables?: RestVariable[]; failOn?: string } = {}): jest.Mock => {
  const respond = (body: unknown, ok = true) =>
    Promise.resolve({ ok, status: ok ? 200 : 403, statusText: 'x', json: async () => body });

  return jest.fn((url: string) => {
    if (failOn && url.includes(failOn)) {
      return respond({}, false);
    }

    if (url.includes('/variables/local')) {
      return respond({
        meta: {
          variableCollections: toRecord(createCollections()),
          variables: toRecord(variables.map((item) => variable(item))),
        },
      });
    }

    if (url.includes('/styles')) {
      return respond({ meta: { styles: STYLES } });
    }

    if (url.includes('/nodes')) {
      return respond({ nodes: NODES });
    }

    return respond({ name: 'SPIRIT (Config)' });
  });
};

const fetchTokens = (fetchMock: jest.Mock, onWarning?: (message: string) => void) =>
  new FigmaAdapter({ token: 'token', fetch: fetchMock as unknown as typeof fetch, onWarning }).fetchTokens({
    source: { fileKey: 'FILE' },
  });

const byId = (tokens: DesignToken[], id: string): DesignToken => {
  const found = tokens.find((token) => token.id === id);

  if (!found) {
    throw new Error(`Missing token ${id}`);
  }

  return found;
};

describe('FigmaAdapter', () => {
  describe('fetchTokens', () => {
    it('should map Figma variables and styles to internal tokens', async () => {
      const { tokens, themes, metadata } = await fetchTokens(createFetch());

      expect(metadata.source).toBe('figma');
      expect(themes).toEqual([
        { id: 't1', name: 'light', isDefault: true },
        { id: 't2', name: 'dark', isDefault: false },
      ]);
      expect(byId(tokens, 'v-prefix')).toMatchObject({
        name: 'css-variable-prefix',
        type: TokenTypeEnum.String,
        value: { type: 'string', value: 'spirit-' },
        metadata: { groupPath: ['Config'] },
        source: { adapter: 'figma', originalId: 'v-prefix', originalType: 'STRING' },
      });
      expect(byId(tokens, 'v-space')).toMatchObject({
        type: TokenTypeEnum.Space,
        value: { type: 'number', value: 8, unit: 'px' },
      });
    });

    it('should emit a token per theme and per device mode', async () => {
      const { tokens } = await fetchTokens(createFetch());

      expect(byId(tokens, 'v-color:t1')).toMatchObject({
        type: TokenTypeEnum.Color,
        value: { type: 'color', format: 'hex', value: '#ffffffff' },
        metadata: { theme: 'light' },
      });
      expect(byId(tokens, 'v-color:t2').value).toMatchObject({ value: '#000000ff' });
      expect(byId(tokens, 'v-font-size:d1')).toMatchObject({
        type: TokenTypeEnum.FontSize,
        value: { type: 'number', value: 14, unit: 'px' },
        metadata: { device: 'mobile' },
      });
      expect(byId(tokens, 'v-font-size:d2').metadata.device).toBe('desktop');
    });

    it('should keep a color alias to an exported token as a reference carrying the resolved value', async () => {
      const { tokens } = await fetchTokens(createFetch());

      expect(byId(tokens, 'v-accent:t2').value).toEqual({
        type: 'reference',
        tokenId: 'v-color:t2',
        resolved: { type: 'color', format: 'hex', value: '#000000ff' },
      });
    });

    it('should resolve an alias to an unexported token to its value', async () => {
      const { tokens } = await fetchTokens(createFetch());

      expect(byId(tokens, 'v-accent:t1').value).toEqual({ type: 'color', format: 'hex', value: '#ff0000ff' });
      expect(byId(tokens, 'v-radius')).toMatchObject({
        type: TokenTypeEnum.Radius,
        value: { type: 'number', value: 4, unit: 'px' },
      });
    });

    it('should hand over values the pipeline can resolve through an index of the collection', async () => {
      const { tokens } = await fetchTokens(createFetch());
      const index = createTokenIndex(tokens);
      const resolvable = [TokenTypeEnum.Color, TokenTypeEnum.Shadow, TokenTypeEnum.Gradient];

      tokens
        .filter((token) => resolvable.includes(token.type))
        .forEach((token) => {
          expect(() => resolveValueDeep(token.value, index)).not.toThrow();
        });
    });

    it('should map typography with a device-bound font size as a reference', async () => {
      const { tokens } = await fetchTokens(createFetch());
      const typography = byId(tokens, 'n1');

      expect(typography.type).toBe(TokenTypeEnum.Typography);
      expect(typography.metadata.groupPath).toEqual(['Typography']);
      expect(readTypography(typography.value)).toEqual({
        fontFamily: 'Inter',
        fontWeight: 'Bold',
        fontSize: { type: 'number', value: 14, unit: 'px' },
        lineHeight: { type: 'number', value: 20, unit: 'px' },
      });
      expect(typography.value).toMatchObject({
        value: { fontSize: { type: 'reference', tokenId: 'v-font-size:d1' } },
      });
    });

    it('should map effect styles to shadows and fills to gradients', async () => {
      const { tokens } = await fetchTokens(createFetch());

      expect(byId(tokens, 'n3')).toMatchObject({
        type: TokenTypeEnum.Shadow,
        value: {
          type: 'composite',
          value: {
            '0': {
              type: 'composite',
              value: {
                inset: { value: false },
                y: { value: 2, unit: 'px' },
                blur: { value: 4, unit: 'px' },
                spread: { value: 1, unit: 'px' },
                color: { value: '#00000033' },
              },
            },
          },
        },
      });
      expect(Object.keys((byId(tokens, 'n3').value as { value: object }).value)).toEqual(['0']);
      expect(byId(tokens, 'n4')).toMatchObject({
        type: TokenTypeEnum.Gradient,
        value: {
          value: {
            '0': {
              value: {
                type: { value: 'linear' },
                from: { value: { x: { value: 0 }, y: { value: 0.5 } } },
                to: { value: { x: { value: 1 }, y: { value: 0.5 } } },
              },
            },
          },
        },
      });
    });

    it('should exclude figma- tokens and Link typography', async () => {
      const { tokens } = await fetchTokens(createFetch());

      expect(tokens.map((token) => token.id)).not.toEqual(expect.arrayContaining(['v-internal', 'n2']));
    });

    it('should derive the groups of the token paths', async () => {
      const { groups } = await fetchTokens(createFetch());

      expect(groups).toEqual(
        expect.arrayContaining([
          { id: 'Spacing', name: 'Spacing', path: [], parentId: undefined },
          { id: 'Typography', name: 'Typography', path: [], parentId: undefined },
        ]),
      );
    });

    it('should report skipped collections and unused styles as warnings', async () => {
      const onWarning = jest.fn();

      await fetchTokens(createFetch(), onWarning);

      expect(onWarning).toHaveBeenCalledWith(expect.stringContaining('Skipping collection "Primitives"'));
      expect(onWarning).toHaveBeenCalledWith(expect.stringContaining('Skipping unused effect style Shadow/Unused'));
    });

    it('should skip remote variables and warn about deleted ones', async () => {
      const onWarning = jest.fn();
      const variables = createVariables();
      variables.push(
        variable({
          id: 'v-remote',
          name: 'Spacing/900',
          resolvedType: 'FLOAT',
          variableCollectionId: 'c-global',
          valuesByMode: { g1: 1 },
          scopes: ['GAP'],
          remote: true,
        }),
        variable({
          id: 'v-deleted',
          name: 'Spacing/950',
          resolvedType: 'FLOAT',
          variableCollectionId: 'c-global',
          valuesByMode: { g1: 1 },
          scopes: ['GAP'],
          deletedButReferenced: true,
        }),
      );

      const { tokens } = await fetchTokens(createFetch({ variables }), onWarning);

      expect(tokens.map((token) => token.id)).not.toEqual(expect.arrayContaining(['v-remote', 'v-deleted']));
      expect(onWarning).toHaveBeenCalledWith('Skipping deleted variable "Spacing/950".');
    });

    it('should fail with one aggregated report for every problem of the file', async () => {
      const variables = createVariables();
      variables.push(
        variable({
          id: 'v-missing',
          name: 'Spacing/200',
          resolvedType: 'FLOAT',
          variableCollectionId: 'c-global',
          valuesByMode: { g1: { type: 'VARIABLE_ALIAS', id: 'nope' } },
          scopes: ['GAP'],
        }),
        variable({
          id: 'v-ambiguous',
          name: 'Spacing/300',
          resolvedType: 'FLOAT',
          variableCollectionId: 'c-global',
          valuesByMode: { g1: 4 },
          scopes: ['GAP', 'CORNER_RADIUS'],
        }),
        variable({
          id: 'v-cycle-a',
          name: 'Spacing/400',
          resolvedType: 'FLOAT',
          variableCollectionId: 'c-global',
          valuesByMode: { g1: { type: 'VARIABLE_ALIAS', id: 'v-cycle-b' } },
          scopes: ['GAP'],
        }),
        variable({
          id: 'v-cycle-b',
          name: 'Spacing/500',
          resolvedType: 'FLOAT',
          variableCollectionId: 'c-global',
          valuesByMode: { g1: { type: 'VARIABLE_ALIAS', id: 'v-cycle-a' } },
          scopes: ['GAP'],
        }),
      );

      const result = fetchTokens(createFetch({ variables }));

      await expect(result).rejects.toThrow(FigmaExportError);
      await expect(result).rejects.toThrow(/aliases missing variable nope/);
      await expect(result).rejects.toThrow(/ambiguous scopes: GAP, CORNER_RADIUS/);
      await expect(result).rejects.toThrow(/Alias cycle detected/);
    });

    it('should fail without an access token', async () => {
      await expect(new FigmaAdapter().fetchTokens({ source: { fileKey: 'FILE' } })).rejects.toThrow(FigmaApiError);
    });

    it('should fail when the Figma API rejects a request', async () => {
      await expect(fetchTokens(createFetch({ failOn: '/variables/local' }))).rejects.toThrow(/403/);
    });
  });
});
