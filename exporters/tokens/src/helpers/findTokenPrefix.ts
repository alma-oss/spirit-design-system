import { withResolvedValue } from '../core/resolveToken';
import { type DesignToken, TokenTypeEnum } from '../core/types';

const TOKEN_PREFIX_NAME = 'css-variable-prefix';

export const findTokenPrefix = (tokens: DesignToken[]): string => {
  const prefixToken = tokens.find((token) => token.type === TokenTypeEnum.String && token.name === TOKEN_PREFIX_NAME);
  const value = prefixToken && withResolvedValue(prefixToken).value;

  return value?.type === 'string' ? value.value : '';
};
