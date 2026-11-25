import { type CollectionKind, type DesignToken, type TokenValue, TokenTypeEnum } from '../../../core/types';
import { mapNumber } from './valueBuilders';
import { isAlias, isRgba, rawValue, resolveVariableValue } from '../aliases';
import { classifyVariable } from '../conventions';
import { splitPath } from '../naming';
import type { FigmaVariable, FigmaVariableValue } from '../types';
import { buildDesignToken, mapColor, withReference, type MapContext } from './context';

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

  return typeof raw === 'number' ? mapNumber(raw, unit) : undefined;
};

/**
 * Maps one variable in one mode to a token. Reports problems to the diagnostics and returns `undefined` for
 * variables that are not exported.
 *
 * @param variable
 * @param modeId
 * @param context
 * @param tokenMetadata - What the token is tagged with: the kind of its collection, and the theme or device the mode
 *   stands for
 * @param tokenMetadata.collection
 * @param tokenMetadata.theme
 * @param tokenMetadata.device
 */
export const mapVariable = (
  variable: FigmaVariable,
  modeId: string,
  context: MapContext,
  { collection, theme, device }: { collection: CollectionKind; theme?: string; device?: string },
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
      id: variable.id,
      path,
      type: classification.type,
      // Only colors keep the alias: numbers and strings are plain values in the model, like Supernova hands them over.
      value:
        classification.type === TokenTypeEnum.Color
          ? withReference(resolved, isAlias(raw) ? raw.id : undefined)
          : resolved,
      originalId: variable.id,
      originalType: variable.resolvedType,
      collection,
      description: variable.description,
      theme,
      device,
    },
    context,
  );
};
