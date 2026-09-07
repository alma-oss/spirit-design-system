import type { FigmaVariableValue, SnapshotCollection, SnapshotTextStyle, SnapshotV1, SnapshotVariable } from '../snapshot/types';
import { indexVariables, resolveVariableValue, resolvedValueToNumber } from './aliases';
import { rgbaToHex } from './color';
import { classifyVariable, collectionFamily, COLLECTION_DEVICE, isExcludedToken } from './conventions';
import { splitPath, toParamCase } from './naming';
import { styleToToken } from './styles';
import {
  DiagnosticCollector,
  type DomainDocument,
  type DomainToken,
  type TokenValue,
  type TokenKind,
  type TokenUnit,
  type TypographyValue,
} from './types';

const CSS_VARIABLE_PREFIX = 'css-variable-prefix';

const isRgba = (value: FigmaVariableValue): value is { r: number; g: number; b: number; a: number } =>
  typeof value === 'object' && value !== null && 'r' in value && !('type' in value);

const toTokenValue = (kind: TokenKind, unit: TokenUnit, raw: FigmaVariableValue | undefined): TokenValue | undefined => {
  if (raw === undefined) {
    return undefined;
  }

  if (kind === 'color' && isRgba(raw)) {
    return { type: 'color', hex: rgbaToHex(raw) };
  }

  if (typeof raw === 'string') {
    if (/^-?\d+(\.\d+)?$/.test(raw.trim())) {
      return { type: 'number', measure: Number(raw), unit: 'none' };
    }

    if (kind === 'string') {
      return { type: 'string', text: raw };
    }
  }

  if (typeof raw === 'number') {
    return { type: 'number', measure: raw, unit };
  }

  return undefined;
};

const normalizeModeName = (name: string): string => toParamCase(name);

const variableToToken = (
  variable: SnapshotVariable,
  collection: SnapshotCollection,
  modeId: string,
  device: string | undefined,
  variablesById: Map<string, SnapshotVariable>,
  diagnostics: DiagnosticCollector,
): DomainToken | undefined => {
  const classified = classifyVariable(variable, diagnostics);

  if (!classified) {
    return undefined;
  }

  const path = splitPath(variable.name);

  if (path.length === 0) {
    diagnostics.error(`Variable ${variable.id} has an empty name.`);

    return undefined;
  }

  if (isExcludedToken(path, classified.kind)) {
    return undefined;
  }

  const raw = resolveVariableValue(variable, modeId, variablesById, diagnostics);
  const value = toTokenValue(classified.kind, classified.unit, raw);

  if (!value) {
    diagnostics.error(`Variable ${variable.name} could not be resolved for mode ${modeId}.`);

    return undefined;
  }

  return {
    id: `${variable.id}:${modeId}`,
    path,
    name: path.at(-1) ?? variable.name,
    family: collectionFamily(collection.name),
    kind: classified.kind,
    device,
    value,
    remote: variable.remote,
  };
};

const applyTypographyDeviceBindings = (
  value: TypographyValue,
  style: SnapshotTextStyle,
  deviceCollection: SnapshotCollection | undefined,
  variablesById: Map<string, SnapshotVariable>,
  diagnostics: DiagnosticCollector,
): void => {
  const fontSizeAlias = style.boundVariables?.fontSize;
  const lineHeightAlias = style.boundVariables?.lineHeight;

  if (!deviceCollection || (!fontSizeAlias && !lineHeightAlias)) {
    return;
  }

  const fontSizeVariable = fontSizeAlias ? variablesById.get(fontSizeAlias.id) : undefined;
  const lineHeightVariable = lineHeightAlias ? variablesById.get(lineHeightAlias.id) : undefined;
  const byDevice: NonNullable<TypographyValue['byDevice']> = {};

  for (const mode of deviceCollection.modes) {
    const device = normalizeModeName(mode.name);
    const fontSize = fontSizeVariable
      ? resolvedValueToNumber(resolveVariableValue(fontSizeVariable, mode.id, variablesById, diagnostics))
      : undefined;
    const lineHeight = lineHeightVariable
      ? resolvedValueToNumber(resolveVariableValue(lineHeightVariable, mode.id, variablesById, diagnostics))
      : undefined;

    byDevice[device] = {
      fontSize: fontSize ?? value.fontSize,
      lineHeight: lineHeight ?? value.lineHeight,
    };
  }

  const varies = Object.values(byDevice).some(
    (entry) => entry.fontSize !== value.fontSize || entry.lineHeight !== value.lineHeight,
  );

  if (varies) {
    value.byDevice = byDevice;
  }
};

const findPrefix = (tokens: DomainToken[]): string => {
  const prefixToken = tokens.find(
    (token) => token.kind === 'string' && (token.name === CSS_VARIABLE_PREFIX || token.path.at(-1) === CSS_VARIABLE_PREFIX),
  );

  return prefixToken?.value.type === 'string' ? prefixToken.value.text : '';
};

export const normalizeSnapshot = (snapshot: SnapshotV1, fontStacks: Record<string, string>): DomainDocument => {
  const diagnostics = new DiagnosticCollector();
  const collectionsById = new Map(snapshot.collections.map((collection) => [collection.id, collection]));
  const variablesById = indexVariables([...snapshot.variables, ...snapshot.dependencies]);
  const localVariables = snapshot.variables.filter((variable) => !variable.remote);
  const globalTokens: DomainToken[] = [];
  const deviceTokens: DomainToken[] = [];
  const themeTokensByMode = new Map<string, DomainToken[]>();

  const skippedCollections = new Set<string>();

  for (const variable of localVariables) {
    const collection = collectionsById.get(variable.collectionId);

    if (!collection) {
      diagnostics.error(`Variable ${variable.name} references missing collection ${variable.collectionId}.`);
      continue;
    }

    const family = collectionFamily(collection.name);

    if (family === 'other') {
      if (!skippedCollections.has(collection.name)) {
        skippedCollections.add(collection.name);
        diagnostics.warn(`Skipping collection "${collection.name}" (not in the Global/Theme/Device export contract).`);
      }
      continue;
    }

    if (family === 'theme') {
      for (const mode of collection.modes) {
        const token = variableToToken(variable, collection, mode.id, undefined, variablesById, diagnostics);

        if (!token) {
          continue;
        }

        const themeName = normalizeModeName(mode.name);
        const tokens = themeTokensByMode.get(themeName) ?? [];
        tokens.push(token);
        themeTokensByMode.set(themeName, tokens);
      }
      continue;
    }

    if (family === 'device') {
      for (const mode of collection.modes) {
        const token = variableToToken(
          variable,
          collection,
          mode.id,
          normalizeModeName(mode.name),
          variablesById,
          diagnostics,
        );

        if (token) {
          deviceTokens.push(token);
        }
      }
      continue;
    }

    const token = variableToToken(
      variable,
      collection,
      collection.defaultModeId,
      undefined,
      variablesById,
      diagnostics,
    );

    if (token) {
      globalTokens.push(token);
    }
  }

  for (const style of snapshot.styles) {
    if (style.remote) {
      continue;
    }

    const token = styleToToken(style, 'global', diagnostics);

    if (!token || isExcludedToken(token.path, token.kind)) {
      continue;
    }

    if (token.kind === 'typography' && token.value.type === 'typography') {
      const stack = fontStacks[token.value.fontFamily];

      if (!stack) {
        diagnostics.error(`Unmapped font family "${token.value.fontFamily}" in style ${style.name}.`);
      } else {
        token.value.fontFamily = stack;
      }

      if (style.type === 'TEXT') {
        applyTypographyDeviceBindings(
          token.value,
          style,
          snapshot.collections.find((collection) => collection.name === COLLECTION_DEVICE),
          variablesById,
          diagnostics,
        );
      }
    }

    globalTokens.push(token);
  }

  diagnostics.warnings.push(...snapshot.diagnostics.filter((item) => item.level === 'warning').map((item) => item.message));
  snapshot.diagnostics.filter((item) => item.level === 'error').forEach((item) => diagnostics.error(item.message));
  diagnostics.throwIfErrors();

  const themeCollection = snapshot.collections.find((collection) => collectionFamily(collection.name) === 'theme');
  const themes = (themeCollection?.modes ?? []).map((mode) => {
    const name = normalizeModeName(mode.name);

    return {
      name,
      tokens: themeTokensByMode.get(name) ?? [],
    };
  });

  const documentTokens = [...globalTokens, ...deviceTokens, ...themes.flatMap((theme) => theme.tokens)];

  return {
    fileKey: snapshot.file.key,
    fileName: snapshot.file.name,
    prefix: findPrefix(documentTokens),
    themes,
    globalTokens,
    deviceTokens,
    warnings: diagnostics.warnings,
  };
};
