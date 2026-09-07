import type { FigmaVariableScope, SnapshotVariable } from '../snapshot/types';
import { splitPath, toParamCase } from './naming';
import type { DiagnosticCollector, TokenFamily, TokenKind, TokenUnit } from './types';

export const COLLECTION_GLOBAL = 'Global tokens';
export const COLLECTION_THEME = 'Theme tokens';
export const COLLECTION_DEVICE = 'Device';

export const DEVICE_MODE_ORDER = ['mobile', 'tablet', 'desktop'];

const TYPE_SCOPES: FigmaVariableScope[] = [
  'FONT_SIZE',
  'LINE_HEIGHT',
  'LETTER_SPACING',
  'CORNER_RADIUS',
  'GAP',
  'STROKE_FLOAT',
];

const FILL_SCOPES: FigmaVariableScope[] = [
  'ALL_FILLS',
  'FRAME_FILL',
  'SHAPE_FILL',
  'TEXT_FILL',
  'STROKE_COLOR',
  'STROKE',
  'EFFECT_COLOR',
];

const STYLE_BINDING_STRING_SCOPES: FigmaVariableScope[] = ['FONT_FAMILY', 'FONT_STYLE', 'FONT_WEIGHT', 'TEXT_CONTENT'];

const PX_NAME_PATTERN = /(width|height|size|padding|spacing|radius|breakpoint|gap|border)/i;

export const collectionFamily = (name: string): TokenFamily => {
  if (name === COLLECTION_GLOBAL) {
    return 'global';
  }

  if (name === COLLECTION_THEME) {
    return 'theme';
  }

  if (name === COLLECTION_DEVICE) {
    return 'device';
  }

  return 'other';
};

const kindFromScope = (scope: FigmaVariableScope): TokenKind | undefined => {
  switch (scope) {
    case 'FONT_SIZE':
      return 'fontSize';
    case 'LINE_HEIGHT':
      return 'lineHeight';
    case 'LETTER_SPACING':
      return 'letterSpacing';
    case 'CORNER_RADIUS':
      return 'radius';
    case 'GAP':
      return 'space';
    case 'STROKE_FLOAT':
      return 'borderWidth';
    default:
      return undefined;
  }
};

const kindFromGroup = (group: string): TokenKind | undefined => {
  const name = toParamCase(group);

  if (name === 'border' || name === 'borders') {
    return 'borderWidth';
  }

  if (name === 'radius' || name === 'radii') {
    return 'radius';
  }

  if (name === 'spacing' || name === 'space' || name === 'spaces') {
    return 'space';
  }

  return undefined;
};

export const classifyVariable = (
  variable: SnapshotVariable,
  diagnostics: DiagnosticCollector,
): { kind: TokenKind; unit: TokenUnit } | undefined => {
  if (variable.resolvedType === 'BOOLEAN') {
    diagnostics.warn(`Skipping boolean variable ${variable.name}.`);

    return undefined;
  }

  if (variable.resolvedType === 'COLOR') {
    const fillScopes = variable.scopes.filter((scope) => FILL_SCOPES.includes(scope) || scope === 'ALL_SCOPES');

    if (variable.scopes.length > 0 && fillScopes.length === 0 && !variable.scopes.includes('ALL_SCOPES')) {
      diagnostics.error(`Color variable ${variable.name} has non-color scopes: ${variable.scopes.join(', ')}.`);
    }

    return { kind: 'color', unit: 'none' };
  }

  if (variable.resolvedType === 'STRING') {
    const leaf = splitPath(variable.name).at(-1);
    const isPrefix = leaf === 'css-variable-prefix';
    const isStyleBinding = variable.scopes.some((scope) => STYLE_BINDING_STRING_SCOPES.includes(scope));

    if (isStyleBinding && !isPrefix && !variable.scopes.includes('ALL_SCOPES')) {
      return undefined;
    }

    return { kind: 'string', unit: 'none' };
  }

  const typeScopes = [...new Set(variable.scopes.filter((scope) => TYPE_SCOPES.includes(scope)))];

  if (typeScopes.length > 1) {
    diagnostics.error(`Variable ${variable.name} has ambiguous scopes: ${typeScopes.join(', ')}.`);

    return undefined;
  }

  const path = splitPath(variable.name);
  const leaf = toParamCase(path.at(-1) ?? '');

  if (variable.scopes.includes('WIDTH_HEIGHT') && leaf === 'max-width') {
    return { kind: 'size', unit: 'px' };
  }

  const groupKind = kindFromGroup(path[0] ?? '');
  const scopeKind = typeScopes[0] ? kindFromScope(typeScopes[0]) : undefined;

  if (scopeKind && groupKind && scopeKind !== groupKind) {
    diagnostics.error(
      `Variable ${variable.name} has conflicting type from scope (${scopeKind}) and path group (${groupKind}).`,
    );

    return undefined;
  }

  const kind = scopeKind ?? groupKind ?? 'dimension';
  const isPixel =
    kind !== 'dimension' || PX_NAME_PATTERN.test(variable.name) || variable.scopes.includes('WIDTH_HEIGHT');

  return {
    kind,
    unit: isPixel ? 'px' : 'none',
  };
};

export const isExcludedToken = (path: string[], kind: TokenKind): boolean => {
  const joined = path.join('/');

  if (joined.toLowerCase().includes('figma-')) {
    return true;
  }

  if (kind !== 'typography') {
    return false;
  }

  return path.some((part) => part.includes('Link') || part.includes('Italic'));
};

export const tokenGroup = (path: string[]): string => toParamCase(path[0] ?? '');
