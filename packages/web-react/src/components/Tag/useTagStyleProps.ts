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

export function useTagStyleProps<T extends ElementType = 'span', C = void, S = void>(
  props: SpiritTagProps<T, C, S>,
): TagStyles {
  const { color, isDisabled, isSubtle, size, ...modifiedProps } = props;

  const TagClass = useClassNamePrefix('Tag');
  const TagColorClass = `${TagClass}--${color}`;
  const TagDisabledClass = `${TagClass}--disabled`;
  const TagSizeClass = `${TagClass}--${size}`;
  const TagSubtleClass = `${TagClass}--subtle`;
  const classProps = classNames(TagClass, {
    [TagColorClass]: color,
    [TagDisabledClass]: isDisabled,
    [TagSizeClass]: size,
    [TagSubtleClass]: isSubtle,
  });

  return {
    classProps,
    props: modifiedProps as Partial<SpiritTagProps>,
  };
}
