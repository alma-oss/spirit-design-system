'use client';

import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import MenuDefault from './MenuDefault';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <MenuDefault />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
