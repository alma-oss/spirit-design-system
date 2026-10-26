'use client';

import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import ToolbarHorizontal from './ToolbarHorizontal';
import ToolbarVertical from './ToolbarVertical';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Horizontal" stackAlignment="stretch">
        <ToolbarHorizontal />
      </DocsSection>
      <DocsSection title="Vertical" stackAlignment="stretch">
        <ToolbarVertical />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
