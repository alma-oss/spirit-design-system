import { emotionColors } from '@alma-oss/spirit-design-tokens';
import classNames from 'classnames';
import { Intensity } from '../../constants';
import { ColorPrefixes } from '../../constants/colors';
import { useClassNamePrefix } from '../../hooks';
import { type TagProps } from '../../types';

const getColorClasses = (color: string | undefined, isSubtle: boolean | undefined) => {
  if (!color) {
    return {};
  }

  const isEmotionColor = Object.keys(emotionColors).includes(color);
  const prefix = isEmotionColor ? `${ColorPrefixes.EMOTION}-` : '';
  const borderIntensity = isSubtle ? Intensity.SUBTLE : Intensity.BASIC;
  const backgroundIntensity = isSubtle ? Intensity.SUBTLE : Intensity.BASIC;
  const textIntensity = isSubtle ? Intensity.BASIC : Intensity.SUBTLE;

  return {
    [`border-${prefix}${color}-${borderIntensity}`]: true,
    [`bg-${prefix}${color}-${backgroundIntensity}`]: true,
    [`text-${prefix}${color}-${textIntensity}`]: true,
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
