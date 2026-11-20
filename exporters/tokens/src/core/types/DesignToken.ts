import { type CollectionKind } from './TokenCollection';
import type { TokenValue } from './TokenValue';

/**
 * Semantic token type, independent of any source's own type system.
 * Mirrors the set of token kinds the exporter currently supports
 * (see `@supernovaio/sdk-exporters`'s `TokenType`); sources with fewer or
 * different native types (e.g. Figma's 4 generic types) infer these.
 */
export enum TokenTypeEnum {
  Color = 'color',
  Dimension = 'dimension',
  FontSize = 'fontSize',
  LineHeight = 'lineHeight',
  LetterSpacing = 'letterSpacing',
  Space = 'space',
  Size = 'size',
  Radius = 'radius',
  Border = 'border',
  BorderWidth = 'borderWidth',
  Shadow = 'shadow',
  Gradient = 'gradient',
  Typography = 'typography',
  String = 'string',
}

export type TokenMetadata = {
  brandId?: string;
  /** Kind of the collection the token belongs to. */
  collection?: CollectionKind;
  theme?: string;
  /** e.g. 'mobile', 'tablet', 'desktop'. Adapter-resolved, source-specific detection. */
  device?: string;
  /** Group/collection hierarchy the token belongs to, root first. */
  groupPath: string[];
  /**
   * The part of `groupPath` that goes into the token's variable name. Only needed by a source whose root groups are
   * containers of a token type and not a part of a name (e.g. Supernova); `groupPath` is used when it is missing.
   */
  namePath?: string[];
};

export type SourceMetadata = {
  /** Adapter that produced this token, e.g. 'supernova', 'figma'. */
  adapter: string;
  originalId: string;
  /** Native type string for debugging, e.g. 'FLOAT', 'COLOR'. */
  originalType?: string;
};

/**
 * Source-agnostic design token representation. All source adapters must
 * transform their native format into this model before it reaches
 * validation, transformation, or generation.
 */
export type DesignToken = {
  id: string;
  name: string;
  type: TokenTypeEnum;
  value: TokenValue;
  description?: string;
  metadata: TokenMetadata;
  source: SourceMetadata;
};
