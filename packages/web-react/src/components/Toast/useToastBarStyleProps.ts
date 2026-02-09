import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type ToastBarProps } from '../../types';
import { ToastColorsExtended } from '.';

const getColorSchemeClass = (color: string | undefined): string => {
  const colorValue = color || ToastColorsExtended.NEUTRAL;
  const colorScheme = colorValue === 'neutral' ? 'neutral-basic' : `emotion-${colorValue}-basic`;

  return `color-scheme-on-${colorScheme}`;
};

export const useToastBarStyleProps = (props: ToastBarProps) => {
  const { color, isDismissible, ...restProps } = props;

  const toastBarClass = useClassNamePrefix('ToastBar');
  const toastBarBoxClass = `${toastBarClass}__box`;
  const toastBarContainerClass = `${toastBarClass}__container`;
  const toastBarContentClass = `${toastBarClass}__content`;
  const toastBarLinkClass = `${toastBarClass}__link`;
  const toastBarLinkUnderlinedClass = useClassNamePrefix('link-underlined');
  const toastBarColorSchemeClass = getColorSchemeClass(color);
  const toastBarDismissibleClass = `${toastBarClass}--dismissible`;
  const toastBarRootClasses = classNames(toastBarClass, isDismissible && toastBarDismissibleClass);
  const toastBarBoxClasses = classNames(toastBarBoxClass, toastBarColorSchemeClass);
  const toastBarLinkClasses = classNames(toastBarLinkClass, toastBarLinkUnderlinedClass);

  return {
    classProps: {
      root: toastBarRootClasses,
      box: toastBarBoxClasses,
      container: toastBarContainerClass,
      content: toastBarContentClass,
      link: toastBarLinkClasses,
    },
    props: restProps,
  };
};
