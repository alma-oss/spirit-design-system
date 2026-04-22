'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import HeaderDefault from './HeaderDefault';
import HeaderFluid from './HeaderFluid';
import HeaderMinimal from './HeaderMinimal';
import HeaderWithBottomDivider from './HeaderWithBottomDivider';
import HeaderWithNavigation from './HeaderWithNavigation';
import HeaderWithNavigationAndNestedItems from './HeaderWithNavigationAndNestedItems';
import HeaderWithPillNavigation from './HeaderWithPillNavigation';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Minimal Header" stackAlignment="stretch" container="heading-only">
        <HeaderMinimal />
      </DocsSection>
      <DocsSection title="Full Header" stackAlignment="stretch" container="heading-only">
        <HeaderDefault />
      </DocsSection>
      <DocsSection title="Header with Bottom Divider" stackAlignment="stretch" container="heading-only">
        <HeaderWithBottomDivider />
      </DocsSection>
      <DocsSection title="Fluid Header" stackAlignment="stretch" container="heading-only">
        <HeaderFluid />
      </DocsSection>
      <DocsSection title="With Navigation" stackAlignment="stretch" container="heading-only">
        <HeaderWithNavigation />
      </DocsSection>
      <DocsSection title="With Pill Navigation" stackAlignment="stretch" container="heading-only">
        <HeaderWithPillNavigation />
      </DocsSection>
      <DocsSection title="With Navigation and Nested Items" stackAlignment="stretch" container="heading-only">
        <HeaderWithNavigationAndNestedItems />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
