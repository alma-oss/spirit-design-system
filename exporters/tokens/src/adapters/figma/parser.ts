import { FigmaExportError } from './FigmaExportError';
import type {
  FigmaRgba,
  FigmaVariableScope,
  FigmaVariableValue,
  FigmaEffect,
  FigmaLineHeight,
  FigmaPaint,
  FigmaSource,
  FigmaStyle,
  FigmaVariable,
} from './types';

interface RestMode {
  modeId: string;
  name: string;
}

interface RestCollection {
  defaultModeId: string;
  hiddenFromPublishing?: boolean;
  id: string;
  key: string;
  modes: RestMode[];
  name: string;
  variableIds?: string[];
}

interface RestVariable {
  codeSyntax?: Record<string, string>;
  description?: string;
  hiddenFromPublishing?: boolean;
  id: string;
  key: string;
  name: string;
  deletedButReferenced?: boolean;
  remote?: boolean;
  resolvedType: FigmaVariable['resolvedType'];
  scopes?: FigmaVariableScope[];
  valuesByMode: Record<string, FigmaVariableValue>;
  variableCollectionId: string;
}

export interface VariablesResponse {
  meta: {
    variableCollections: Record<string, RestCollection>;
    variables: Record<string, RestVariable>;
  };
}

interface RestStyleMeta {
  key: string;
  name: string;
  node_id: string;
  style_type: string;
}

export interface StylesResponse {
  meta: {
    styles: RestStyleMeta[];
  };
}

export interface FileResponse {
  name: string;
}

interface RestNode {
  boundVariables?: Record<string, unknown>;
  effects?: FigmaEffect[];
  fills?: FigmaPaint[];
  id: string;
  name: string;
  style?: {
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: string;
    fontWeight?: number;
    letterSpacing?: number;
    lineHeightPercent?: number;
    lineHeightPercentFontSize?: number;
    lineHeightPx?: number;
    lineHeightUnit?: string;
  };
  type: string;
}

export interface NodesResponse {
  nodes: Record<string, { document?: RestNode } | null>;
}

export const STYLE_TYPES = new Set(['TEXT', 'FILL', 'EFFECT']);

const aliasFrom = (value: unknown): { type: 'VARIABLE_ALIAS'; id: string } | undefined => {
  if (Array.isArray(value)) {
    return aliasFrom(value[0]);
  }

  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const record = value as { id?: unknown; type?: unknown };

  if (record.type === 'VARIABLE_ALIAS' && typeof record.id === 'string') {
    return { type: 'VARIABLE_ALIAS', id: record.id };
  }

  return undefined;
};

const boundVariablesFrom = (value: unknown): Record<string, { type: 'VARIABLE_ALIAS'; id: string }> | undefined => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }

  const bound: Record<string, { type: 'VARIABLE_ALIAS'; id: string }> = {};

  Object.entries(value as Record<string, unknown>).forEach(([key, entry]) => {
    const alias = aliasFrom(entry);

    if (alias) {
      bound[key] = alias;
    }
  });

  return Object.keys(bound).length > 0 ? bound : undefined;
};

const lineHeightFrom = (style: NonNullable<RestNode['style']>): FigmaLineHeight => {
  if (style.lineHeightUnit === 'PIXELS' && typeof style.lineHeightPx === 'number') {
    return { unit: 'PIXELS', value: style.lineHeightPx };
  }

  const percent = style.lineHeightPercentFontSize ?? style.lineHeightPercent;

  if (style.lineHeightUnit !== 'PIXELS' && typeof percent === 'number') {
    return { unit: 'PERCENT', value: percent };
  }

  return { unit: 'AUTO' };
};

const paintFrom = (fill: FigmaPaint): FigmaPaint => ({
  type: fill.type,
  visible: fill.visible,
  opacity: fill.opacity,
  color: fill.color,
  gradientHandlePositions: fill.gradientHandlePositions,
  gradientStops: fill.gradientStops?.map((stop) => ({
    position: stop.position,
    color: stop.color as FigmaRgba,
    boundVariables: stop.boundVariables,
  })),
  boundVariables: fill.boundVariables,
});

const styleFromNode = (meta: RestStyleMeta, node: RestNode): FigmaStyle | undefined => {
  if (meta.style_type === 'TEXT') {
    const { style } = node;

    if (!style || typeof style.fontSize !== 'number' || !style.fontFamily) {
      return undefined;
    }

    return {
      type: 'TEXT',
      id: node.id,
      name: meta.name,
      key: meta.key,
      remote: false,
      fontSize: style.fontSize,
      fontName: {
        family: style.fontFamily,
        style: style.fontStyle ?? '',
      },
      fontWeight: style.fontWeight,
      letterSpacing: {
        unit: 'PIXELS',
        value: style.letterSpacing ?? 0,
      },
      lineHeight: lineHeightFrom(style),
      boundVariables: boundVariablesFrom(node.boundVariables),
    };
  }

  if (meta.style_type === 'FILL') {
    return {
      type: 'PAINT',
      id: node.id,
      name: meta.name,
      key: meta.key,
      remote: false,
      paints: (node.fills ?? []).map(paintFrom),
    };
  }

  if (meta.style_type === 'EFFECT') {
    return {
      type: 'EFFECT',
      id: node.id,
      name: meta.name,
      key: meta.key,
      remote: false,
      effects: node.effects ?? [],
    };
  }

  return undefined;
};

export const toFigmaSource = (
  file: { key: string; name: string },
  variablesResponse: VariablesResponse,
  styles: RestStyleMeta[],
  nodes: NodesResponse['nodes'],
): FigmaSource => {
  const collections = Object.values(variablesResponse.meta.variableCollections).map((collection) => ({
    id: collection.id,
    name: collection.name,
    key: collection.key,
    hiddenFromPublishing: Boolean(collection.hiddenFromPublishing),
    defaultModeId: collection.defaultModeId,
    modes: collection.modes.map((mode) => ({ id: mode.modeId, name: mode.name })),
    variableIds: collection.variableIds ?? [],
  }));
  const collectionsById = new Map(collections.map((collection) => [collection.id, collection]));
  const missingStyles: string[] = [];
  const mappedStyles = styles.flatMap((meta) => {
    if (!STYLE_TYPES.has(meta.style_type)) {
      return [];
    }

    const node = nodes[meta.node_id]?.document;

    if (!node) {
      missingStyles.push(`Style ${meta.name} (${meta.node_id}) was not returned by the Figma nodes API.`);

      return [];
    }

    const style = styleFromNode(meta, node);

    if (!style) {
      missingStyles.push(
        `Style ${meta.name} (${meta.node_id}) did not include ${meta.style_type.toLowerCase()} properties.`,
      );

      return [];
    }

    return [style];
  });

  if (missingStyles.length > 0) {
    throw new FigmaExportError(`Figma token export failed:\n${missingStyles.map((item) => `- ${item}`).join('\n')}`);
  }

  return {
    file,
    collections,
    variables: Object.values(variablesResponse.meta.variables).map((variable) => ({
      id: variable.id,
      name: variable.name,
      key: variable.key,
      collectionId: variable.variableCollectionId,
      defaultModeId: collectionsById.get(variable.variableCollectionId)?.defaultModeId ?? '',
      resolvedType: variable.resolvedType,
      valuesByMode: variable.valuesByMode,
      scopes: variable.scopes ?? [],
      remote: Boolean(variable.remote),
      hiddenFromPublishing: Boolean(variable.hiddenFromPublishing),
      deletedButReferenced: Boolean(variable.deletedButReferenced),
      codeSyntax: variable.codeSyntax ?? {},
      description: variable.description ?? '',
    })),
    styles: mappedStyles,
  };
};
