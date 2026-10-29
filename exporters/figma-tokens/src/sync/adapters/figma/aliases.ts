import { rgbaToHex } from '../../../domain/color';
import type { DiagnosticCollector } from '../../../domain/types';
import type { FigmaVariableAlias, FigmaVariableValue, TokenVariable } from './model';

const isAlias = (value: FigmaVariableValue): value is FigmaVariableAlias =>
  typeof value === 'object' && value !== null && 'type' in value && value.type === 'VARIABLE_ALIAS';

const isRgba = (value: FigmaVariableValue): value is { r: number; g: number; b: number; a: number } =>
  typeof value === 'object' && value !== null && 'r' in value && !('type' in value);

export const indexVariables = (variables: TokenVariable[]): Map<string, TokenVariable> =>
  new Map(variables.map((variable) => [variable.id, variable]));

export const resolveVariableValue = (
  variable: TokenVariable,
  modeId: string,
  variablesById: Map<string, TokenVariable>,
  diagnostics: DiagnosticCollector,
  stack: string[] = [],
): FigmaVariableValue | undefined => {
  const raw = variable.valuesByMode[modeId] ?? variable.valuesByMode[variable.defaultModeId];

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

export const resolvedValueToHex = (value: FigmaVariableValue | undefined): string | undefined => {
  if (!value || !isRgba(value)) {
    return undefined;
  }

  return rgbaToHex(value);
};

export const resolvedValueToNumber = (value: FigmaVariableValue | undefined): number | undefined =>
  typeof value === 'number' ? value : undefined;

export const resolvedValueToString = (value: FigmaVariableValue | undefined): string | undefined =>
  typeof value === 'string' ? value : undefined;
