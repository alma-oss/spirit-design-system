'use client';

import React from 'react';
import { InputPositions } from '../../constants';
import { getToggledSelectedKeys, isKeySelected, isSingleSelectionMode } from '../../hooks';
import { Checkbox } from '../Checkbox';
import { Radio } from '../Radio';
import { usePickerPopoverContext } from './PickerPopoverContext';
import type { SpiritUnstablePickerItemProps } from './types';

const UNSTABLE_PickerItem = ({ children, value, ...restProps }: SpiritUnstablePickerItemProps) => {
  const { id, isDisabled, onSelectionChange, selectedKeys, selectionMode } = usePickerPopoverContext();
  const isChecked = isKeySelected(selectedKeys, value, selectionMode);
  const single = isSingleSelectionMode(selectionMode);
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
