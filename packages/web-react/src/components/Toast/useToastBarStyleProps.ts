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

  return {
    classProps: {
      root: classNames(
        toastBarClass,
        toastBarColorClass,
        isDismissible && toastBarDismissibleClass,
        getColorSchemeClassName({ color: String(resolvedColor), isSubtle: false }),
      ),
      box: toastBarBoxClass,
      close: toastBarCloseClass,
      container: toastBarContainerClass,
      content: toastBarContentClass,
      link: classNames(toastBarLinkClass, toastBarLinkUnderlinedClass),
    },
    props: restProps,
  };
};
