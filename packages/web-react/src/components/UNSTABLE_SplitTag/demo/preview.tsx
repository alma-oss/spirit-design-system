'use client';

import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import SplitTagColorsAndSizes from './SplitTagColorsAndSizes';
import SplitTagDisabled from './SplitTagDisabled';
import SplitTagLocationRadius from './SplitTagLocationRadius';
import SplitTagLongText from './SplitTagLongText';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <SplitTagLocationRadius />
      </DocsSection>
      <DocsSection title="Long Text">
        <SplitTagLongText />
      </DocsSection>
      <DocsSection title="Colors and Sizes">
        <SplitTagColorsAndSizes />
      </DocsSection>
      <DocsSection title="Disabled">
        <SplitTagDisabled />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
