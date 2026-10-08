'use client';

import { Icon, InputAddon, TextField, VisuallyHidden } from '@alma-oss/spirit-web-react';
import { useComponentsSearchQueryState } from '@local/domains/components/hooks/useComponentsSearchQueryState';
import React from 'react';
import styles from './ComponentSearch.module.scss';

const SEARCH_ID = 'components-search';

const ComponentSearch = () => {
  const [query, setQuery] = useComponentsSearchQueryState();

  return (
    <div className={styles.search}>
      <TextField
        id={SEARCH_ID}
        isLabelHidden
        label="Search components"
        name="components-search"
        placeholder="Search"
        value={query}
        onChange={(event) => setQuery((event.target as HTMLInputElement).value || null)}
        startAddon={
          <InputAddon elementType="label" htmlFor={SEARCH_ID}>
            <Icon name="search" />
            <VisuallyHidden>Search components by name</VisuallyHidden>
          </InputAddon>
        }
      />
    </div>
  );
};

export default ComponentSearch;
