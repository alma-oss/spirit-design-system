'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useToggle } from '../../../hooks';
import { CloseButton } from '../../CloseButton';
import { HelperText } from '../../HelperText';
import { Icon } from '../../Icon';
import { Link } from '../../Link';
import { Stack } from '../../Stack';
import { Text } from '../../Text';
import type { SpiritUnstableComboboxRef } from '../types';
import { UNSTABLE_Combobox, UNSTABLE_ComboboxOption } from '..';

type LastSearch = {
  id: string;
  href: string;
  title: string;
  helperText: string;
  badge?: string;
  isDisabled?: boolean;
};

const INITIAL_LAST_SEARCHES: readonly LastSearch[] = [
  {
    id: 'malir-pokoju',
    href: '#malir-pokoj',
    title: 'Malíř pokojů',
    helperText: 'Plný úvazek',
    badge: '4 nové nabídky',
  },
  {
    id: 'umelecky-malir',
    href: '#umelecky-malir',
    title: 'Umělecký malíř',
    helperText: 'Poloviční úvazek',
  },
  {
    id: 'skladnik',
    href: '#skladnik',
    title: 'Skladník',
    helperText: 'Nábor ukončen',
    isDisabled: true,
  },
];

const ComboboxLastSearchesGrid = () => {
  const [isOpen, onToggle] = useToggle(false);
  const [selectedKeys] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [searches, setSearches] = useState([...INITIAL_LAST_SEARCHES]);
  const comboboxRef = useRef<SpiritUnstableComboboxRef>(null);

  const filteredSearches = useMemo(() => {
    const query = inputValue.trim().toLowerCase();

    if (!query) {
      return searches;
    }

    return searches.filter((search) => search.title.toLowerCase().includes(query));
  }, [inputValue, searches]);

  // Prefer the next enabled neighbour, then the previous; skip disabled rows.
  const removeSearch = (id: string) => {
    const removedIndex = filteredSearches.findIndex((search) => search.id === id);
    const remaining = filteredSearches.filter((search) => search.id !== id);
    const nextSearch =
      remaining.slice(removedIndex).find((search) => !search.isDisabled) ??
      [...remaining.slice(0, removedIndex)].reverse().find((search) => !search.isDisabled);

    setSearches((current) => current.filter((search) => search.id !== id));
    comboboxRef.current?.activateOption(nextSearch?.id ?? null);
  };

  return (
    <UNSTABLE_Combobox
      dropdownProps={{ fullWidthMode: 'all' }}
      emptySelectionLabel="Search"
      hasEmptyState
      id="demo-combobox-last-searches-grid"
      inputValue={inputValue}
      isOpen={isOpen}
      label="Last searches"
      onInputChange={setInputValue}
      onSelectionChange={() => {}}
      onToggle={onToggle}
      optionKeys={searches.map((search) => search.id)}
      optionsRole="grid"
      ref={comboboxRef}
      selectedKeys={selectedKeys}
    >
      {filteredSearches.map((search) => (
        <UNSTABLE_ComboboxOption
          alignmentY="top"
          isDisabled={search.isDisabled}
          key={search.id}
          label={search.title}
          value={search.id}
          startSlot={<Icon name="search" />}
          endSlot={
            <span role="gridcell">
              <CloseButton
                size="small"
                tabIndex={-1}
                label={`Remove ${search.title}`}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  removeSearch(search.id);
                }}
              />
            </span>
          }
        >
          <Stack elementType="span" spacing="space-300">
            <Link href={search.href} color="inherit" underlined="never" isStretched>
              {search.title}
            </Link>
            <HelperText elementType="span" helperText={search.helperText} />
            {search.badge && (
              <Text elementType="span" size="small" textColor="emotion-success-basic">
                {search.badge}
              </Text>
            )}
          </Stack>
        </UNSTABLE_ComboboxOption>
      ))}
    </UNSTABLE_Combobox>
  );
};

export default ComboboxLastSearchesGrid;
