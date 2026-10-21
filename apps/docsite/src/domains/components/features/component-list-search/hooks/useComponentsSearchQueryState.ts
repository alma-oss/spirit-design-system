'use client';

import { parseAsString, useQueryState } from 'nuqs';

const componentsSearchParser = parseAsString.withDefault('').withOptions({ history: 'replace' });

export const useComponentsSearchQueryState = () => useQueryState('q', componentsSearchParser);
