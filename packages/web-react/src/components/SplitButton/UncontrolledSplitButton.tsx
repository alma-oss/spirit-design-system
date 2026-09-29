'use client';

import React, { useState } from 'react';
import { useDeprecationMessage, useStringProp } from '../../hooks';
import { type UncontrolledSplitButtonProps } from '../../types';
import { Button } from '../Button';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../Dropdown';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import SplitButton from './SplitButton';

const defaultProps: Partial<UncontrolledSplitButtonProps> = {
  dropdownPlacement: 'bottom-end',
  dropdownTriggerIconName: 'chevron-down',
};

const UncontrolledSplitButton = (props: UncontrolledSplitButtonProps) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    buttonIconName,
    buttonLabel,
    labelButton,
    buttonOnClick,
    children,
    dropdownTriggerIconName,
    dropdownTriggerLabel,
    dropdownPlacement,
    id,
    isButtonLabelHidden,
    isDisabled,
    isDropdownTriggerLabelHidden,
    strings,
    ...restProps
  } = propsWithDefaults;
  const { buttonLabel: buttonLabelValue, dropdownTriggerLabel: resolvedDropdownTriggerLabel } = useStringProp({
    buttonLabel: { value: labelButton, deprecated: buttonLabel },
    dropdownTriggerLabel: {
      value: strings?.label?.dropdown?.trigger,
      deprecated: dropdownTriggerLabel,
      key: 'splitButton.dropdown',
    },
  });
  const resolvedButtonLabel = buttonLabelValue ?? '';
  const [openDropdownState, setOpenDropdownState] = useState(false);

  useDeprecationMessage({
    method: 'property',
    trigger: buttonLabel != null,
    componentName: 'UncontrolledSplitButton',
    propertyProps: { deprecatedName: 'buttonLabel', newName: 'labelButton' },
  });
  useDeprecationMessage({
    method: 'custom',
    trigger: dropdownTriggerLabel != null,
    componentName: 'UncontrolledSplitButton',
    customText:
      'The "dropdownTriggerLabel" property is deprecated and will be removed in the next major version. Use "strings.label.dropdown.trigger" instead.',
  });

  return (
    <SplitButton {...restProps} id={id} isDisabled={isDisabled}>
      <Button onClick={buttonOnClick}>
        {buttonIconName && <Icon name={buttonIconName} />}
        {isButtonLabelHidden ? <VisuallyHidden>{resolvedButtonLabel}</VisuallyHidden> : resolvedButtonLabel}
      </Button>
      <Dropdown
        id={`${id}-dropdown`}
        isOpen={openDropdownState}
        onToggle={() => setOpenDropdownState(!openDropdownState)}
        placement={dropdownPlacement}
      >
        <DropdownTrigger elementType={Button}>
          {isDropdownTriggerLabelHidden ? (
            <VisuallyHidden>{resolvedDropdownTriggerLabel}</VisuallyHidden>
          ) : (
            resolvedDropdownTriggerLabel
          )}
          <Icon name={dropdownTriggerIconName as string} />
        </DropdownTrigger>
        <DropdownPopover>{children}</DropdownPopover>
      </Dropdown>
    </SplitButton>
  );
};

export default UncontrolledSplitButton;
