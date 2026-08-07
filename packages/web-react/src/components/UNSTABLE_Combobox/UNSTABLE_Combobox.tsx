'use client';

import React, { type ForwardedRef, forwardRef, useRef } from 'react';
import { type ForwardRefComponent } from '../../types';
import ComboboxBase from './ComboboxBase';
import type { SpiritUnstableComboboxProps, SpiritUnstableComboboxRef } from './types';
import { useComboboxState } from './useComboboxState';

const UNSTABLE_Combobox = forwardRef(
  (props: SpiritUnstableComboboxProps, ref: ForwardedRef<SpiritUnstableComboboxRef>): React.ReactElement => {
    const { inputValue, isDisabled, isOpen, onInputChange, onSelectionChange, onToggle, selectedKeys, ...baseProps } =
      props;
    const inputRef = useRef<HTMLInputElement>(null);
    const state = useComboboxState({
      inputRef,
      inputValue,
      isDisabled,
      isOpen,
      onInputChange,
      onSelectionChange,
      onToggle,
      selectedKeys,
    });

    return <ComboboxBase {...baseProps} forwardedRef={ref} inputRef={inputRef} isDisabled={isDisabled} state={state} />;
  },
) as ForwardRefComponent<SpiritUnstableComboboxRef, SpiritUnstableComboboxProps>;

UNSTABLE_Combobox.spiritComponent = 'UNSTABLE_Combobox';
UNSTABLE_Combobox.displayName = 'UNSTABLE_Combobox';

export default UNSTABLE_Combobox;
