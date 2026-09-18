'use client';

import React, { useState } from 'react';
import { useI18n } from '../../hooks';
import { ControlButton } from '../ControlButton';
import { Icon } from '../Icon';
import { Tooltip, TooltipPopover, TooltipTrigger } from '../Tooltip';
import { VisuallyHidden } from '../VisuallyHidden';
import { DEFAULT_ICON_NAME, DEFAULT_PLACEMENT, DEFAULT_SIZE, DEFAULT_TRIGGER } from './constants';
import type { SpiritContextualHelpProps } from './types';

const ContextualHelp = (props: SpiritContextualHelpProps) => {
  const { t } = useI18n();
  const {
    children,
    icon,
    id,
    isOpen: isOpenProp,
    label = t('common.contextualHelp'),
    onToggle: onToggleProp,
    placement = DEFAULT_PLACEMENT,
    size = DEFAULT_SIZE,
    trigger = DEFAULT_TRIGGER,
    ...restTooltipProps
  } = props;

  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? isOpenProp : uncontrolledIsOpen;
  const onToggle = (nextIsOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledIsOpen(nextIsOpen);
    }

    onToggleProp?.(nextIsOpen);
  };

  const isIconObject = typeof icon === 'object' && icon !== null;
  const iconName = (isIconObject ? icon.name : icon) ?? DEFAULT_ICON_NAME;
  const iconBoxSize = isIconObject ? icon.boxSize : undefined;

  return (
    <Tooltip {...restTooltipProps} id={id} isOpen={isOpen} onToggle={onToggle} placement={placement} trigger={trigger}>
      <TooltipTrigger elementType={ControlButton} isSubtle isSymmetrical size={size} UNSAFE_className="d-flex">
        <Icon name={iconName} boxSize={iconBoxSize} />
        <VisuallyHidden>{label}</VisuallyHidden>
      </TooltipTrigger>
      <TooltipPopover>{children}</TooltipPopover>
    </Tooltip>
  );
};

ContextualHelp.spiritComponent = 'ContextualHelp';
ContextualHelp.displayName = 'ContextualHelp';

export default ContextualHelp;
