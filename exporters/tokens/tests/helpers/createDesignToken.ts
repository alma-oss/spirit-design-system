import { CollectionKind, type DesignToken, TokenTypeEnum, type TokenValue } from '../../src/core/types';

type Overrides = Partial<Omit<DesignToken, 'metadata'>> & { metadata?: Partial<DesignToken['metadata']> };

/**
 * Creates a token of the internal model for the tests of the pipeline, which must not depend on any source.
 *
 * @param type - Type of the token
 * @param value - Value of the token
 * @param overrides - Fields to override, `metadata` is merged with the defaults
 */
export const createDesignToken = (type: TokenTypeEnum, value: TokenValue, overrides: Overrides = {}): DesignToken => {
  const { metadata, ...rest } = overrides;
  const id = rest.id ?? 'token';

  return {
    id,
    name: id,
    type,
    value,
    metadata: { groupPath: [], collection: CollectionKind.Global, ...metadata },
    source: { adapter: 'test', originalId: id },
    ...rest,
  };
};
