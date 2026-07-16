'use client';

import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import SplitButtonDefault from './SplitButtonDefault';
import SplitButtonDisabled from './SplitButtonDisabled';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <SplitButtonDefault />
      </DocsSection>
      <DocsSection title="Disabled">
        <SplitButtonDisabled />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
