'use client';

import classNames from 'classnames';
import { type ElementType, useMemo } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type TooltipProps } from '../../types';

type omittedProps = 'id' | 'onToggle';

export type UseTooltipStyleProps<E extends ElementType = 'div'> = TooltipProps<E>;

export interface UseTooltipStylePropsReturn<E extends ElementType = 'div'> {
  classProps: {
    rootClassName: string;
    popoverClassName: string;
    arrowClassName: string;
    closeButtonClassName: string;
  };
  props: Omit<TooltipProps<E>, omittedProps | 'isDismissible' | 'isOpen'>;
}

export const useTooltipStyleProps = <E extends ElementType = 'div'>(
  props: Omit<TooltipProps<E>, omittedProps>,
): UseTooltipStylePropsReturn<E> => {
  const { isDismissible, isOpen, ...modifiedProps } = props;
  const tooltipClass = useClassNamePrefix('Tooltip');
  const tooltipPopoverClass = `${tooltipClass}Popover`;
  const arrowClass = `${tooltipPopoverClass}__arrow`;
  const closeButtonClass = `${tooltipPopoverClass}__close`;
  const rootDismissibleClass = `${tooltipPopoverClass}--dismissible`;
  const rootHiddenClass = 'is-hidden';

  const isHiddenClass = useMemo(() => isOpen === false, [isOpen]);

  const tooltipPopoverClassName = classNames(tooltipPopoverClass, {
    [rootDismissibleClass]: isDismissible,
    [rootHiddenClass]: isHiddenClass,
  });

  return {
    classProps: {
      rootClassName: tooltipClass,
      popoverClassName: tooltipPopoverClassName,
      arrowClassName: arrowClass,
      closeButtonClassName: closeButtonClass,
    },
    props: modifiedProps as Omit<TooltipProps<E>, omittedProps | 'isDismissible' | 'isOpen'>,
  };
};
