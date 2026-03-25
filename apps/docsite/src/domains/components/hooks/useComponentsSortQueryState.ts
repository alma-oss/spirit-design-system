'use client';

import { SORT_OPTIONS, type SortOption } from '@local/domains/components/constants/componentCategories';
import { useQueryState, parseAsStringEnum } from 'nuqs';

const componentsSortParser = parseAsStringEnum<SortOption>([
  SORT_OPTIONS.ALPHABETICAL,
  SORT_OPTIONS.CATEGORICAL,
]).withDefault(SORT_OPTIONS.ALPHABETICAL);

export const useComponentsSortQueryState = () => useQueryState('sort', componentsSortParser);
