import { type DesignToken, type TokenValue, TokenTypeEnum } from '../../../core/types';
import { isAlias, isRgba, rawValue, resolveVariableValue } from '../aliases';
import { classifyVariable, isExcludedToken } from '../conventions';
import { splitPath } from '../naming';
import type { FigmaCollection, FigmaVariable, FigmaVariableValue } from '../types';
import { buildDesignToken, mapColor, mapNumber, tokenIdFor, withReference, type MapContext } from './context';

const NUMERIC_STRING = /^-?\d+(\.\d+)?$/;

const mapValue = (type: TokenTypeEnum, unit: string | undefined, raw: FigmaVariableValue | undefined) => {
  if (raw === undefined) {
    return undefined;
  }

  if (type === TokenTypeEnum.Color) {
    return isRgba(raw) ? mapColor(raw) : undefined;
  }

  if (type === TokenTypeEnum.String) {
    return typeof raw === 'string' ? ({ type: 'string', value: raw } satisfies TokenValue) : undefined;
  }

  if (typeof raw === 'number') {
    return mapNumber(raw, unit);
  }

  return typeof raw === 'string' && NUMERIC_STRING.test(raw.trim()) ? mapNumber(Number(raw)) : undefined;
};

/**
 * Maps one variable in one mode to a token. Reports problems to the diagnostics and returns `undefined` for
 * variables that are not exported.
 *
 * @param variable
 * @param collection
 * @param modeId
 * @param context
 * @param modeNames - The theme or device the mode stands for
 * @param modeNames.theme
 * @param modeNames.device
 */
export const mapVariable = (
  variable: FigmaVariable,
  collection: FigmaCollection,
  modeId: string,
  context: MapContext,
  { theme, device }: { theme?: string; device?: string },
): DesignToken | undefined => {
  const { diagnostics, variablesById } = context;
  const classification = classifyVariable(variable, diagnostics);

  if (!classification) {
    return undefined;
  }

  const path = splitPath(variable.name);

  if (path.length === 0) {
    diagnostics.error(`Variable ${variable.id} has an empty name.`);

    return undefined;
  }

  if (isExcludedToken(path, classification.type)) {
    return undefined;
  }

  const resolved = mapValue(
    classification.type,
    classification.unit,
    resolveVariableValue(variable, modeId, variablesById, diagnostics),
  );

  if (!resolved) {
    diagnostics.error(`Variable ${variable.name} could not be resolved for mode ${modeId}.`);

    return undefined;
  }

  const raw = rawValue(variable, modeId);

  return buildDesignToken(
    {
      id: tokenIdFor(variable, collection, modeId),
      path,
      type: classification.type,
      value: withReference(resolved, isAlias(raw) ? raw.id : undefined, context, modeId),
      originalId: variable.id,
      originalType: variable.resolvedType,
      description: variable.description,
      theme,
      device,
    },
    context,
  );
};
