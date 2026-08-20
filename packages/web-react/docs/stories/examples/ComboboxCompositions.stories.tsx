import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, CloseButton, Flex, Spinner, Stack, Tag, UNSTABLE_Combobox } from '../../../src/components';
import {
  COMBOBOX_LANGUAGE_OPTIONS,
  COMBOBOX_LANGUAGE_OPTIONS_ALL,
  COMBOBOX_LANGUAGE_OPTIONS_EXTENDED,
  COMBOBOX_LANGUAGE_OPTION_KEYS,
  COMBOBOX_LANGUAGE_OPTION_KEYS_ALL,
  type ComboboxLanguageOption,
  filterComboboxLanguageOptions,
  renderComboboxLanguageItems,
  sortComboboxLanguageOptions,
} from '../../../src/components/UNSTABLE_Combobox/demo/ComboboxLanguageItems';
import type { SpiritUnstableComboboxRef } from '../../../src/components/UNSTABLE_Combobox/types';
import { useDisclosureState } from '../../../src/hooks';

const ASYNC_DELAY_MS = 600;

export default {
  title: 'Examples/Compositions/Combobox',
};

export const CloseOnSelect = () => {
  const { isExpanded: isOpen, toggle: onToggle, collapse } = useDisclosureState({ defaultExpanded: false });
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const comboboxRef = useRef<SpiritUnstableComboboxRef>(null);

  const filteredOptions = useMemo(
    () => filterComboboxLanguageOptions(inputValue, COMBOBOX_LANGUAGE_OPTIONS),
    [inputValue],
  );

  const handleSelectionChange = (keys: string[]) => {
    setSelectedKeys(keys);
    collapse();
    // After the popover closes, return focus so the user can keep typing.
    queueMicrotask(() => {
      comboboxRef.current?.focus();
    });
  };

  return (
    <UNSTABLE_Combobox
      hasEmptyState={filteredOptions.length === 0}
      helperText="Selecting an option closes the dropdown and returns focus to the input."
      id="composition-combobox-close-on-select"
      inputValue={inputValue}
      isOpen={isOpen}
      label="Languages"
      onInputChange={setInputValue}
      onSelectionChange={handleSelectionChange}
      onToggle={onToggle}
      optionKeys={COMBOBOX_LANGUAGE_OPTION_KEYS}
      ref={comboboxRef}
      selectedKeys={selectedKeys}
    >
      {renderComboboxLanguageItems(filteredOptions)}
    </UNSTABLE_Combobox>
  );
};

export const ExternalTagsBelow = () => {
  const { isExpanded: isOpen, toggle: onToggle } = useDisclosureState({ defaultExpanded: false });
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const filteredOptions = useMemo(
    () => filterComboboxLanguageOptions(inputValue, COMBOBOX_LANGUAGE_OPTIONS),
    [inputValue],
  );

  const selectedOptions = useMemo(
    () => sortComboboxLanguageOptions(COMBOBOX_LANGUAGE_OPTIONS.filter((option) => selectedKeys.includes(option.id))),
    [selectedKeys],
  );

  const removeKey = (key: string) => {
    setSelectedKeys((current) => current.filter((selectedKey) => selectedKey !== key));
  };

  return (
    <Stack hasSpacing>
      <UNSTABLE_Combobox
        emptySelectionLabel="Languages"
        hasEmptyState={filteredOptions.length === 0}
        helperText="Selection appears as tags below the field, not inside the Combobox."
        id="composition-combobox-external-tags"
        inputValue={inputValue}
        isOpen={isOpen}
        label="Languages"
        onInputChange={setInputValue}
        onSelectionChange={setSelectedKeys}
        onToggle={onToggle}
        optionKeys={COMBOBOX_LANGUAGE_OPTION_KEYS}
        renderTags={() => null}
        selectedKeys={selectedKeys}
      >
        {renderComboboxLanguageItems(filteredOptions)}
      </UNSTABLE_Combobox>

      {selectedOptions.length > 0 && (
        <Flex alignmentX="left" alignmentY="center" isWrapping spacing="space-400">
          {selectedOptions.map((option) => (
            <Tag key={option.id} color="selected" elementType="div">
              <span>{option.label}</span>
              <CloseButton label={`Remove ${option.label}`} onClick={() => removeKey(option.id)} size="xsmall" />
            </Tag>
          ))}
        </Flex>
      )}
    </Stack>
  );
};

export const HideSelectedFromList = () => {
  const { isExpanded: isOpen, toggle: onToggle } = useDisclosureState({ defaultExpanded: false });
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const visibleOptions = useMemo(() => {
    const filtered = filterComboboxLanguageOptions(inputValue, COMBOBOX_LANGUAGE_OPTIONS);

    return filtered.filter((option) => !selectedKeys.includes(option.id));
  }, [inputValue, selectedKeys]);

  return (
    <UNSTABLE_Combobox
      hasEmptyState={visibleOptions.length === 0}
      helperText="Selected languages are removed from the dropdown list."
      id="composition-combobox-hide-selected"
      inputValue={inputValue}
      isOpen={isOpen}
      label="Languages"
      onInputChange={setInputValue}
      onSelectionChange={setSelectedKeys}
      onToggle={onToggle}
      optionKeys={COMBOBOX_LANGUAGE_OPTION_KEYS}
      selectedKeys={selectedKeys}
    >
      {renderComboboxLanguageItems(visibleOptions)}
    </UNSTABLE_Combobox>
  );
};

export const LazyExtendedSearch = () => {
  const { isExpanded: isOpen, toggle: onToggle } = useDisclosureState({ defaultExpanded: false });
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadedQueryOptions, setLoadedQueryOptions] = useState<ComboboxLanguageOption[] | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const idleOptions = useMemo(() => {
    const selectedExtended = COMBOBOX_LANGUAGE_OPTIONS_EXTENDED.filter((option) => selectedKeys.includes(option.id));

    return sortComboboxLanguageOptions([...COMBOBOX_LANGUAGE_OPTIONS, ...selectedExtended]);
  }, [selectedKeys]);

  const visibleOptions = useMemo(() => {
    if (!inputValue.trim()) {
      return idleOptions;
    }

    if (isLoading || loadedQueryOptions == null) {
      return [];
    }

    return loadedQueryOptions;
  }, [idleOptions, inputValue, isLoading, loadedQueryOptions]);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!value.trim()) {
      setIsLoading(false);
      setLoadedQueryOptions(null);

      return;
    }

    setIsLoading(true);
    timerRef.current = setTimeout(() => {
      setLoadedQueryOptions(
        sortComboboxLanguageOptions(filterComboboxLanguageOptions(value, COMBOBOX_LANGUAGE_OPTIONS_ALL)),
      );
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
    <Stack hasSpacing>
      <Alert color="informative">
        Extended languages available after typing:{' '}
        {COMBOBOX_LANGUAGE_OPTIONS_EXTENDED.map((option) => option.label).join(', ')}.
      </Alert>
      <UNSTABLE_Combobox
        hasEmptyState={!isLoading && visibleOptions.length === 0}
        helperText="Type to search the extended language list. Selected extended languages stay in the idle list until removed."
        id="composition-combobox-lazy-extended"
        inputValue={inputValue}
        isLoading={isLoading}
        isOpen={isOpen}
        label="Languages"
        loadingLabel={
          <>
            <Spinner boxSize={20} />
            <span>Loading…</span>
          </>
        }
        onInputChange={handleInputChange}
        onSelectionChange={setSelectedKeys}
        onToggle={onToggle}
        optionKeys={COMBOBOX_LANGUAGE_OPTION_KEYS_ALL}
        selectedKeys={selectedKeys}
      >
        {!isLoading && renderComboboxLanguageItems(visibleOptions)}
      </UNSTABLE_Combobox>
    </Stack>
  );
};
