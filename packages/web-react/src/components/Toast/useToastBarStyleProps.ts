import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type ToastBarProps } from '../../types';
import { getColorSchemeClassName } from '../../utils';
import { ToastColorsExtended } from '.';

export const useToastBarStyleProps = (props: ToastBarProps) => {
  const { color, isDismissible, ...restProps } = props;

  const toastBarClass = useClassNamePrefix('ToastBar');
  const toastBarBoxClass = `${toastBarClass}__box`;
  const toastBarCloseClass = `${toastBarClass}__close`;
  const toastBarContainerClass = `${toastBarClass}__container`;
  const toastBarContentClass = `${toastBarClass}__content`;
  const toastBarLinkClass = `${toastBarClass}__link`;
  const toastBarLinkUnderlinedClass = useClassNamePrefix('link-underlined');
  const toastBarColorClass = `${toastBarClass}--${color || ToastColorsExtended.NEUTRAL}`;
  const toastBarDismissibleClass = `${toastBarClass}--dismissible`;
  const resolvedColor = color ?? ToastColorsExtended.NEUTRAL;
  // Toast uses the basic surface pairing (`color-scheme-on-*-basic`) for text on filled backgrounds.
  const toastBarRootClasses = classNames(
    toastBarClass,
    toastBarColorClass,
    isDismissible && toastBarDismissibleClass,
    getColorSchemeClassName({ color: String(resolvedColor), isSubtle: false }),
  );
  const toastBarLinkClasses = classNames(toastBarLinkClass, toastBarLinkUnderlinedClass);

  return {
    classProps: {
      root: toastBarRootClasses,
      box: toastBarBoxClass,
      close: toastBarCloseClass,
      container: toastBarContainerClass,
      content: toastBarContentClass,
      link: toastBarLinkClasses,
    },
    props: restProps,
  };
};
