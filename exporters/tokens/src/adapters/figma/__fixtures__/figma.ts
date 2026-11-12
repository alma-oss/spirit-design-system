/** Responses of the Figma REST API for a small Config file, shared by the adapter tests. */

const WHITE = { r: 1, g: 1, b: 1, a: 1 };
const BLACK = { r: 0, g: 0, b: 0, a: 1 };

export type RestVariable = {
  id: string;
  name: string;
  resolvedType: 'COLOR' | 'FLOAT' | 'STRING';
  variableCollectionId: string;
  valuesByMode: Record<string, unknown>;
  scopes?: string[];
  remote?: boolean;
  deletedButReferenced?: boolean;
};

export const variable = (overrides: RestVariable) => ({ key: `key-${overrides.id}`, scopes: [], ...overrides });

export const createVariables = (): RestVariable[] => [
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

export const createCollections = () => [
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

const typographyNode = (id: string, name: string, extra = {}) => ({
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

export const NODES = {
  n1: {
    document: typographyNode('n1', 'Typography/Body', {
      boundVariables: { fontSize: { type: 'VARIABLE_ALIAS', id: 'v-font-size' } },
    }),
  },
  n2: { document: typographyNode('n2', 'Typography/Body Link') },
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

export const createFigmaFetch = ({
  variables = createVariables(),
  collections = createCollections(),
  nodes = NODES,
  failOn,
}: {
  variables?: RestVariable[];
  collections?: ReturnType<typeof createCollections>;
  nodes?: Record<string, unknown>;
  failOn?: string;
} = {}): jest.Mock => {
  const respond = (body: unknown, ok = true) =>
    Promise.resolve({ ok, status: ok ? 200 : 403, statusText: 'x', json: async () => body });

  return jest.fn((url: string) => {
    if (failOn && url.includes(failOn)) {
      return respond({}, false);
    }

    if (url.includes('/variables/local')) {
      return respond({
        meta: {
          variableCollections: toRecord(collections),
          variables: toRecord(variables.map((item) => variable(item))),
        },
      });
    }

    if (url.includes('/styles')) {
      return respond({ meta: { styles: STYLES } });
    }

    if (url.includes('/nodes')) {
      return respond({ nodes });
    }

    return respond({ name: 'SPIRIT (Config)' });
  });
};

export const FILE = { key: 'FILE', name: 'SPIRIT (Config)' };
export const NO_VARIABLES = { meta: { variableCollections: {}, variables: {} } };

export const textMeta = (id: string) => ({
  key: `key-${id}`,
  name: `Typography/${id}`,
  node_id: id,
  style_type: 'TEXT',
});

export const textNode = (id: string, style: Record<string, unknown> = {}, extra: Record<string, unknown> = {}) => ({
  id,
  name: `Typography/${id}`,
  type: 'TEXT',
  style: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'Bold', ...style },
  ...extra,
});
