'use client';

import React, { type ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { useSelectionState, useToggle } from '../../hooks';
import { type ForwardRefComponent } from '../../types';
import type { SpiritUnstablePickerRef, SpiritUnstableUncontrolledPickerProps } from './types';
import UNSTABLE_Picker from './UNSTABLE_Picker';

// eslint-disable-next-line camelcase
const _UNSTABLE_UncontrolledPicker = (
  props: SpiritUnstableUncontrolledPickerProps,
  ref: ForwardedRef<SpiritUnstablePickerRef>,
) => {
  const { defaultIsOpen = false, defaultSelectedKeys = [], onSelectionChange, selectionMode, ...restProps } = props;
  const pickerRef = useRef<SpiritUnstablePickerRef>(null);
  const [isOpen, onToggle] = useToggle(defaultIsOpen);

  const { selectedKeys, setSelectedKeys } = useSelectionState({
    defaultSelectedKeys,
    onSelectionChange,
    selectionMode,
  });

  useImperativeHandle(
    ref,
    () => ({
      close: () => pickerRef.current?.close(),
      selectedKeys,
    }),
    [selectedKeys],
  );

  return (
    <UNSTABLE_Picker
      {...restProps}
      ref={pickerRef}
      isOpen={isOpen}
      onSelectionChange={setSelectedKeys}
      onToggle={onToggle}
      selectedKeys={selectedKeys}
      selectionMode={selectionMode}
    />
  );
};

const UNSTABLE_UncontrolledPicker = forwardRef<SpiritUnstablePickerRef, SpiritUnstableUncontrolledPickerProps>(
  _UNSTABLE_UncontrolledPicker,
) as ForwardRefComponent<SpiritUnstablePickerRef, SpiritUnstableUncontrolledPickerProps>;

UNSTABLE_UncontrolledPicker.spiritComponent = 'UNSTABLE_UncontrolledPicker';
UNSTABLE_UncontrolledPicker.displayName = 'UNSTABLE_UncontrolledPicker';

export default UNSTABLE_UncontrolledPicker;
