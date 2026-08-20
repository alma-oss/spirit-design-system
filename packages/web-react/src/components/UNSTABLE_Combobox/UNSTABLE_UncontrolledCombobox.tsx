'use client';

import React, { type ForwardedRef, forwardRef, useCallback, useRef, useState } from 'react';
import { useDisclosureState, useSelectionState } from '../../hooks';
import { type ForwardRefComponent } from '../../types';
import ComboboxBase from './ComboboxBase';
import type { SpiritUnstableComboboxRef, SpiritUnstableUncontrolledComboboxProps } from './types';
import { useComboboxState } from './useComboboxState';

const UNSTABLE_UncontrolledCombobox = forwardRef(
  (
    props: SpiritUnstableUncontrolledComboboxProps,
    ref: ForwardedRef<SpiritUnstableComboboxRef>,
  ): React.ReactElement => {
    const {
      defaultIsOpen = false,
      defaultSelectedKeys = [],
      isDisabled,
      onInputChange: onInputChangeProp,
      onSelectionChange,
      ...baseProps
    } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const { isExpanded: isOpen, toggle: onToggle } = useDisclosureState({ defaultExpanded: defaultIsOpen });
    const [inputValue, setInputValue] = useState('');
    const { selectedKeys, setSelectedKeys } = useSelectionState({
      defaultSelectedKeys,
      onSelectionChange,
    });

    const handleInputChange = useCallback(
      (value: string) => {
        setInputValue(value);
        onInputChangeProp?.(value);
      },
      [onInputChangeProp],
    );

    const state = useComboboxState({
      inputRef,
      inputValue,
      isDisabled,
      isOpen,
      onInputChange: handleInputChange,
      onSelectionChange: setSelectedKeys,
      onToggle,
      selectedKeys,
    });

    return <ComboboxBase {...baseProps} forwardedRef={ref} inputRef={inputRef} isDisabled={isDisabled} state={state} />;
  },
) as ForwardRefComponent<SpiritUnstableComboboxRef, SpiritUnstableUncontrolledComboboxProps>;

UNSTABLE_UncontrolledCombobox.spiritComponent = 'UNSTABLE_UncontrolledCombobox';
UNSTABLE_UncontrolledCombobox.displayName = 'UNSTABLE_UncontrolledCombobox';

export default UNSTABLE_UncontrolledCombobox;
