import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type HeadingProps } from '../../types';

export function useHeadingStyleProps<S = void, Emph = void, C = void>(props: HeadingProps<S, Emph, C>) {
  const { emphasis, size, textColor, ...restProps } = props;

  const headingClass = useClassNamePrefix('typography-heading');
  const headingTextColorClass = useClassNamePrefix(textColor ? `text-${textColor}` : '');
  const className = classNames(`${headingClass}-${size}-${emphasis}`, {
    [headingTextColorClass]: !!textColor,
  });

  return {
    classProps: className,
    props: restProps,
  };
}
