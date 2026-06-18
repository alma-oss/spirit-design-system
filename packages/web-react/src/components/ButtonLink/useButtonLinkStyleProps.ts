import classNames from 'classnames';
import { CLASS_NAME_DISABLED } from '../../constants';
import { useClassNamePrefix, useSymmetry } from '../../hooks';
import { type ButtonColor, type ButtonLinkStyleProps, type ButtonSize } from '../../types';
import { getColorSchemeClassName, getEmotionColorNames } from '../../utils';
import { applyColor, applySize } from '../../utils/classname';
import { compose } from '../../utils/compose';

// `${componentClassName}--${color}`;
const getButtonLinkColorClassname = <C = void>(className: string, color: ButtonColor<C>): string =>
  compose(applyColor<ButtonColor<C>>(color))(className);

const getButtonLinkSizeClassname = <S = void>(className: string, size: ButtonSize<S>): string =>
  compose(applySize<ButtonSize<S>>(size))(className);

const emotionColorNames = getEmotionColorNames() as string[];

export function useButtonLinkStyleProps<C = void, S = void>(props: Omit<ButtonLinkStyleProps<C, S>, 'routerOptions'>) {
  const { color, isDisabled, isLoading, isSymmetrical, size, ...restProps } = props;
  const colorAsString = String(color);

  const buttonClass = useClassNamePrefix('Button');
  const buttonLoadingClass = `${buttonClass}--loading`;
  const buttonLinkColorSchemeClass = emotionColorNames.includes(colorAsString)
    ? getColorSchemeClassName({ color: colorAsString, isSubtle: false })
    : undefined;

  const { symmetricalClassName } = useSymmetry(buttonClass, isSymmetrical);

  const classProps = classNames(
    buttonClass,
    getButtonLinkColorClassname(buttonClass, color as ButtonColor<C>),
    buttonLinkColorSchemeClass,
    getButtonLinkSizeClassname(buttonClass, size as ButtonSize<S>),
    {
      [CLASS_NAME_DISABLED]: isDisabled && !isLoading,
      [buttonLoadingClass]: isLoading,
    },
    symmetricalClassName,
  );

  return {
    classProps,
    props: restProps,
  };
}
