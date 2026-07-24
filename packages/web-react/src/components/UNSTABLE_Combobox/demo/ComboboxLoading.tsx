'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useToggle } from '../../../hooks';
import { Grid } from '../../Grid';
import { Icon } from '../../Icon';
import { UNSTABLE_Combobox } from '..';
import {
  COMBOBOX_LANGUAGE_OPTIONS,
  filterComboboxLanguageOptions,
  getComboboxLanguageOptionKeys,
  renderComboboxLanguageItems,
} from './ComboboxLanguageItems';

const ASYNC_DELAY_MS = 600;
const OPTIONS = COMBOBOX_LANGUAGE_OPTIONS;
const OPTION_KEYS = getComboboxLanguageOptionKeys(OPTIONS);

const LoadingField = ({ id, label, loadingLabel }: { id: string; label: string; loadingLabel: React.ReactNode }) => {
  const [isOpen, onToggle] = useToggle(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([...OPTIONS]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!value.trim()) {
      setIsLoading(false);
      setFilteredOptions([...OPTIONS]);

      return;
    }

    setIsLoading(true);
    timerRef.current = setTimeout(() => {
      setFilteredOptions(filterComboboxLanguageOptions(value, OPTIONS));
      setIsLoading(false);
    }, ASYNC_DELAY_MS);
  };

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    [],
  );

  return (
    <UNSTABLE_Combobox
      id={id}
      label={label}
      emptySelectionLabel="Languages"
      isOpen={isOpen}
      onToggle={onToggle}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      optionKeys={OPTION_KEYS}
      isLoading={isLoading}
      loadingLabel={loadingLabel}
      hasEmptyState
    >
      {renderComboboxLanguageItems(filteredOptions)}
    </UNSTABLE_Combobox>
  );
};

const ComboboxLoading = () => (
  <Grid cols={{ mobile: 1, desktop: 2 }} alignmentY="top">
    <LoadingField id="demo-combobox-loading-text" label="Languages (text)" loadingLabel="Loading…" />
    <LoadingField
      id="demo-combobox-loading-spinner"
      label="Languages (spinner)"
      loadingLabel={
        <>
          <Icon name="spinner" boxSize={20} UNSAFE_className="animation-spin-clockwise" />
          <span>Loading…</span>
        </>
      }
    />
  </Grid>
);

export default ComboboxLoading;
