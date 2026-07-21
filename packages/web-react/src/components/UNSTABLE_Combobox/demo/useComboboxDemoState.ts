'use client';

import { useMemo, useState } from 'react';
import { useToggle } from '../../../hooks';
import {
  COMBOBOX_LANGUAGE_OPTIONS,
  type ComboboxLanguageOption,
  filterComboboxLanguageOptions,
  getComboboxLanguageOptionKeys,
} from './ComboboxLanguageItems';

export interface UseComboboxDemoStateOptions {
  defaultSelectedKeys?: string[];
  options?: readonly ComboboxLanguageOption[];
}

export const useComboboxDemoState = ({
  defaultSelectedKeys = [],
  options = COMBOBOX_LANGUAGE_OPTIONS,
}: UseComboboxDemoStateOptions = {}) => {
  const [isOpen, onToggle] = useToggle(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const [inputValue, setInputValue] = useState('');

  const filteredOptions = useMemo(() => filterComboboxLanguageOptions(inputValue, options), [inputValue, options]);

  return {
    hasEmptyState: true as const,
    filteredOptions,
    inputValue,
    isOpen,
    onInputChange: setInputValue,
    onSelectionChange: setSelectedKeys,
    onToggle,
    optionKeys: getComboboxLanguageOptionKeys(options),
    selectedKeys,
  };
};
