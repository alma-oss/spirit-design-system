import { findSingleBrandId } from '../../core/findSingleBrandId';
import { mapDevice } from './mapDevice';
import {
  CollectionKind,
  type DesignToken,
  type Device,
  type Theme,
  type ThemedDesignTokens,
  type TokenCollection,
  type TokenGroup,
  TokenTypeEnum,
} from '../../core/types';
import { toParamCase } from '../../helpers/stringHelper';
import type { AdapterConfig, SourceAdapter } from '../SourceAdapter';
import { indexVariables } from './aliases';
import { parseSourceConfig } from './config';
import { type CollectionFamily, collectionFamily } from './conventions';
import { DiagnosticCollector } from './diagnostics';
import { FigmaApiError } from './FigmaApiError';
import { keepKnownReferences } from './mappers/references';
import { mapStyle } from './mappers/styleMapper';
import { mapVariable } from './mappers/variableMapper';
import type { MapContext } from './mappers/context';
import { readFigmaSource } from './source';
import type { FigmaCollection, FigmaMode, FigmaSource, FigmaVariable } from './types';

export type FigmaAdapterOptions = {
  /** Personal access token with `file_content:read`, `file_variables:read` and `library_content:read`. */
  token?: string;
  fetch?: typeof fetch;
  /** Receives the non-fatal findings of a run (skipped collections, unused styles, ...). */
  onWarning?: (message: string) => void;
};

type ExportedVariable = {
  variable: FigmaVariable;
  collection: FigmaCollection;
  family: Exclude<CollectionFamily, 'other'>;
};

const COLLECTION_KINDS: Record<ExportedVariable['family'], CollectionKind> = {
  global: CollectionKind.Global,
  theme: CollectionKind.Color,
  device: CollectionKind.Devices,
};

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

/**
 * Themes of a collection of modes, the default one first (the pipeline takes the first theme as the default).
 *
 * @param collection
 * @param kind
 * @param brandId
 */
const mapModes = (collection: FigmaCollection | undefined, kind: CollectionKind, brandId?: string): Theme[] =>
  (collection?.modes ?? [])
    .map((mode) => {
      const codeName = toParamCase(mode.name);

      return {
        id: mode.id,
        name: mode.name,
        codeName,
        collection: kind,
        // The code name of a device theme is the device, same as for the Supernova themes
        device: kind === CollectionKind.Devices ? codeName : undefined,
        brandId,
        isDefault: mode.id === collection?.defaultModeId,
      };
    })
    .sort((a, b) => Number(b.isDefault) - Number(a.isDefault));

const findCollection = (source: FigmaSource, family: CollectionFamily): FigmaCollection | undefined =>
  source.collections.find((collection) => collectionFamily(collection.name) === family);

/**
 * Maps an already fetched Figma file to the internal model. Kept apart from the network so a snapshot of the same
 * shape could be mapped as well.
 *
 * The model is the same as the one of the Supernova adapter: `tokens` are the tokens of the file in the default mode of
 * every collection, `themedTokens` have each color theme (a mode of the theme collection) applied, and `deviceTokens`
 * the devices (the modes of the device collection). The pipeline filters the tokens it does not export.
 *
 * @param source
 * @param diagnostics
 * @param brandId
 */
export const mapFigmaSource = (
  source: FigmaSource,
  diagnostics: DiagnosticCollector,
  brandId?: string,
): Omit<TokenCollection, 'metadata'> => {
  source.problems?.forEach((problem) => diagnostics.error(problem));

  const collectionsById = new Map(source.collections.map((collection) => [collection.id, collection]));
  const activeVariables = source.variables.filter((variable) => {
    if (!variable.deletedButReferenced) {
      return true;
    }

    diagnostics.warn(`Skipping deleted variable "${variable.name}".`);

    return false;
  });
  const context: MapContext = { variablesById: indexVariables(activeVariables), diagnostics, brandId };
  const exported: ExportedVariable[] = [];
  const skippedCollections = new Set<string>();

  // Remote variables stay in `variablesById` so aliases can resolve them, but they are not exported
  activeVariables.forEach((variable) => {
    if (variable.remote) {
      diagnostics.warn(`Skipping remote variable "${variable.name}".`);

      return;
    }

    const collection = collectionsById.get(variable.collectionId);

    if (!collection) {
      diagnostics.error(`Variable ${variable.name} references missing collection ${variable.collectionId}.`);

      return;
    }

    const family = collectionFamily(collection.name);

    if (family === 'other') {
      if (!skippedCollections.has(collection.name)) {
        skippedCollections.add(collection.name);
        diagnostics.warn(`Skipping collection "${collection.name}" (not in the Global/Theme/Device export contract).`);
      }

      return;
    }

    exported.push({ variable, collection, family });
  });

  /**
   * Maps the variables of the given families, the modes a family has no mode chosen for in their default.
   *
   * @param families
   * @param modes
   * @param modes.theme
   * @param modes.device
   */
  const mapVariables = (
    families: ExportedVariable['family'][],
    modes: { theme?: FigmaMode; device?: FigmaMode } = {},
  ): DesignToken[] =>
    exported
      .filter(({ family }) => families.includes(family))
      .flatMap(({ variable, collection, family }) => {
        const mode = (family === 'theme' && modes.theme) || (family === 'device' && modes.device) || undefined;
        const token = mapVariable(variable, mode?.id ?? collection.defaultModeId, context, {
          collection: COLLECTION_KINDS[family],
          theme: family === 'theme' ? mode?.name : undefined,
          device: family === 'device' && mode ? toParamCase(mode.name) : undefined,
        });

        return token ? [token] : [];
      });

  const styles = source.styles
    .filter((style) => !style.remote)
    .flatMap((style) => {
      const token = mapStyle(style, context);

      return token ? [token] : [];
    });
  const tokens = [...mapVariables(['global', 'theme', 'device']), ...styles];

  const themeCollection = findCollection(source, 'theme');
  const deviceCollection = findCollection(source, 'device');
  const colorThemes = mapModes(themeCollection, CollectionKind.Color, brandId);
  const deviceThemes = mapModes(deviceCollection, CollectionKind.Devices, brandId);
  // Same as Supernova: a theme applies to the non-color tokens and to the colors of the theme collection only
  const isThemed = ({ type, metadata }: DesignToken) =>
    type !== TokenTypeEnum.Color || metadata.collection === CollectionKind.Color;
  const themedTokens: ThemedDesignTokens[] = colorThemes.map((theme) => {
    const mode = themeCollection?.modes.find(({ id }) => id === theme.id);

    return {
      theme,
      tokens: [...mapVariables(['global', 'theme', 'device'], { theme: mode }), ...styles].filter(isThemed),
    };
  });
  const deviceTokens = deviceThemes.flatMap((theme) =>
    mapVariables(['device'], { device: deviceCollection?.modes.find(({ id }) => id === theme.id) }),
  );

  diagnostics.throwIfErrors();

  const knownTokens = keepKnownReferences(tokens);
  const known = (list: DesignToken[]) => keepKnownReferences(list, tokens);

  return {
    tokens: knownTokens,
    themedTokens: themedTokens.map(({ theme, tokens: themed }) => ({ theme, tokens: known(themed) })),
    deviceTokens: known(deviceTokens),
    groups: deriveGroups(knownTokens),
    themes: [...colorThemes, ...deviceThemes],
    devices: deviceThemes.map(mapDevice).filter((device): device is Device => device !== null),
    brandId: brandId ?? findSingleBrandId(knownTokens),
  };
};

/**
 * Source adapter reading the tokens of a Figma Config file through the Figma REST API (variables, styles and the
 * style nodes). One file is one brand. Findings that make the file unusable (malformed names, ambiguous scopes,
 * missing aliases, styles without their node) are thrown together as one error.
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
    const collection = mapFigmaSource(source, diagnostics, brandId);

    diagnostics.warnings.forEach((warning) => onWarning?.(warning));

    return { ...collection, metadata: { source: this.name, fetchedAt: new Date() } };
  }
}
