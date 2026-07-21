'use client';

import React, { type ForwardedRef, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useSelectionState, useToggle } from '../../hooks';
import { type ForwardRefComponent } from '../../types';
import type { SpiritUnstableComboboxRef, SpiritUnstableUncontrolledComboboxProps } from './types';
import UNSTABLE_Combobox from './UNSTABLE_Combobox';

// eslint-disable-next-line camelcase
const _UNSTABLE_UncontrolledCombobox = (
  props: SpiritUnstableUncontrolledComboboxProps,
  ref: ForwardedRef<SpiritUnstableComboboxRef>,
) => {
  const { defaultIsOpen = false, defaultSelectedKeys = [], onSelectionChange, onInputChange, ...restProps } = props;
  const comboboxRef = useRef<SpiritUnstableComboboxRef>(null);
  const [isOpen, onToggle] = useToggle(defaultIsOpen);
  const [inputValue, setInputValue] = useState('');

  const { selectedKeys, setSelectedKeys } = useSelectionState({
    defaultSelectedKeys,
    onSelectionChange,
  });

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onInputChange?.(value);
  };

  useImperativeHandle(
    ref,
    () => ({
      close: () => comboboxRef.current?.close(),
      focus: () => comboboxRef.current?.focus(),
      selectedKeys,
    }),
    [selectedKeys],
  );

  return (
    <UNSTABLE_Combobox
      {...restProps}
      ref={comboboxRef}
      inputValue={inputValue}
      isOpen={isOpen}
      onInputChange={handleInputChange}
      onSelectionChange={setSelectedKeys}
      onToggle={onToggle}
      selectedKeys={selectedKeys}
    />
  );
};

const UNSTABLE_UncontrolledCombobox = forwardRef<SpiritUnstableComboboxRef, SpiritUnstableUncontrolledComboboxProps>(
  _UNSTABLE_UncontrolledCombobox,
) as ForwardRefComponent<SpiritUnstableComboboxRef, SpiritUnstableUncontrolledComboboxProps>;

UNSTABLE_UncontrolledCombobox.spiritComponent = 'UNSTABLE_UncontrolledCombobox';
UNSTABLE_UncontrolledCombobox.displayName = 'UNSTABLE_UncontrolledCombobox';

export default UNSTABLE_UncontrolledCombobox;
