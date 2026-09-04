import {
  SNAPSHOT_SCHEMA_VERSION,
  type FigmaVariableAlias,
  type SnapshotStyle,
  type SnapshotV1,
  type SnapshotVariable,
} from '../snapshot/types';
import type { FigmaCaptureApi } from './figmaApi';

const isAlias = (value: unknown): value is FigmaVariableAlias =>
  typeof value === 'object' && value !== null && (value as FigmaVariableAlias).type === 'VARIABLE_ALIAS';

const collectVariableAliasIds = (variables: SnapshotVariable[]): string[] => {
  const ids = new Set<string>();

  for (const variable of variables) {
    for (const value of Object.values(variable.valuesByMode)) {
      if (isAlias(value)) {
        ids.add(value.id);
      }
    }
  }

  return [...ids];
};

const collectStyleAliasIds = (styles: SnapshotStyle[]): string[] => {
  const ids = new Set<string>();
  const add = (alias: unknown): void => {
    if (isAlias(alias)) {
      ids.add(alias.id);
    }
  };

  for (const style of styles) {
    if (style.type === 'TEXT') {
      Object.values(style.boundVariables ?? {}).forEach(add);
      continue;
    }

    if (style.type === 'PAINT') {
      for (const paint of style.paints) {
        add(paint.boundVariables?.color);
        paint.gradientStops?.forEach((stop) => add(stop.boundVariables?.color));
      }
      continue;
    }

    for (const effect of style.effects) {
      add(effect.boundVariables?.color);
      add(effect.boundVariables?.radius);
      add(effect.boundVariables?.spread);
      add(effect.boundVariables?.offsetX);
      add(effect.boundVariables?.offsetY);
    }
  }

  return [...ids];
};

export const captureSnapshot = async (api: FigmaCaptureApi): Promise<SnapshotV1> => {
  const collections = await api.getLocalVariableCollectionsAsync();
  const variables = await api.getLocalVariablesAsync();
  const textStyles = await api.getLocalTextStylesAsync();
  const paintStyles = await api.getLocalPaintStylesAsync();
  const effectStyles = await api.getLocalEffectStylesAsync();
  const knownIds = new Set(variables.map((variable) => variable.id));
  const dependencies: SnapshotVariable[] = [];
  const diagnostics: SnapshotV1['diagnostics'] = [];
  const pending = [...collectVariableAliasIds(variables), ...collectStyleAliasIds([...textStyles, ...paintStyles, ...effectStyles])];

  while (pending.length > 0) {
    const id = pending.pop();

    if (!id || knownIds.has(id)) {
      continue;
    }

    knownIds.add(id);
    const variable = await api.getVariableByIdAsync(id);

    if (!variable) {
      diagnostics.push({
        level: 'warning',
        message: `Unable to resolve variable ${id} while collecting alias closure.`,
      });
      continue;
    }

    dependencies.push(variable);
    pending.push(...collectVariableAliasIds([variable]));
  }

  if (!api.fileKey.trim()) {
    diagnostics.push({
      level: 'warning',
      message: 'Figma did not expose a file key; set fileKey in the repository config.',
    });
  }

  return {
    schemaVersion: SNAPSHOT_SCHEMA_VERSION,
    capturedAt: api.now?.() ?? new Date().toISOString(),
    file: {
      key: api.fileKey,
      name: api.fileName,
    },
    collections,
    variables,
    styles: [...textStyles, ...paintStyles, ...effectStyles],
    dependencies,
    diagnostics,
  };
};
