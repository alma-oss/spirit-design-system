import { resolveValueDeep } from '../../core/resolveValue';
import { type TokenIndex, TokenTypeEnum } from '../../core/types';
import type { TransformationRule } from '../TransformationRule';

export type ResolveReferencesRuleParams = {
  tokenIndex: TokenIndex;
};

/**
 * Replaces every reference in a token value with the concrete value it points to, including references nested in
 * composite values (the color of a shadow layer, a gradient stop, a layer that is a reference on its own).
 *
 * Applies to the types whose values are composed of references to other tokens. The formatters of these types expect
 * a value this rule has already resolved, so they do not need to know the `TokenIndex`.
 */
export const resolveReferencesRule: TransformationRule<ResolveReferencesRuleParams> = {
  name: 'resolve-references',
  tokenTypes: [TokenTypeEnum.Color, TokenTypeEnum.Shadow, TokenTypeEnum.Gradient],
  shouldApply: () => true,
  transformers: [
    {
      name: 'resolveReferences',
      transform: (value, context) => resolveValueDeep(value, context.params.tokenIndex),
    },
  ],
};
