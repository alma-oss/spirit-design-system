import { TokenTypeEnum } from '../../core/types';
import { PX_UNIT } from '../../constants';
import { COLLECTION_DEVICE, COLLECTION_GLOBAL, COLLECTION_THEME, CSS_VARIABLE_PREFIX } from './constants';
import type { DiagnosticCollector } from './diagnostics';
import { splitPath, toParamCase } from './naming';
import type { FigmaVariable, FigmaVariableScope } from './types';

/**
 * The Figma Config file contract: only these collections are exported, the rest (Primitives, remote Brand, ...) only
 * serve as alias sources.
 */
export type CollectionFamily = 'global' | 'theme' | 'device' | 'other';

export type VariableClassification = {
  type: TokenTypeEnum;
  /** `px` for dimensions, none for unitless values. Never `rem`: the px-to-rem rule owns that conversion. */
  unit?: string;
};

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

// Strings that only feed text styles; they are not tokens of their own.
const STYLE_BINDING_STRING_SCOPES: FigmaVariableScope[] = ['FONT_FAMILY', 'FONT_STYLE', 'FONT_WEIGHT', 'TEXT_CONTENT'];

const PX_NAME_PATTERN = /(width|height|size|padding|spacing|radius|breakpoint|gap|border)/i;

const SCOPE_TYPES: Partial<Record<FigmaVariableScope, TokenTypeEnum>> = {
  FONT_SIZE: TokenTypeEnum.FontSize,
  LINE_HEIGHT: TokenTypeEnum.LineHeight,
  LETTER_SPACING: TokenTypeEnum.LetterSpacing,
  CORNER_RADIUS: TokenTypeEnum.Radius,
  GAP: TokenTypeEnum.Space,
  STROKE_FLOAT: TokenTypeEnum.BorderWidth,
};

const GROUP_TYPES: Record<string, TokenTypeEnum> = {
  border: TokenTypeEnum.BorderWidth,
  borders: TokenTypeEnum.BorderWidth,
  radius: TokenTypeEnum.Radius,
  radii: TokenTypeEnum.Radius,
  spacing: TokenTypeEnum.Space,
  space: TokenTypeEnum.Space,
  spaces: TokenTypeEnum.Space,
};

export const collectionFamily = (name: string): CollectionFamily => {
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

/**
 * Infers the semantic token type (and unit) of a Figma variable: Figma only has four generic variable types, the
 * rest comes from the variable's scopes and the group it lives in. Reports ambiguous or conflicting definitions.
 *
 * @param variable
 * @param diagnostics
 */
export const classifyVariable = (
  variable: FigmaVariable,
  diagnostics: DiagnosticCollector,
): VariableClassification | undefined => {
  if (variable.resolvedType === 'BOOLEAN') {
    diagnostics.warn(`Skipping boolean variable ${variable.name}.`);

    return undefined;
  }

  if (variable.resolvedType === 'COLOR') {
    const hasFillScope = variable.scopes.some((scope) => FILL_SCOPES.includes(scope) || scope === 'ALL_SCOPES');

    if (variable.scopes.length > 0 && !hasFillScope) {
      diagnostics.error(`Color variable ${variable.name} has non-color scopes: ${variable.scopes.join(', ')}.`);
    }

    return { type: TokenTypeEnum.Color };
  }

  if (variable.resolvedType === 'STRING') {
    const isPrefix = splitPath(variable.name).at(-1) === CSS_VARIABLE_PREFIX;
    const isStyleBinding = variable.scopes.some((scope) => STYLE_BINDING_STRING_SCOPES.includes(scope));

    if (isStyleBinding && !isPrefix && !variable.scopes.includes('ALL_SCOPES')) {
      return undefined;
    }

    return { type: TokenTypeEnum.String };
  }

  const typeScopes = [...new Set(variable.scopes.filter((scope) => TYPE_SCOPES.includes(scope)))];

  if (typeScopes.length > 1) {
    diagnostics.error(`Variable ${variable.name} has ambiguous scopes: ${typeScopes.join(', ')}.`);

    return undefined;
  }

  const path = splitPath(variable.name);
  const leaf = toParamCase(path.at(-1) ?? '');

  if (variable.scopes.includes('WIDTH_HEIGHT') && leaf === 'max-width') {
    return { type: TokenTypeEnum.Size, unit: PX_UNIT };
  }

  const groupType = GROUP_TYPES[toParamCase(path[0] ?? '')];
  const scopeType = typeScopes[0] ? SCOPE_TYPES[typeScopes[0]] : undefined;

  if (scopeType && groupType && scopeType !== groupType) {
    diagnostics.error(
      `Variable ${variable.name} has conflicting type from scope (${scopeType}) and path group (${groupType}).`,
    );

    return undefined;
  }

  const type = scopeType ?? groupType ?? TokenTypeEnum.Dimension;
  const isPixel =
    type !== TokenTypeEnum.Dimension || PX_NAME_PATTERN.test(variable.name) || variable.scopes.includes('WIDTH_HEIGHT');

  return { type, unit: isPixel ? PX_UNIT : undefined };
};

/**
 * Internal `figma-*` tokens, and typography styles marked `Link` or `Italic` (italics are applied in products with
 * the `.text-italic` helper) never reach the output.
 *
 * @param path
 * @param type
 */
export const isExcludedToken = (path: string[], type: TokenTypeEnum): boolean => {
  if (path.join('/').toLowerCase().includes('figma-')) {
    return true;
  }

  return type === TokenTypeEnum.Typography && path.some((part) => part.includes('Link') || part.includes('Italic'));
};
