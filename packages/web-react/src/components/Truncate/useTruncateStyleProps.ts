import { type CSSProperties } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { TruncateModes, type TruncateProps } from '../../types';

interface TruncateCSSProperties extends CSSProperties {
  '--text-truncate-lines'?: number;
}

export const useTruncateStyleProps = (props: TruncateProps) => {
  const { limit, mode = TruncateModes.LINES, ...restProps } = props;

  const truncateClassName = useClassNamePrefix(mode === TruncateModes.LINES ? 'text-truncate-multiline' : '');
  const classProps = truncateClassName;

  const truncateStyle: TruncateCSSProperties = {};

  if (mode === TruncateModes.LINES && limit !== undefined) {
    truncateStyle['--text-truncate-lines'] = limit;
  }

  return {
    classProps,
    props: restProps,
    styleProps: truncateStyle,
    effectiveMode: mode,
    effectiveLimit: limit,
  };
};
