import type { DesignToken, TokenTypeEnum, TokenValue } from '../core/types';

/**
 * Context a transformer runs with. `params` is rule-specific (e.g. the
 * `baseFontSize` a px-to-rem rule needs) rather than the full token
 * collection, so each rule declares only what it actually depends on.
 */
export type TransformationContext<TParams = unknown> = {
  token: DesignToken;
  params: TParams;
};

export type Transformer<TParams = unknown> = {
  name: string;
  transform: (value: TokenValue, context: TransformationContext<TParams>) => TokenValue;
};

/**
 * A declarative transformation rule: which token types it applies to,
 * whether it should apply given the current context, and the transformers
 * to run when it does.
 */
export type TransformationRule<TParams = unknown> = {
  name: string;
  tokenTypes: TokenTypeEnum[];
  shouldApply: (context: TransformationContext<TParams>) => boolean;
  transformers: Array<Transformer<TParams>>;
};
