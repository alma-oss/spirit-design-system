import type { DesignToken } from '../core/types';
import { sortTokens, tokenVariableName } from '../helpers/tokenHelper';
import { SCSS_INDENTATION } from '../constants';

export const generateMixinFromTokens = (
  tokens: DesignToken[],
  tokenPrefix: string,
  hasParentPrefix: boolean,
  sortByNumValue: boolean,
  mixinName: string,
  variablePrefix: string,
): string => {
  const sortedTokens = sortTokens(tokens, hasParentPrefix, sortByNumValue);
  const variables = sortedTokens
    .map((token) => {
      const name = tokenVariableName(token, hasParentPrefix);

      return `${SCSS_INDENTATION}--${tokenPrefix}${variablePrefix}${name}: #{$${name}};`;
    })
    .join('\n');

  return `@mixin ${mixinName} {\n${variables}\n}\n`;
};
