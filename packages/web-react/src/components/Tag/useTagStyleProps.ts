import classNames from 'classnames';
import { type ElementType } from 'react';
import { Intensity } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritTagProps } from '../../types';
import { createScopedColorTokenName } from '../../utils';

export interface TagStyles {
  /** className props */
  classProps: string;
  /** props to be passed to the element */
  props: Partial<SpiritTagProps>;
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

export function useTagStyleProps<E extends ElementType = 'span', C = void, S = void>(
  props: SpiritTagProps<E, C, S>,
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
    ...(!isDisabled && getColorClasses(color as string | undefined, isSubtle as boolean | undefined)),
  });

  return {
    classProps,
    props: modifiedProps as Partial<SpiritTagProps>,
  };
}
