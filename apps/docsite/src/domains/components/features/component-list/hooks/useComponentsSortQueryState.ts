'use client';

import { useQueryState, parseAsStringEnum } from 'nuqs';
import { SORT_OPTIONS, type SortOption } from '../model/componentCategories';

const componentsSortParser = parseAsStringEnum<SortOption>([
  SORT_OPTIONS.ALPHABETICAL,
  SORT_OPTIONS.CATEGORICAL,
]).withDefault(SORT_OPTIONS.ALPHABETICAL);

export const useComponentsSortQueryState = () => useQueryState('sort', componentsSortParser);
