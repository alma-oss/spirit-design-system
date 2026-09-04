import type { FigmaCaptureApi } from '../src/capture/figmaApi';
import { captureSnapshot } from '../src/capture/serialize';
import type {
  SnapshotCollection,
  SnapshotEffectStyle,
  SnapshotPaintStyle,
  SnapshotTextStyle,
  SnapshotVariable,
} from '../src/snapshot/types';

declare const __html__: string;

const serializeCollection = (collection: VariableCollection): SnapshotCollection => ({
  id: collection.id,
  name: collection.name,
  key: collection.key,
  hiddenFromPublishing: collection.hiddenFromPublishing,
  defaultModeId: collection.defaultModeId,
  modes: collection.modes.map((mode) => ({ id: mode.modeId, name: mode.name })),
  variableIds: [...collection.variableIds],
});

const serializeVariable = (variable: Variable): SnapshotVariable => ({
  id: variable.id,
  name: variable.name,
  key: variable.key,
  collectionId: variable.variableCollectionId,
  resolvedType: variable.resolvedType,
  valuesByMode: { ...variable.valuesByMode } as SnapshotVariable['valuesByMode'],
  scopes: [...(variable.scopes as SnapshotVariable['scopes'])],
  remote: variable.remote,
  hiddenFromPublishing: variable.hiddenFromPublishing,
  codeSyntax: { ...variable.codeSyntax },
  description: variable.description,
});

const serializeBoundVariables = (
  boundVariables: Record<string, unknown> | undefined,
): Record<string, { type: 'VARIABLE_ALIAS'; id: string }> | undefined => {
  if (!boundVariables) {
    return undefined;
  }

  const serialized: Record<string, { type: 'VARIABLE_ALIAS'; id: string }> = {};

  for (const [key, value] of Object.entries(boundVariables)) {
    if (value && typeof value === 'object' && 'id' in value && typeof (value as { id: unknown }).id === 'string') {
      serialized[key] = { type: 'VARIABLE_ALIAS', id: (value as { id: string }).id };
    }
  }

  return Object.keys(serialized).length > 0 ? serialized : undefined;
};

const serializeTextStyle = (style: TextStyle): SnapshotTextStyle => ({
  type: 'TEXT',
  id: style.id,
  name: style.name,
  key: style.key,
  remote: style.remote,
  fontSize: style.fontSize,
  fontName: {
    family: style.fontName.family,
    style: style.fontName.style,
  },
  fontWeight:
    typeof (style as TextStyle & { fontWeight?: number }).fontWeight === 'number'
      ? (style as TextStyle & { fontWeight?: number }).fontWeight
      : undefined,
  letterSpacing: {
    unit: style.letterSpacing.unit,
    value: style.letterSpacing.value,
  },
  lineHeight:
    style.lineHeight.unit === 'AUTO'
      ? { unit: 'AUTO' }
      : { unit: style.lineHeight.unit, value: style.lineHeight.value },
  boundVariables: serializeBoundVariables(style.boundVariables as Record<string, unknown> | undefined),
});

const serializePaintStyle = (style: PaintStyle): SnapshotPaintStyle => ({
  type: 'PAINT',
  id: style.id,
  name: style.name,
  key: style.key,
  remote: style.remote,
  paints: style.paints.map((paint) => {
    const serialized = JSON.parse(JSON.stringify(paint)) as SnapshotPaintStyle['paints'][number];
    const boundVariables = serializeBoundVariables(paint.boundVariables as Record<string, unknown> | undefined);

    if (boundVariables) {
      serialized.boundVariables = boundVariables;
    }

    return serialized;
  }),
});

const serializeEffectStyle = (style: EffectStyle): SnapshotEffectStyle => ({
  type: 'EFFECT',
  id: style.id,
  name: style.name,
  key: style.key,
  remote: style.remote,
  effects: style.effects.map((effect) => {
    const serialized = JSON.parse(JSON.stringify(effect)) as SnapshotEffectStyle['effects'][number];
    const boundVariables = serializeBoundVariables(effect.boundVariables as Record<string, unknown> | undefined);

    if (boundVariables) {
      serialized.boundVariables = boundVariables;
    }

    return serialized;
  }),
});

const createPluginFigmaApi = (plugin: PluginAPI): FigmaCaptureApi => ({
  fileKey: plugin.fileKey ?? '',
  fileName: plugin.root.name,
  getLocalVariableCollectionsAsync: async () =>
    (await plugin.variables.getLocalVariableCollectionsAsync()).map(serializeCollection),
  getLocalVariablesAsync: async () => (await plugin.variables.getLocalVariablesAsync()).map(serializeVariable),
  getLocalTextStylesAsync: async () => (await plugin.getLocalTextStylesAsync()).map(serializeTextStyle),
  getLocalPaintStylesAsync: async () => (await plugin.getLocalPaintStylesAsync()).map(serializePaintStyle),
  getLocalEffectStylesAsync: async () => (await plugin.getLocalEffectStylesAsync()).map(serializeEffectStyle),
  getVariableByIdAsync: async (id: string) => {
    try {
      const variable = await plugin.variables.getVariableByIdAsync(id);

      return variable ? serializeVariable(variable) : null;
    } catch {
      return null;
    }
  },
});

figma.showUI(__html__, { width: 360, height: 420 });

figma.ui.onmessage = async (message: { type?: string }) => {
  if (message.type !== 'export-snapshot') {
    return;
  }

  try {
    const snapshot = await captureSnapshot(createPluginFigmaApi(figma));
    const json = `${JSON.stringify(snapshot, null, 2)}\n`;
    const safeName = snapshot.file.name.replace(/[^\w.-]+/g, '-') || 'figma-tokens';

    figma.ui.postMessage({
      type: 'snapshot',
      json,
      fileName: `${safeName}.figma-tokens.snapshot.json`,
      summary: `Captured ${snapshot.variables.length} local variables, ${snapshot.dependencies.length} dependencies, and ${snapshot.styles.length} styles.`,
    });
  } catch (error) {
    figma.ui.postMessage({
      type: 'snapshot-error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
