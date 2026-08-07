'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import SplitTagColorsAndSizes from './SplitTagColorsAndSizes';
import SplitTagDisabled from './SplitTagDisabled';
import SplitTagPragueRadius from './SplitTagPragueRadius';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <SplitTagPragueRadius />
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
