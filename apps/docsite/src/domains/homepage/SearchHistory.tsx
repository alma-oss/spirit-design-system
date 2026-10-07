'use client';

import {
  CloseButton,
  Dropdown,
  DropdownPopover,
  HelperText,
  Icon,
  Item,
  Label,
  Stack,
  Text,
  TextField,
} from '@alma-oss/spirit-web-react';
import { useState } from 'react';
import styles from './SearchHistory.module.scss';

interface RecentSearch {
  label: string;
  helperText?: string;
  newOffers?: string;
}

const recentSearches: RecentSearch[] = [
  { label: 'Room painter', helperText: 'Full-time', newOffers: '4 new offers' },
  { label: 'Alma Career Czechia s.r.o.', newOffers: '4 new offers' },
  { label: 'from 200,000 CZK' },
  { label: 'UX Designer', helperText: 'Last 24 hours, Full-time, from 200,000 CZK, remote work possible' },
];

const noop = () => {};

// A fake search: the dropdown is permanently open and the recent searches are hardcoded.
// Removing a search removes it from the list, once the list is empty it is reset to the original one.
const SearchHistory = () => {
  const [searches, setSearches] = useState(recentSearches);

  const removeSearch = (label: string) => {
    const remaining = searches.filter((search) => search.label !== label);
    setSearches(remaining.length > 0 ? remaining : recentSearches);
  };

  return (
    <div className={styles.SearchHistory}>
      <Dropdown id="building-blocks-search-dropdown" isOpen onToggle={noop} enableAutoClose={false} fullWidthMode="all">
        <TextField
          id="building-blocks-search"
          name="buildingBlocksSearch"
          label="Profession, company or keyword"
          placeholder="e.g. UX Designer, Ikea,…"
          variant="fill"
          size="large"
        />
        <DropdownPopover aria-label="Recent searches" enableAutoFocus={false}>
          <Stack spacing="space-300">
            <Text size="small" textColor="secondary" UNSAFE_className={styles.Title}>
              Recent searches:
            </Text>
            {searches.map(({ label, helperText, newOffers }) => (
              <Item
                key={label}
                startSlot={<Icon name="search" />}
                endSlot={<CloseButton size="small" label={`Remove ${label}`} onClick={() => removeSearch(label)} />}
              >
                <Label>{label}</Label>
                {helperText && <HelperText helperText={helperText} />}
                {newOffers && (
                  <Text elementType="span" size="small" textColor="emotion-success-basic">
                    {newOffers}
                  </Text>
                )}
              </Item>
            ))}
          </Stack>
        </DropdownPopover>
      </Dropdown>
    </div>
  );
};

export default SearchHistory;
