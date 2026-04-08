'use client';

import classNames from 'classnames';
import { useMemo } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type StyleProps } from '../../types';

interface UseTooltipStyleProps extends StyleProps {
  isDismissible?: boolean;
  isOpen?: boolean;
}

export const useTooltipStyleProps = (props: UseTooltipStyleProps) => {
  const { isDismissible, isOpen, ...modifiedProps } = props;
  const tooltipClass = useClassNamePrefix('Tooltip');
  const tooltipPopoverClass = `${tooltipClass}Popover`;
  const arrowClass = `${tooltipPopoverClass}__arrow`;
  const closeButtonClass = `${tooltipPopoverClass}__close`;
  const dismissibleClass = `${tooltipPopoverClass}--dismissible`;
  const hiddenClass = 'is-hidden';

  const isHiddenClass = useMemo(() => isOpen === false, [isOpen]);

  return {
    classProps: {
      rootClassName: tooltipClass,
      popoverClassName: classNames(tooltipPopoverClass, {
        [dismissibleClass]: isDismissible,
        [hiddenClass]: isHiddenClass,
      }),
      arrowClassName: arrowClass,
      closeButtonClassName: closeButtonClass,
    },
    props: modifiedProps,
  };
};
