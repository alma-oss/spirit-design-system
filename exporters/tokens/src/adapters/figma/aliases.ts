import type { DiagnosticCollector } from './diagnostics';
import type { FigmaRgba, FigmaVariable, FigmaVariableAlias, FigmaVariableValue } from './types';

export const isAlias = (value: FigmaVariableValue | undefined): value is FigmaVariableAlias =>
  typeof value === 'object' && value !== null && 'type' in value && value.type === 'VARIABLE_ALIAS';

export const isRgba = (value: FigmaVariableValue | undefined): value is FigmaRgba =>
  typeof value === 'object' && value !== null && 'r' in value && !('type' in value);

export const indexVariables = (variables: FigmaVariable[]): Map<string, FigmaVariable> =>
  new Map(variables.map((variable) => [variable.id, variable]));

/**
 * The raw value of a variable in a mode. A mode the variable has no own value for falls back to its default mode.
 *
 * @param variable
 * @param modeId
 */
export const rawValue = (variable: FigmaVariable, modeId: string): FigmaVariableValue | undefined =>
  variable.valuesByMode[modeId] ?? variable.valuesByMode[variable.defaultModeId];

/**
 * Follows the alias chain of a variable in a mode to a concrete value. Reports a missing value, a missing alias
 * target and a cycle instead of throwing, so one run reports all of them.
 *
 * @param variable
 * @param modeId
 * @param variablesById
 * @param diagnostics
 * @param stack - Ids of the variables followed so far
 */
export const resolveVariableValue = (
  variable: FigmaVariable,
  modeId: string,
  variablesById: Map<string, FigmaVariable>,
  diagnostics: DiagnosticCollector,
  stack: string[] = [],
): FigmaVariableValue | undefined => {
  const raw = rawValue(variable, modeId);

  if (raw === undefined) {
    diagnostics.error(`Variable ${variable.name} (${variable.id}) has no value for mode ${modeId}.`);

    return undefined;
  }

  if (!isAlias(raw)) {
    return raw;
  }

  if (stack.includes(variable.id)) {
    diagnostics.error(`Alias cycle detected: ${[...stack, variable.id].join(' -> ')}`);

    return undefined;
  }

  const referenced = variablesById.get(raw.id);

  if (!referenced) {
    diagnostics.error(`Variable ${variable.name} aliases missing variable ${raw.id}.`);

    return undefined;
  }

  return resolveVariableValue(referenced, modeId, variablesById, diagnostics, [...stack, variable.id]);
};

export const resolvedValueToNumber = (value: FigmaVariableValue | undefined): number | undefined =>
  typeof value === 'number' ? value : undefined;
