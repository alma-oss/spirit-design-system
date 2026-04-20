import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type TextProps } from '../../types';

export function useTextStyleProps<S = void, Emph = void, C = void>(props: TextProps<S, Emph, C>) {
  const { emphasis, size, textColor, ...restProps } = props;

  const textClass = useClassNamePrefix('typography-body');
  const textColorClass = useClassNamePrefix(textColor ? `text-${textColor}` : '');
  const className = classNames(`${textClass}-${size}-${emphasis}`, {
    [textColorClass]: !!textColor,
  });

  return {
    classProps: className,
    props: restProps,
  };
}
