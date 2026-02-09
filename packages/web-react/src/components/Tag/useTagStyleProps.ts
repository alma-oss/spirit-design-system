import classNames from 'classnames';
import { type ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritTagProps } from '../../types';

export interface TagStyles {
  /** className props */
  classProps: string;
  /** props to be passed to the element */
  props: Partial<SpiritTagProps>;
}

export function useTagStyleProps<E extends ElementType = 'span', C = void, S = void>(
  props: SpiritTagProps<E, C, S>,
): TagStyles {
  const { color, isSubtle, size, ...modifiedProps } = props;

  const TagClass = useClassNamePrefix('Tag');
  const TagColorClass = `${TagClass}--${color}`;
  const TagSizeClass = `${TagClass}--${size}`;
  const TagSubtleClass = `${TagClass}--subtle`;
  const classProps = classNames(TagClass, {
    [TagColorClass]: color,
    [TagSizeClass]: size,
    [TagSubtleClass]: isSubtle,
  });

  return {
    classProps,
    props: modifiedProps as Partial<SpiritTagProps>,
  };
}
