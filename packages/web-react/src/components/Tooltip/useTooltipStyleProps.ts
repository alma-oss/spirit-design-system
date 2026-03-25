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
  const rootDismissibleClass = `${tooltipPopoverClass}--dismissible`;
  const rootHiddenClass = 'is-hidden';
  const colorSchemeClass = 'color-scheme-on-neutral-basic';

  const isHiddenClass = useMemo(() => isOpen === false, [isOpen]);
  const placementClassName = getPlacementClassName(placement, { isControlled: true });

  const tooltipPopoverClassName = classNames(tooltipPopoverClass, colorSchemeClass, placementClassName, {
    [rootDismissibleClass]: isDismissible,
    [rootHiddenClass]: isHiddenClass,
  });

  return {
    classProps: {
      rootClassName: tooltipClass,
      popoverClassName: tooltipPopoverClassName,
      arrowClassName: arrowClass,
    },
    props: modifiedProps,
  };
};
