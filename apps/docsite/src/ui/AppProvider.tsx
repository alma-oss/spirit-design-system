'use client';

import icons from '@alma-oss/spirit-icons/icons';
import { IconsProvider } from '@alma-oss/spirit-web-react';
import React, { type ReactNode } from 'react';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => <IconsProvider value={icons}>{children}</IconsProvider>;
