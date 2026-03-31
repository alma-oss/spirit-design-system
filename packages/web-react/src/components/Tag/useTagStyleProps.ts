import classNames from 'classnames';
import { Intensity } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import { type TagProps } from '../../types';
import { createScopedColorTokenName } from '../../utils';

export interface TagStyles {
  /** className props */
  classProps: string;
  /** props to be passed to the element */
  props: Partial<TagProps>;
}

const getColorClasses = (color: string | undefined, isSubtle: boolean | undefined) => {
  if (!color) {
    return {};
  }

  const borderIntensity = isSubtle ? Intensity.SUBTLE : Intensity.BASIC;
  const backgroundIntensity = isSubtle ? Intensity.SUBTLE : Intensity.BASIC;
  const textIntensity = isSubtle ? Intensity.BASIC : Intensity.SUBTLE;
  const borderColor = createScopedColorTokenName({
    color,
    intensity: borderIntensity,
  });
  const backgroundColor = createScopedColorTokenName({
    color,
    intensity: backgroundIntensity,
  });
  const textColor = createScopedColorTokenName({
    color,
    intensity: textIntensity,
  });

  return {
    [`border-${borderColor}`]: true,
    [`bg-${backgroundColor}`]: true,
    [`text-${textColor}`]: true,
  };
};

export function useTagStyleProps<C = void, S = void>(props: TagProps<C, S>) {
  const { color, isDisabled, isSubtle, size, ...modifiedProps } = props;

  const tagClass = useClassNamePrefix('Tag');
  const tagColorClass = `${tagClass}--${color}`;
  const tagDisabledClass = `${tagClass}--disabled`;
  const tagSizeClass = `${tagClass}--${size}`;
  const tagSubtleClass = `${tagClass}--subtle`;
  const classProps = classNames(tagClass, {
    [tagColorClass]: color,
    [tagDisabledClass]: isDisabled,
    [tagSizeClass]: size,
    [tagSubtleClass]: isSubtle,
    ...(!isDisabled && getColorClasses(color as string | undefined, isSubtle as boolean | undefined)),
  });

  return {
    classProps,
    props: modifiedProps,
  };
}
