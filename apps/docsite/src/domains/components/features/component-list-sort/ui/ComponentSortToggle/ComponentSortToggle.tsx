'use client';

import { SegmentedControl, SegmentedControlItem } from '@alma-oss/spirit-web-react';
import React from 'react';
import { SORT_OPTIONS, type SortOption } from '../../constants';
import { useComponentsSortQueryState } from '../../hooks/useComponentsSortQueryState';

const ComponentSortToggle = () => {
  const [sort, setSort] = useComponentsSortQueryState();

  const handleSelectionChange = (value: string | string[]) => {
    const selected = Array.isArray(value) ? value[0] : value;

    if (selected) {
      setSort(selected as SortOption);
    }
  };

  return (
    <SegmentedControl
      label="Sort components"
      name="component-sort"
      selectedValue={sort}
      setSelectedValue={handleSelectionChange}
      variant="fill"
    >
      <SegmentedControlItem id="sort-alphabetical" value={SORT_OPTIONS.ALPHABETICAL}>
        Alphabetical
      </SegmentedControlItem>
      <SegmentedControlItem id="sort-categorical" value={SORT_OPTIONS.CATEGORICAL}>
        Categorical
      </SegmentedControlItem>
    </SegmentedControl>
  );
};

export default ComponentSortToggle;
