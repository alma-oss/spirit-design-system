'use client';

import React, { useId } from 'react';
import { useContextProps } from '../../context';
import { useI18n, useStyleProps } from '../../hooks';
import { filterDOMProps, mergeStyleProps } from '../../utils';
import { ControlButton } from '../ControlButton';
import { Icon } from '../Icon';
import { TooltipPopover, TooltipTrigger, UncontrolledTooltip } from '../Tooltip';
import { VisuallyHidden } from '../VisuallyHidden';
import { DEFAULT_ICON_NAME, DEFAULT_PLACEMENT, DEFAULT_SIZE, DEFAULT_TRIGGER } from './constants';
import type { ContextualHelpResolvedProps, SpiritContextualHelpProps } from './types';

const ContextualHelp = (props: SpiritContextualHelpProps) => {
  const { t } = useI18n();
  const generatedId = useId();
  const mergedProps = useContextProps<ContextualHelpResolvedProps>(props, 'contextualHelp');
  const {
    children,
    iconProps,
    id: idFromContext,
    isDismissible,
    label = t('common.contextualHelp'),
    placement = DEFAULT_PLACEMENT,
    size = DEFAULT_SIZE,
    ...restProps
  } = mergedProps;
  const id = idFromContext ?? generatedId;
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(UncontrolledTooltip, { styleProps, otherProps });

  return (
    <UncontrolledTooltip
      {...filterDOMProps(otherProps)}
      {...mergedStyleProps}
      id={id}
      isDismissible={isDismissible}
      placement={placement}
      trigger={DEFAULT_TRIGGER}
    >
      <TooltipTrigger
        elementType={ControlButton}
        isSubtle
        isSymmetrical
        size={size}
        // Flex display centers the icon and keeps the visually hidden label from affecting button layout.
        UNSAFE_className="d-flex"
      >
        <Icon name={DEFAULT_ICON_NAME} {...iconProps} />
        <VisuallyHidden>{label}</VisuallyHidden>
      </TooltipTrigger>
      <TooltipPopover>{children}</TooltipPopover>
    </UncontrolledTooltip>
  );
};

ContextualHelp.spiritComponent = 'ContextualHelp';
ContextualHelp.displayName = 'ContextualHelp';

export default ContextualHelp;
