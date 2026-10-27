'use client';

import icons from '@alma-oss/spirit-icons/icons';
import { IconsProvider } from '@alma-oss/spirit-web-react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import React, { type ReactNode } from 'react';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <NuqsAdapter>
    <IconsProvider value={icons}>{children}</IconsProvider>
  </NuqsAdapter>
);
