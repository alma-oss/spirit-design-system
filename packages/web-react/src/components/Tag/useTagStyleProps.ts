import classNames from 'classnames';
import { emotionColors } from '@alma-oss/spirit-design-tokens';
import { type ElementType } from 'react';
import { Intensity } from '../../constants';
import { ColorPrefixes } from '../../constants/colors';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritTagProps } from '../../types';

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

  const isEmotionColor = Object.keys(emotionColors).includes(color);
  const prefix = isEmotionColor ? `${ColorPrefixes.EMOTION}-` : '';
  const bgIntensity = isSubtle ? Intensity.SUBTLE : Intensity.BASIC;
  const textIntensity = isSubtle ? Intensity.BASIC : Intensity.SUBTLE;

  return {
    [`bg-${prefix}${color}-${bgIntensity}`]: true,
    [`text-${prefix}${color}-${textIntensity}`]: true,
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
    ...getColorClasses(color as string | undefined, isSubtle as boolean | undefined),
  });

  return {
    classProps,
    props: modifiedProps as Partial<SpiritTagProps>,
  };
}
