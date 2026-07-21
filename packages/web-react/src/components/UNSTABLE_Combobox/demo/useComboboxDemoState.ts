'use client';

import { useMemo, useState } from 'react';
import { useToggle } from '../../../hooks';
import { COMBOBOX_LANGUAGE_OPTION_KEYS, filterComboboxLanguageOptions } from './ComboboxLanguageItems';

export interface UseComboboxDemoStateOptions {
  defaultSelectedKeys?: string[];
}

export const useComboboxDemoState = ({ defaultSelectedKeys = [] }: UseComboboxDemoStateOptions = {}) => {
  const [isOpen, onToggle] = useToggle(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const [inputValue, setInputValue] = useState('');

  const filteredOptions = useMemo(() => filterComboboxLanguageOptions(inputValue), [inputValue]);

  return {
    hasEmptyState: true as const,
    filteredOptions,
    inputValue,
    isOpen,
    onInputChange: setInputValue,
    onSelectionChange: setSelectedKeys,
    onToggle,
    optionKeys: COMBOBOX_LANGUAGE_OPTION_KEYS,
    selectedKeys,
  };
};
