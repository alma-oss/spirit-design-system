import classNames from 'classnames';
import { type CSSProperties, type ElementType } from 'react';
import { CLASS_NAME_DISABLED } from '../../constants';
import { useClassNamePrefix, useSpacingStyle, useSymmetry } from '../../hooks';
import { type ButtonColor, type ButtonSize, type SpacingType, type SpiritButtonProps } from '../../types';
import { getColorSchemeClassName, getEmotionColorNames } from '../../utils';
import { applyColor, applySize } from '../../utils/classname';
import { compose } from '../../utils/compose';

// `${componentClassName}--${color}`;
const getButtonColorClassname = <C = void>(className: string, color: ButtonColor<C>): string =>
  compose(applyColor<ButtonColor<C>>(color))(className);

const getButtonSizeClassname = <S = void>(className: string, size: ButtonSize<S>): string =>
  compose(applySize<ButtonSize<S>>(size))(className);

const emotionColorNames = getEmotionColorNames() as string[];

interface ButtonCSSProperties extends CSSProperties {
  [key: string]: string | undefined | number;
}

export interface ButtonStyles {
  /** className props */
  classProps: string;
  /** Props for the button element */
  props: SpiritButtonProps;
  /** Style props for the element */
  styleProps: ButtonCSSProperties;
}

export function useButtonStyleProps<T extends ElementType = 'button', C = void, S = void>(
  props: SpiritButtonProps<T, C, S>,
): ButtonStyles {
  const { color, isDisabled, isLoading, isSymmetrical, size, spacing, ...restProps } = props;
  const colorAsString = String(color);

  const buttonClass = useClassNamePrefix('Button');
  const buttonLoadingClass = `${buttonClass}--loading`;
  const buttonColorSchemeClass = emotionColorNames.includes(colorAsString)
    ? getColorSchemeClassName({ color: colorAsString, isSubtle: false })
    : undefined;

  const { symmetricalClassName } = useSymmetry(buttonClass, isSymmetrical);

  const classProps = classNames(
    buttonClass,
    getButtonColorClassname(buttonClass, color as ButtonColor<C>),
    buttonColorSchemeClass,
    getButtonSizeClassname(buttonClass, size as ButtonSize<S>),
    {
      [CLASS_NAME_DISABLED]: isDisabled && !isLoading,
      [buttonLoadingClass]: isLoading,
    },
    symmetricalClassName,
  );

  const buttonStyle: ButtonCSSProperties = {
    ...(useSpacingStyle(spacing as SpacingType, 'button') as ButtonCSSProperties),
  };

  return {
    classProps,
    props: restProps,
    styleProps: buttonStyle,
  };
}
