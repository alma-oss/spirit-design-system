import classNames from 'classnames';
import { type ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type HeadingProps, type SpiritHeadingProps } from '../../types';

export interface HeadingStyles<E extends ElementType> {
  /** className props */
  classProps: string | null;
  /** props to be passed to the input element */
  props: Omit<HeadingProps<E>, 'elementType'>;
}

export function useHeadingStyleProps<E extends ElementType, S = void, Emph = void>(
  props: Omit<SpiritHeadingProps<E, S, Emph>, 'elementType'>,
): HeadingStyles<E> {
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
