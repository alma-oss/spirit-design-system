'use client';

import React from 'react';
import { InputPositions } from '../../constants';
import { getToggledSelectedKeys, isKeySelected, isSingleSelectionMode } from '../../hooks';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { Item } from '../Item';
import { Radio } from '../Radio';
import { PickerOptionsRoles } from './constants';
import { usePickerListboxContext } from './PickerListboxContext';
import { usePickerPopoverContext } from './PickerPopoverContext';
import type { SpiritUnstablePickerItemProps } from './types';

const UNSTABLE_PickerItem = ({ children, value, startSlot, endSlot, ...restProps }: SpiritUnstablePickerItemProps) => {
  const { id, isDisabled, onSelectionChange, optionsRole, selectedKeys, selectionMode } = usePickerPopoverContext();
  const { getOptionProps } = usePickerListboxContext();
  const isChecked = isKeySelected(selectedKeys, value, selectionMode);
  const single = isSingleSelectionMode(selectionMode);

  if (optionsRole === PickerOptionsRoles.LISTBOX) {
    const selectionIndicator = isChecked ? <Icon name="check-plain" boxSize={20} /> : null;

    return (
      <Item
        {...getOptionProps(value)}
        isDisabled={isDisabled}
        isSelected={isChecked}
        startSlot={startSlot ?? selectionIndicator}
        endSlot={endSlot}
      >
        {children}
      </Item>
    );
  }

  const InputComponent = single ? Radio : Checkbox;
  const inputId = `${id}-${value}`;

  const handleChange = () => {
    onSelectionChange(single ? [value] : getToggledSelectedKeys(selectedKeys, value, selectionMode));
  };

  return (
    <InputComponent
      {...restProps}
      id={inputId}
      inputPosition={InputPositions.START}
      isChecked={isChecked}
      isDisabled={isDisabled}
      isItem
      label={children}
      value={value}
      onChange={handleChange}
      {...(single ? { name: id } : {})}
    />
  );
};

UNSTABLE_PickerItem.spiritComponent = 'UNSTABLE_PickerItem';

export default UNSTABLE_PickerItem;
