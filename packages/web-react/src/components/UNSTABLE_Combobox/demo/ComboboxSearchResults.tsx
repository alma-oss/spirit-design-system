'use client';

import React, { useMemo, useState } from 'react';
import { useDisclosureState } from '../../../hooks';
import { Icon } from '../../Icon';
import { Text } from '../../Text';
import { UNSTABLE_Combobox, UNSTABLE_ComboboxOption } from '..';

type SearchResult = {
  id: string;
  filterText: string;
  content: React.ReactNode;
  tagLabel: string;
  icon: string;
};

const SEARCH_RESULTS: readonly SearchResult[] = [
  {
    id: 'keyword-admin',
    filterText: 'Admin hledat klíčové slovo',
    content: <Text elementType="span">&quot;Admin&quot; hledat klíčové slovo</Text>,
    tagLabel: 'Admin',
    icon: 'placeholder',
  },
  {
    id: 'administrativa',
    filterText: 'Administrativa',
    content: (
      <Text elementType="span">
        Admin<strong>istrativa</strong>
      </Text>
    ),
    tagLabel: 'Administrativa',
    icon: 'folder-dualtone',
  },
  {
    id: 'administratorka',
    filterText: 'Administrátorka',
    content: (
      <Text elementType="span">
        Admin<strong>istrátorka</strong>
      </Text>
    ),
    tagLabel: 'Administrátorka',
    icon: 'shield-dualtone',
  },
];

const ComboboxSearchResults = () => {
  const { isExpanded: isOpen, toggle: onToggle } = useDisclosureState({ defaultExpanded: false });
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const filteredResults = useMemo(() => {
    const query = inputValue.trim().toLowerCase();

    if (!query) {
      return [...SEARCH_RESULTS];
    }

    return SEARCH_RESULTS.filter((result) => result.filterText.toLowerCase().includes(query));
  }, [inputValue]);

  return (
    <UNSTABLE_Combobox
      dropdownProps={{ fullWidthMode: 'all' }}
      emptySelectionLabel="Search"
      hasEmptyState
      id="demo-combobox-search-results"
      inputValue={inputValue}
      isOpen={isOpen}
      label="Search results"
      onInputChange={setInputValue}
      onSelectionChange={setSelectedKeys}
      onToggle={onToggle}
      optionKeys={SEARCH_RESULTS.map((result) => result.id)}
      selectedKeys={selectedKeys}
    >
      {filteredResults.map((result) => (
        <UNSTABLE_ComboboxOption
          key={result.id}
          value={result.id}
          label={result.tagLabel}
          startSlot={<Icon name={result.icon} />}
        >
          {result.content}
        </UNSTABLE_ComboboxOption>
      ))}
    </UNSTABLE_Combobox>
  );
};

export default ComboboxSearchResults;
