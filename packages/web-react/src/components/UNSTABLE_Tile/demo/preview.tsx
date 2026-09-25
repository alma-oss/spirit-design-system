'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import TileComposition from './TileComposition';
import TileCustomBackground from './TileCustomBackground';
import TileDefault from './TileDefault';
import TilePadding from './TilePadding';
import TileRegion from './TileRegion';
import TileShadow from './TileShadow';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <TileDefault />
      </DocsSection>
      <DocsSection title="Custom Background" stackAlignment="stretch">
        <TileCustomBackground />
      </DocsSection>
      <DocsSection title="Shadow" stackAlignment="stretch">
        <TileShadow />
      </DocsSection>
      <DocsSection title="Padding" stackAlignment="stretch">
        <TilePadding />
      </DocsSection>
      <DocsSection title="Named Region" stackAlignment="stretch">
        <TileRegion />
      </DocsSection>
      <DocsSection title="Inner Spacing" stackAlignment="stretch">
        <TileComposition />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
