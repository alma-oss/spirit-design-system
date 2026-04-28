'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import AvatarIcon from './AvatarIcon';
import AvatarImage from './AvatarImage';
import AvatarResponsiveSizes from './AvatarResponsiveSizes';
import AvatarText from './AvatarText';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Icon">
        <AvatarIcon />
      </DocsSection>
      <DocsSection title="Text">
        <AvatarText />
      </DocsSection>
      <DocsSection title="Image">
        <AvatarImage />
      </DocsSection>
      <DocsSection title="Responsive Sizes">
        <AvatarResponsiveSizes />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
