'use client';

import classNames from 'classnames';
import { useMemo } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type PlacementDictionaryType, type StyleProps } from '../../types';
import { getColorSchemeClassName, getPlacementClassName } from '../../utils';
import { DEFAULT_TOOLTIP_COLOR } from './constants';

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
  const dismissibleClass = `${tooltipPopoverClass}--dismissible`;
  const colorSchemeClass = getColorSchemeClassName({
    color: DEFAULT_TOOLTIP_COLOR,
  });
  const hiddenClass = 'is-hidden';

  const isHiddenClass = useMemo(() => isOpen === false, [isOpen]);
  const placementClassName = getPlacementClassName(placement, { isControlled: true });

  return {
    classProps: {
      rootClassName: tooltipClass,
      popoverClassName: classNames(tooltipPopoverClass, colorSchemeClass, placementClassName, {
        [dismissibleClass]: isDismissible,
        [hiddenClass]: isHiddenClass,
      }),
      arrowClassName: arrowClass,
    },
    props: modifiedProps,
  };
};
