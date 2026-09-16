import type { DesignToken } from '../core/types';
import type { TransformationContext, TransformationRule } from './TransformationRule';

/**
 * Applies a fixed set of rules to a single token.
 *
 * Rules whose `tokenTypes` include the token's type and whose `shouldApply`
 * returns true (evaluated once, against the context passed in) have their
 * transformers run in order, each receiving the previous transformer's
 * output as its input value.
 */
export class TransformationEngine<TParams = unknown> {
  constructor(private readonly rules: Array<TransformationRule<TParams>>) {}

  transformToken(token: DesignToken, context: TransformationContext<TParams>): DesignToken {
    const applicableRules = this.rules.filter(
      (rule) => rule.tokenTypes.includes(token.type) && rule.shouldApply(context),
    );

    return applicableRules.reduce((currentToken, rule) => {
      const value = rule.transformers.reduce(
        (currentValue, transformer) => transformer.transform(currentValue, { ...context, token: currentToken }),
        currentToken.value,
      );

      return { ...currentToken, value };
    }, token);
  }
}
