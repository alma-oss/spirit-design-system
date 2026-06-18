import classNames from 'classnames';
import { CLASS_NAME_DISABLED } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import { type TagProps } from '../../types';
import { getColorSchemeClassName } from '../../utils';

export interface TagStyles {
  /** className props */
  classProps: string;
  /** props to be passed to the element */
  props: Partial<TagProps>;
}

export function useTagStyleProps<C = void, S = void>(props: TagProps<C, S>) {
  const { color, isDisabled, isSubtle, size, ...modifiedProps } = props;

  const tagClass = useClassNamePrefix('Tag');
  const tagColorClass = `${tagClass}--${color}`;
  const tagSizeClass = `${tagClass}--${size}`;
  const tagSubtleClass = `${tagClass}--subtle`;
  const tagColorSchemeClass = color && !isDisabled ? getColorSchemeClassName({ color: color as string, isSubtle }) : '';

  return {
    classProps: classNames(
      tagClass,
      {
        [tagColorClass]: color,
      },
      tagColorSchemeClass,
      {
        [CLASS_NAME_DISABLED]: isDisabled,
        [tagSizeClass]: size,
        [tagSubtleClass]: isSubtle,
      },
    ),
    props: modifiedProps,
  };
}
