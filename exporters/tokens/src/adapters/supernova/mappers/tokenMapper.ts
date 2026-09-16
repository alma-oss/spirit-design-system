import {
  type StringToken,
  type Token,
  type TokenGroup as SupernovaTokenGroup,
  TokenType,
  type Unit,
} from '@supernovaio/sdk-exporters';
import { CSSHelper } from '@supernovaio/export-helpers';
import { getDeviceAlias } from '../../../helpers/deviceHelpers';
import { type DesignToken, type TokenMetadata, type SourceMetadata, TokenTypeEnum } from '../../../core/types';

/**
 * Normalizes a Supernova unit enum value (e.g. `Unit.pixels`, "Pixels") to
 * the CSS unit string generators expect (e.g. "px"). Keeps `DesignToken`
 * values source-agnostic - a future adapter's unit representation would be
 * normalized the same way, at the adapter boundary, not left for every
 * consumer to know Supernova's raw enum.
 *
 * @param unit
 */
const normalizeUnit = (unit: unknown): string | undefined =>
  unit === undefined ? undefined : CSSHelper.unitToCSS(unit as Unit);

/** Numeric-value token whose measure/unit live directly on `token.value` (dimension, radius, space, size, fontSize, lineHeight, letterSpacing, borderWidth). */
type NumericValueToken = Token & { value?: { measure: number; unit: unknown } };

/**
 * `TokenType`s mapped to a plain numeric value so far. Grows one type at a
 * time as each numeric processor is migrated; see #DS-2335.
 */
const NUMERIC_TOKEN_TYPES: Partial<Record<TokenType, TokenTypeEnum>> = {
  [TokenType.dimension]: TokenTypeEnum.Dimension,
  [TokenType.radius]: TokenTypeEnum.Radius,
  [TokenType.space]: TokenTypeEnum.Space,
  [TokenType.size]: TokenTypeEnum.Size,
  [TokenType.fontSize]: TokenTypeEnum.FontSize,
  [TokenType.lineHeight]: TokenTypeEnum.LineHeight,
  [TokenType.letterSpacing]: TokenTypeEnum.LetterSpacing,
  [TokenType.borderWidth]: TokenTypeEnum.BorderWidth,
};

const buildGroupPath = (token: Token, tokenGroups: Array<SupernovaTokenGroup>): string[] => {
  const group = tokenGroups.find((candidate) => candidate.id === token.parentGroupId);

  return group ? [...group.path, group.name] : [];
};

const buildMetadata = (token: Token, tokenGroups: Array<SupernovaTokenGroup>): TokenMetadata => ({
  brandId: token.brandId,
  device: getDeviceAlias(token) || undefined,
  groupPath: buildGroupPath(token, tokenGroups),
});

const buildSource = (token: Token): SourceMetadata => ({
  adapter: 'supernova',
  originalId: token.id,
  originalType: token.tokenType,
});

const mapStringToken = (token: StringToken, tokenGroups: Array<SupernovaTokenGroup>): DesignToken => ({
  id: token.id,
  name: token.name,
  type: TokenTypeEnum.String,
  value: {
    type: 'string',
    value: token.value.text,
  },
  description: token.description || undefined,
  metadata: buildMetadata(token, tokenGroups),
  source: buildSource(token),
});

/**
 * Maps a numeric-value token. Returns `null` when the measure is missing,
 * matching `formatUnitValue`'s existing `value === undefined` handling -
 * callers should treat that the same as an unsupported type and read the
 * native value themselves, which resolves to the same `undefined`.
 *
 * @param token
 * @param type
 * @param tokenGroups
 */
const mapNumericToken = (
  token: NumericValueToken,
  type: TokenTypeEnum,
  tokenGroups: Array<SupernovaTokenGroup>,
): DesignToken | null => {
  const measure = token.value?.measure;
  if (measure === undefined) {
    return null;
  }

  return {
    id: token.id,
    name: token.name,
    type,
    value: {
      type: 'number',
      value: measure,
      unit: normalizeUnit(token.value?.unit),
    },
    description: token.description || undefined,
    metadata: buildMetadata(token, tokenGroups),
    source: buildSource(token),
  };
};

/**
 * Maps a `border` token. Only `.value.width` is mapped - `processBorderToken`
 * never reads color/position/style, so that's the only part that needs to
 * flow through the internal model for now. Returns `null` when the width
 * measure is missing, same convention as `mapNumericToken`.
 *
 * @param token
 * @param tokenGroups
 */
const mapBorderToken = (
  token: Token & { value?: { width?: { measure: number; unit: unknown } } },
  tokenGroups: Array<SupernovaTokenGroup>,
): DesignToken | null => {
  const measure = token.value?.width?.measure;
  if (measure === undefined) {
    return null;
  }

  return {
    id: token.id,
    name: token.name,
    type: TokenTypeEnum.Border,
    value: {
      type: 'number',
      value: measure,
      unit: normalizeUnit(token.value?.width?.unit),
    },
    description: token.description || undefined,
    metadata: buildMetadata(token, tokenGroups),
    source: buildSource(token),
  };
};

/**
 * Maps a Supernova token to the internal model. Only `string` tokens, `border`,
 * and the numeric types listed in `NUMERIC_TOKEN_TYPES` are supported so far -
 * other types return `null` and are filtered out by the adapter, the same way
 * `stylesGenerator.tokenToStyleByType` silently skips types it doesn't have a
 * case for. Support is added type by type as each generator/processor is
 * migrated to consume `DesignToken` directly.
 *
 * @param token
 * @param tokenGroups
 */
export const mapToken = (token: Token, tokenGroups: Array<SupernovaTokenGroup>): DesignToken | null => {
  if (token.tokenType === TokenType.string) {
    return mapStringToken(token as StringToken, tokenGroups);
  }

  if (token.tokenType === TokenType.border) {
    return mapBorderToken(token, tokenGroups);
  }

  const numericType = NUMERIC_TOKEN_TYPES[token.tokenType];
  if (numericType) {
    return mapNumericToken(token, numericType, tokenGroups);
  }

  return null;
};
