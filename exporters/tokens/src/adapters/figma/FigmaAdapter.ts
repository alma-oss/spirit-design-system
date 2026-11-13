import type { DesignToken, Theme, TokenCollection, TokenGroup } from '../../core/types';
import type { AdapterConfig, SourceAdapter } from '../SourceAdapter';
import { indexVariables } from './aliases';
import { parseSourceConfig } from './config';
import { collectionFamily } from './conventions';
import { DiagnosticCollector } from './diagnostics';
import { FigmaApiError } from './FigmaApiError';
import { keepKnownReferences } from './mappers/references';
import { mapStyle } from './mappers/styleMapper';
import { mapVariable } from './mappers/variableMapper';
import type { MapContext } from './mappers/context';
import { toParamCase } from './naming';
import { readFigmaSource } from './source';
import type { FigmaCollection, FigmaSource } from './types';

export type FigmaAdapterOptions = {
  /** Personal access token with `file_content:read` and `file_variables:read`. */
  token?: string;
  fetch?: typeof fetch;
  /** Receives the non-fatal findings of a run (skipped collections, unused styles, ...). */
  onWarning?: (message: string) => void;
};

const modeName = (name: string): string => toParamCase(name);

/**
 * Groups of every token path, root first, with their ancestors, so every group a token points at exists.
 *
 * @param tokens
 */
const deriveGroups = (tokens: DesignToken[]): TokenGroup[] => {
  const groups = new Map<string, TokenGroup>();

  tokens.forEach(({ metadata }) => {
    metadata.groupPath.forEach((name, index) => {
      const path = metadata.groupPath.slice(0, index);
      const id = [...path, name].join('/');

      if (!groups.has(id)) {
        groups.set(id, { id, name, path, parentId: index > 0 ? path.join('/') : undefined });
      }
    });
  });

  return [...groups.values()];
};

const mapThemes = (collection: FigmaCollection | undefined): Theme[] =>
  (collection?.modes ?? []).map((mode) => ({
    id: mode.id,
    name: modeName(mode.name),
    isDefault: mode.id === collection?.defaultModeId,
  }));

/**
 * Maps an already fetched Figma file to the internal model. Kept apart from the network so a snapshot of the same
 * shape could be mapped as well.
 *
 * @param source
 * @param diagnostics
 * @param brandId
 */
export const mapFigmaSource = (source: FigmaSource, diagnostics: DiagnosticCollector, brandId?: string) => {
  const collectionsById = new Map(source.collections.map((collection) => [collection.id, collection]));
  const activeVariables = source.variables.filter((variable) => {
    if (!variable.deletedButReferenced) {
      return true;
    }

    diagnostics.warn(`Skipping deleted variable "${variable.name}".`);

    return false;
  });
  const context: MapContext = { variablesById: indexVariables(activeVariables), collectionsById, diagnostics, brandId };
  const tokens: DesignToken[] = [];
  const skippedCollections = new Set<string>();

  // Remote variables only exist to be aliased
  activeVariables
    .filter((variable) => !variable.remote)
    .forEach((variable) => {
      const collection = collectionsById.get(variable.collectionId);

      if (!collection) {
        diagnostics.error(`Variable ${variable.name} references missing collection ${variable.collectionId}.`);

        return;
      }

      const family = collectionFamily(collection.name);

      if (family === 'other') {
        if (!skippedCollections.has(collection.name)) {
          skippedCollections.add(collection.name);
          diagnostics.warn(
            `Skipping collection "${collection.name}" (not in the Global/Theme/Device export contract).`,
          );
        }

        return;
      }

      const modes = family === 'global' ? [{ id: collection.defaultModeId, name: '' }] : collection.modes;

      modes.forEach((mode) => {
        const token = mapVariable(variable, collection, mode.id, context, {
          theme: family === 'theme' ? modeName(mode.name) : undefined,
          device: family === 'device' ? modeName(mode.name) : undefined,
        });

        if (token) {
          tokens.push(token);
        }
      });
    });

  source.styles
    .filter((style) => !style.remote)
    .forEach((style) => {
      const token = mapStyle(style, context);

      if (token) {
        tokens.push(token);
      }
    });

  diagnostics.throwIfErrors();

  const knownTokens = keepKnownReferences(tokens);

  return {
    tokens: knownTokens,
    groups: deriveGroups(knownTokens),
    themes: mapThemes(source.collections.find((collection) => collectionFamily(collection.name) === 'theme')),
  };
};

/**
 * Source adapter reading the tokens of a Figma Config file through the Figma REST API (variables, styles and the
 * style nodes). One file is one brand. Findings that make the file unusable (malformed names, ambiguous scopes,
 * missing aliases) are thrown together as one error.
 *
 * `source` of the adapter config: `{ fileKey: string, brandId?: string }`.
 */
export class FigmaAdapter implements SourceAdapter {
  readonly name = 'figma';

  constructor(private readonly options: FigmaAdapterOptions = {}) {}

  async fetchTokens(config: AdapterConfig): Promise<TokenCollection> {
    const { token, fetch: fetchImplementation = fetch, onWarning } = this.options;

    if (!token) {
      throw new FigmaApiError('A Figma access token is required.');
    }

    const { fileKey, brandId } = parseSourceConfig(config);
    const source = await readFigmaSource(fileKey, token, fetchImplementation);
    const diagnostics = new DiagnosticCollector();
    const { tokens, groups, themes } = mapFigmaSource(source, diagnostics, brandId);

    diagnostics.warnings.forEach((warning) => onWarning?.(warning));

    return { tokens, groups, themes, metadata: { source: this.name, fetchedAt: new Date() } };
  }
}
