'use client';

import React, { type ReactNode } from 'react';
import { InputPositions } from '../../constants';
import { getNodeText, isKeySelected, isSingleSelectionMode, selectSingleKey, toggleSelection } from '../../hooks';
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
    onSelectionChange(single ? selectSingleKey(value) : toggleSelection(selectedKeys, value));
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

UNSTABLE_PickerItem.getCollectionNode = function* getCollectionNode(props: Record<string, unknown>) {
  yield {
    type: 'item' as const,
    key: String(props.value ?? ''),
    rendered: props.children as ReactNode,
    textValue: getNodeText(props.children as ReactNode),
  };
};

export default UNSTABLE_PickerItem;
