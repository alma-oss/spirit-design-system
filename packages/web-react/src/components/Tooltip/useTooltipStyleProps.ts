'use client';

import classNames from 'classnames';
import { useMemo } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type PlacementDictionaryType, type StyleProps } from '../../types';
import { getPlacementClassName } from '../../utils';

interface UseTooltipStyleProps extends StyleProps {
  isDismissible?: boolean;
  isOpen?: boolean;
  placement?: PlacementDictionaryType;
}

export const useTooltipStyleProps = (props: UseTooltipStyleProps) => {
  const { isDismissible, isOpen, placement, ...modifiedProps } = props;
  const tooltipClass = useClassNamePrefix('Tooltip');
  const tooltipPopoverClass = `${tooltipClass}Popover`;
  const arrowClass = `${tooltipPopoverClass}__arrow`;
  const closeButtonClass = `${tooltipPopoverClass}__close`;
  const rootDismissibleClass = `${tooltipPopoverClass}--dismissible`;
  const rootHiddenClass = 'is-hidden';

  const isHiddenClass = useMemo(() => isOpen === false, [isOpen]);
  const placementClassName = getPlacementClassName(placement, { isControlled: true });

  const tooltipPopoverClassName = classNames(tooltipPopoverClass, placementClassName, {
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
    props: modifiedProps,
  };
};
