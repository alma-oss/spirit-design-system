import { Token, TokenGroup } from '@supernovaio/sdk-exporters';
import { sortTokens, tokenVariableName } from '../helpers/tokenHelper';
import { SCSS_INDENTATION } from '../constants';

export const generateMixinFromTokens = (
  tokens: Token[],
  tokenGroups: Array<TokenGroup>,
  tokenPrefix: string,
  hasParentPrefix: boolean,
  sortByNumValue: boolean,
  mixinName: string,
  variablePrefix: string,
): string => {
  const sortedTokens = sortTokens(tokens, tokenGroups, hasParentPrefix, sortByNumValue);
  const variables = sortedTokens
    .map((token) => {
      const name = tokenVariableName(token, tokenGroups, hasParentPrefix);

      return `${SCSS_INDENTATION}--${tokenPrefix}${variablePrefix}${name}: #{$${name}};`;
    })
    .join('\n');

  return `@mixin ${mixinName} {\n${variables}\n}\n`;
};
